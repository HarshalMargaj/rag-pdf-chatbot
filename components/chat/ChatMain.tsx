"use client";

import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatEmptyState from "./ChatEmptyState";
import ChatInput from "./ChatInput";
import { useChat } from "@ai-sdk/react";
import SourcesPanel from "../SourcesPanel";
import { DefaultChatTransport } from "ai";
import ChatScreen from "./ChatScreen";

interface ChatMainProps {
	fileName: string | undefined;
	documentId: string;
}

const ChatMain = ({ fileName, documentId }: ChatMainProps) => {
	const [userInput, setUserInput] = useState<string>("");
	const { messages, sendMessage, status, stop } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/chat",
			body: {
				documentId: documentId,
			},
		}),
	});

	const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!userInput.trim()) return;
		sendMessage({ text: userInput });
		setUserInput("");
	};

	const latestAssistantMessage = [...messages]
		.reverse()
		.find(m => m.role === "assistant");

	const toolPart = latestAssistantMessage?.parts.find(
		(part): part is any => part.type === "tool-getInformation",
	);

	const sources =
		toolPart?.state === "output-available" ? toolPart?.output : [];

	const textPart = latestAssistantMessage?.parts.find(
		(part): part is any => part.type === "text",
	);
	const answerText = textPart?.state === "done" ? textPart.text : "";

	return (
		<div className="flex flex-1">
			<div className="flex-1 flex flex-col">
				<ChatHeader fileName={fileName} />
				{messages.length > 0 ? (
					<ChatScreen messages={messages} status={status} />
				) : (
					<ChatEmptyState fileName={fileName} />
				)}
				<ChatInput
					value={userInput}
					setUserInput={setUserInput}
					handleSubmit={handleSubmit}
					status={status}
					stop={stop}
				/>
			</div>
			<SourcesPanel sources={sources} answer={answerText} />
		</div>
	);
};

export default ChatMain;
