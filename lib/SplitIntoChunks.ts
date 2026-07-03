export const splitIntoChunks = (
	text: string,
	chunkSize = 1000,
	overlap = 200,
) => {
	const cleaned = text.replace(/\s+/g, " ").trim();
	const chunks = [];
	let start = 0;
	while (start < cleaned.length) {
		const end = start + chunkSize;
		chunks.push(cleaned.slice(start, end));
		start = end - overlap;
	}

	return chunks.filter(c => c.trim().length > 0);
};
