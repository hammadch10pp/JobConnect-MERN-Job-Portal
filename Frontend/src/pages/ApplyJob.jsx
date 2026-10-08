
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login before applying for a job.");
        setLoading(false);
        return;
      }

      const response = await api.post(
        `/applications/job/${id}`,
        {
          coverLetter,
          resume,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Application response:", response.data);

      setMessage("Application submitted successfully!");

      setTimeout(() => {
        navigate("/my-applications");
      }, 1500);
    } catch (error) {
      console.error("Application error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to submit application."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "700px",
        margin: "50px auto",
      }}
    >
      <h1>Apply for Job</h1>

      <p
        style={{
          marginTop: "10px",
          color: "#64748b",
        }}
      >
        Submit your application for this position.
      </p>

      {message && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#dcfce7",
            color: "#166534",
            borderRadius: "6px",
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#fee2e2",
            color: "#991b1b",
            borderRadius: "6px",
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "30px",
          marginTop: "25px",
          borderRadius: "10px",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Cover Letter
          </label>

          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Write your cover letter..."
            rows="8"
            required
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "15px",
              resize: "vertical",
            }}
          />
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Resume
          </label>

          <input
            type="text"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Enter resume file name or link"
            required
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "15px",
            }}
          />

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Example: Hammad_Ul_Rehman_Resume.pdf
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="primary-btn"
          style={{
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "15px",
          }}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

export default ApplyJob;
