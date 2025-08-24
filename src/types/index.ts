export type {
  SelectingMode,
  LocationDisplayProps,
  FindDriverPayload,
  LocationCoords,
  FindDriverApiResponse,
  DriverLocation,
  LocationSelectorProps,
  MapComponentProps,
} from "./rider.types";

export type {
  Driver,
  DriverQueryResult,
  GetDriversApiResponse,
} from "./driver.types";

export interface IError {
  status: number;
  data: {
    message?: string;
    error?: {
      statusCode?: number;
    };
    success?: boolean;
    stack?: string;
  };
}

export interface ISidebarItem {
  section: string;
  items: Array<{
    id: string;
    label: string;
    path?: string;
    icon: React.ComponentType;
    component: React.ComponentType;
    index?: boolean;
    badge?: string;
  }>;
}

export const Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  RIDER: "Rider",
  DRIVER: "DRIVER",
} as const;

export type TRole = "SUPER_ADMIN" | "ADMIN" | "DRIVER" | "Rider";
