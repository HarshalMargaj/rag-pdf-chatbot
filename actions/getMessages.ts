"use server";

import { db } from "@/lib/db";

export async function getMessages(id: string) {
	const messages = await db.message.findMany({
		where: {
			documentId: id,
		},
	});

	return messages;
}
