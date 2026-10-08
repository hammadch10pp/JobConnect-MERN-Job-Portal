import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");

        console.log("Jobs response:", response.data);

        setJobs(response.data.jobs || []);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load jobs."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.toLowerCase().includes(searchText) ||
      job.location?.toLowerCase().includes(searchText) ||
      job.skills?.toString().toLowerCase().includes(searchText);

    const matchesType =
      jobType === "All" || job.jobType === jobType;

    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="jobs-page">
        <div className="jobs-header">
          <p className="section-tag">JOB OPPORTUNITIES</p>
          <h1>Find your next <span>opportunity.</span></h1>
          <p>
            Explore available positions and discover a role
            that matches your skills and career goals.
          </p>
        </div>

        <div className="jobs-loading">
          <div className="loading-spinner"></div>
          <p>Loading available jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-page">
        <div className="jobs-header">
          <p className="section-tag">JOB OPPORTUNITIES</p>
          <h1>Find your next <span>opportunity.</span></h1>
        </div>

        <div className="jobs-error">
          <div className="error-icon">!</div>

          <h2>Unable to load jobs</h2>

          <p>{error}</p>

          <button
            className="primary-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-page">

      {/* ================================
          PAGE HEADER
      ================================= */}

      <div className="jobs-header">

        <p className="section-tag">
          JOB OPPORTUNITIES
        </p>

        <h1>
          Find your next <span>opportunity.</span>
        </h1>

        <p>
          Explore available positions and discover a role
          that matches your skills and career goals.
        </p>

      </div>


      {/* ================================
          SEARCH & FILTER
      ================================= */}

      <div className="jobs-toolbar">

        <div className="search-box">

          <span className="search-icon">
            🔎
          </span>

          <input
            type="text"
            placeholder="Search jobs, companies, locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <div className="filter-box">

          <label htmlFor="jobType">
            Job Type
          </label>

          <select
            id="jobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="All">All Jobs</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>

        </div>

      </div>


      {/* ================================
          RESULTS INFO
      ================================= */}

      <div className="jobs-results">

        <p>
          <strong>{filteredJobs.length}</strong>{" "}
          {filteredJobs.length === 1
            ? "job"
            : "jobs"} found
        </p>

        {(search || jobType !== "All") && (
          <button
            className="clear-filter-btn"
            onClick={() => {
              setSearch("");
              setJobType("All");
            }}
          >
            Clear filters
          </button>
        )}

      </div>


      {/* ================================
          EMPTY STATE
      ================================= */}

      {filteredJobs.length === 0 ? (

        <div className="jobs-empty">

          <div className="empty-icon">
            🔍
          </div>

          <h2>
            No matching jobs found
          </h2>

          <p>
            Try changing your search or filter to find
            more opportunities.
          </p>

          <button
            className="secondary-btn"
            onClick={() => {
              setSearch("");
              setJobType("All");
            }}
          >
            Clear Search
          </button>

        </div>

      ) : (

        /* ================================
           JOB CARDS
        ================================= */

        <div className="jobs-grid">

          {filteredJobs.map((job) => (

            <div
              className="job-card"
              key={job._id}
            >

              {/* Card Top */}

              <div className="job-card-top">

                <div className="company-logo">
                  {job.company
                    ? job.company.charAt(0).toUpperCase()
                    : "J"}
                </div>

                <span className="job-type-badge">
                  {job.jobType}
                </span>

              </div>


              {/* Job Information */}

              <div className="job-card-content">

                <h2>
                  {job.title}
                </h2>

                <p className="job-company">
                  {job.company}
                </p>


                <div className="job-meta">

                  <span>
                    📍 {job.location}
                  </span>

                  <span>
                    💼 {job.experience}
                  </span>

                </div>


                <div className="job-salary">
                  💰 {job.salary || "Salary not specified"}
                </div>


                {/* Skills */}

                {job.skills && (
                  <div className="job-skills">

                    {Array.isArray(job.skills)
                      ? job.skills.slice(0, 4).map(
                          (skill, index) => (
                            <span key={index}>
                              {skill}
                            </span>
                          )
                        )
                      : job.skills
                          .toString()
                          .split(",")
                          .slice(0, 4)
                          .map(
                            (skill, index) => (
                              <span key={index}>
                                {skill.trim()}
                              </span>
                            )
                          )}

                  </div>
                )}

              </div>


              {/* Card Footer */}

              <div className="job-card-footer">

                <Link
                  to={`/jobs/${job._id}`}
                  className="job-details-btn"
                >
                  View Details
                  <span>→</span>
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Jobs;