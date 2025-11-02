import App from "@/App";
import Login from "@/components/modules/auth/Login";
import Signup from "@/components/modules/auth/Signup";
import DashboardLayout from "@/layouts/DashboardLayout";
import { checkAuth } from "@/middleware/checkAuth";
import AboutUs from "@/pages/shared/AboutUs";
import Features from "@/pages/shared/Features";
import Home from "@/pages/shared/Home";
import { adminNavItems } from "@/routes/adminNavItems";
import { driverNavItems } from "@/routes/driverNavItems";
import { riderNavItems } from "@/routes/riderNavItems";
import { Role } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "auth/login",
        Component: Login,
      },
      {
        path: "auth/signup",
        Component: Signup,
      },
      {
        path: "about_us",
        Component: AboutUs,
      },
      {
        path: "features",
        Component: Features,
      },
    ],
  },
  {
    path: "/admin",
    Component: checkAuth(DashboardLayout, [Role.SUPER_ADMIN, Role.ADMIN]),
    children: [...generateRoutes(adminNavItems)],
  },
  {
    path: "/driver",
    Component: checkAuth(DashboardLayout, [Role.DRIVER]),
    children: [...generateRoutes(driverNavItems)],
  },
  {
    path: "/rider",
    Component: checkAuth(DashboardLayout, [Role.RIDER]),
    children: [...generateRoutes(riderNavItems)],
  },
]);
