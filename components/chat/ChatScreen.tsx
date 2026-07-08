"use client";

import { ChatStatus, UIMessage } from "ai";
import React, { useEffect, useRef } from "react";

interface ChatScreenProps {
	messages: UIMessage[];
	status: ChatStatus;
}

const ChatScreen = ({ messages, status }: ChatScreenProps) => {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, status]);

	return (
		<div className=" flex flex-col flex-1 p-4 overflow-y-auto min-h-0 scroll-m-1 custom-scrollbar gap-4 scroll-smooth">
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
						className={`flex gap-2 ${message.role === "assistant" ? "self-start " : "flex-row-reverse items-center"}`}
					>
						<div
							className={` ${message.role === "user" ? "text-[#A1A1AA] bg-[rgba(99,102,241,0.12)]" : "self-start text-[#A5B4FC] bg-[rgba(99,102,241,0.08)]"} border-slate-800 border w-10 h-10 flex items-center justify-center rounded-full text-sm`}
						>
							{message.role === "user" ? "Y" : "AI"}
						</div>
						{(hasText || isLoading) && (
							<div
								className={`${message.role === "assistant" ? "border border-[#1F1F27] bg-[#0F0F12] " : "self-end bg-[#141427]  border border-[rgba(99,102,241,0.18)]"} max-w-2xl rounded-xl p-4 leading-relaxed text-[#F4F4F5]`}
							>
								{isLoading ? (
									<div className="flex items-center gap-2 py-2">
										<div className="w-2 h-2 bg-[#6366F1] rounded-full animate-bounce [animation-delay:-0.3s]" />
										<div className="w-2 h-2 bg-[#6366F1] rounded-full animate-bounce [animation-delay:-0.15s]" />
										<div className="w-2 h-2 bg-[#6366F1] rounded-full animate-bounce" />
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
							<div className="w-2 h-2 bg-[#6366F1] rounded-full animate-bounce [animation-delay:-0.3s]" />
							<div className="w-2 h-2 bg-[#6366F1] rounded-full animate-bounce [animation-delay:-0.15s]" />
							<div className="w-2 h-2 bg-[#6366F1] rounded-full animate-bounce" />
						</div>
					</div>
				</div>
			)}

			<div ref={bottomRef} />
		</div>
	);
};

export default ChatScreen;
