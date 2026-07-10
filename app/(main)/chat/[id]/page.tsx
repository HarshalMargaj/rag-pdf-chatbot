import { db } from "@/lib/db";
import ChatMain from "@/components/chat/ChatMain";
import { getMessages } from "@/actions/getMessages";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface PageProps {
	params: {
		id: string;
	};
}

const page = async ({ params }: PageProps) => {
	const { userId } = await auth.protect();
	const resolvedParams = await params;

	const document = await db.document.findUnique({
		where: {
			id: resolvedParams.id,
		},
	});

	if (!document || document.userId !== userId) {
		redirect("/");
	}

	const savedMessages = await getMessages(resolvedParams.id);

	return (
		<div className="h-screen flex">
			<ChatMain
				fileName={document?.filename}
				documentId={resolvedParams.id}
				savedMessages={savedMessages}
			/>
		</div>
	);
};

export default page;
