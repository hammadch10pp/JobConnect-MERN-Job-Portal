import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      console.log("Login response:", response.data);

      // Save JWT token
      localStorage.setItem("token", response.data.token);

      // Save user information if returned by backend
      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      // Redirect after successful login
      window.location.href = "/jobs";
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* =========================
          LEFT — VISUAL SECTION
      ========================= */}

      <div className="login-visual">
        <div className="login-overlay">

          <span className="login-badge">
            JOB CONNECT
          </span>

          <h1>
            Build your career.
            <br />
            Find your <span>opportunity.</span>
          </h1>

          <p>
            Connect with companies, discover opportunities,
            and take the next step in your professional journey.
          </p>

          <div className="login-highlights">

            <div>
              <strong>01</strong>
              <span>Discover Jobs</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Apply Easily</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Grow Your Career</span>
            </div>

          </div>

        </div>
      </div>

      {/* =========================
          RIGHT — LOGIN FORM
      ========================= */}

      <div className="login-form-area">

        <div className="login-form-container">

          <div className="login-form-header">

            <p className="section-tag">
              WELCOME BACK
            </p>

            <h2>
              Sign in to your <span>account</span>
            </h2>

            <p>
              Access your JobConnect account and continue
              your career journey.
            </p>

          </div>

          {/* ERROR */}

          {error && (
            <div className="form-alert error-alert">
              <span>!</span>
              {error}
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            {/* EMAIL */}

            <div className="form-field">

              <label>
                Email Address <span>*</span>
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="form-field">

              <label>
                Password <span>*</span>
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="login-submit-btn"
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <span>→</span>
                </>
              )}
            </button>

          </form>

          {/* REGISTER */}

          <div className="login-register">

            <p>
              Don't have an account?{" "}
              <Link to="/register">
                Create Account
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;