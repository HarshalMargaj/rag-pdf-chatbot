import { Document } from "@/app/generated/prisma/client";
import React from "react";
import { FiFileText } from "react-icons/fi";
import Link from "next/link";

interface DocumentsProps {
	documents: Document[];
}

const Documents = ({ documents }: DocumentsProps) => {
	if (documents.length === 0) return null;

	return (
		<div className="mt-8 w-full">
			<h3 className="mb-3 text-base font-medium uppercase tracking-wide text-[#A1A1AA]">
				Recent files
			</h3>
			{documents.length > 0 ? (
				<div className="grid grid-cols-3 gap-2">
					{documents.map(document => (
						<Link
							key={document.id}
							href={`/chat/${document.id}`}
							className="group flex items-center gap-3 rounded-xl border border-[#1F1F27] bg-[#0F0F12] px-4 py-3 transition-colors hover:border-indigo-500/50 hover:bg-indigo-500/5"
						>
							<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600 transition-colors group-hover:bg-indigo-500/20">
								<FiFileText size={16} />
							</div>

							<div className="flex-1 min-w-0">
								<div className="truncate text-sm font-medium text-slate-200">
									{document.filename}
								</div>
								<div className="text-xs text-[#52525B]">
									{new Date(
										document.createdAt,
									).toLocaleDateString(undefined, {
										day: "numeric",
										month: "short",
										year: "numeric",
									})}
								</div>
							</div>
						</Link>
					))}
				</div>
			) : (
				<div className="text-[#52525B] border border-[#1F1F27] bg-[#0F0F12] h-30 rounded-xl flex items-center justify-center">
					<div className="text-center">
						<div className="text-zinc-200">No documents yet.</div>
						<div className="text-sm">
							Upload your first PDF to start chatting.
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Documents;
