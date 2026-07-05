import SourceCard from "./SourceCard";

interface SourcesPanelProps {
	sources: {
		content: string;
		pageNumber: number;
		similarity: number;
	}[];
	answer: string;
}

function SourcesPanel({ sources, answer }: SourcesPanelProps) {
	return (
		<aside className="flex w-85 shrink-0 flex-col border-l border-slate-800 bg-slate-900">
			<div className="border-b border-slate-800 p-4">
				<h3 className="text-base font-medium text-slate-200">
					Retrieved chunks
				</h3>
				<p className="text-sm text-slate-500">
					Passages used for the last answer
				</p>
			</div>
			{sources.length === 0 ? (
				<div className="flex flex-1 items-center justify-center px-5 text-center text-xs text-slate-600 ">
					Ask a question to see which passages were retrieved.
				</div>
			) : (
				<div className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-500">
					{sources.map((s, index) => (
						<SourceCard
							key={index}
							source={s}
							highlightText={answer}
						/>
					))}
				</div>
			)}
		</aside>
	);
}

export default SourcesPanel;
