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
import ManageBookingUserPage from "@/pages/admin/manage.booking.user";
import enUS from "antd/locale/en_US";
import ManageShowtimePage from "./pages/admin/manage.showtime";
import WeekDatePicker from "./pages/client/uuDai/Test";
import ManageGuestPage from "./pages/admin/manage.guest";
import ManageBookingGuestPage from "./pages/admin/mange.booking.guest";

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
        path: "/phim-dang-chieu",
        element: <UuDai />
      },
      {
        path: "/phim-sap-chieu",
        element: <UuDai />
      },
      {
        path: "/uu-dai",
        element: <UuDai />
      },
      {
        path: "/tin-tuc-phim",
        element: <UuDai />
      },
      {
        path: "/tai-khoan-antin",
        element: <UuDai />
      },
      {
        path: "/quyen-loi",
        element: <UuDai />
      },
      {
        path: "/test-abc",
        element: <UuDai />
      },
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
        path: "booking/user",
        element: (
          <ProtectedRoute>
            <ManageBookingUserPage />
          </ProtectedRoute>
        )
      },
      {
        path: "booking/guest",
        element: (
          <ProtectedRoute>
            <ManageBookingGuestPage />
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
      },
      {
        path: "voucher",
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
    path: "/test2",
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
