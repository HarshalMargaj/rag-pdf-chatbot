"use client";

import { getRecentDocuments } from "@/actions/getRecentDocuments";
import { Document } from "@/app/generated/prisma/client";
import React, { useEffect, useState } from "react";
import { BiSolidSquareRounded } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import UploadScreen from "../uploadPanel/UploadZone";
import axios from "axios";
import Loader from "../Loader";
import { Show, UserButton, useUser } from "@clerk/nextjs";

const Sidebar = () => {
	const [documents, setDocuments] = useState<Document[]>([]);
	const [stage, setStage] = useState<"upload" | "processing">("upload");
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const router = useRouter();
	const params = useParams();
	const { user, isSignedIn } = useUser();

	const handleFile = async (f: File) => {
		setStage("processing");

		const formData = new FormData();
		formData.append("file", f);
		const response = await axios.post("/api/upload", formData);

		router.push(`/chat/${response.data.documentId}`);
		setStage("upload");
	};

	useEffect(() => {
		getRecentDocuments().then(setDocuments);
	}, []);

	return (
		<div
			className={`relative flex h-screen ${isOpen ? "w-80" : "w-20"} transition-[width] duration-200 ease-in-out flex-col border-r border-[#1F1F27] bg-[#0F0F12] shrink-0 select-none`}
		>
			{/* Logo */}
			<div
				onClick={() => setIsOpen(!isOpen)}
				className="absolute -right-3.5 top-16 border border-[#1F1F27] rounded-full p-1 bg-[#0F0F12] cursor-pointer"
			>
				{isOpen ? (
					<IoIosArrowBack className="text-[#a1a1a1]" />
				) : (
					<IoIosArrowForward className="text-[#a1a1a1]" />
				)}
			</div>

			<div className="space-y-4 p-4">
				<div
					className={` ${isOpen ? "flex items-center gap-3" : "flex items-center justify-center"}`}
				>
					<BiSolidSquareRounded
						className="text-indigo-600"
						size={40}
					/>

					{isOpen && (
						<div>
							<h1 className="font-semibold text-white">
								PDF RAG
							</h1>
							<p className="text-sm text-[#71717A]">
								Chat with your documents
							</p>
						</div>
					)}
				</div>

				{stage === "processing" && (
					<div className="fixed inset-0 z-50 flex items-center justify-center">
						<Loader />
					</div>
				)}

				<UploadScreen onFile={handleFile} isOpen={isOpen} />
			</div>

			{/* Recent Files */}
			{isOpen && (
				<div className="flex-1 px-4">
					<h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#71717A]">
						Recent Documents
					</h2>

					{!isSignedIn ? (
						<p className="text-sm text-[#52525B] text-center">
							Log in to see your recent documents
						</p>
					) : (
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
					)}
				</div>
			)}
			<Show when="signed-in">
				<div
					className={`${isOpen ? "flex items-center gap-4" : "flex items-center justify-center"} border-t border-[#1F1F27] p-4 mt-auto`}
				>
					<div>
						<UserButton />
					</div>
					{isOpen && (
						<div>
							<div className="text-white">{user?.fullName}</div>
							<div className="text-[#71717A]">
								{user?.emailAddresses[0].emailAddress}
							</div>
						</div>
					)}
				</div>
			</Show>
			{!isSignedIn && (
				<Link
					href={"/sign-in"}
					className="border border-[#1F1F27] p-2 px-4 rounded-md text-[#A1A1AA] text-sm cursor-pointer bg-transparent transition-colors hover:border-zinc-700 hover:text-zinc-200 text-center m-4"
				>
					Log in
				</Link>
			)}
		</div>
	);
};

export default Sidebar;
