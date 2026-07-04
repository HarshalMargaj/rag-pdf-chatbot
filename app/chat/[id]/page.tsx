import { db } from "@/lib/db";
import ChatMain from "@/components/chat/ChatMain";

interface PageProps {
	params: {
		id: string;
	};
}

const page = async ({ params }: PageProps) => {
	const resolvedParams = await params;

	const document = await db.document.findUnique({
		where: {
			id: resolvedParams.id,
		},
	});

	return (
		<div className="h-screen flex">
			<ChatMain
				fileName={document?.filename}
				documentId={resolvedParams.id}
			/>
		</div>
	);
};

export default page;
