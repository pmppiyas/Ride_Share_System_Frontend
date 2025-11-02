import AProfile from "@/components/modules/dashboard/admin/AProfile";
import DashboardHome from "@/components/modules/dashboard/admin/DashboardHome";
import Drivers from "@/components/modules/dashboard/admin/Driver";
import Rider from "@/components/modules/dashboard/admin/Riders";
import Rides from "@/components/modules/dashboard/admin/Rides";
import Setting from "@/components/modules/dashboard/Setting";
import {
  BarChart3,
  Car,
  CreditCard,
  Home,
  Route,
  Settings,
  User,
} from "lucide-react";
export const adminNavItems = [
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
      {
        id: "drivers",
        label: "Drivers",
        icon: Car,
        badge: "5",
        path: "drivers",
        component: Drivers,
      },
      {
        id: "riders",
        label: "Riders",
        path: "riders",
        icon: User,
        badge: "8",
        component: Rider,
      },
      {
        id: "rides",
        label: "Rides",
        path: "rides",
        icon: Route,
        badge: "12",
        component: Rides,
      },
    ],
  },
  {
    section: "Analytics",
    items: [
      {
        id: "analytics",
        label: "Analytics",
        path: "analytics",
        icon: BarChart3,
        component: DashboardHome,
      },
      {
        id: "payments",
        label: "Payments",
        path: "payments",
        icon: CreditCard,
        component: DashboardHome,
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
        icon: User,
        component: AProfile,
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
