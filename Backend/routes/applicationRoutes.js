const express = require("express");

const {
  applyForJob,
  getMyApplications,
  getEmployerApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Apply for a job - Jobseeker only
router.post(
  "/job/:jobId",
  protect,
  authorize("jobseeker"),
  applyForJob
);

// Get logged-in jobseeker's applications
router.get(
  "/my-applications",
  protect,
  authorize("jobseeker"),
  getMyApplications
);

// Get applications for employer's jobs
router.get(
  "/employer-applications",
  protect,
  authorize("employer"),
  getEmployerApplications
);

// Update application status - Employer only
router.put(
  "/:id/status",
  protect,
  authorize("employer"),
  updateApplicationStatus
);

module.exports = router;