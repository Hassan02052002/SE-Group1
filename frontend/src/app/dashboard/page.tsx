"use client"; // ✅ Required for client-side state handling

import { useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setItinerary(""); // Clear previous results

    try {
      const res = await axios.post("http://127.0.0.1:8000/ai/generate", {
        destination,
        budget: parseInt(budget), // Ensure budget is a number
        preferences: preferences.split(","), // Convert to list
      });

      setItinerary(res.data.itinerary); // Store AI response
    } catch (err) {
      setItinerary("Failed to generate itinerary. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 text-center">
        <h1 className="text-3xl font-bold mb-4">AI Travel Planner</h1>

        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="p-2 border border-gray-700 bg-gray-800 text-white rounded mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Budget ($)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="p-2 border border-gray-700 bg-gray-800 text-white rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Preferences (e.g., beaches, nightlife)"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          className="p-2 border border-gray-700 bg-gray-800 text-white rounded mb-4 w-full"
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
      </div>
    </div>
  );
}
