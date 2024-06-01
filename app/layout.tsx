import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";

import NavBar from "@/components/navbar";

export const metadata: Metadata = {
	title: "Ai-Thingy",
	description: "A simple chat bot powered by google's generative AI",
	generator: "Next.js",
	applicationName: "Ai-Thingy",
	authors: [{ name: "zephex", url: "https://github.com/real-zephex" }],
	creator: "zephex",
	keywords: [
		"chatbot",
		"google generative ai",
	],
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: "google",
		yandex: "yandex",
		yahoo: "yahoo",
		other: {
			me: ["zephex@duck.com"],
		},
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning lang="en">
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				<Providers
					themeProps={{ attribute: "class", defaultTheme: "dark" }}
				>
					<div className="relative flex flex-col h-dvh">
						<NavBar />
						<main className="container mx-auto max-w-7xl pt-2 ">
							{children}
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
