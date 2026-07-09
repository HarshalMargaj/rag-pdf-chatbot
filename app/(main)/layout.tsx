import Sidebar from "@/components/RecentFilesPanel/Sidebar";
import React from "react";

const mainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex">
			<Sidebar />
			<main className="flex-1">{children}</main>
		</div>
	);
};

export default mainLayout;
