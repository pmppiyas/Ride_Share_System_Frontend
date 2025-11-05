interface Location {
  address?: string;
  lat: number;
  lng: number;
}

interface Person {
  name: string;
  phone: string;
}

export interface Ride {
  _id: string;
  pickupLocation: Location;
  destinationLocation: Location;
  driver: Person;
  rider: Person;
  fare: number;
  distance: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  timestamps: {
    requestedAt: string;
  };
}

export interface RideCardProps {
  ride: Ride;
  onCancel: () => void;
}

const IRideStatus = {
  REQUESTED: "requested",
  ACCEPTED: "accepted",
  PICKED_UP: "picked_up",
  IN_TRANSIT: "in_transit",
  COMPLETED: "completed",
  CANCELED: "canceled",
} as const;

export const RideStatusEnum = {
  REQUESTED: "requested",
  ACCEPTED: "accepted",
  PICKED_UP: "picked_up",
  IN_TRANSIT: "in_transit",
  COMPLETED: "completed",
  CANCELED: "canceled",
} as const;

// ✅ Type for safety and autocompletion
export type RideStatusEnum =
  (typeof RideStatusEnum)[keyof typeof RideStatusEnum];

export type IRideStatus = (typeof IRideStatus)[keyof typeof IRideStatus];
