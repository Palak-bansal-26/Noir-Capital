const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { protect, authorize } = require("../middleware/authMiddleware");

// GET jobs → public
router.get("/", jobController.getJobs);

// Create job → only admin/HR
router.post("/", protect, authorize("admin", "hr"), jobController.createJob);


module.exports = router;
