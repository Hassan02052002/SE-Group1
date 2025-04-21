"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, []);

  const hiddenPages = ["/login", "/signup", "/admin"];
  const allowedPages = ["/dashboard", "/itinerary", "/about", "/profile"];

  if (hiddenPages.includes(pathname)) return null;
  if (allowedPages.length > 0 && !allowedPages.includes(pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-4 left-0 right-0 mx-auto w-[90%] md:w-[80%] lg:w-[60%] p-3 rounded-2xl backdrop-blur-md z-50 
          ${scrolled ? "bg-gray-900/90 shadow-lg" : "bg-gray-800/60"} transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/nomad-logo.svg" alt="Nomad logo" width={50} height={50} priority className="p-2" />
            <span className="font-heading font-bold text-xl text-white">Nomad</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {["/dashboard", "/itinerary", "/about"].map((path) => (
              <Link
                key={path}
                href={path}
                className={`relative px-3 py-2 ${
                  pathname === path
                    ? "text-emerald-400 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-400 after:rounded-full"
                    : "text-white hover:text-emerald-300"
                } transition-colors`}
              >
                {path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2 py-1 hover:bg-gray-800">
                    <Image
                      src={user.avatar || "/default-avatar.png"}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                    <span className="text-white text-sm">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44 mt-2">
                  <DropdownMenuItem onClick={() => router.push("/profile")}>View Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
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
          <button className="absolute top-6 right-6 text-white text-2xl" onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>

          <div className="mb-10 flex flex-col items-center">
            <Image src="/nomad-logo.svg" alt="Nomad logo" width={70} height={70} priority />
            <span className="font-heading font-bold text-2xl text-white mt-4">Nomad</span>
          </div>

          {user && (
            <div className="flex flex-col items-center mb-6">
              <Image
                src={user.avatar || "/default-avatar.png"}
                alt="Profile"
                width={64}
                height={64}
                className="rounded-full object-cover mb-2"
              />
              <span className="text-white text-lg">{user.name}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="mt-3">Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 mt-2">
                  <DropdownMenuItem onClick={() => { router.push("/profile"); setMenuOpen(false); }}>
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { handleLogout(); setMenuOpen(false); }}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {["/dashboard", "/itinerary", "/about"].map((path) => (
            <Link
              key={path}
              href={path}
              className={`text-xl py-4 px-8 mb-2 rounded-xl ${
                pathname === path
                  ? "text-emerald-400 font-medium bg-emerald-900/20 border border-emerald-900/30"
                  : "text-white"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}
        </motion.div>
      )}
    </>
  );
}
