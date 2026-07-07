"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { db } from "@/lib/db";

interface SaveMessageProps {
	documentId: string;
	role: "user" | "assistant";
	parts: Prisma.InputJsonValue;
}

export async function saveMessage({
	documentId,
	role,
	parts,
}: SaveMessageProps) {
	await db.message.create({
		data: {
			documentId,
			role,
			parts,
		},
	});
}
