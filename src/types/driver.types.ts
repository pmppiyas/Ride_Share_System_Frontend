import type { IError } from "@/types";

export interface Driver {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;

  location: {
    type: "Point";
    coordinates: [lng: number, lat: number];
  };

  role: "DRIVER";

  distance?: number;
  auths: {
    provider: "credentials" | "google" | "facebook";
    providerId: string;
  }[];

  rideHistory: [];
  isAvailable: boolean;
  isActive: "ACTIVE" | "INACTIVE";
  isVerified: boolean;
  isDeleted: boolean;

  driveRides: {
    _id: string;
  }[];

  vehicleInfo: {
    type: string;
    model: string;
    plateNumber: string;
  };
  isOnline: "true" | "false";

  createdAt: string;
  updatedAt: string;
}

export interface GetDriversApiResponse {
  success?: boolean;
  drivers?: Driver[];
  data?: {
    drivers?: Driver[];
  };
  total?: number;
  error?: string;
}

export interface DriverQueryResult {
  data?: GetDriversApiResponse;
  error?: IError;
  isLoading: boolean;
  refetch?: () => void;
}
