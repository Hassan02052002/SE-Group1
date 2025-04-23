"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Itinerary = {
  destination: string;
  budget: string;
  preferences: string;
  duration: string;
  itinerary: string;
  date: string;
};

const ItinerariesPage = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchItineraries(token);
    }
  }, [router]);

  const fetchItineraries = async (token: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/itinerary/saved-itineraries`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) throw new Error("Failed to fetch itineraries");

      setItineraries(response.data); // this must be a valid array of `Itinerary`
    } catch (error) {
      setError("Failed to fetch itineraries. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Saved Itineraries</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : itineraries.length === 0 ? (
        <p className="text-center text-gray-500">No saved itineraries found.</p>
      ) : (
        <div className="space-y-6">
          {itineraries.map((it, index) => (
            <div key={index} className="border rounded-xl p-6 bg-gray-900 text-white">
              <h2 className="text-lg font-semibold text-emerald-400 mb-2">{it.destination}</h2>
              <p className="text-sm text-gray-400 mb-1">Date: {it.date}</p>
              <p className="text-sm text-gray-400 mb-1">Budget: {it.budget}</p>
              <p className="text-sm text-gray-400 mb-1">Preferences: {it.preferences}</p>
              <p className="text-sm text-gray-400 mb-4">Duration: {it.duration} days</p>
              <div className="whitespace-pre-wrap">{it.itinerary}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ItinerariesPage;