"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useUploadStore } from "@/store";

import { getRecentDocuments } from "@/actions/getRecentDocuments";
import { Document } from "@/app/generated/prisma/client";

import UploadScreen from "./SidebarUploadZone";
import axios from "axios";
import SidebarRecentDocuments from "./SidebarRecentDocuments";
import SidebarUserFooter from "./SidebarUserFooter";
import SidebarLogo from "./SidebarLogo";

const Sidebar = () => {
	const [documents, setDocuments] = useState<Document[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const router = useRouter();
	const { user, isSignedIn } = useUser();
	const setStage = useUploadStore(state => state.setStage);

	useEffect(() => {
		async function fetchDocuments() {
			if (isSignedIn) {
				const docs = await getRecentDocuments();
				setDocuments(docs);
			} else {
				setDocuments([]);
			}
		}

		fetchDocuments();
	}, [isSignedIn]);

	const handleFile = async (f: File) => {
		setStage("processing");

		const formData = new FormData();
		formData.append("file", f);
		const response = await axios.post("/api/upload", formData);

		router.push(`/chat/${response.data.documentId}`);
		setStage("upload");
		getRecentDocuments().then(setDocuments);
	};

	return (
		<div
			className={`relative flex h-screen ${isOpen ? "w-80" : "w-20"} transition-[width] duration-200 ease-in-out flex-col border-r border-[#1F1F27] bg-[#0F0F12] shrink-0 select-none`}
		>
			<SidebarLogo isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className="p-4">
				<UploadScreen onFile={handleFile} isOpen={isOpen} />
			</div>

			{isOpen && (
				<SidebarRecentDocuments
					documents={documents}
					isSignedIn={isSignedIn}
				/>
			)}
			<SidebarUserFooter
				isOpen={isOpen}
				isSignedIn={isSignedIn}
				user={user}
			/>
		</div>
	);
};

export default Sidebar;
