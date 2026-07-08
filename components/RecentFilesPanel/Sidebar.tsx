"use client";

import { getRecentDocuments } from "@/actions/getRecentDocuments";
import { Document } from "@/app/generated/prisma/client";
import React, { useEffect, useState } from "react";
import { BiSolidSquareRounded } from "react-icons/bi";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import UploadScreen from "../uploadPanel/UploadZone";
import axios from "axios";
import Loader from "../Loader";

const Sidebar = () => {
	const [documents, setDocuments] = useState<Document[]>([]);
	const [stage, setStage] = useState<"upload" | "processing">("upload");
	const router = useRouter();
	const params = useParams();

	const handleFile = async (f: File) => {
		setStage("processing");

		const formData = new FormData();
		formData.append("file", f);
		const response = await axios.post("/api/upload", formData);

		router.push(`/chat/${response.data.documentId}`);
	};

	useEffect(() => {
		getRecentDocuments().then(setDocuments);
	}, []);

	return (
		<div className="flex h-screen w-80 flex-col border-r border-[#1F1F27] bg-[#0F0F12] p-4 shrink-0">
			{/* Logo */}
			<div className="space-y-4">
				<div className="flex items-center gap-3">
					<BiSolidSquareRounded
						className="text-indigo-600"
						size={40}
					/>

					<div>
						<h1 className="font-semibold text-white">PDF RAG</h1>
						<p className="text-sm text-[#71717A]">
							Chat with your documents
						</p>
					</div>
				</div>

				{stage === "processing" ? (
					<Loader />
				) : (
					<UploadScreen onFile={handleFile} />
				)}
			</div>

			{/* Recent Files */}
			<div className="mt-4 flex-1">
				<h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#71717A]">
					Recent Documents
				</h2>

				<div className="space-y-2">
					{documents.map(document => {
						const isActive = document.id === params.id;

						return (
							<Link
								href={`/chat/${document.id}`}
								key={document.id}
								className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors  ${isActive ? "border border-[#1F1F27] bg-[#19191e]" : "hover:bg-[#18181B]"}`}
							>
								<div className="text-[#F87171] border border-[rgba(239,68,68,0.15)] h-10 w-10 rounded-lg text-xs flex items-center justify-center">
									PDF
								</div>

								<p className="truncate text-sm text-slate-200">
									{document.filename}
								</p>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
