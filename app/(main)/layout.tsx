import GlobalUploadLoader from "@/components/GlobalUploadLoader";
import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

const mainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex">
			<Sidebar />
			<main className="relative flex-1">
				<GlobalUploadLoader />
				{children}
			</main>
		</div>
	);
};

export default mainLayout;
