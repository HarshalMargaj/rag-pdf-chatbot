"use client";

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
		<div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
			<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-900/40 text-orange-400 mb-4">
				<i className="ti ti-file-type-pdf text-xl" aria-hidden="true" />
			</div>
			<h2 className="mb-1 text-base font-medium text-slate-200">
				Ready to chat!
			</h2>
			<p className="max-w-xs text-sm text-slate-500 truncate">
				{fileName}
			</p>
			<p className="mt-1 max-w-xs text-xs text-slate-600">
				Ask anything about this document
			</p>

			<div className="mt-6 flex max-w-md flex-wrap justify-center gap-2">
				{suggestedQuestions.map((s, index) => (
					<button
						key={index}
						onClick={() => setUserInput(s)}
						className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-colors cursor-pointer"
					>
						{s}
					</button>
				))}
			</div>
		</div>
	);
};

export default ChatEmptyState;
