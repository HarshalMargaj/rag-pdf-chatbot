import { db } from "@/lib/db";
import { splitIntoChunks } from "@/lib/SplitIntoChunks";
import { NextResponse } from "next/server";
import { embedMany } from "ai";
import { extractText, getDocumentProxy } from "unpdf";
import { openai } from "@ai-sdk/openai";
import { randomUUID } from "crypto";
import { sanitizeText } from "@/lib/SanitizeText";

// OpenAI embedding model — 1536 dimensions
const embeddingModel = openai.embeddingModel("text-embedding-3-small");

export async function POST(req: Request) {
	try {
		// ── Step 1: Get PDF file from request ──────────────────────────────
		const formData = await req.formData();
		const file = formData.get("file") as File;

		// ── Step 2: Save document record to DB ─────────────────────────────
		const document = await db.document.create({
			data: { filename: file.name },
		});

		// ── Step 3: Extract text from each page ────────────────────────────
		const arrayBuffer = await file.arrayBuffer();
		const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));
		const { text } = await extractText(pdf, { mergePages: false });
		// mergePages: false → gives us text per page (needed for page citations)

		// ── Step 4: Split each page into smaller chunks ─────────────────────
		const chunkRecords: { content: string; pageNumber: number }[] = [];

		text.forEach((pageText, index) => {
			const cleanedText = sanitizeText(pageText);
			const pageChunks = splitIntoChunks(cleanedText);
			pageChunks.forEach(chunk => {
				chunkRecords.push({ content: chunk, pageNumber: index + 1 });
			});
		});

		// ── Step 5: Generate embeddings for all chunks in one call ──────────
		const { embeddings } = await embedMany({
			model: embeddingModel,
			values: chunkRecords.map(c => c.content),
		});
		// embedMany is more efficient than calling embed() in a loop

		// ── Step 6: Store chunks + vectors in DB ───────────────────────────
		for (let i = 0; i < chunkRecords.length; i++) {
			const vector = `[${embeddings[i].join(",")}]`;

			// raw SQL needed because Prisma doesn't support pgvector natively
			await db.$executeRaw`
				INSERT INTO "DocumentChunks" (
					id,
					content,
					"pageNumber",
					embedding,
					"documentId"
				)
				VALUES (
					${randomUUID()},
					${chunkRecords[i].content},
					${chunkRecords[i].pageNumber},
					${vector}::vector,
					${document.id}
				)
			`;
		}

		// ── Step 7: Return documentId to redirect user to chat ─────────────
		return NextResponse.json({
			documentId: document.id,
			// chunkCount: chunkRecords.length,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: "Something went wrong!" },
			{ status: 500 },
		);
	}
}
