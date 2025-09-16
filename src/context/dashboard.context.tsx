import { createContext } from 'react';

interface DashboardContextType {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  geoLocation: Location | null;
  setGeoLocation: (location: Location | null) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);



