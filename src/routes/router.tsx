import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@/pages/login/LoginPage";

import DashboardPage from "@/pages/dashboard/DashboardPage";
import Home from "@/pages/Home";
import ProtectedRoute from "./ProtectedRoute";
export const routes = createBrowserRouter([
  {
    path: "/",
    Component: ProtectedRoute, // Protect everything under "/"
    children: [
      {
        path: "",
        Component: Home, // Home layout
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: "dashboard",
            Component: DashboardPage, // Loads inside <Outlet /> in Home
          },
          // Add more protected routes here as children of Home
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);
