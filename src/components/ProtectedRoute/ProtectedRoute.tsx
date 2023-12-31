import React from "react"
import { Navigate, Outlet } from "react-router-dom"

interface ProtectedRouteProps {
  isAuthenticated: boolean
  redirectPath?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  redirectPath = "/login",
}) => {
  if (!isAuthenticated) {
    console.log("not authenticated redirected to /")
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
