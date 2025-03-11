"use client"; // ✅ Required for client-side state handling

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ New loading state
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    setLoading(true); // ✅ Start loading
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      router.push("/dashboard"); 
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false); // ✅ Stop loading
  };

  return (
    <div className="relative flex flex-col sm:flex-row min-h-screen">
      {/* ✅ Transition Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
        </div>
      )}

      {/* Left Side - Image Section */}
      <div className="hidden sm:flex sm:w-1/2 bg-cover bg-gradient-to-tr from-black via-gray-900 to-gray-800 bg-center items-center justify-center">
        <div className="max-w-md text-white">
          <Image src="/nomad.svg" alt="Nomad logo" width={150} height={30} priority />
          <h1 className="text-4xl font-bold mt-6">Start your Journey with us</h1>
          <p className="mt-4 text-gray-300">We are your itinerary planners, come chat with us and find your optimal and most tailored travel plan!</p>
          {/* Testimonial Box */}
          <div className="mt-6 p-4 bg-gray-800 rounded-xl shadow-md">
            <p className="text-sm italic">"Nomad made my trip to Indonesia absolutely unforgettable! Everything was so easy to follow, and I never had to stress about logistics. Highly recommend!"</p>
            <p className="mt-2 text-right text-sm font-bold">- Timothy K.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col items-center bg-black sm:w-1/2 p-8 pb-16 gap-1 sm:p-20">
        <div className="w-64 text-left">
          <h1 className="text-2xl font-bold mb-4 text-white">Login</h1>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* Email Input */}
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

        {/* Password Input */}
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

        {/* Forgot Password Button */}
        <button onClick={() => router.push("/forgot-password")} className="text-gray-100 mb-2 transition-colors duration-500 hover:text-gray-500 text-xs sm:text-sm h-4 sm:h-6 px-2 sm:px-4">
          Forgot password?
        </button>

        {/* Login Button with Loading Effect */}
        <Button 
          className={`w-64 transition-color duration-500 ${loading ? "bg-gray-500" : "bg-blue-800 hover:bg-blue-900"}`}
          onClick={handleLogin}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Signup Link */}
        <button className="text-gray-100 transition-colors duration-500 hover:text-gray-500 text-xs sm:text-sm h-4 sm:h-6 px-2 sm:px-4">
          Don't have an account? <a href="/register">Register</a>
        </button>
      </div>
    </div>
  );
}
