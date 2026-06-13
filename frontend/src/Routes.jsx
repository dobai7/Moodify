import { createBrowserRouter } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Loading from "./features/auth/pages/Loading"
import Dashboard from "./features/dashboard/pages/Dashboard"
import App from "./App"

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
])

export default router