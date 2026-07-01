import ChatEmptyState from "@/components/chat/ChatEmptyState";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import SourcesPanel from "@/components/SourcesPanel";
import React from "react";

const page = () => {
	return (
		<div className="flex flex-1">
			<div className="flex-1 flex flex-col">
				<ChatHeader />
				<ChatEmptyState />
				<ChatInput />
			</div>
			<SourcesPanel />
		</div>
	);
};

export default page;
