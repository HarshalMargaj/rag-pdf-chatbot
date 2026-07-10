"use client";

import React from "react";
import { GoDotFill } from "react-icons/go";

interface ChatHeaderProps {
	fileName: string | undefined;
}

const ChatHeader = ({ fileName }: ChatHeaderProps) => {
	return (
		<div className="flex items-center justify-between p-4 border-b border-[#1F1F27] bg-[#0F0F12]">
			<div className="flex items-center gap-4 ">
				<div className="text-[#F87171] border border-[rgba(239,68,68,0.15)] h-10 w-10 rounded-lg text-xs flex items-center justify-center">
					PDF
				</div>
				<div>
					<div className="text-slate-100">{fileName}</div>
					<div className="text-[#52525B] text-sm flex items-center gap-2">
						<GoDotFill className="text-green-500" />
						Indexed and ready
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatHeader;
