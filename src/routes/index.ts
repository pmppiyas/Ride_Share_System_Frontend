import App from "@/App";
import Login from "@/components/modules/auth/Login";
import Signup from "@/components/modules/auth/Signup";
import DashboardHome from "@/components/modules/dashboard/DashboardHome";
import Driver from "@/components/modules/dashboard/Driver";
import Rider from "@/components/modules/dashboard/Riders";
import DashboardLayout from "@/layouts/DashboardLayout";
import Home from "@/pages/shared/Home";
import Profile from "@/pages/shared/Profile";
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
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/signup",
        Component: Signup,
      },
      {
        path: "/profile",
        Component: Profile,
      },
    ],
  },
  {
    path: "/admin",
    Component: DashboardLayout,

    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "drivers",
        Component: Driver,
      },
      {
        path: "riders",
        Component: Rider,
      },
    ],
  },
]);
