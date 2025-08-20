import App from "@/App";
import { Login } from "@/components/modules/auth/Login";
import Home from "@/pages/shared/Home";
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
    ],
  },
]);
