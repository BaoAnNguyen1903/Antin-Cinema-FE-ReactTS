import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "@/layout.tsx";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import HomePage from "pages/client/home.tsx";
import UuDai from "pages/client/uuDai/uuDai";
import { App, Button, ConfigProvider, Result } from "antd";
import { AppProvider } from "components/context/app.context";
import LoginPage from "pages/client/auth/login";
import RegisterPage from "pages/client/auth/register";
import LayoutAdmin from "components/layout/layout.admin";
import ProtectedRoute from "components/auth";
import DashBoardPage from "pages/admin/dashboard";
import ManageUserPage from "pages/admin/manage.user";
import ManageMoviePage from "pages/admin/manage.movie";
import ManageBookingPage from "pages/admin/manage.booking";
import enUS from "antd/locale/en_US";
import ManageShowtimePage from "./pages/admin/manage.showtime";

import WeekDatePicker from "./pages/client/uuDai/Test";
import ManageGuestPage from "./pages/admin/manage.guest";

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
        path: "movie",
        element: (
          <ProtectedRoute>
            <ManageMoviePage />
          </ProtectedRoute>
        )
      },
      {
        path: "showtime",
        element: (
          <ProtectedRoute>
            <ManageShowtimePage />
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
      },
      {
        path: "guest",
        element: (
          <ProtectedRoute>
            <ManageGuestPage />
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
  },
  {
    path: "/test",
    element: <WeekDatePicker />
  },
  {
    path: "*",
    element: (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
    )
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <AppProvider>
        <ConfigProvider locale={enUS}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </AppProvider>
    </App>
  </StrictMode>
);
