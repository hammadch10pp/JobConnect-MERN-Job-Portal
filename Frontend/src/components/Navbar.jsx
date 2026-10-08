import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
  document.documentElement.classList.toggle("dark-mode", darkMode);

  localStorage.setItem(
    "theme",
    darkMode ? "dark" : "light"
  );
}, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          JobConnect
        </Link>

        <div className="nav-links">

          <Link to="/">Home</Link>

          <Link to="/jobs">Jobs</Link>

          {isLoggedIn && user?.role === "jobseeker" && (
            <Link to="/my-applications">
              My Applications
            </Link>
          )}

          {isLoggedIn && user?.role === "employer" && (
            <>
              <Link to="/create-job">
                <span className="post-job-btn">
                  + Post a Job
                </span>
              </Link>

              <Link to="/employer-dashboard">
                Dashboard
              </Link>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
              >
                Register
              </Link>
            </>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          )}

          {/* DARK MODE */}

                    <button
            type="button"
            className="theme-toggle"
            onClick={() => {
              setDarkMode((prev) => !prev);
            }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;