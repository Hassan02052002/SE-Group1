import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";

import "./globals.css";

// Primary font for body text - Outfit is modern, clean and highly legible
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// Secondary font for headings and accents - Space Grotesk has a modern tech feel
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nomad",
  description: "Your personalised AI travel itinerary",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} font-sans antialiased bg-gray-950 text-white`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
