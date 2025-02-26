"use client"; // ✅ Required for client-side state handling

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 text-center">
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-700 bg-gray-800 text-white rounded mb-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-700 bg-gray-800 text-white rounded mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-700 bg-gray-800 text-white rounded mb-4 w-full"
        />
        <button 
          onClick={handleRegister} 
          className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded w-full transition duration-300"
        >
          Register
        </button>
        <p className="text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
