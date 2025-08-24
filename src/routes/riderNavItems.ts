import { Home, Settings, UserRoundSearch } from "lucide-react";
import type { ISidebarItem } from "@/types";
import Setting from "@/components/modules/dashboard/Setting";
import RHome from "@/components/modules/dashboard/Rider/Home";
import FindADriver from "@/components/modules/dashboard/Rider/FindADriver";

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
