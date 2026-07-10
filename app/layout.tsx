import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "DocuChat",
	description:
		"Chat with your PDFs using AI. Upload any document and get instant, accurate answers powered by RAG.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${inter.className} h-full antialiased`}>
			<body className="min-h-screen bg-[#09090B]">
				<ClerkProvider
					appearance={{
						theme: dark,
						variables: {
							colorPrimary: "#6366f1",
							colorBackground: "#0F0F12",
						},
					}}
				>
					<main className="flex-1 min-w-0">{children}</main>
				</ClerkProvider>
			</body>
		</html>
	);
}
