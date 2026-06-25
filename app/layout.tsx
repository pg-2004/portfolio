import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/content";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.title}`,
  description:
    "An interactive museum-style portfolio by Piyush Gupta — software engineer specialising in Big Data & AI. Explore the exhibits: about, experience, projects, skills and contact.",
  authors: [{ name: siteConfig.name }],
  keywords: [
    "Piyush Gupta",
    "Software Engineer",
    "Big Data",
    "Portfolio",
    "React",
    "Next.js",
    "AI",
  ],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description:
      "A calm, immersive museum walkthrough of Piyush Gupta's work in software, data and AI.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
