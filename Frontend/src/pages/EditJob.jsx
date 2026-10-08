import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    jobType: "Full-Time",
    salary: "",
    skills: "",
    category: "",
    experience: "Fresh",
    deadline: "",
    status: "Open",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch existing job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);

        const job = response.data.job;

        setFormData({
          title: job.title || "",
          description: job.description || "",
          company: job.company || "",
          location: job.location || "",
          jobType: job.jobType || "Full-Time",
          salary: job.salary || "",
          skills: job.skills ? job.skills.join(", ") : "",
          category: job.category || "",
          experience: job.experience || "Fresh",
          deadline: job.deadline
            ? job.deadline.split("T")[0]
            : "",
          status: job.status || "Open",
        });
      } catch (error) {
        console.error("Fetch job error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load job."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login as an employer.");
        setSaving(false);
        return;
      }

      const jobData = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
      };

      const response = await api.put(`/jobs/${id}`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Updated job:", response.data);

      setMessage("Job updated successfully!");

      setTimeout(() => {
        navigate("/jobs");
      }, 1200);
    } catch (error) {
      console.error("Update job error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update job."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          width: "90%",
          maxWidth: "900px",
          margin: "50px auto",
        }}
      >
        <h2>Loading job...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "900px",
        margin: "50px auto",
      }}
    >
      <h1>Edit Job</h1>

      <p
        style={{
          marginTop: "10px",
          color: "#64748b",
        }}
      >
        Update the details of your job posting.
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
        {/* Job Title */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Job Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Job Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="7"
            required
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
          />
        </div>

        {/* Company */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Company</label>

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Location */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Location</label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Job Type */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Job Type</label>

          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        {/* Salary */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Salary</label>

          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. PKR 50,000 - 80,000"
            style={inputStyle}
          />
        </div>

        {/* Skills */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Skills</label>

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            style={inputStyle}
          />

          <p
            style={{
              marginTop: "6px",
              fontSize: "13px",
              color: "#64748b",
            }}
          >
            Separate skills with commas.
          </p>
        </div>

        {/* Category */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Category</label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Experience */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Experience</label>

          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Fresh">Fresh</option>
            <option value="0-1 Years">0-1 Years</option>
            <option value="1-2 Years">1-2 Years</option>
            <option value="2-3 Years">2-3 Years</option>
            <option value="3+ Years">3+ Years</option>
          </select>
        </div>

        {/* Deadline */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>
            Application Deadline
          </label>

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Status */}
        <div style={{ marginBottom: "25px" }}>
          <label style={labelStyle}>Job Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="primary-btn"
          style={{
            border: "none",
            cursor: saving ? "not-allowed" : "pointer",
            fontSize: "15px",
          }}
        >
          {saving ? "Updating Job..." : "Update Job"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/jobs")}
          style={{
            marginLeft: "10px",
            padding: "10px 16px",
            border: "1px solid #cbd5e1",
            background: "white",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  fontSize: "15px",
  background: "white",
};

export default EditJob;