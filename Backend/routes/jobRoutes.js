const express = require("express");

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Get all jobs
router.get("/", getJobs);

// Get single job
router.get("/:id", getJobById);

// Create job - Employer/Admin only
router.post("/", protect, authorize("employer", "admin"), createJob);

// Update job - Employer/Admin only
router.put("/:id", protect, authorize("employer", "admin"), updateJob);

// Delete job - Employer/Admin only
router.delete("/:id", protect, authorize("employer", "admin"), deleteJob);

module.exports = router;