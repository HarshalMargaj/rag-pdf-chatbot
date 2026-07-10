"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getRecentDocuments() {
	const { userId } = await auth.protect();

	const documents = await db.document.findMany({
		where: { userId },
		orderBy: { createdAt: "desc" },
	});
	return documents;
}
