import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"

import LoginForm from "./components/Login/LoginForm"
import Navigation from "./components/Navigation/Navigation"
import RegistrationForm from "./components/RegistrationForm/RegistrationForm"
import UserList from "./components/UserList/UserList"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

import "./App.scss"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("authenticationToken")
    setIsAuthenticated(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authenticationToken")
    setIsAuthenticated(false)
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  return (
    <>
      <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route
            path="/login"
            element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="/users" element={<UserList />} />
            {/* Add other protected routes here */}
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
