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
  metadataBase: new URL("https://pieper-bau.de"),
  title: "Pieper Bauunternehmen | Lathen • Wir bauen für die Zukunft",
  description:
    "Pieper Bauunternehmen steht für verlässliches Handwerk, moderne Ingenieurkunst und meisterhafte Ausführung im Hoch-, Gewerbe- und Industriebau im Emsland und Nordwesten.",
  keywords: [
    "Pieper Bauunternehmen",
    "Bauunternehmen Lathen",
    "Hochbau Emsland",
    "Gewerbebau",
    "Industriebau",
    "Schlüsselfertiges Bauen",
  ],
  authors: [{ name: "Pieper Bauunternehmen" }],
  openGraph: {
    title: "Pieper Bauunternehmen | Wir bauen für die Zukunft",
    description:
      "Erleben Sie die Entstehung zukunftsweisender Bauwerke von Pieper Bauunternehmen aus Lathen.",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "/assets/hero-frames/frame-0120.webp",
        width: 1920,
        height: 1080,
        alt: "Pieper Bauunternehmen - Vollendetes Bauwerk",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {/* Instantaneous frame 0 preload for 0ms perceived loading delay */}
        <link
          rel="preload"
          as="image"
          href="/assets/hero-frames/frame-0001.webp"
          type="image/webp"
        />
        <link rel="preload" as="image" href="/assets/logo-white.png" type="image/png" />
      </head>
      <body className="min-h-full bg-[#0b0d12] text-white flex flex-col">{children}</body>
    </html>
  );
}
