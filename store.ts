import { create } from "zustand";

type Stage = "processing" | "upload";

interface UploadState {
	stage: Stage;
	setStage: (stage: Stage) => void;
}

export const useUploadStore = create<UploadState>(set => ({
	stage: "upload",
	setStage: stage => set({ stage }),
}));
