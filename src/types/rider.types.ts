import type { Driver } from "@/types/driver.types";

export type SelectingMode = "pickup" | "destination";

export interface LocationCoords {
  lat: number;
  lng: number;
}

export interface LocationDisplayProps {
  location?: LocationCoords | null;
  type: SelectingMode;
}

export interface FindDriverPayload {
  pickupLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  destinationLocation: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface FindDriverApiResponse {
  success?: boolean;
  message?: string;
  data?: {
    driver?: Driver[];
    drivers?: Driver[];
    totalFound?: number;
    searchRadius?: number;
  };
  error?: string;
}

export interface DriverLocation {
  type?: string;
  coordinates: LocationCoords[];
}

export interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  width?: string;
  pickupLocation?: LocationCoords | null;
  destinationLocation?: LocationCoords | null;
  allDrivers?: Driver[];
  nearbyDrivers?: Driver[];
  onLocationSelect?: ((location: LocationCoords) => void) | null;
  onDriverClick?: ((driver: Driver) => void) | null;
  className?: string;
  enableLocationSelection?: boolean;
  showAllDrivers?: boolean;
  showNearbyDrivers?: boolean;
}

export interface LocationSelectorProps {
  onLocationSelect: ((location: LocationCoords) => void) | null;
}
