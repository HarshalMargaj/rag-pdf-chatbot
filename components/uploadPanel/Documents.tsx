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
			<h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-600">
				Recent files
			</h3>
			<div className="grid grid-cols-3 gap-2">
				{documents.map(document => (
					<Link
						key={document.id}
						href={`/chat/${document.id}`}
						className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 transition-colors hover:border-violet-500/50 hover:bg-violet-500/5"
					>
						<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 transition-colors group-hover:bg-violet-500/20">
							<FiFileText size={16} />
						</div>

						<div className="flex-1 min-w-0">
							<div className="truncate text-sm font-medium text-slate-200">
								{document.filename}
							</div>
							<div className="text-xs text-slate-600">
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
		</div>
	);
};

export default Documents;
