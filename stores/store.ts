import { create } from "zustand";

interface pdfStore {
	filename: string;
	setFilename: (filename: string | undefined) => void;
}

export const usePDFStore = create<pdfStore>(set => ({
	filename: "",
	setFilename: name => set({ filename: name }),
}));
