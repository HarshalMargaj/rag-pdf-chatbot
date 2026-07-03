import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const heyroute = createOpenAICompatible({
	name: "heyroute",
	baseURL: `${process.env.HEYROUTE_BASE_URL}`,
	apiKey: process.env.HEYROUTE_API_KEY,
});

export const chatModel = heyroute.chatModel("gpt-5.5");
