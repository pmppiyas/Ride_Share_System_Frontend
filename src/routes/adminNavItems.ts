import DashboardHome from "@/components/modules/dashboard/DashboardHome";
import Driver from "@/components/modules/dashboard/Driver";
import Rider from "@/components/modules/dashboard/Riders";
import Rides from "@/components/modules/dashboard/Rides";
import {
  Home,
  Car,
  Route,
  User,
  BarChart3,
  CreditCard,
  Settings,
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
        component: Driver,
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
        id: "settings",
        label: "Settings",
        path: "settings",
        icon: Settings,
        component: DashboardHome,
      },
    ],
  },
];
