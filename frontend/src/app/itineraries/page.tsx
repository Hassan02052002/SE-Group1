"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ItinerariesPage = () => {
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect if not logged in
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
      if (response.status !== 200) {
        console.log("Error fetching itineraries:", response.statusText);
        throw new Error("Failed to fetch itineraries");
      }
      setItineraries(response.data);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      setError("Failed to fetch itineraries. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Saved Itineraries</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : itineraries.length === 0 ? (
        <p className="text-center text-gray-500">No saved itineraries found.</p>
      ) : (
        <div className="grid gap-6">
          {itineraries.map((itinerary: any, index: number) => (
            <div
              key={index}
              className="border rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition duration-200"
            >
              <div className="whitespace-pre-line text-gray-800 text-sm">
                {itinerary.itinerary}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ItinerariesPage;
