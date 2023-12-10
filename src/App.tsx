import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginForm from "./components/Login/LoginForm"
import Navigation from "./components/Navigation/Navigation"
import RegistrationForm from "./components/RegistrationForm"
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

  return (
    <BrowserRouter>
      <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="/users" element={<UserList />} />
            {/* Add other protected routes here */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
