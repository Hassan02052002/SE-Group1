"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const hiddenPages = ["/login", "/signup", "/admin"];
  
    const allowedPages = ["/dashboard", "/itinerary", "/about", "/profile"];

    if (hiddenPages.includes(pathname)) return null;

  // If `allowedPages` is used, only show navbar on these pages
    if (allowedPages.length > 0 && !allowedPages.includes(pathname)) return null;

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className={`fixed top-4 left-0 right-0 mx-auto w-[90%] md:w-[80%] lg:w-[60%] p-3 rounded-2xl backdrop-blur-md shadow-md z-50 flex items-center justify-between ${
                    scrolled ? "bg-gray-900/90 shadow-lg" : "bg-gray-800/60"
                }`}
            >
                {/* Logo */}
                <Image
                    className="dark:invert scale-190 p-2"
                    src="/nomad-logo.svg"
                    alt="Nomad logo"
                    width={50}
                    height={50}
                    priority
                />

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center">
                    <Link href="/dashboard" className="text-white hover:text-gray-400">
                        Dashboard
                    </Link>
                    <Link href="/itinerary" className="text-white hover:text-gray-400">
                        Itinerary
                    </Link>
                    <Link href="/about" className="text-white hover:text-gray-400">
                        About
                    </Link>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            router.push("/login");
                        }}
                        className="bg-blue-600 px-4 py-2 rounded-xl text-white hover:bg-blue-700 transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </motion.nav>

            {/* Mobile Menu - Fixed Full Width */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 right-0 w-full h-screen bg-gray-900/90 backdrop-blur-md p-6 flex flex-col items-center justify-center z-40"
                >
                    <button
                        className="absolute top-6 right-6 text-white text-2xl"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FaTimes />
                    </button>
                    <Link
                        href="/dashboard"
                        className="text-white text-xl py-4"
                        onClick={() => setMenuOpen(false)}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/itinerary"
                        className="text-white text-xl py-4"
                        onClick={() => setMenuOpen(false)}
                    >
                        Itinerary
                    </Link>
                    <Link
                        href="/about"
                        className="text-white text-xl py-4"
                        onClick={() => setMenuOpen(false)}
                    >
                        About
                    </Link>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            router.push("/login");
                            setMenuOpen(false);
                        }}
                        className="bg-blue-600 px-6 py-3 mt-6 rounded-xl text-white hover:bg-blue-700 transition"
                    >
                        Logout
                    </button>
                </motion.div>
            )}
        </>
    );
}
