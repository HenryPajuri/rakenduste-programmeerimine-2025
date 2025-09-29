import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.tsx'
import Home from './components/Home.tsx'
import Something from './components/Something.tsx'
import About from './components/About.tsx'

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "something",
        element: <Something />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
