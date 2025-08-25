import { Home, Settings, UserRound } from "lucide-react";
import DHome from "@/components/modules/dashboard/driver/Home";
import DProfile from "@/components/modules/dashboard/driver/DProfile";
import DSetting from "@/components/modules/dashboard/driver/DSetting";

export const driverNavItems = [
  {
    section: "Main",
    items: [
      {
        id: "dashboard-home",
        label: "Dashboard",
        icon: Home,
        index: true,
        component: DHome,
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
        component: DSetting,
      },
    ],
  },
];
