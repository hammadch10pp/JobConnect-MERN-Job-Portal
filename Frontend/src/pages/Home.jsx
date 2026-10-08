import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* ================================
          HERO SECTION
      ================================= */}

      <section className="hero">
        <div className="hero-content">

          <p className="hero-tag">
            🚀 Your Career Starts Here
          </p>

          <h1>
            Find the right job.
            <br />
            Build your <span>future.</span>
          </h1>

          <p className="hero-description">
            JobConnect connects talented professionals with companies
            looking for the right people. Discover opportunities, apply
            with confidence, and take the next step in your career.
          </p>

          <div className="hero-buttons">
            <Link to="/jobs" className="primary-btn">
              Browse Jobs →
            </Link>

            <Link to="/register" className="secondary-btn">
              Create Free Account
            </Link>
          </div>

          {/* Platform Highlights */}

          <div className="hero-stats">

            <div className="hero-stat">
              <strong>MERN</strong>
              <span>Full-Stack Platform</span>
            </div>

            <div className="hero-stat">
              <strong>REST</strong>
              <span>API Integration</span>
            </div>

            <div className="hero-stat">
              <strong>JWT</strong>
              <span>Secure Authentication</span>
            </div>

          </div>

        </div>
      </section>


      {/* ================================
          FEATURES SECTION
      ================================= */}

      <section className="features-section">

        <div className="section-heading">

          <p className="section-tag">
            WHY JOBCONNECT?
          </p>

          <h2>
            Everything you need to
            <span> find your next opportunity.</span>
          </h2>

          <p>
            A simple platform designed to make job searching and
            hiring easier for everyone.
          </p>

        </div>


        <div className="features">

          {/* Find Jobs */}

          <div className="feature-card">

            <div className="feature-icon">
              🔎
            </div>

            <h3>
              Find Jobs
            </h3>

            <p>
              Search and discover opportunities that match your
              skills, experience, and career goals.
            </p>

            <Link
              to="/jobs"
              className="feature-link"
            >
              Explore Jobs →
            </Link>

          </div>


          {/* Apply Easily */}

          <div className="feature-card">

            <div className="feature-icon">
              📄
            </div>

            <h3>
              Apply Easily
            </h3>

            <p>
              Submit applications quickly and keep track of your
              application status from one place.
            </p>

            <Link
              to="/jobs"
              className="feature-link"
            >
              Start Applying →
            </Link>

          </div>


          {/* Hire Talent */}

          <div className="feature-card">

            <div className="feature-icon">
              💼
            </div>

            <h3>
              Hire Talent
            </h3>

            <p>
              Employers can post opportunities and manage candidates
              through a dedicated dashboard.
            </p>

            <Link
              to="/register"
              className="feature-link"
            >
              Start Hiring →
            </Link>

          </div>

        </div>

      </section>


      {/* ================================
          HOW IT WORKS
      ================================= */}

      <section className="how-it-works">

        <div className="section-heading">

          <p className="section-tag">
            HOW IT WORKS
          </p>

          <h2>
            Start your journey in
            <span> three simple steps.</span>
          </h2>

        </div>


        <div className="steps">

          {/* Step 1 */}

          <div className="step">

            <div className="step-number">
              01
            </div>

            <h3>
              Create an Account
            </h3>

            <p>
              Sign up as a job seeker or employer and create your
              JobConnect account.
            </p>

          </div>


          {/* Step 2 */}

          <div className="step">

            <div className="step-number">
              02
            </div>

            <h3>
              Discover Opportunities
            </h3>

            <p>
              Browse available jobs and find positions that match
              your skills and career goals.
            </p>

          </div>


          {/* Step 3 */}

          <div className="step">

            <div className="step-number">
              03
            </div>

            <h3>
              Take the Next Step
            </h3>

            <p>
              Apply for your desired position or connect with
              talented candidates as an employer.
            </p>

          </div>

        </div>

      </section>


      {/* ================================
          FINAL CTA
      ================================= */}

      <section className="home-cta">

        <div>

          <p className="section-tag">
            READY TO GET STARTED?
          </p>

          <h2>
            Your next opportunity
            <br />
            could be <span>one click away.</span>
          </h2>

          <p>
            Explore available jobs and take the next step toward
            your career goals.
          </p>

          <Link
            to="/jobs"
            className="primary-btn"
          >
            Explore Jobs →
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;