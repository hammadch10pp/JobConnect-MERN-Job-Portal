const Job = require("../models/Job");

// CREATE JOB
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      jobType,
      salary,
      skills,
      category,
      experience,
      deadline,
    } = req.body;

    if (
      !title ||
      !description ||
      !company ||
      !location ||
      !jobType ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, company, location, job type and category are required",
      });
    }

    const job = await Job.create({
      title,
      description,
      company,
      location,
      jobType,
      salary,
      skills,
      category,
      experience,
      deadline,
      employer: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create job",
      error: error.message,
    });
  }
};

// GET ALL JOBS
// GET ALL JOBS + SEARCH + FILTER
const getJobs = async (req, res) => {
  try {
    const {
      search,
      location,
      jobType,
      category,
      experience,
      status,
    } = req.query;

    const filter = {};

    // Search by title, company, description or skills
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by location
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // Filter by job type
    if (jobType) {
      filter.jobType = jobType;
    }

    // Filter by category
    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    // Filter by experience
    if (experience) {
      filter.experience = { $regex: experience, $options: "i" };
    }

    // Filter by status
    if (status) {
      filter.status = status;
    }

    const jobs = await Job.find(filter)
  .populate("employer", "name email")
  .sort({ createdAt: -1 });

console.log("========== ALL JOBS ==========");

jobs.forEach((job) => {
  console.log({
    title: job.title,
    company: job.company,
    employerId: job.employer?._id,
    employerEmail: job.employer?.email,
  });
});

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get jobs",
      error: error.message,
    });
  }
};

// GET SINGLE JOB
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "employer",
      "name email"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get job",
      error: error.message,
    });
  }
};

// UPDATE JOB
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check job ownership
    if (
      job.employer.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own jobs",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("employer", "name email");

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update job",
      error: error.message,
    });
  }
};

// DELETE JOB
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check job ownership
    if (
      job.employer.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own jobs",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete job",
      error: error.message,
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};