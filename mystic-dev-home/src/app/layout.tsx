/**
 * layout.tsx - Layout file.
 */
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mystic Dev: Math, Code and, Logic!",
    template: "%s | Mystic Dev",
  },
  description: "A mystical webplace made for extraordinary peoples who like — Math, Code and most importantly, Logic!",
  keywords: ["Math", "Code", "Logic", "Philosophy", "Game Development", "Game Dev", "System Programming", "C", "C++"],
  author: [{ name: "TheDevMystic (Surya)" }],
  creator: "TheDevMystic (Surya)",
  // Manifest
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#2c6975",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
}
