import FindADriver from "@/components/modules/dashboard/Rider/FindADriver";
import RHome from "@/components/modules/dashboard/Rider/Home";
import MyRide from "@/components/modules/dashboard/Rider/MyRide";
import Setting from "@/components/modules/dashboard/Setting";
import DProfile from '@/components/modules/dashboard/driver/DProfile';
import type { ISidebarItem } from "@/types";
import { Car, Home, Settings, UserRound, UserRoundSearch } from "lucide-react";

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
