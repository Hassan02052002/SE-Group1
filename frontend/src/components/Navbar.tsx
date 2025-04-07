"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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
    if (allowedPages.length > 0 && !allowedPages.includes(pathname)) return null;

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className={`fixed top-4 left-0 right-0 mx-auto w-[90%] md:w-[80%] lg:w-[60%] p-3 rounded-2xl backdrop-blur-md z-50 
                    ${scrolled 
                        ? "bg-gray-900/90 shadow-lg" 
                        : "bg-gray-800/60"
                    } transition-all duration-300`}
            >
                <div className="flex items-center justify-between">
                    {/* Logo and Name */}
                    <div className="flex items-center gap-3">
                        <Image
                            src="/nomad-logo.svg"
                            alt="Nomad logo"
                            width={50}
                            height={50}
                            priority
                            className="p-2"
                        />
                        <span className="font-heading font-bold text-xl text-white">
                            Nomad
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link 
                            href="/dashboard" 
                            className={`relative px-3 py-2 ${
                                pathname === "/dashboard" 
                                    ? "text-emerald-400 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-400 after:rounded-full" 
                                    : "text-white hover:text-emerald-300"
                            } transition-colors`}
                        >
                            Dashboard
                        </Link>
                        <Link 
                            href="/itinerary" 
                            className={`relative px-3 py-2 ${
                                pathname === "/itinerary" 
                                    ? "text-emerald-400 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-400 after:rounded-full" 
                                    : "text-white hover:text-emerald-300"
                            } transition-colors`}
                        >
                            Itinerary
                        </Link>
                        <Link 
                            href="/about" 
                            className={`relative px-3 py-2 ${
                                pathname === "/about" 
                                    ? "text-emerald-400 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-400 after:rounded-full" 
                                    : "text-white hover:text-emerald-300"
                            } transition-colors`}
                        >
                            About
                        </Link>
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                router.push("/login");
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl text-white transition-colors"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
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
                        <X size={24} />
                    </button>
                    
                    <div className="mb-10 flex flex-col items-center">
                        <Image
                            src="/nomad-logo.svg"
                            alt="Nomad logo"
                            width={70}
                            height={70}
                            priority
                        />
                        <span className="font-heading font-bold text-2xl text-white mt-4">
                            Nomad
                        </span>
                    </div>
                    
                    <Link
                        href="/dashboard"
                        className={`text-xl py-4 px-8 mb-2 rounded-xl ${
                            pathname === "/dashboard" 
                                ? "text-emerald-400 font-medium bg-emerald-900/20 border border-emerald-900/30" 
                                : "text-white"
                        }`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/itinerary"
                        className={`text-xl py-4 px-8 mb-2 rounded-xl ${
                            pathname === "/itinerary" 
                                ? "text-emerald-400 font-medium bg-emerald-900/20 border border-emerald-900/30" 
                                : "text-white"
                        }`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Itinerary
                    </Link>
                    <Link
                        href="/about"
                        className={`text-xl py-4 px-8 mb-2 rounded-xl ${
                            pathname === "/about" 
                                ? "text-emerald-400 font-medium bg-emerald-900/20 border border-emerald-900/30" 
                                : "text-white"
                        }`}
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
                        className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 mt-6 rounded-xl text-white transition-colors"
                    >
                        Logout
                    </button>
                </motion.div>
            )}
        </>
    );
}