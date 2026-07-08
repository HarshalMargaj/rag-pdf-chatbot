"use client";

import React, { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

interface UploadScreenProps {
	onFile: (file: File) => void;
}

function UploadScreen({ onFile }: UploadScreenProps) {
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

	return (
		<div className="flex flex-col items-center justify-center">
			<label
				onDragOver={e => {
					e.preventDefault();
					setDrag(true);
				}}
				onDragLeave={() => setDrag(false)}
				onDrop={handleDrop}
				className={`flex w-full max-w-md cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-8 py-4 text-center transition-colors
					${
						drag
							? "border-indigo-500 bg-indigo-500/5"
							: "border-zinc-800 hover:border-indigo-500/50 hover:bg-indigo-500/5"
					}
				`}
			>
				<IoCloudUploadOutline className="text-slate-300" size={64} />

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
		</div>
	);
}

export default UploadScreen;
