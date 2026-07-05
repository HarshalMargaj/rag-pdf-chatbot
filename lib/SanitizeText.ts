export function sanitizeText(text: string): string {
	return text
		.replace(
			/[\uE000-\uF8FF\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}]/gu,
			"",
		) // icon glyphs hataओ
		.replace(/\s*\|\s*/g, ". ") // pipe ko period se replace
		.replace(/\s*•\s*/g, ". ") // bullet ko period se replace
		.replace(/\.\s*\./g, ".") // double periods clean karo
		.replace(/\s+/g, " ") // extra whitespace clean karo
		.trim();
}
