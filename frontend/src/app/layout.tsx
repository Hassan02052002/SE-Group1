import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";

import "./globals.css";

// Primary font for body text - DM Sans is modern, clean and highly legible
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
        className={`${dmSans.variable} ${spaceGrotesk.variable} font-sans antialiased bg-gray-950 text-white`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
