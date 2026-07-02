"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { BiSolidSquareRounded } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";

interface ChatHeaderProps {
	fileName: string | undefined;
}

const ChatHeader = ({ fileName }: ChatHeaderProps) => {
	const router = useRouter();

	return (
		<div className="flex items-center justify-between p-4 border-b border-slate-800">
			<div className="flex items-center gap-4 ">
				<BiSolidSquareRounded size={32} className="text-orange-950" />
				<div>
					<div className="text-slate-100">{fileName}</div>
					<div className="text-slate-500 text-sm flex items-center gap-2">
						<GoDotFill className="text-green-500" />
						Indexed and ready
					</div>
				</div>
			</div>
			<button
				onClick={() => router.push("/")}
				className="border border-slate-800 p-2 px-4 rounded-md text-slate-500 text-sm cursor-pointer"
			>
				New pdf
			</button>
		</div>
	);
};

export default ChatHeader;
