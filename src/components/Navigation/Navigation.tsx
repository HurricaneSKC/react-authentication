import React from "react"
import { Link } from "react-router-dom"
import "./Navigation.scss"

interface NavigationProps {
  isAuthenticated: boolean
  onLogout: () => void
}

const Navigation: React.FC<NavigationProps> = ({
  isAuthenticated,
  onLogout,
}) => {
  return (
    <nav className="Navigation">
      <div className="Right-Navigation">Some Logo</div>
      <ul className="Left-Navigation">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/users">User List</Link>
            </li>
            {/* Additional links for authenticated users */}
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
