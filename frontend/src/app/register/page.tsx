"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { User, Mail, Lock, AlertCircle } from "lucide-react";
import { typography, gradientText, primaryButton } from "@/lib/theme";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all required fields");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch {
      setError("Registration failed. Email may already be in use.");
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="relative flex flex-col sm:flex-row min-h-screen bg-gray-950">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-950/90 backdrop-blur-sm z-50">
          <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-emerald-500 border-opacity-75"></div>
        </div>
      )}

      {/* Left Side - Image Section */}
      <div className="hidden sm:flex sm:w-1/2 bg-gradient-to-br from-gray-950 to-gray-900 items-center justify-center relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-md text-white p-8 relative z-10">
          <Image src="/nomad.svg" alt="Nomad logo" width={140} height={140} priority />
          
          <h1 className={`${typography.fontFamily.heading} ${typography.fontSize.heading1} font-bold mt-8 ${gradientText()}`}>
            Begin Your Adventure
          </h1>
          
          <p className={`mt-6 ${typography.fontSize.bodyLarge} text-gray-300`}>
            Join thousands of travelers discovering new destinations and creating unforgettable memories with personalized itineraries.
          </p>
          
          {/* Features Box */}
          <div className="mt-10 p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl shadow-md">
            <h3 className="font-heading text-emerald-400 font-medium mb-4">Why Join Nomad?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-300">AI-powered travel itineraries tailored to your preferences</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-300">Discover hidden gems and local favorites</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-300">Connect with a community of passionate travelers</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex items-center justify-center bg-gray-950 sm:w-1/2 p-6 sm:p-10">
        <div className="w-full max-w-md p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-xl">
          <div className="mb-8 text-center sm:text-left">
            <h2 className={`${typography.fontFamily.heading} ${typography.fontSize.heading2} font-bold ${gradientText()}`}>
              Create Your Account
            </h2>
            <p className="mt-2 text-gray-400">
              Join Nomad and start planning your next adventure
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-900/30 rounded-lg flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label className={`block ${typography.fontFamily.heading} font-medium text-gray-300`}>
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/70 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800/50 text-white"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className={`block ${typography.fontFamily.heading} font-medium text-gray-300`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/70 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800/50 text-white"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className={`block ${typography.fontFamily.heading} font-medium text-gray-300`}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  placeholder="Create a password (min. 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/70 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800/50 text-white"
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Register Button */}
            <Button 
              className={`w-full py-6 mt-2 ${primaryButton()}`}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => router.push("/login")}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}