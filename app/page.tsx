"use client";

import UploadZone from "@/components/UploadZone";

import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
	const [stage, setStage] = useState<"upload" | "processing">("upload");
	const [file, setFile] = useState<File>();

	const router = useRouter();

	console.log(file);

	const handleFile = async (f: File) => {
		setFile(f);
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
				<div className="text-white">processing...</div>
			)}
		</div>
	);
}
