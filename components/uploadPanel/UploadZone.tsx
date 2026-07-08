"use client";

import React, { useEffect, useRef, useState } from "react";
import { BiSolidSquareRounded } from "react-icons/bi";
import { IoCloudUploadOutline } from "react-icons/io5";

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
		<div className="flex h-screen w-screen flex-col items-center justify-center bg-[#09090B] px-6">
			{/* Logo */}
			<div className="mb-8 flex flex-col items-center gap-3">
				<BiSolidSquareRounded className="text-indigo-600" size={64} />

				<div className="text-center">
					<h1 className="text-4xl font-semibold text-slate-100">
						Chat with any PDF
					</h1>
					<p className="mt-1 text-base text-[#52525B]">
						Upload a document and get accurate answers grounded in
						its content.
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
					${
						drag
							? "border-indigo-500 bg-indigo-500/5"
							: "border-zinc-800 hover:border-indigo-500/50 hover:bg-indigo-500/5"
					}
				`}
			>
				<IoCloudUploadOutline className="text-slate-300" size={74} />

				<div>
					<p className="text-base font-medium text-zinc-200">
						{drag ? "Drop it here!" : "Drop your PDF here"}
					</p>
					<p className="mt-1 text-sm text-[#52525B]">
						or Click anywhere to browse your files
					</p>
				</div>
				<input
					ref={inputRef}
					type="file"
					accept="application/pdf"
					className="hidden"
					onChange={handleChange}
				/>
			</label>

			<p className="mt-6 text-sm text-[#52525B]">
				Your document is securely processed to answer your questions.
			</p>

			<Documents documents={documents} />
		</div>
	);
}

export default UploadScreen;
