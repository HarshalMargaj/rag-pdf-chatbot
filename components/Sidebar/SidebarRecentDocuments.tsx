"use client";

import { Document } from "@/app/generated/prisma/client";
import { useParams } from "next/navigation";
import Link from "next/link";

interface SidebarRecentDocumentsProps {
	documents: Document[];
	isSignedIn: boolean | undefined;
}

const SidebarRecentDocuments = ({
	documents,
	isSignedIn,
}: SidebarRecentDocumentsProps) => {
	const params = useParams();
	return (
		<div className="flex-1 min-h-0 overflow-hidden flex flex-col">
			<h2 className="px-4 mb-4 text-xs font-semibold uppercase tracking-wider text-[#71717A]">
				Recent Documents
			</h2>

			{!isSignedIn ? (
				<p className="text-sm text-[#52525B] text-center py-4">
					Log in to see your recent documents
				</p>
			) : documents.length === 0 ? (
				<div className="text-center px-4 py-4">
					<p className="text-sm text-[#a1a1a1]">No documents yet</p>
					<p className="text-xs text-[#52525B] mt-1">
						Upload your first PDF to get started
					</p>
				</div>
			) : (
				<div className="px-4 space-y-2 overflow-y-scroll min-h-0 scroll-m-1 custom-scrollbar scroll-smooth">
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
	);
};

export default SidebarRecentDocuments;
