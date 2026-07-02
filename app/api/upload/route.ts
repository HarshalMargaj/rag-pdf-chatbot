import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		// get the file
		const formData = await req.formData();
		const file = formData.get("file") as File;

		// get the filename
		const fileName = file.name;

		// store the filename into document table
		const document = await db.document.create({
			data: {
				filename: fileName,
			},
		});

		return NextResponse.json({ documentId: document.id });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				message: "Something went wrong!",
			},
			{
				status: 500,
			},
		);
	}
}
