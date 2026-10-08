
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);

        console.log("Job details response:", response.data);

        setJob(response.data.job);
      } catch (error) {
        console.error("Failed to fetch job:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load job details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Job Details</h1>
        <p style={{ marginTop: "20px" }}>Loading job...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Job Details</h1>

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

        <Link
          to="/jobs"
          style={{
            display: "inline-block",
            marginTop: "20px",
          }}
        >
          ← Back to Jobs
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Job Not Found</h1>

        <Link to="/jobs">← Back to Jobs</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "1000px",
        margin: "50px auto",
      }}
    >
      <Link to="/jobs">← Back to Jobs</Link>

      <div
        style={{
          background: "white",
          padding: "35px",
          marginTop: "25px",
          borderRadius: "10px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h1>{job.title}</h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "18px",
            color: "#475569",
          }}
        >
          {job.company}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "25px",
          }}
        >
          <span>📍 {job.location}</span>
          <span>💼 {job.jobType}</span>
          <span>💰 {job.salary}</span>
          <span>🎓 {job.experience}</span>
        </div>

        <hr
          style={{
            margin: "30px 0",
            border: "none",
            borderTop: "1px solid #e2e8f0",
          }}
        />

        <h2>Description</h2>

        <p
          style={{
            marginTop: "15px",
            color: "#475569",
            lineHeight: "1.7",
            whiteSpace: "pre-line",
          }}
        >
          {job.description}
        </p>

        <h2 style={{ marginTop: "30px" }}>Skills</h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          {job.skills?.map((skill, index) => (
            <span
              key={index}
              style={{
                background: "#e0f2fe",
                color: "#0369a1",
                padding: "8px 12px",
                borderRadius: "6px",
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        <h2 style={{ marginTop: "30px" }}>Category</h2>

        <p style={{ marginTop: "10px" }}>{job.category}</p>

        {job.deadline && (
          <>
            <h2 style={{ marginTop: "30px" }}>Application Deadline</h2>

            <p style={{ marginTop: "10px" }}>
              {new Date(job.deadline).toLocaleDateString()}
            </p>
          </>
        )}

        <Link
          to={`/jobs/${job._id}/apply`}
          className="primary-btn"
          style={{
            display: "inline-block",
            marginTop: "30px",
          }}
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}

export default JobDetails;
