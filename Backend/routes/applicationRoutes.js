const express = require("express");
const router = express.Router();
const { getUserApplications, applyForJob , updateApplicationRound} = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware"); // use real middleware

// ✅ Use protect middleware to decode JWT and attach user
router.use(protect);

// GET /api/applications → Get all applications for logged-in user
router.get("/", getUserApplications);

// POST /api/applications→ Apply for a job
router.post("/", applyForJob);

// PATCH /api/applications/:id/update-round
router.patch('/:id/update-round', updateApplicationRound);

module.exports = router;
