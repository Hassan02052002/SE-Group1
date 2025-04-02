"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect if not logged in
    } else {
      axios
        .get("http://127.0.0.1:8000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token"); // Clear invalid token
          router.push("/login");
        });
    }
  }, []);

  // Typewriter animation settings
  const text = `Hello, ${user ? user.name.split(" ")[0] : "Guest"} `;
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.08 }, // Adjust delay for typing effect
    }),
  };

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">
          {text.split("").map((char, i) => (
            <motion.span key={i} variants={textVariants} initial="hidden" animate="visible" custom={i}>
              {char}
            </motion.span>
          ))}
        </h1>

        <button
          onClick={() => router.push("/itinerary")}
          className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded transition duration-300"
        >
          Generate New Itinerary
        </button>
        

      </div>
    </div>
  );
}
