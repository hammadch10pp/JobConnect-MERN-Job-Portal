
import { useEffect, useState } from "react";
import api from "../services/api";

function EmployerDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login as an employer.");
        setLoading(false);
        return;
      }

      const response = await api.get(
        "/applications/employer-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Employer applications:",
        response.data
      );

      setApplications(response.data.applications || []);
    } catch (error) {
      console.error(
        "Failed to fetch employer applications:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.put(
        `/applications/${applicationId}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Status update:",
        response.data
      );

      // Update the application immediately on screen
      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status: response.data.application.status,
              }
            : application
        )
      );
    } catch (error) {
      console.error(
        "Failed to update status:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update application status."
      );
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Employer Dashboard</h1>
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
          maxWidth: "1100px",
          margin: "50px auto",
        }}
      >
        <h1>Employer Dashboard</h1>

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
      <h1>Employer Dashboard</h1>

      <p
        style={{
          marginTop: "10px",
          color: "#64748b",
        }}
      >
        Manage applications submitted for your jobs.
      </p>

      <div
        style={{
          marginTop: "25px",
          padding: "20px",
          background: "#f1f5f9",
          borderRadius: "8px",
        }}
      >
        <strong>Total Applications:</strong>{" "}
        {applications.length}
      </div>

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
            No one has applied for your jobs yet.
          </p>
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
                      "Job Title"}
                  </h2>

                  <p
                    style={{
                      marginTop: "8px",
                      color: "#475569",
                    }}
                  >
                    <strong>Company:</strong>{" "}
                    {application.job?.company || "N/A"}
                  </p>

                  <p
                    style={{
                      marginTop: "6px",
                      color: "#475569",
                    }}
                  >
                    <strong>Location:</strong>{" "}
                    {application.job?.location || "N/A"}
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
                          "Reviewed"
                        ? "#e0f2fe"
                        : application.status ===
                          "Shortlisted"
                        ? "#dcfce7"
                        : application.status ===
                          "Rejected"
                        ? "#fee2e2"
                        : "#dbeafe",
                    color:
                      application.status ===
                      "Rejected"
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
                  borderTop:
                    "1px solid #e2e8f0",
                }}
              >
                <h3>Applicant</h3>

                <p style={{ marginTop: "8px" }}>
                  <strong>Name:</strong>{" "}
                  {application.applicant?.name ||
                    "N/A"}
                </p>

                <p style={{ marginTop: "6px" }}>
                  <strong>Email:</strong>{" "}
                  {application.applicant?.email ||
                    "N/A"}
                </p>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "20px",
                  borderTop:
                    "1px solid #e2e8f0",
                }}
              >
                <h3>Application Details</h3>

                <p
                  style={{
                    marginTop: "10px",
                    lineHeight: "1.6",
                    color: "#475569",
                  }}
                >
                  <strong>Cover Letter:</strong>
                  <br />
                  {application.coverLetter ||
                    "No cover letter provided."}
                </p>

                <p
                  style={{
                    marginTop: "12px",
                  }}
                >
                  <strong>Resume:</strong>{" "}
                  {application.resume ||
                    "Not provided"}
                </p>
              </div>

              <div
                style={{
                  marginTop: "25px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <label>
                  <strong>Update Status:</strong>
                </label>

                <select
                  value={application.status}
                  onChange={(e) =>
                    updateStatus(
                      application._id,
                      e.target.value
                    )
                  }
                  style={{
                    padding: "10px 12px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "6px",
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Reviewed">
                    Reviewed
                  </option>

                  <option value="Shortlisted">
                    Shortlisted
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                  <option value="Hired">
                    Hired
                  </option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployerDashboard;
