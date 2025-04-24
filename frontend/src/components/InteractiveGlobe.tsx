// src/components/ui/InteractiveGlobe.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import Globe to prevent SSR issues
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function InteractiveGlobe() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Load country polygons from external GeoJSON
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((res) => res.json())
      .then((data) => setCountries(data.features));
  }, []);

  return (
    <div className="w-full h-[500px] bg-gray-900/50 rounded-xl border border-gray-800/50 flex items-center justify-center">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)"
        polygonsData={countries}
        polygonCapColor={() => "rgba(13, 148, 136, 0.25)"} 
        polygonSideColor={() => "rgba(6, 95, 70, 0.08)"}   
        polygonStrokeColor={() => "#14b8a6"}            
        polygonsTransitionDuration={300}
        enablePointerInteraction={true}
        atmosphereAltitude={0.25}
        atmosphereColor="#14b8a6"                          
      />
    </div>
  );
}
