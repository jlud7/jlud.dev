import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JLUD — Developer",
  description:
    "Personal developer portfolio of JLUD. Building things for the web.",
  openGraph: {
    title: "JLUD — Developer",
    description: "Personal developer portfolio of JLUD.",
    url: "https://jlud.dev",
    siteName: "JLUD.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JLUD — Developer",
    description: "Personal developer portfolio of JLUD.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
