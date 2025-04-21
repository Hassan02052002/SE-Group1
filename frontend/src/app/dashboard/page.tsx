"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Compass, Info, Globe } from "lucide-react";
import { ThemedButton } from "@/components/ui/theme-button";
import { cardStyle, gradientText, typography } from "@/lib/theme";

// Dummy data for destinations
const DUMMY_DESTINATIONS = [
  {
    id: 1,
    country: "Japan",
    city: "Tokyo",
    code: "JP",
    status: "Trending now",
    color: "cyan"
  },
  {
    id: 2,
    country: "Italy",
    city: "Venice",
    code: "IT",
    status: "Popular",
    color: "emerald"
  },
  {
    id: 3,
    country: "France",
    city: "Paris",
    code: "FR",
    status: "Rising",
    color: "violet"
  },
  {
    id: 4,
    country: "Iceland",
    city: "Reykjavik",
    code: "IS",
    status: "New destination",
    color: "blue"
  }
];

// Dummy data for user trips
const DUMMY_TRIPS = {
  total: 5,
  countries: 8,
  upcoming: 2,
  recent: [
    {
      id: 1,
      destination: "Barcelona, Spain",
      date: "March 15 - March 22, 2025",
      status: "upcoming"
    },
    {
      id: 2,
      destination: "Amsterdam, Netherlands",
      date: "January 5 - January 12, 2025",
      status: "completed"
    },
    {
      id: 3,
      destination: "Prague, Czech Republic",
      date: "October 10 - October 17, 2024",
      status: "completed"
    }
  ]
};

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState(DUMMY_DESTINATIONS);
  const [trips, setTrips] = useState(DUMMY_TRIPS);
  const router = useRouter();

  // Function to simulate fetching destinations
  const fetchDestinations = () => {
    // In a real app, this would be an API call
    // For now, we're just using the dummy data
    setTimeout(() => {
      setDestinations(DUMMY_DESTINATIONS);
    }, 500);
  };

  // Function to simulate fetching user trips
  const fetchTrips = () => {
    // In a real app, this would be an API call
    // For now, we're just using the dummy data
    setTimeout(() => {
      setTrips(DUMMY_TRIPS);
    }, 700);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect if not logged in
    } else {
      // console.log("API URL Dashboard:", process.env.NEXT_PUBLIC_API_URL);
      setLoading(true);

      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          // Fetch data after user authentication
          fetchDestinations();
          fetchTrips();
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token"); // Clear invalid token
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
        {/* User Welcome Section */}
        <div className={cardStyle("mb-12 p-8")}>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className={`text-3xl ${typography.fontFamily.heading} font-bold mb-2`}>
                Welcome back,  <span className={gradientText()}>{user?.name}</span>
              </h2>
              <p className="text-gray-400">{user?.email}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <ThemedButton 
                themeVariant="primary" 
                onClick={() => router.push("/itinerary")}
              >
                New Journey
              </ThemedButton>
            </div>
          </div>
        </div>
        
        {/* Dashboard Modules - More innovative layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Feature Card */}
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
              
              <ThemedButton 
                themeVariant="primary"
                size="lg"
                icon={<Compass className="h-5 w-5" />}
                onClick={() => router.push("/itinerary")}
                className="hover:translate-y-1"
              >
                Start Planning
              </ThemedButton>
              
              <div className="mt-6 flex items-center text-gray-500">
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">POWERED BY AI</span>
              </div>
            </div>
          </div>
          
          {/* About Card */}
          <div className={cardStyle("group relative overflow-hidden", true)}>
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 to-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative p-8">
              <div className="w-14 h-14 bg-teal-900/30 rounded-full flex items-center justify-center mb-6">
                <Info className="h-7 w-7 text-teal-400" />
              </div>
              <h3 className={`text-2xl ${typography.fontFamily.heading} font-bold mb-3`}>About Nomad</h3>
              <p className="text-gray-400 mb-6">Learn about our mission to transform travel planning with AI technology.</p>
              
              <ThemedButton 
                themeVariant="secondary"
                icon={<Info className="h-5 w-5" />}
                onClick={() => router.push("/about")}
                className="hover:translate-y-1"
              >
                Discover More
              </ThemedButton>
            </div>
          </div>
          
          {/* Popular Destinations - Now Dynamic */}
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
              
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {destinations.length === 0 ? (
                  <div className="flex items-center justify-center h-32 bg-gray-800/30 rounded-lg">
                    <p className="text-gray-500">Loading destinations...</p>
                  </div>
                ) : (
                  destinations.map((destination) => (
                    <div 
                      key={destination.id}
                      className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <div className={`w-10 h-10 rounded-full bg-${destination.color}-900/50 flex items-center justify-center mr-3`}>
                        <span className={`text-${destination.color}-400 text-xs ${typography.fontFamily.heading} font-bold`}>{destination.code}</span>
                      </div>
                      <div>
                        <p className={`${typography.fontFamily.heading} font-medium`}>{destination.city}, {destination.country}</p>
                        <p className="text-xs text-gray-500">{destination.status}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <ThemedButton 
                themeVariant="outline"
                fullWidth
                className="mt-4"
                onClick={() => router.push("/explore")}
              >
                View All
              </ThemedButton>
            </div>
          </div>
          
          {/* Travel Stats - Now Dynamic */}
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
              
              {/* Recent Trips Section */}
              {trips.recent && trips.recent.length > 0 && (
                <div className="mb-6">
                  <h4 className={`text-lg ${typography.fontFamily.heading} font-medium mb-3`}>Recent Trips</h4>
                  <div className="space-y-2">
                    {trips.recent.map(trip => (
                      <div key={trip.id} className="p-3 bg-gray-800/30 rounded-lg border border-gray-800/50">
                        <div className="flex justify-between items-center">
                          <p className={`${typography.fontFamily.heading} font-medium`}>{trip.destination}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            trip.status === 'upcoming' 
                              ? 'bg-emerald-900/30 text-emerald-400' 
                              : 'bg-blue-900/30 text-blue-400'
                          }`}>
                            {trip.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{trip.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <ThemedButton 
                themeVariant="primary"
                icon={<Globe className="h-5 w-5" />}
                onClick={() => router.push("/trips")}
                className="hover:translate-y-1"
              >
                View Travel History
              </ThemedButton>
            </div>
          </div>
        </div>
        
        {/* Inspirational Quote */}
        <div className="mt-12 text-center p-6 bg-gray-900/30 rounded-xl border border-gray-800/50">
          <p className="text-gray-400 italic font-heading">&quot;The world is a book, and those who do not travel read only one page.&quot;</p>
          <p className="text-xs text-gray-600 mt-2">— Saint Augustine</p>
        </div>
      </main>
    </div>
  );
}