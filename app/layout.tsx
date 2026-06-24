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
  metadataBase: new URL("https://jlud.dev"),
  title: "James Luddy · JLUD.dev",
  description:
    "Games, tools & curiosities for the web. Portfolio of James Luddy: multiplayer card games, color science, chess scorekeeping, LED matrices, and more.",
  applicationName: "JLUD.dev",
  creator: "James Luddy",
  publisher: "JLUD Designs, LLC",
  openGraph: {
    title: "James Luddy · JLUD.dev",
    description: "Games, tools & curiosities for the web.",
    url: "https://jlud.dev",
    siteName: "JLUD.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "James Luddy · JLUD.dev",
    description: "Games, tools & curiosities for the web.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JLUD Designs, LLC",
    legalName: "JLUD Designs, LLC",
    url: "https://jlud.dev",
    email: "hello@jlud.dev",
    sameAs: ["https://github.com/jlud7"],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
