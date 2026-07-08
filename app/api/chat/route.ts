import { NextResponse } from "next/server";
import {
	streamText,
	embed,
	tool,
	isStepCount,
	createUIMessageStreamResponse,
	toUIMessageStream,
	convertToModelMessages,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { chatModel } from "@/lib/ai/chat-model";
import { z } from "zod";
import { db } from "@/lib/db";
import { saveMessage } from "@/actions/saveMessage";

const embeddingModel = openai.embeddingModel("text-embedding-3-small");

export async function POST(req: Request) {
	try {
		const { messages, documentId } = await req.json();

		const result = streamText({
			model: chatModel,
			messages: await convertToModelMessages(messages),
			stopWhen: isStepCount(5),
			system: "You are a helpful assistant that answers questions about an uploaded PDF document. Use the getInformation tool to search the document when needed, then answer the user's question in a natural, conversational tone — as if you're explaining it to someone, not copy-pasting resume bullet points. Rewrite the information in your own words. Do not use markdown formatting like bold, bullet points, or dashes unless the user specifically asks for a list. Keep answers concise and conversational. Do not mention page numbers or cite sources in your answer — the source passages are already shown separately to the user in a sidebar.",
			tools: {
				getInformation: tool({
					description:
						"Search the uploaded PDF document for content relevant to the user's question. Always call this before answering questions about the document.",
					inputSchema: z.object({
						question: z
							.string()
							.describe(
								"The question or topic to search for in the document",
							),
					}),
					execute: async ({ question }) => {
						const { embedding } = await embed({
							model: embeddingModel,
							value: question,
						});
						const vector = `[${embedding.join(",")}]`;

						const chunks: {
							content: string;
							pageNumber: number;
							similarity: number;
						}[] = await db.$queryRaw`
                            select
                                content,
                                "pageNumber",
                                -(embedding <#> ${vector}::vector) AS similarity
                            from "DocumentChunks"
                            where "documentId" = ${documentId}
                            ORDER BY embedding <#> ${vector}::vector
							LIMIT 5
                        `;

						return chunks;
					},
				}),
			},
			onError: error => {
				console.error("STREAM ERROR:", error);
			},
		});

		return createUIMessageStreamResponse({
			stream: toUIMessageStream({
				stream: result.stream,
				originalMessages: messages,
				onEnd: async ({ responseMessage }) => {
					try {
						await saveMessage({
							documentId,
							role: "assistant",
							parts: responseMessage.parts,
						});
					} catch (error) {
						console.log("Failed to save assistant message:", error);
					}
				},
			}),
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: "Something went wrong!" },
			{ status: 500 },
		);
	}
}
