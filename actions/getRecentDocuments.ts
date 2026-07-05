"use server";

import { db } from "@/lib/db";

export async function getRecentDocuments() {
	const documents = await db.document.findMany({
		orderBy: { createdAt: "desc" },
		take: 10,
	});
	return documents;
}
