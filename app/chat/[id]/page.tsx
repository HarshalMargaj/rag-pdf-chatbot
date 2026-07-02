import ChatEmptyState from "@/components/chat/ChatEmptyState";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import SourcesPanel from "@/components/SourcesPanel";
import { db } from "@/lib/db";
import React from "react";

interface PageProps {
	params: {
		id: string;
	};
}

const page = async ({ params }: PageProps) => {
	const resolvedParams = await params;
	console.log(resolvedParams);

	const document = await db.document.findUnique({
		where: {
			id: resolvedParams.id,
		},
	});

	return (
		<div className="flex flex-1">
			<div className="flex-1 flex flex-col">
				<ChatHeader fileName={document?.filename} />
				<ChatEmptyState fileName={document?.filename} />
				<ChatInput />
			</div>
			<SourcesPanel />
		</div>
	);
};

export default page;
