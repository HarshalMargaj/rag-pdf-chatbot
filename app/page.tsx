"use client";

import UploadZone from "@/components/UploadZone";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { BiLoaderCircle } from "react-icons/bi";

export default function Home() {
	const [stage, setStage] = useState<"upload" | "processing">("upload");

	const router = useRouter();

	const handleFile = async (f: File) => {
		setStage("processing");

		const formData = new FormData();
		formData.append("file", f);
		const response = await axios.post("/api/upload", formData);
		console.log(response);

		router.push(`/chat/${response.data.documentId}`);
	};
	return (
		<div>
			{stage === "upload" && <UploadZone onFile={handleFile} />}
			{stage === "processing" && (
				<div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
					<BiLoaderCircle className="w-12 h-12 text-violet-500 animate-[spin_3s_linear_infinite]" />
					<div>
						<p className="text-white text-xl font-semibold">
							Processing your PDF
						</p>
						<p className="text-gray-400 text-sm mt-4 max-w-lg">
							Extracting text, splitting it into chunks, and
							generating embeddings for semantic search. This may
							take a few seconds depending on document size.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
