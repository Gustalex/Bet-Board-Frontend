import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'

import Landing from './pages/landing/Landing.jsx'
import Register from './pages/register/Register.jsx'
import Login from './pages/login/Login.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
