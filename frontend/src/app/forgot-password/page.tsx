"use client"; // ✅ Required for client-side state handling

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  
        setMessage("Password reset link sent! Check your email.");
      } catch (err) {
        setError("Failed to send reset link. Please try again.");
      }
    };

  return (
    <div className="flex flex-col items-center items-center justify-items-center min-h-screen p-8 pb-16 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold mb-4 text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">Forgot Password?</h1>
      {error && <p className="text-red-500">{error}</p>}
      <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/forgot-password/page.tsx
      </code>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-800 bg-black text-white rounded mb-4 w-64 transition-colors duration-500 hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
        />
      {/* <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border border-gray-800 bg-black text-white rounded mb-2 w-64 transition-colors duration-500 hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
        /> */}
        {/* <button onClick={() => router.push("/forgot-password")} className="text-gray-100 transition-colors duration-500 hover:text-gray-500 text-xs sm:text-sm h-4 sm:h-6 px-2 sm:px-4">
          Forgot password?
        </button> */}
      <button onClick={handleForgotPassword} className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
        Reset
      </button>
      <button
          onClick={() => router.push("/login")}
          className="text-gray-100 transition-colors duration-500 hover:text-gray-500 text-xs sm:text-sm h-4 sm:h-6 px-2 sm:px-4"
        >
          Back to Login
        </button>
    </div>
  );
}
