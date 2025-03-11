"use client"; // ✅ Required for client-side state handling

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    setError(""); // Reset error before a new attempt
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/register", { name, email, password });

      localStorage.setItem("token", res.data.token); // ✅ Store JWT token
      router.push("/dashboard"); // ✅ Redirect to dashboard after successful signup
    } catch (err) {
      setError("Registration failed. Email may already be in use.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <div className="hidden sm:flex sm:w-1/2 bg-cover bg-gradient-to-br from-black via-gray-900 to-gray-800 bg-center items-center justify-center">
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
      <div className="flex flex-col items-center bg-black items-center justify-items-center sm:w-1/2 p-8 pb-16 gap-1 sm:p-20">
        <div className="w-64 text-left">
          <h1 className="text-2xl font-bold mb-4 text-white">Register Now</h1>
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <label className="text-white mb-1 w-64 text-left">Full Name</label>
        <div className="flex items-center border border-gray-800 bg-transparent text-white rounded mb-2 w-64 transition-colors duration-500 hover:bg-gray-800 focus-within:ring-1 focus-within:ring-gray-600">
          <FaUser className="ml-2 transition-colors duration-500 hover:text-gray-500" />
          <input
            type="text"
            placeholder="Enter your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 bg-transparent text-white w-full focus:outline-none"
          />
        </div>
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
        <Button className="bg-blue-800 w-64 transition-color duration-500 hover:bg-blue-900" onClick={handleRegister}>
          Register
        </Button>
        <p className="text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
