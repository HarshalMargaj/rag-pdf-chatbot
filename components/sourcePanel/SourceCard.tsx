"use client";

import { useState } from "react";

interface SourceCardProps {
	source: {
		content: string;
		pageNumber: number;
		similarity: number;
	};
	highlightText: string;
}

function SourceCard({ source, highlightText }: SourceCardProps) {
	const [expand, setExpand] = useState(false);
	const keywords = (highlightText || "")
		.split(/\s+/)
		.map(w => w.replace(/[^\w]/g, ""))
		.filter(w => w.length > 3);

	const regex = keywords.length
		? new RegExp(`(${keywords.join("|")})`, "gi")
		: null;
	const contentParts = regex ? source.content.split(regex) : [source.content];

	return (
		<div className="rounded-xl border border-[#1F1F27] p-4">
			<div className="mb-2 flex items-center justify-between">
				<span className="rounded-md bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] px-2 py-0.5 text-[11px] font-medium text-[#A5B4FC]">
					Page {source.pageNumber}
				</span>
				<div className="flex items-center gap-2">
					<div className="h-1 w-9 overflow-hidden rounded-full bg-zinc-800">
						<div
							className="h-full rounded-full bg-indigo-500"
							style={{ width: `${source.similarity * 100}%` }}
						/>
					</div>
					<span className="text-[11px] text-[#52525B]">
						{(source.similarity * 100).toFixed(0)}% Relevance
					</span>
				</div>
			</div>
			<p
				className={`m-0 text-sm leading-relaxed text-[#A1A1AA] ${expand ? "" : "line-clamp-6"}`}
			>
				{contentParts.map((part, i) =>
					keywords.some(
						kw => kw.toLowerCase() === part.toLowerCase(),
					) ? (
						<mark
							key={i}
							className="bg-[rgba(99,102,241,0.15)] text-[#A5B4FC] rounded px-0.5"
						>
							{part}
						</mark>
					) : (
						part
					),
				)}
			</p>
			<button
				onClick={() => setExpand(!expand)}
				className="mt-1 text-[11px] text-[#6366F1] hover:text-[#6366F1]/90 cursor-pointer"
			>
				{expand ? "Show less" : "Show more"}
			</button>
		</div>
	);
}

export default SourceCard;

// const hasMatch = keywords.some(kw =>
// 	source.content.toLowerCase().includes(kw.toLowerCase()),
// );

// if (highlightText && !hasMatch) return null; // koi match nahi to card hi mat dikhाओ
