"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { typography, gradientText, primaryButton } from "@/lib/theme";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    setError("");
    setLoading(true);
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
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
            Your AI Travel Companion
          </h1>
          
          <p className={`mt-6 ${typography.fontSize.bodyLarge} text-gray-300`}>
            We help you discover and plan your perfect journey with personalized itineraries tailored to your preferences.
          </p>
          
          {/* Testimonial Box */}
          <div className="mt-10 p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl shadow-md">
            <p className="text-gray-300 italic">
              &quot;Nomad made my trip to Indonesia absolutely unforgettable! Everything was so easy to follow, and I never had to stress about logistics. Highly recommend!&quot;
            </p>
            <p className="mt-3 text-right text-emerald-400 font-heading font-medium">
              — Timothy K.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center bg-gray-950 sm:w-1/2 p-6 sm:p-10">
        <div className="w-full max-w-md p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-xl">
          <div className="mb-8 text-center sm:text-left">
            <h2 className={`${typography.fontFamily.heading} ${typography.fontSize.heading2} font-bold ${gradientText()}`}>
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-400">
              Sign in to continue your journey
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-900/30 rounded-lg flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-6">
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
              <div className="flex items-center justify-between">
                <label className={`block ${typography.fontFamily.heading} font-medium text-gray-300`}>
                  Password
                </label>
                <button 
                  onClick={() => router.push("/forgot-password")} 
                  className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/70 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800/50 text-white"
                />
              </div>
            </div>

            {/* Login Button */}
            <Button 
              className={`w-full py-6 ${primaryButton()} hover:scale-[1.01] transition-transform duration-300`}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </Button>

            {/* Signup Link */}
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Don&#39;t have an account?{" "}
                <button
                  onClick={() => router.push("/register")}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}