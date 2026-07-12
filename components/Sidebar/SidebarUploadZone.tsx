"use client";

import React, { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface UploadScreenProps {
	onFile: (file: File) => void;
	isOpen: boolean;
}

const is_production = process.env.NODE_ENV === "production";

function UploadScreen({ onFile, isOpen }: UploadScreenProps) {
	const [drag, setDrag] = useState(false);
	const { isSignedIn } = useAuth();
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	if (is_production) {
		return (
			<div className="flex flex-col items-center justify-center">
				<div
					className={`flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed opacity-50 cursor-not-allowed ${
						isOpen
							? "px-8 py-4 w-full"
							: "w-8 h-8 rounded-full items-center justify-center"
					} text-center border-zinc-800`}
				>
					<IoCloudUploadOutline
						className="text-slate-300"
						size={isOpen ? 64 : 16}
					/>
					{isOpen && (
						<div>
							<p className="text-base font-medium text-zinc-200">
								Uploads disabled in demo
							</p>
							<p className="mt-1 text-xs text-[#52525B]">
								Clone the repo and run locally to try it
								yourself
							</p>
						</div>
					)}
				</div>
			</div>
		);
	}

	function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
		e.preventDefault();
		setDrag(false);
		if (!isSignedIn) {
			router.push("/sign-in");
			return;
		}
		const file = e.dataTransfer.files?.[0];
		if (file && file.type === "application/pdf") onFile(file);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!isSignedIn) {
			router.push("/sign-in");
			return;
		}
		const file = e.target.files?.[0];
		if (file) onFile(file);
	}

	function handleLabelClick(e: React.MouseEvent<HTMLLabelElement>) {
		if (!isSignedIn) {
			e.preventDefault();
			router.push("/sign-in");
		}
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<label
				onClick={handleLabelClick}
				onDragOver={e => {
					e.preventDefault();
					setDrag(true);
				}}
				onDragLeave={() => setDrag(false)}
				onDrop={handleDrop}
				className={`flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed ${isOpen ? "px-8 py-4 w-full" : "w-8 h-8 rounded-full items-center justify-center"} text-center transition-colors
					${
						drag
							? "border-indigo-500 bg-indigo-500/5"
							: "border-[#1F1F27] hover:border-indigo-500/50 hover:bg-indigo-500/5"
					}
				`}
			>
				{isOpen ? (
					<IoCloudUploadOutline
						className="text-slate-300"
						size={64}
					/>
				) : (
					<FiPlus className="text-slate-300" />
				)}

				{isOpen && (
					<div>
						<p className="text-base font-medium text-zinc-200">
							{drag ? "Drop it here!" : "Drop your PDF here"}
						</p>
						<p className="mt-1 text-sm text-[#52525B]">
							or Click anywhere to browse your files
						</p>
					</div>
				)}
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
