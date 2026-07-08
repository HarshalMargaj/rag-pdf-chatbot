import React from "react";
import { FaRegCircleStop } from "react-icons/fa6";
import { IoMdArrowUp } from "react-icons/io";

interface ChatInputProps {
	value: string;
	setUserInput: React.Dispatch<React.SetStateAction<string>>;
	handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
	status: string;
	stop: () => void;
}

const ChatInput = ({
	value,
	setUserInput,
	handleSubmit,
	status,
}: ChatInputProps) => {
	const buttonStyle =
		"flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#1F1F27] text-white transition-opacity hover:opacity-90 disabled:opacity-30 cursor-pointer";

	return (
		<div className="border-t border-[#1F1F27] px-4 pb-5 pt-4">
			<form
				onSubmit={handleSubmit}
				className="flex items-end gap-2.5 rounded-2xl border border-[#1F1F27] bg-[#0F0F12] py-2 pl-4 pr-2 focus-within:border-slate-600 transition-colors"
			>
				<textarea
					value={value}
					onChange={e => setUserInput(e.target.value)}
					onKeyDown={e => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleSubmit(
								e as unknown as React.SyntheticEvent<HTMLFormElement>,
							);
						}
					}}
					rows={1}
					placeholder="Ask anything about this PDF…"
					className="max-h-35 flex-1 resize-none bg-transparent py-1.5 text-sm leading-relaxed text-slate-200 placeholder-[#52525B] focus:outline-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-500"
				/>

				{status === "submitted" || status === "streaming" ? (
					<button onClick={() => stop()} className={`${buttonStyle}`}>
						<FaRegCircleStop />
					</button>
				) : (
					<button type="submit" className={`${buttonStyle}`}>
						<IoMdArrowUp />
					</button>
				)}
			</form>
			<p className="mt-2 text-center text-[11px] text-[#52525B]">
				Answers are grounded in your PDF · may be incomplete
			</p>
		</div>
	);
};

export default ChatInput;
