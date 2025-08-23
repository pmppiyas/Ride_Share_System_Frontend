import { Home, Settings } from "lucide-react";
import DashboardHome from "@/components/modules/dashboard/DashboardHome";

export const driverNavItems = [
  {
    section: "Main",
    items: [
      {
        id: "dashboard-home",
        label: "Dashboard",
        icon: Home,
        index: true,
        component: DashboardHome,
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
        component: DashboardHome,
      },
    ],
  },
];
