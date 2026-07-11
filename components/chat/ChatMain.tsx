"use client";

import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatEmptyState from "./ChatEmptyState";
import ChatInput from "./ChatInput";
import { useChat } from "@ai-sdk/react";
import SourcesPanel from "../sourcePanel/SourcesPanel";
import { DefaultChatTransport, UIMessage } from "ai";
import ChatScreen from "./ChatScreen";
import { saveMessage } from "@/actions/saveMessage";

interface ChatMainProps {
	fileName: string | undefined;
	documentId: string;
	savedMessages: UIMessage[];
}

interface SourceChunk {
	content: string;
	pageNumber: number;
	similarity: number;
}

interface ToolOutputAvailablePart {
	type: "tool-getInformation" | "tool-result";
	state: "output-available";
	toolCallId: string;
	input: Record<string, unknown>;
	output: SourceChunk[];
}

const ChatMain = ({ fileName, documentId, savedMessages }: ChatMainProps) => {
	const [userInput, setUserInput] = useState<string>("");

	const { messages, sendMessage, status, stop } = useChat({
		messages: savedMessages,
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

		// save user message in db
		saveMessage({
			documentId,
			role: "user",
			parts: [{ type: "text", text: userInput }],
		}).catch(error => console.log("Failed to save message: ", error));
	};

	const latestAssistantMessage = [...messages]
		.reverse()
		.find(m => m.role === "assistant");

	const toolPart = latestAssistantMessage?.parts.find(
		(part): part is ToolOutputAvailablePart =>
			part.type === "tool-getInformation" || // live streaming
			part.type === "tool-result", // from DB
	);

	console.log("toolpart", toolPart);

	const sources =
		toolPart?.state === "output-available" ? toolPart.output : [];

	const textPart = latestAssistantMessage?.parts.find(
		(part): part is Extract<UIMessage["parts"][number], { type: "text" }> =>
			part.type === "text",
	);

	const answerText = textPart?.text || "";

	return (
		<div className="flex flex-1">
			<div className="flex-1 flex flex-col">
				<ChatHeader fileName={fileName} />
				{messages.length > 0 ? (
					<ChatScreen messages={messages} status={status} />
				) : (
					<ChatEmptyState
						fileName={fileName}
						setUserInput={setUserInput}
					/>
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
