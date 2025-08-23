import { Home, Settings } from "lucide-react";
import Setting from "@/components/modules/dashboard/Setting";
import DHome from "@/components/modules/dashboard/driver/Home";

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
        id: "settings",
        label: "Settings",
        path: "settings",
        icon: Settings,
        component: Setting,
      },
    ],
  },
];
