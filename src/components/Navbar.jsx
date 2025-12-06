import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(localStorage.getItem("isAuthenticated") === "true");
  const [username, setUsername] = React.useState(localStorage.getItem("username") || "User");

  React.useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
      setUsername(localStorage.getItem("username") || "User");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-logo">TaskFlow</span>
          <span className="brand-tagline">Productivity made simple</span>
        </div>

        <div className="navbar-links">
          <Link to="/home" className={`nav-link ${isActive('/home')}`}>
            <span className="icon">🏠</span> Dashboard
          </Link>
          <Link to="/tasks" className={`nav-link ${isActive('/tasks')}`}>
            <span className="icon">📋</span> Tasks
          </Link>
          <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>
            <span className="icon">📁</span> Projects
          </Link>
          <Link to="/analytics" className={`nav-link ${isActive('/analytics')}`}>
            <span className="icon">📊</span> Analytics
          </Link>
        </div>

        <div className="navbar-actions">
          <Link to="/help" className="nav-link-secondary">❓ Help</Link>
          <Link to="/about" className="nav-link-secondary">ℹ️ About</Link>

          {isAuthenticated ? (
            <>
              <div className="user-profile">
                <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
                <span>{username}</span>
                <span className="dropdown-arrow">▼</span>
              </div>
              <button className="btn-signout" onClick={handleLogout}>Sign out</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;