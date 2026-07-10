"use client";

import { useUploadStore } from "@/store";
import Loader from "@/components/Loader";

export default function GlobalUploadLoader() {
	const stage = useUploadStore(state => state.stage);

	if (stage !== "processing") return null;

	return (
		<div className="absolute w-full">
			<Loader />
		</div>
	);
}
