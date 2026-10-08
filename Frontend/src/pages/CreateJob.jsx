import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateJob() {
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
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login as an employer first.");
        setLoading(false);
        return;
      }

      const jobData = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
      };

      const response = await api.post("/jobs", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Job created:", response.data);

      setMessage("Job created successfully!");

      setTimeout(() => {
        navigate("/jobs");
      }, 1500);
    } catch (error) {
      console.error("Create job error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-job-page">

      {/* Header */}

      <div className="create-job-header">

        <div>
          <p className="create-job-eyebrow">
            EMPLOYER CENTER
          </p>

          <h1>
            Create a <span>New Job</span>
          </h1>

          <p>
            Publish a job opportunity and connect with qualified
            candidates.
          </p>
        </div>

        <div className="create-job-icon">
          💼
        </div>

      </div>


      {/* Success Message */}

      {message && (
        <div className="form-alert success-alert">
          <span>✓</span>
          {message}
        </div>
      )}


      {/* Error Message */}

      {error && (
        <div className="form-alert error-alert">
          <span>!</span>
          {error}
        </div>
      )}


      {/* Form */}

      <form
        className="create-job-form"
        onSubmit={handleSubmit}
      >

        {/* Basic Information */}

        <div className="form-section">

          <div className="form-section-heading">
            <div className="form-section-icon">
              📋
            </div>

            <div>
              <h2>Basic Information</h2>
              <p>
                Add the main details about this position.
              </p>
            </div>
          </div>


          <div className="form-grid">

            {/* Job Title */}

            <div className="form-field full-width">

              <label>
                Job Title <span>*</span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. MERN Stack Developer"
                required
              />

            </div>


            {/* Company */}

            <div className="form-field">

              <label>
                Company <span>*</span>
              </label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Tech Solutions"
                required
              />

            </div>


            {/* Location */}

            <div className="form-field">

              <label>
                Location <span>*</span>
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Lahore, Pakistan"
                required
              />

            </div>

          </div>

        </div>


        {/* Job Details */}

        <div className="form-section">

          <div className="form-section-heading">

            <div className="form-section-icon">
              ⚙️
            </div>

            <div>
              <h2>Job Details</h2>
              <p>
                Define the position, requirements and compensation.
              </p>
            </div>

          </div>


          <div className="form-grid">

            {/* Job Type */}

            <div className="form-field">

              <label>
                Job Type
              </label>

              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="Full-Time">
                  Full-Time
                </option>

                <option value="Part-Time">
                  Part-Time
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Contract">
                  Contract
                </option>

                <option value="Remote">
                  Remote
                </option>
              </select>

            </div>


            {/* Experience */}

            <div className="form-field">

              <label>
                Experience
              </label>

              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="Fresh">
                  Fresh
                </option>

                <option value="0-1 Years">
                  0-1 Years
                </option>

                <option value="1-2 Years">
                  1-2 Years
                </option>

                <option value="2-3 Years">
                  2-3 Years
                </option>

                <option value="3+ Years">
                  3+ Years
                </option>
              </select>

            </div>


            {/* Salary */}

            <div className="form-field">

              <label>
                Salary
              </label>

              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. PKR 50,000 - 80,000"
              />

            </div>


            {/* Category */}

            <div className="form-field">

              <label>
                Category <span>*</span>
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Software Development"
                required
              />

            </div>


            {/* Skills */}

            <div className="form-field full-width">

              <label>
                Required Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, Express"
              />

              <small>
                Separate multiple skills with commas.
              </small>

            </div>


            {/* Deadline */}

            <div className="form-field">

              <label>
                Application Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>


        {/* Description */}

        <div className="form-section">

          <div className="form-section-heading">

            <div className="form-section-icon">
              📝
            </div>

            <div>
              <h2>Job Description</h2>
              <p>
                Explain the responsibilities and requirements.
              </p>
            </div>

          </div>


          <div className="form-field">

            <label>
              Description <span>*</span>
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, requirements and what you are looking for..."
              rows="8"
              required
            />

          </div>

        </div>


        {/* Form Footer */}

        <div className="create-job-footer">

          <p>
            <span>✓</span>
            Make sure all job information is accurate before publishing.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="create-job-submit"
          >
            {loading ? (
              <>
                <span className="button-spinner"></span>
                Creating Job...
              </>
            ) : (
              <>
                Publish Job
                <span>→</span>
              </>
            )}
          </button>

        </div>

      </form>

    </div>
  );
}

export default CreateJob;