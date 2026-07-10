"use client";

import { BiSolidSquareRounded } from "react-icons/bi";

interface ChatEmptyStateProps {
	fileName: string | undefined;
	setUserInput: React.Dispatch<React.SetStateAction<string>>;
}

const suggestedQuestions = [
	"Summarize this document in simple terms",
	"What are the main topics covered?",
	"What are the most important points?",
	"List all key terms and their definitions",
];

const ChatEmptyState = ({ fileName, setUserInput }: ChatEmptyStateProps) => {
	return (
		<div className="flex flex-1 flex-col items-center justify-center px-10 text-center gap-1">
			<BiSolidSquareRounded className="text-indigo-600" size={64} />
			<h2 className="mb-1 text-xl font-medium text-slate-200">
				Ready to chat!
			</h2>
			<p className="max-w-xs text-base text-[#a1a1a1] truncate">
				{fileName}
			</p>
			<p className="mt-1 max-w-xs text-xs text-[#52525B]">
				Ask anything about this document
			</p>

			<div className="mt-6 flex flex-wrap justify-center gap-2">
				{suggestedQuestions.map((s, index) => (
					<button
						key={index}
						onClick={() => setUserInput(s)}
						className="rounded-lg border border-[#1F1F27] bg-[#0F0F12] p-3 text-xs text-white hover:border-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
					>
						{s}
					</button>
				))}
			</div>
		</div>
	);
};

export default ChatEmptyState;
