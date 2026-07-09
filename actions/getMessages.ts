"use server";

import { db } from "@/lib/db";
import { UIDataTypes, UIMessagePart, UITools } from "ai";

export async function getMessages(id: string) {
	const messages = await db.message.findMany({
		where: {
			documentId: id,
		},
	});

	return messages.map(m => ({
		id: m.id,
		role: m.role as "user" | "assistant" | "system",
		parts: (m.parts ?? []) as UIMessagePart<UIDataTypes, UITools>[],
		// UIMessage also allows an optional metadata field if you need createdAt
	}));
}
