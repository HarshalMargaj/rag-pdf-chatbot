import { playSound } from "@/lib/PlaySound";
import React from "react";
import { BiSolidSquareRounded } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface SidebarLogoProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarLogo = ({ isOpen, setIsOpen }: SidebarLogoProps) => {
	return (
		<div className="p-4 pb-0">
			<div
				onClick={() => {
					playSound();
					setIsOpen(!isOpen);
				}}
				className="absolute -right-3.5 top-16 border border-[#1F1F27] rounded-full p-1 bg-[#0F0F12] cursor-pointer z-50"
			>
				{isOpen ? (
					<IoIosArrowBack className="text-[#a1a1a1]" />
				) : (
					<IoIosArrowForward className="text-[#a1a1a1]" />
				)}
			</div>

			<div
				className={` ${isOpen ? "flex items-center gap-3" : "flex items-center justify-center"}`}
			>
				<BiSolidSquareRounded className="text-indigo-600" size={40} />

				{isOpen && (
					<div>
						<h1 className="font-semibold text-white">DocuChat</h1>
						<p className="text-sm text-[#52525B]">
							Chat with your documents
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default SidebarLogo;
