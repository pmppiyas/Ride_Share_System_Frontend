import { Home, Settings, UserRoundSearch, Car, UserRound } from "lucide-react";
import type { ISidebarItem } from "@/types";
import Setting from "@/components/modules/dashboard/Setting";
import RHome from "@/components/modules/dashboard/Rider/Home";
import FindADriver from "@/components/modules/dashboard/Rider/FindADriver";
import MyRide from "@/components/modules/dashboard/Rider/MyRide";
import DProfile from '@/components/modules/dashboard/driver/DProfile';

export const riderNavItems: ISidebarItem[] = [
  {
    section: "Main",
    items: [
      {
        id: "Dashboard",
        label: "Dashboard",
        index: true,
        component: RHome,
        icon: Home,
      },
      {
        id: "FindDriver",
        label: "Find A Driver",
        path: "find_driver",
        icon: UserRoundSearch,
        component: FindADriver,
      },
      {
        id: "MyRides",
        label: "My Ride",
        path: "my_rides",
        icon: Car,
        component: MyRide,
      },
    ],
  },
  {
    section: "Settings",
    items: [
      {
        id: "profile",
        label: "Profile",
        path: "profile",
        icon: UserRound,
        component: DProfile,
      },
      {
        id: "settings",
        label: "Settings",
        path: "settings",
        icon: Settings,
        component: Setting,
      },
    ],
  },
];
