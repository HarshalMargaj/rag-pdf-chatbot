interface SourceCardProps {
	source: {
		content: string;
		pageNumber: number;
		similarity: number;
	};
	highlightText: string;
}

function SourceCard({ source, highlightText }: SourceCardProps) {
	const keywords = (highlightText || "")
		.split(/\s+/)
		.map(w => w.replace(/[^\w]/g, ""))
		.filter(w => w.length > 3);

	const regex = keywords.length
		? new RegExp(`(${keywords.join("|")})`, "gi")
		: null;
	const contentParts = regex ? source.content.split(regex) : [source.content];

	// const hasMatch = keywords.some(kw =>
	// 	source.content.toLowerCase().includes(kw.toLowerCase()),
	// );

	// if (highlightText && !hasMatch) return null; // koi match nahi to card hi mat dikhाओ
	return (
		<div className="rounded-xl border border-slate-800 p-3">
			<div className="mb-2 flex items-center justify-between">
				<span className="rounded-md bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-400">
					Page {source.pageNumber}
				</span>
				<span className="text-[11px] text-slate-600">
					{source.similarity.toFixed(2)} match
				</span>
			</div>
			<p className="m-0 text-sm leading-relaxed text-slate-400 line-clamp-4">
				{contentParts.map((part, i) =>
					keywords.some(
						kw => kw.toLowerCase() === part.toLowerCase(),
					) ? (
						<mark
							key={i}
							className="bg-violet-500/30 text-violet-200 rounded px-0.5"
						>
							{part}
						</mark>
					) : (
						part
					),
				)}
			</p>
		</div>
	);
}

export default SourceCard;
