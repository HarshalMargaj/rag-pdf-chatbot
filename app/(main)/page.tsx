"use client";

import { HiOutlineLightningBolt } from "react-icons/hi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { HiOutlineShieldCheck } from "react-icons/hi";

const features = [
	{
		icon: <HiOutlineLightningBolt size={22} />,
		title: "Instant Answers",
		description:
			"Get accurate answers from your PDF in seconds, powered by AI",
	},
	{
		icon: <HiOutlineDocumentText size={22} />,
		title: "Multi-Page Support",
		description:
			"Works with documents of any length — resumes to research papers",
	},
	{
		icon: <HiOutlineShieldCheck size={22} />,
		title: "Private & Secure",
		description:
			"Your documents are yours — securely stored and never shared",
	},
];

export default function Home() {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-4">
			<div className="space-y-4 w-full">
				<div className="text-white text-center text-4xl font-medium">
					Chat with any PDF
				</div>
				<div className="text-[#a1a1a1] text-center">
					Upload a PDF from the sidebar to start asking questions{" "}
					<br /> and exploring your document with AI.
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
				{features.map((feature, i) => (
					<div
						key={i}
						className="border border-[#1F1F27] rounded-xl p-5 bg-[#0F0F12] hover:border-[#2a2a33] transition-colors"
					>
						<div className="text-2xl mb-3 text-white">
							{feature.icon}
						</div>
						<h3 className="text-white font-medium text-sm mb-1">
							{feature.title}
						</h3>
						<p className="text-[#71717A] text-xs leading-relaxed">
							{feature.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
