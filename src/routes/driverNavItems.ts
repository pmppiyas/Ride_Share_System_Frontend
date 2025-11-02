import DProfile from "@/components/modules/dashboard/driver/DProfile";
import DSetting from "@/components/modules/dashboard/driver/DSetting";
import DriveRequest from "@/components/modules/dashboard/driver/DriveRequest";
import DHome from "@/components/modules/dashboard/driver/Home";
import { Home, PhoneIncoming, Settings, UserRound } from "lucide-react";

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
      {
        id: "mydriverequest",
        label: "Ride Invitaion",
        path: "ride_request",
        icon: PhoneIncoming,
        component: DriveRequest,
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
