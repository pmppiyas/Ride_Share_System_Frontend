import React from "react";
import { useMapEvents } from "react-leaflet";
import type { LatLng } from "leaflet";

interface LocationSelectorProps {
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationSelect,
}) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng as LatLng;

      if (
        typeof lat === "number" &&
        typeof lng === "number" &&
        !isNaN(lat) &&
        !isNaN(lng)
      ) {
        onLocationSelect({ lat, lng });
      }
    },
  });

  return null;
};