"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ItineraryPage() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    setLoading(true);
    setItinerary(""); // Clear previous results

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/ai/generate",
        {
          destination,
          budget: parseInt(budget),
          preferences: preferences.split(","),
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setItinerary(res.data.itinerary);
    } catch (err) {
      setItinerary("Failed to generate itinerary. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Generate Your Itinerary</h1>

        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="p-2 border border-gray-800 bg-black text-white rounded mb-2 w-full transition-colors duration-600 hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-700"
        />
        <input
          type="number"
          placeholder="Budget ($)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="p-2 border border-gray-800 bg-black text-white rounded mb-2 w-full transition-colors duration-600 hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-700"
        />
        <input
          type="text"
          placeholder="Preferences (e.g., beaches, nightlife)"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          className="p-2 border border-gray-800 bg-black text-white rounded mb-2 w-full transition-colors duration-600 hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-700"
        />

        <button
          onClick={handleGenerate}
          className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded w-full transition duration-300"
        >
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>

        {itinerary && (
          <div className="mt-6 p-4 bg-gray-800 rounded text-left text-sm">
            <h2 className="font-semibold text-lg mb-2">Generated Itinerary:</h2>
            <p className="whitespace-pre-line">{itinerary}</p>
          </div>
        )}

        {/* Back button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
