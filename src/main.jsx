import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import LoginPage from './components/LoginPage.jsx'

const router=createBrowserRouter(
  [
    {
      path: "/", 
      element: <LoginPage></LoginPage>
    }, 
    {
      path: "/home",
      element: <HomePage></HomePage>
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
