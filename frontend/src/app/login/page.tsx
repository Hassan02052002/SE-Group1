"use client"; // ✅ Required for client-side state handling

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import Image from "next/image";

import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  

  const handleLogin = async () => {
    setError(""); // Reset error before new login attempt
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login", { email, password });

      localStorage.setItem("token", res.data.token); 
      router.push("/dashboard"); 
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <div className="hidden sm:flex sm:w-1/2 bg-cover bg-gray-900 bg-center items-center justify-center" style={{ backgroundImage: "/nomad.svg" }}>
      {/* Image section */}
      <Image
        className="dark:invert scale-190 p-2"
        src="/nomad.svg"
        alt="Nomad logo"
        width={300}
        height={30}
        priority />
      </div>
      <div className="flex flex-col items-center bg-black items-center justify-items-center sm:w-1/2 p-8 pb-16 gap-1 sm:p-20">
      <h1 className="text-4xl font-bold mb-4 text-sm text-white text-center sm:text-left">Login to Nomad</h1>
      {error && <p className="text-red-500">{error}</p>}
      <code className="bg-white/[.12] dark:bg-white/[.06] px-1 py-0.5 text-white rounded font-semibold mb-4">
        src/app/login/page.tsx
      </code>
      <label className="text-white mb-1 w-64 text-left">Email Address</label>
      <div className="flex items-center border border-gray-800 bg-transparent text-white rounded mb-2 w-64 transition-colors duration-500 hover:bg-gray-800 focus-within:ring-1 focus-within:ring-gray-600">
        <FaEnvelope className="ml-2 transition-colors duration-500 hover:text-gray-500" />
        <input
          type="email"
          placeholder="Enter your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 bg-transparent text-white w-full focus:outline-none"
        />
      </div>
      <label className="text-white mb-1 w-64 text-left">Password</label>
      <div className="flex items-center border border-gray-800 bg-black text-white rounded mb-2 w-64 transition-colors duration-500 hover:bg-gray-800 focus-within:ring-1 focus-within:ring-gray-600">
        <FaLock className="ml-2 transition-colors duration-500 hover:text-gray-500" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 bg-transparent text-white w-full focus:outline-none"
        />
      </div>
      <button onClick={() => router.push("/forgot-password")} className="text-gray-100 mb-2 transition-colors duration-500 hover:text-gray-500 text-xs sm:text-sm h-4 sm:h-6 px-2 sm:px-4">
        Forgot password?
      </button>
      <Button className="bg-blue-800 w-64 transition-color duration-500 hover:bg-blue-900" onClick={handleLogin}>
        Login
      </Button>
      <button className="text-gray-100 transition-colors duration-500 hover:text-gray-500 text-xs sm:text-sm h-4 sm:h-6 px-2 sm:px-4">
        Don't have an account? <a href="/register">Register</a>
      </button>
      </div>
    </div>
  );
}
