import { NextResponse } from "next/server";
import {
	streamText,
	embed,
	tool,
	isStepCount,
	createUIMessageStreamResponse,
	toUIMessageStream,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { chatModel } from "@/lib/ai/chat-model";
import { z } from "zod";
import { db } from "@/lib/db";

const embeddingModel = openai.embeddingModel("text-embedding-3-small");

export async function POST(req: Request) {
	try {
		const { messages, documentId } = await req.json();

		const result = streamText({
			model: chatModel,
			messages,
			stopWhen: isStepCount(5),
			system: `You are a helpful assistant that answers questions about an uploaded PDF document. Always use the getInformation tool to search the document before answering. If the tool doesn't return relevant information, say you don't know — don't make things up. When you answer, mention which page(s) the information came from.`,
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
                                1 - (embedding <=> ${vector}::vector) AS similarity
                            from "DocumentChunks"
                            where "documentId" = ${documentId}
                            ORDER BY embedding <=> ${vector}::vector
							LIMIT 5
                        `;

						return chunks;
					},
				}),
			},
		});

		return createUIMessageStreamResponse({
			stream: toUIMessageStream({
				stream: result.stream,
				originalMessages: messages,
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
