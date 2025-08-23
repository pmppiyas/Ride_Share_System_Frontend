import { Home, Settings } from "lucide-react";
import type { ISidebarItem } from "@/types";
import Setting from "@/components/modules/dashboard/Setting";
import RHome from "@/components/modules/dashboard/Rider/Home";

export const riderNavItems: ISidebarItem[] = [
  {
    section: "Main",
    items: [
      {
        id: "Home",
        label: "Home",
        index: true,
        component: RHome,
        icon: Home,
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
