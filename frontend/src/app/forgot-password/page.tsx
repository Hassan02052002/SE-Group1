"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Import the Image component

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  
  const handleForgotPassword = async () => {
    setMessage("");
    setError("");
  
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/forgot-password", { email });
      if (res.status !== 200) {
        setMessage("Failed to send reset link");
      } else {
        setMessage("Password reset link sent! Check your email.");
      }
    } catch {
      setError("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="flex flex-col bg-black items-center justify-center min-h-screen p-8 pb-16 gap-4 sm:p-20 ">
      <Image src="/nomad.svg" alt="Nomad Logo" width={150} height={150} className="mb-8" /> {/* Add the Logo component */}
      <h1 className="text-4xl font-bold mb-4 text-center">Forgot Password?</h1>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-800 bg-black text-white rounded mb-4 w-64 transition-colors duration-500 hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
      />
      <Button onClick={handleForgotPassword} className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors duration-500 flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-white dark:text-black hover:text-black dark:hover:text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
        Reset Password
      </Button>
      <button
        onClick={() => router.push("/login")}
        className="text-gray-100 transition-colors duration-500 hover:text-gray-500 text-xs sm:text-sm h-4 sm:h-6 px-2 sm:px-4"
      >
        Back to Login
      </button>
    </div>
  );
}
