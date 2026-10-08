import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });

  const [message, setMessage] = useState("");
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

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", formData);

      console.log("Registration response:", response.data);

      setMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* LEFT — VISUAL SECTION */}
      <div className="register-visual">
        <div className="register-overlay">

          <span className="register-badge">
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

          <div className="register-highlights">

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

      {/* RIGHT — REGISTER FORM */}
      <div className="register-form-area">

        <div className="register-form-container">

          <div className="register-form-header">
            <p className="section-tag">
              GET STARTED
            </p>

            <h2>
              Create your <span>account</span>
            </h2>

            <p>
              Join JobConnect and discover your next opportunity.
            </p>
          </div>

          {message && (
            <div className="form-alert success-alert">
              <span>✓</span>
              {message}
            </div>
          )}

          {error && (
            <div className="form-alert error-alert">
              <span>!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">

            {/* NAME */}
            <div className="form-field">
              <label>
                Full Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

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
                placeholder="Create a password"
                required
                minLength="6"
              />

              <small>
                Password must contain at least 6 characters.
              </small>
            </div>

            {/* ROLE */}
            <div className="form-field">
              <label>
                Register As <span>*</span>
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="jobseeker">
                  Job Seeker
                </option>

                <option value="employer">
                  Employer
                </option>
              </select>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="register-submit-btn"
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <span>→</span>
                </>
              )}
            </button>

          </form>

          <div className="register-login">
            <p>
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Register;