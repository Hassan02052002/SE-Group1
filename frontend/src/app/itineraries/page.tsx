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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/itinerary/saved-itineraries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status !== 200) {
        console.log("Error fetching itineraries:", response.statusText);
        throw new Error("Failed to fetch itineraries");
      }
      setItineraries(response.data); // Set itineraries data from backend response
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      setError("Failed to fetch itineraries. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Saved Itineraries</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : itineraries.length === 0 ? (
        <p>No saved itineraries found.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {itineraries.map((itinerary: any, index: number) => (
              <li key={index} className="p-4 border rounded-md shadow-md">
                <div className="whitespace-pre-line">
                    {itinerary.itinerary}
                    </div>

              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ItinerariesPage;
