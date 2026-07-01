import React from "react";

const ChatInput = () => {
	return (
		<div className="border-t border-slate-800 px-5 pb-5 pt-4">
			<div className="flex items-end gap-2.5 rounded-2xl border border-slate-800 bg-slate-900 py-2 pl-4 pr-2 focus-within:border-slate-600 transition-colors">
				<textarea
					rows={1}
					placeholder="Ask anything about this PDF…"
					className="max-h-35 flex-1 resize-none bg-transparent py-1.5 text-sm leading-relaxed text-slate-200 placeholder-slate-600 focus:outline-none"
				/>
				<button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition-opacity hover:opacity-90 disabled:opacity-30 cursor-pointer">
					<i className="ti ti-arrow-up text-sm" aria-hidden="true" />
				</button>
			</div>
			<p className="mt-2 text-center text-[11px] text-slate-600">
				Answers are grounded in your PDF · may be incomplete
			</p>
		</div>
	);
};

export default ChatInput;
