import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from '@/layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from 'pages/client/home.tsx';
import UuDai from '@/pages/client/uuDai/uuDai';

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
      },
    ]
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
