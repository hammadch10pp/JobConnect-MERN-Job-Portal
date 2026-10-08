
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to view your applications.");
          setLoading(false);
          return;
        }

        const response = await api.get(
          "/applications/my-applications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "My applications response:",
          response.data
        );

        setApplications(response.data.applications || []);
      } catch (error) {
        console.error(
          "Failed to fetch applications:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load your applications."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>My Applications</h1>
        <p style={{ marginTop: "20px" }}>
          Loading applications...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width: "90%",
          maxWidth: "1000px",
          margin: "50px auto",
        }}
      >
        <h1>My Applications</h1>

        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            background: "#fee2e2",
            color: "#991b1b",
            borderRadius: "6px",
          }}
        >
          {error}
        </div>

        <Link
          to="/jobs"
          style={{
            display: "inline-block",
            marginTop: "20px",
          }}
        >
          Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "1100px",
        margin: "50px auto",
      }}
    >
      <h1>My Applications</h1>

      <p
        style={{
          marginTop: "10px",
          color: "#64748b",
        }}
      >
        Track the jobs you have applied for.
      </p>

      {applications.length === 0 ? (
        <div
          className="feature-card"
          style={{ marginTop: "30px" }}
        >
          <h2>No Applications Yet</h2>

          <p
            style={{
              marginTop: "10px",
              color: "#64748b",
            }}
          >
            You haven't applied for any jobs yet.
          </p>

          <Link
            to="/jobs"
            className="primary-btn"
            style={{
              display: "inline-block",
              marginTop: "20px",
            }}
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {applications.map((application) => (
            <div
              key={application._id}
              className="feature-card"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h2>
                    {application.job?.title ||
                      "Job Title Not Available"}
                  </h2>

                  <p
                    style={{
                      marginTop: "8px",
                      color: "#475569",
                    }}
                  >
                    <strong>Company:</strong>{" "}
                    {application.job?.company ||
                      "N/A"}
                  </p>

                  <p
                    style={{
                      marginTop: "6px",
                      color: "#475569",
                    }}
                  >
                    <strong>Location:</strong>{" "}
                    {application.job?.location ||
                      "N/A"}
                  </p>
                </div>

                <span
                  style={{
                    padding: "8px 14px",
                    borderRadius: "20px",
                    background:
                      application.status === "Pending"
                        ? "#fef3c7"
                        : application.status ===
                          "Shortlisted"
                        ? "#dcfce7"
                        : application.status ===
                          "Hired"
                        ? "#dbeafe"
                        : application.status ===
                          "Rejected"
                        ? "#fee2e2"
                        : "#e2e8f0",
                    color:
                      application.status === "Rejected"
                        ? "#991b1b"
                        : "#334155",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  {application.status}
                </span>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "20px",
                  borderTop: "1px solid #e2e8f0",
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "15px",
                }}
              >
                <div>
                  <strong>Job Type</strong>
                  <p style={{ marginTop: "5px" }}>
                    {application.job?.jobType || "N/A"}
                  </p>
                </div>

                <div>
                  <strong>Salary</strong>
                  <p style={{ marginTop: "5px" }}>
                    {application.job?.salary || "N/A"}
                  </p>
                </div>

                <div>
                  <strong>Applied On</strong>
                  <p style={{ marginTop: "5px" }}>
                    {application.createdAt
                      ? new Date(
                          application.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;
