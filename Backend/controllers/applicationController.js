const Application = require("../models/Application");
const Job = require("../models/Job");

// APPLY FOR JOB
const applyForJob = async (req, res) => {
  try {
    const { coverLetter, resume } = req.body;
    const jobId = req.params.jobId;

    // Check if job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check if job is open
    if (job.status !== "Open") {
      return res.status(400).json({
        success: false,
        message: "This job is no longer accepting applications",
      });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      coverLetter: coverLetter || "",
      resume: resume || "",
    });

    const populatedApplication = await Application.findById(
      application._id
    )
      .populate("job", "title company location")
      .populate("applicant", "name email");

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application: populatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to apply for job",
      error: error.message,
    });
  }
};

// GET MY APPLICATIONS
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    })
      .populate("job", "title company location jobType salary")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get applications",
      error: error.message,
    });
  }
};
// GET APPLICATIONS FOR EMPLOYER'S JOBS
// GET APPLICATIONS FOR EMPLOYER'S JOBS
const getEmployerApplications = async (req, res) => {
  try {
    console.log("========== EMPLOYER APPLICATION DEBUG ==========");
    console.log("Logged in user:", req.user);

    const jobs = await Job.find({
      employer: req.user.id,
    }).select("_id title company employer");

    console.log("Employer ID:", req.user.id);
    console.log("Employer jobs:", jobs);

    const jobIds = jobs.map((job) => job._id);

    console.log("Job IDs:", jobIds);

    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("job", "title company location jobType salary employer")
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    console.log("Applications found:", applications);

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Employer applications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get employer applications",
      error: error.message,
    });
  }
};

// UPDATE APPLICATION STATUS
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Reviewed",
      "Shortlisted",
      "Rejected",
      "Hired",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findById(req.params.id).populate(
      "job"
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Make sure this employer owns the job
    if (application.job.employer.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this application",
      });
    }

    application.status = status;

    await application.save();

    const updatedApplication = await Application.findById(application._id)
      .populate("job", "title company location jobType salary")
      .populate("applicant", "name email");

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update application status",
      error: error.message,
    });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getEmployerApplications,
  updateApplicationStatus,
};