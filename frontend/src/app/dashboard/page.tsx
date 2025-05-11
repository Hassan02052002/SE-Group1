"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Compass, Info, Globe } from "lucide-react";
import { ThemedButton } from "@/components/ui/theme-button";
import { cardStyle, gradientText, typography } from "@/lib/theme";

const DUMMY_DESTINATIONS = [
  { id: 1, country: "Japan", city: "Tokyo", code: "JP", status: "Trending now", color: "cyan" },
  { id: 2, country: "Italy", city: "Rome", code: "IT", status: "Popular", color: "emerald" },
  { id: 3, country: "France", city: "Paris", code: "FR", status: "Rising", color: "violet" },
  { id: 4, country: "USA", city: "New York", code: "NYC", status: "New", color: "blue" }
];

const DUMMY_TRIPS = {
  total: 5,
  countries: 8,
  upcoming: 2,
  recent: []
};

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState(DUMMY_DESTINATIONS);
  const [trips, setTrips] = useState(DUMMY_TRIPS);
  const router = useRouter();

  const fetchDestinations = () => setTimeout(() => setDestinations(DUMMY_DESTINATIONS), 500);
  const fetchTrips = () => setTimeout(() => setTrips(DUMMY_TRIPS), 700);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setLoading(true);
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setUser(res.data);
          fetchDestinations();
          fetchTrips();
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          router.push("/login");
        });
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-emerald-500 border-opacity-75"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      <main className="pt-36 px-6 pb-12 max-w-7xl mx-auto">

        <div className="w-full py-3 px-4 text-center relative z-50 bg-gradient-to-r from-gray-950 via-sky-800 to-gray-950 shadow-md border-b border-sky-800/30 mt-[4.5rem]">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-300 to-amber-500 animate-pulse uppercase">
            🗳️ Vote for Yoshida!
          </h1>
        </div>

        <div className={cardStyle("mb-12 p-8")}>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className={`text-3xl ${typography.fontFamily.heading} font-bold mb-2`}>
                Welcome back, <span className={gradientText()}>{user?.name}</span>
              </h2>
              <p className="text-gray-400">{user?.email}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <ThemedButton themeVariant="primary" onClick={() => router.push("/itinerary")}>
                New Journey
              </ThemedButton>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className={cardStyle("md:col-span-2 group relative overflow-hidden", true)}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>

            <div className="relative p-8">
              <div className="w-14 h-14 bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                <Compass className="h-7 w-7 text-emerald-400" />
              </div>
              <h3 className={`text-2xl ${typography.fontFamily.heading} font-bold mb-3`}>Plan Your Next Adventure</h3>
              <p className="text-gray-400 mb-6 max-w-lg">Our AI-powered travel assistant helps create personalized itineraries based on your preferences, budget, and travel style.</p>
              <ThemedButton themeVariant="primary" size="lg" icon={<Compass className="h-5 w-5" />} onClick={() => router.push("/itinerary")} className="hover:translate-y-1">
                Start Planning
              </ThemedButton>
              <div className="mt-6 flex items-center text-gray-500">
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">POWERED BY AI</span>
              </div>
            </div>
          </div>

          <div className={cardStyle("group relative overflow-hidden", true)}>
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 to-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-3xl"></div>

            <div className="relative p-8">
              <div className="w-14 h-14 bg-teal-900/30 rounded-full flex items-center justify-center mb-6">
                <Info className="h-7 w-7 text-teal-400" />
              </div>
              <h3 className={`text-2xl ${typography.fontFamily.heading} font-bold mb-3`}>About Nomad</h3>
              <p className="text-gray-400 mb-6">Learn about our mission to transform travel planning with AI technology.</p>
              <ThemedButton themeVariant="secondary" icon={<Info className="h-5 w-5" />} onClick={() => router.push("/about")} className="hover:translate-y-1">
                Discover More
              </ThemedButton>
            </div>
          </div>

          <div className={cardStyle("group relative overflow-hidden", true)}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl"></div>

            <div className="relative p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl ${typography.fontFamily.heading} font-bold`}>Popular Destinations</h3>
                {destinations.length > 0 && (
                  <span className="text-xs bg-gray-800/70 px-2 py-1 rounded-full text-gray-400">
                    {destinations.length} trending
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destinations.map((destination) => (
                  <div
                    key={destination.id}
                    className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer bg-gray-900 text-white"
                  >
                    <div className="relative w-full h-48 overflow-hidden">
                      <img
                        src={`/images/${destination.city.toLowerCase().replace(/\s+/g, "")}.jpg`}
                        alt={`${destination.city}, ${destination.country}`}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300"></div>
                    </div>

                    <div className="px-4 py-3">
                      <p className="text-lg font-bold">{destination.city}, {destination.country}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{destination.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={cardStyle("md:col-span-2 group relative overflow-hidden", true)}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>

            <div className="relative p-8">
              <h3 className={`text-xl ${typography.fontFamily.heading} font-bold mb-4`}>Your Travel Overview</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Total Trips</p>
                  <p className={`text-2xl ${typography.fontFamily.heading} font-bold`}>{trips.total}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Countries</p>
                  <p className={`text-2xl ${typography.fontFamily.heading} font-bold`}>{trips.countries}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Upcoming</p>
                  <p className={`text-2xl ${typography.fontFamily.heading} font-bold`}>{trips.upcoming}</p>
                </div>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-xl mb-6">
                <p className="text-lg italic text-gray-300 mb-2">“Travel is the only thing you buy that makes you richer.”</p>
                <p className="text-sm text-gray-500 text-right">— Unknown</p>
              </div>

              <ThemedButton
                themeVariant="primary"
                icon={<Globe className="h-5 w-5" />}
                onClick={() => router.push("/itineraries")}
                className="hover:translate-y-1"
              >
                View Saved Itineraries
              </ThemedButton>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center p-6 bg-gray-900/30 rounded-xl border border-gray-800/50">
          <p className="text-gray-400 italic font-heading">&quot;The world is a book, and those who do not travel read only one page.&quot;</p>
          <p className="text-xs text-gray-600 mt-2">— Saint Augustine</p>
        </div>
      </main>
    </div>
  );
}