import { db } from "@/lib/db";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const evt = await verifyWebhook(req);

		const eventType = evt.type;
		if (eventType === "user.created") {
			const { id } = evt.data;

			await db.user.create({
				data: { userId: id },
			});

			console.log("User created in DB:", id);
		}

		return new Response("Webhook received", { status: 200 });
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error verifying webhook", { status: 400 });
	}
}
