import App from "@/App";
import Login from "@/components/modules/auth/Login";
import Signup from "@/components/modules/auth/Signup";
import DashboardLayout from "@/layouts/DashboardLayout";
import { checkAuth } from "@/middleware/checkAuth";
import Home from "@/pages/shared/Home";
import Profile from "@/pages/shared/Profile";
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
