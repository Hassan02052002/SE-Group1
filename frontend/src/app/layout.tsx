// app/layout.tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";  // This import should remain here
import "./globals.css";

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
      <body className="font-sans antialiased bg-gray-950 text-white">
        <Navbar /> {/* This will render Navbar globally */}
        {children}  {/* This will render the page content, including ItinerariesPage */}
      </body>
    </html>
  );
}
