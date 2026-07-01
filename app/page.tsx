"use client";

import UploadZone from "@/components/LeftPanel/UploadZone";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
	const [stage, setStage] = useState<"upload" | "processing">("upload");
	const [file, setFile] = useState<File>();
	const router = useRouter();

	console.log(file);

	const handleFile = (f: File) => {
		setFile(f);
		setStage("processing");

		setTimeout(() => {
			router.push("/chat");
		}, 2500);
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
