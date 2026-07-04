import { ChatStatus, UIMessage } from "ai";
import React from "react";

interface ChatScreenProps {
	messages: UIMessage[];
	status: ChatStatus;
}

const ChatScreen = ({ messages, status }: ChatScreenProps) => {
	return (
		<div className=" flex flex-col flex-1 p-4 overflow-y-auto min-h-0 scroll-m-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-500 gap-2">
			{messages.map((message, index) => {
				const isLastMessage = index === messages.length - 1;
				const textParts = message.parts.filter(
					part => part.type === "text",
				);
				const hasText = textParts.length > 0;
				const isLoading =
					message.role === "assistant" &&
					isLastMessage &&
					!hasText &&
					(status === "submitted" || status === "streaming");

				return (
					<div
						key={message.id}
						className={`flex flex-col gap-2 ${message.role === "assistant" ? "self-start " : "self-end "}`}
					>
						<div
							className={` ${message.role === "user" ? "self-end text-slate-400" : "self-start text-violet-300"}`}
						>
							{message.role === "user" ? "You" : "Assistant"}
						</div>
						{(hasText || isLoading) && (
							<div
								className={`${message.role === "assistant" ? "border border-slate-800 bg-slate-900 text-slate-200" : "self-end bg-violet-900 text-violet-100"} max-w-2xl rounded-lg p-2 px-4 leading-relaxed`}
							>
								{isLoading ? (
									<div className="flex items-center gap-2 py-2">
										<div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
										<div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
										<div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" />
									</div>
								) : (
									textParts.map((part, i) => (
										<p key={i}>{part.text}</p>
									))
								)}
							</div>
						)}
					</div>
				);
			})}

			{status === "submitted" && (
				<div className="flex flex-col gap-2 self-start">
					<div className="text-violet-300">Assistant</div>
					<div className="border border-slate-800 bg-slate-900 text-slate-200 max-w-2xl rounded-lg p-2 px-4 leading-relaxed">
						<div className="flex items-center gap-2 py-2">
							<div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
							<div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
							<div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatScreen;
