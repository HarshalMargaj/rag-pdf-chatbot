import { GoDotFill } from "react-icons/go";
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
		<aside className="flex w-95 shrink-0 flex-col border-l border-[#1F1F27] bg-[#0F0F12]">
			<div className="border-b border-[#1F1F27] p-4 flex gap-2">
				<GoDotFill className="text-[#6366F1] mt-1" />
				<div>
					<h3 className="text-base font-medium text-slate-200">
						Retrieved chunks
					</h3>
					<p className="text-sm text-[#52525B]">
						Passages used for the last answer
					</p>
				</div>
			</div>
			{sources.length === 0 ? (
				<div className="flex flex-1 items-center justify-center px-5 text-center text-xs text-slate-600 ">
					Ask a question to see which passages were retrieved.
				</div>
			) : (
				<div className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-3 scroll-m-1 custom-scrollbar scroll-smooth">
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
