"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { db } from "@/lib/db";
import { UIMessage } from "ai";

interface SaveMessageProps {
	documentId: string;
	role: "user" | "assistant";
	parts: UIMessage["parts"];
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
			parts: parts as unknown as Prisma.InputJsonValue,
		},
	});
}
