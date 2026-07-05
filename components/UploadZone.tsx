"use client";

import React, { useEffect, useRef, useState } from "react";
import { BiSolidSquareRounded } from "react-icons/bi";
import Documents from "./Documents";
import { getRecentDocuments } from "@/actions/getRecentDocuments";
import { Document } from "@/app/generated/prisma/client";

interface UploadScreenProps {
	onFile: (file: File) => void;
}

function UploadScreen({ onFile }: UploadScreenProps) {
	const [documents, setDocuments] = useState<Document[]>([]);
	const [drag, setDrag] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
		e.preventDefault();
		setDrag(false);
		const file = e.dataTransfer.files?.[0];
		if (file && file.type === "application/pdf") onFile(file);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) onFile(file);
	}

	useEffect(() => {
		getRecentDocuments().then(setDocuments);
	}, []);

	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-950 px-6">
			{/* Logo */}
			<div className="mb-8 flex flex-col items-center gap-3">
				<BiSolidSquareRounded className="text-violet-900" size={64} />

				<div className="text-center">
					<h1 className="text-2xl font-semibold text-slate-100">
						PDF RAG
					</h1>
					<p className="mt-1 text-sm text-slate-500">
						Upload a PDF and start chatting with it
					</p>
				</div>
			</div>

			{/* Dropzone */}
			<label
				onDragOver={e => {
					e.preventDefault();
					setDrag(true);
				}}
				onDragLeave={() => setDrag(false)}
				onDrop={handleDrop}
				className={`flex w-full max-w-md cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-8 py-14 text-center transition-colors
          ${drag ? "border-violet-500 bg-violet-500/5" : "border-slate-700 hover:border-violet-500 hover:bg-violet-500/5"}
        `}
			>
				<BiSolidSquareRounded className="text-slate-500 " size={64} />

				<div>
					<p className="text-base font-medium text-slate-200">
						{drag ? "Drop it here!" : "Drop your PDF here"}
					</p>
					<p className="mt-1 text-sm text-slate-500">
						or click to browse · max 50MB
					</p>
				</div>
				<span className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-500 transition-colors">
					Choose PDF
				</span>
				<input
					ref={inputRef}
					type="file"
					accept="application/pdf"
					className="hidden"
					onChange={handleChange}
				/>
			</label>

			<p className="mt-6 text-xs text-slate-600">
				Your PDF is processed locally and never stored on our servers.
			</p>

			<Documents documents={documents} />
		</div>
	);
}

export default UploadScreen;
