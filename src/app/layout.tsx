import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Space_Mono, Manrope } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://bad-dresser-web.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bad Dresser — Good Education, Bad Dresser",
    template: "%s | Bad Dresser",
  },
  description:
    "A fashion label for the intellectually curious and sartorially rebellious. Explore collections, lookbooks, and the anti-fashion statement.",
  keywords: [
    "Bad Dresser",
    "fashion label",
    "anti-fashion",
    "streetwear",
    "capsule collection",
    "lookbook",
    "good education bad dresser",
  ],
  authors: [{ name: "Bad Dresser" }],
  creator: "Bad Dresser",
  publisher: "Bad Dresser",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Bad Dresser",
    title: "Bad Dresser — Good Education, Bad Dresser",
    description:
      "A fashion label for the intellectually curious and sartorially rebellious.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bad Dresser — Good Education, Bad Dresser",
    description:
      "A fashion label for the intellectually curious and sartorially rebellious.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
