"use client";

import { SetStateAction, useState } from "react";
import axios from "axios";
import { MapPin, DollarSign, Plane, Calendar, Tag, ArrowLeft, Clock, Save, RefreshCw } from "lucide-react";
import { ThemedButton } from "@/components/ui/theme-button";
import { cardStyle, gradientText, typography } from "@/lib/theme";

// Sample popular destinations for suggestions
const POPULAR_DESTINATIONS = [
  "Tokyo, Japan",
  "Paris, France",
  "Bali, Indonesia",
  "New York, USA",
  "Rome, Italy",
  "Barcelona, Spain"
];

// Sample preferences for suggestions
const PREFERENCE_SUGGESTIONS = [
  "beaches",
  "hiking",
  "food",
  "culture",
  "nightlife",
  "museums",
  "shopping",
  "relaxation",
  "adventure",
  "photography"
];

export default function ItineraryPage() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState("");
  const [duration, setDuration] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [showPreferenceSuggestions, setShowPreferenceSuggestions] = useState(false);
  
  const formatItinerary = (text: string) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/\+ /g, '• ')
      .trim();
  };

  const handleGenerate = async () => {
    if (!destination || !budget) {
      // Use a more elegant notification
      const missingFields = [];
      if (!destination) missingFields.push("destination");
      if (!budget) missingFields.push("budget");
      
      const notification = document.createElement("div");
      notification.className = "fixed top-4 right-4 bg-red-900/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-red-700 shadow-lg z-50 animate-fade-in";
      notification.textContent = `Please fill in the required ${missingFields.join(" and ")} fields`;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.classList.add("animate-fade-out");
        setTimeout(() => document.body.removeChild(notification), 500);
      }, 3000);
      
      return;
    }
    
    setLoading(true);
    setItinerary("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/generate`,
        {
          destination,
          budget: parseInt(budget),
          preferences: preferences.split(",").map(pref => pref.trim()).filter(pref => pref !== ""),
          duration: duration ? parseInt(duration) : 7 // Default to 7 days if not specified
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const formattedItinerary = formatItinerary(res.data.itinerary);
      setItinerary(formattedItinerary);
      setSubmitted(true);
    } catch (error) {
      console.error("Generation error:", error);
      setItinerary("Failed to generate itinerary. Please try again.");
    }

    setLoading(false);
  };

  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setItinerary("");
  };

  const addDestination = (dest: SetStateAction<string>) => {
    setDestination(dest);
    setShowDestinationSuggestions(false);
  };

  const addPreference = (pref: string) => {
    const currentPrefs = preferences ? preferences.split(",").map(p => p.trim()).filter(p => p !== "") : [];
    if (!currentPrefs.includes(pref)) {
      const newPrefs = [...currentPrefs, pref];
      setPreferences(newPrefs.join(", "));
    }
    setShowPreferenceSuggestions(false);
  };

  const removePreference = (prefToRemove: string) => {
    const currentPrefs = preferences.split(",").map(p => p.trim()).filter(p => p !== "");
    const newPrefs = currentPrefs.filter(p => p !== prefToRemove);
    setPreferences(newPrefs.join(", "));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header section with gradient text */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl ${typography.fontFamily.heading} font-bold mb-2 ${gradientText()}`}>
            Plan Your Dream Journey
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create a personalized travel itinerary with our AI-powered planner. Tell us where you want to go and let us handle the rest.
          </p>
        </div>

        <div className={`transition-all duration-500 ease-in-out flex ${submitted ? 'flex-col lg:flex-row' : 'flex-col'}`}>
          {/* Form section */}
          <div className={`transition-all duration-500 ${submitted ? 'w-full lg:w-1/3 lg:pr-6 mb-6 lg:mb-0' : 'w-full max-w-3xl mx-auto'}`}>
            <div className={cardStyle(`p-8 ${submitted ? 'h-full' : ''}`)}>
              {submitted && (
                <button
                  onClick={resetForm}
                  className="flex items-center text-emerald-400 hover:text-emerald-300 mb-6 transition-colors"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Back to form
                </button>
              )}
              
              <div className="flex items-center justify-center mb-8">
                <div className="bg-emerald-900/30 rounded-full p-3 mr-4">
                  <Plane className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className={`text-2xl ${typography.fontFamily.heading} font-bold ${gradientText()}`}>
                  Travel Details
                </h2>
              </div>

              <div className="space-y-5 mb-8">
                <div className="space-y-2">
                  <label className={`block text-sm ${typography.fontFamily.heading} font-medium text-white`}>
                    Destination <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Where do you want to go?"
                      value={destination}
                      onChange={(e) => {
                        setDestination(e.target.value);
                        setShowDestinationSuggestions(true);
                      }}
                      onFocus={() => setShowDestinationSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 200)}
                      onKeyDown={handleKeyDown}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-800/50 focus:border-transparent transition duration-200"
                    />
                    
                    {showDestinationSuggestions && (
                      <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden">
                        {POPULAR_DESTINATIONS.filter(dest => 
                          dest.toLowerCase().includes(destination.toLowerCase())
                        ).slice(0, 4).map((dest, index) => (
                          <div 
                            key={index}
                            className="px-4 py-2 hover:bg-gray-800 cursor-pointer transition-colors"
                            onClick={() => addDestination(dest)}
                          >
                            {dest}
                          </div>
                        ))}
                        {destination && !POPULAR_DESTINATIONS.some(dest => 
                          dest.toLowerCase().includes(destination.toLowerCase())
                        ) && (
                          <div className="px-4 py-2 text-gray-500 text-sm">
                            No suggestions found. Continue typing your destination.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className={`block text-sm ${typography.fontFamily.heading} font-medium text-white`}>
                      Budget <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="number"
                        placeholder="Your travel budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-800/50 focus:border-transparent transition duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm ${typography.fontFamily.heading} font-medium text-white`}>
                      Duration
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="number"
                        placeholder="Days (e.g. 7)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-800/50 focus:border-transparent transition duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm ${typography.fontFamily.heading} font-medium text-white`}>
                    Travel Preferences
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-3 text-gray-400" size={18} />
                    <textarea
                      placeholder="What do you enjoy? (beaches, food, culture, etc.)"
                      value={preferences}
                      onChange={(e) => {
                        setPreferences(e.target.value);
                        setShowPreferenceSuggestions(true);
                      }}
                      onFocus={() => setShowPreferenceSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowPreferenceSuggestions(false), 200)}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-800/50 focus:border-transparent transition duration-200"
                    />
                    
                    {showPreferenceSuggestions && (
                      <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden">
                        <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-800">
                          Popular travel interests:
                        </div>
                        <div className="p-2 flex flex-wrap gap-2">
                          {PREFERENCE_SUGGESTIONS.filter(pref => 
                            !preferences.toLowerCase().includes(pref.toLowerCase())
                          ).slice(0, 8).map((pref, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-gray-800 hover:bg-teal-900/50 text-sm rounded-full cursor-pointer transition-colors"
                              onClick={() => addPreference(pref)}
                            >
                              {pref}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Selected preferences tags */}
                  {preferences && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {preferences.split(",").map((pref, index) => {
                        const trimmedPref = pref.trim();
                        return trimmedPref ? (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-teal-900/30 text-teal-400 text-sm rounded-full"
                          >
                            {trimmedPref}
                            <button
                              onClick={() => removePreference(trimmedPref)}
                              className="ml-1 text-teal-400 hover:text-white"
                            >
                              ×
                            </button>
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              </div>

              <ThemedButton
                themeVariant="primary"
                size="lg"
                fullWidth
                icon={<Plane />}
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating your perfect itinerary...
                  </div>
                ) : (
                  "Generate My Itinerary"
                )}
              </ThemedButton>

              {/* Time estimate indicator */}
              <div className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center">
                <Clock size={14} className="mr-1" />
                Takes about 15-30 seconds to create
              </div>
            </div>
          </div>

          {/* Results section */}
          {submitted && itinerary && (
            <div className={`w-full ${submitted ? 'lg:w-2/3' : ''} animate-fade-in`}>
              <div className={cardStyle("p-8 h-full overflow-y-auto")}>
                <div className="flex items-center justify-center mb-6">
                  <h2 className={`text-2xl ${typography.fontFamily.heading} font-bold text-center ${gradientText()}`}>
                    Your {destination} Itinerary
                  </h2>
                </div>
                
                <div className="prose prose-lg prose-invert prose-headings:text-emerald-400 prose-headings:font-bold prose-p:text-white prose-strong:text-emerald-300 prose-strong:font-semibold max-w-none font-sans">
                  {itinerary.split('\n\n').map((paragraph, index) => {
                    // Check if paragraph is a heading
                    if (paragraph.trim().toUpperCase() === paragraph.trim() && paragraph.trim().length > 0) {
                      return (
                        <h3 key={index} className={`text-xl ${typography.fontFamily.heading} font-bold mt-6 mb-3 text-emerald-400 border-b border-gray-800 pb-2`}>
                          {paragraph}
                        </h3>
                      );
                    }
                    
                    // Check if paragraph starts with "Day"
                    if (paragraph.trim().startsWith("Day")) {
                      return (
                        <div key={index} className="mt-8 mb-4 bg-gray-900/50 p-4 rounded-xl border-l-4 border-teal-500">
                          <h3 className={`text-xl ${typography.fontFamily.heading} font-bold text-teal-400`}>{paragraph}</h3>
                        </div>
                      );
                    }
                    
                    // Check if paragraph contains bullet points
                    if (paragraph.includes('• ')) {
                      const [title, ...bullets] = paragraph.split('\n');
                      return (
                        <div key={index} className="mb-4 bg-gray-900/30 p-4 rounded-lg">
                          {title && <p className={`${typography.fontFamily.heading} font-medium text-emerald-300 mb-2`}>{title}</p>}
                          <ul className="space-y-1">
                            {bullets.map((bullet, i) => (
                              <li key={i} className="text-gray-300 flex items-start">
                                <span className="text-emerald-500 mr-2">•</span>
                                <span>{bullet.replace('• ', '')}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    
                    // Regular paragraph
                    return <p key={index} className="mb-4 text-gray-300">{paragraph}</p>;
                  })}
                </div>
                
                {/* Action buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <ThemedButton 
                    themeVariant="primary"
                    className="flex-1"
                    icon={<Save />}
                    onClick={() => window.print()}
                  >
                    Save Itinerary
                  </ThemedButton>
                  <ThemedButton 
                    themeVariant="secondary"
                    className="flex-1"
                    icon={<RefreshCw />}
                    onClick={resetForm}
                  >
                    Create New Itinerary
                  </ThemedButton>
                </div>
              </div>
            </div>
          )}
        </div>

        {!submitted && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className={cardStyle("p-6 text-center")}>
              <div className="w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className={`text-lg ${typography.fontFamily.heading} font-medium mb-2`}>Destination Expertise</h3>
              <p className="text-gray-400 text-sm">Get insider tips and hidden gems for your chosen destination.</p>
            </div>
            
            <div className={cardStyle("p-6 text-center")}>
              <div className="w-12 h-12 bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className={`text-lg ${typography.fontFamily.heading} font-medium mb-2`}>Budget-Optimized</h3>
              <p className="text-gray-400 text-sm">Tailored suggestions that respect your budget constraints.</p>
            </div>
            
            <div className={cardStyle("p-6 text-center")}>
              <div className="w-12 h-12 bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className={`text-lg ${typography.fontFamily.heading} font-medium mb-2`}>Personalized Plans</h3>
              <p className="text-gray-400 text-sm">Itineraries based on your unique preferences and interests.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}