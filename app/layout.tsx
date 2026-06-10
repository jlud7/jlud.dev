import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "James Luddy — JLUD.dev",
  description:
    "Games, tools & curiosities for the web. Portfolio of James Luddy: multiplayer card games, color science, chess scorekeeping, LED matrices, and more.",
  openGraph: {
    title: "James Luddy — JLUD.dev",
    description: "Games, tools & curiosities for the web.",
    url: "https://jlud.dev",
    siteName: "JLUD.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "James Luddy — JLUD.dev",
    description: "Games, tools & curiosities for the web.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
