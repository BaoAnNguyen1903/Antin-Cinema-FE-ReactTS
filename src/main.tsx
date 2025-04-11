import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "@/layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "pages/client/home.tsx";
import UuDai from "pages/client/uuDai/uuDai";
import { App } from "antd";
import { AppProvider } from "components/context/app.context";
import LoginPage from "pages/client/auth/login";
import RegisterPage from "pages/client/auth/register";
import LayoutAdmin from "components/layout/layout.admin";
import ProtectedRoute from "components/auth";
import DashBoardPage from "pages/admin/dashboard";
import ManageUserPage from "pages/admin/manage.user";
import ManageMoviePage from "pages/admin/manage.movie";
import ManageBookingPage from "pages/admin/manage.booking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/uu-dai",
        element: <UuDai />
      }
    ]
  },
  {
    path: "admin",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashBoardPage />
          </ProtectedRoute>
        )
      },
      {
        path: "book",
        element: (
          <ProtectedRoute>
            <ManageMoviePage />
          </ProtectedRoute>
        )
      },
      {
        path: "booking",
        element: (
          <ProtectedRoute>
            <ManageBookingPage />
          </ProtectedRoute>
        )
      },
      {
        path: "user",
        element: (
          <ProtectedRoute>
            <ManageUserPage />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </App>
  </StrictMode>
);
