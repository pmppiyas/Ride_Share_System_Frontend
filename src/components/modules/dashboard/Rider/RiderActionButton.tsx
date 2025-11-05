import { Button } from "@/components/ui/button";
import type { SelectingMode } from "@/types";
import { Loader2, MapPin, Navigation, RotateCcw, Search } from "lucide-react";
import React from "react";

interface DriverActionsPanelProps {
  selecting: SelectingMode;
  setSelecting: (mode: SelectingMode) => void;
  pickupLocation?: { lat: number; lng: number } | null;
  destinationLocation?: { lat: number; lng: number } | null;
  handleReset: () => void;
  handleFind: () => void;
  isLoading: boolean;
  canSearch: boolean;
}

export const RiderActionButton: React.FC<DriverActionsPanelProps> = ({
  selecting,
  setSelecting,
  pickupLocation,
  destinationLocation,
  handleReset,
  handleFind,
  isLoading,
  canSearch,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Pickup Button */}
      <Button
        variant={selecting === "pickup" ? "default" : "outline"}
        onClick={() => setSelecting("pickup")}
        className={
          pickupLocation
            ? "bg-green-100 border-green-300 text-green-800 hover:bg-green-200"
            : ""
        }
      >
        <MapPin className="h-4 w-4 mr-2" />
        Select Pickup {pickupLocation && "✅"}
      </Button>

      {/* Destination Button */}
      <Button
        variant={selecting === "destination" ? "default" : "outline"}
        onClick={() => setSelecting("destination")}
        className={
          destinationLocation
            ? "bg-red-100 border-red-300 text-red-800 hover:bg-red-200"
            : ""
        }
      >
        <Navigation className="h-4 w-4 mr-2" />
        Select Destination {destinationLocation && "✅"}
      </Button>

      {/* Reset Button */}
      <Button variant="outline" onClick={handleReset}>
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset
      </Button>

      {/* Find Drivers Button */}
      <Button onClick={handleFind} disabled={!canSearch}>
        {isLoading ? (
          <Loader2 className="animate-spin h-4 w-4 mr-2" />
        ) : (
          <Search className="h-4 w-4 mr-2" />
        )}
        {isLoading ? "Searching..." : "Find Drivers"}
      </Button>
    </div>
  );
};