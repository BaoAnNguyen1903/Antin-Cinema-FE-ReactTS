import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "@/layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "pages/client/home.tsx";
import UuDai from "@/pages/client/uuDai/uuDai";
import { App } from "antd";
import { AppProvider } from "./components/context/app.context";
import LoginPage from "./pages/client/auth/login";
import RegisterPage from "./pages/client/auth/register";

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
