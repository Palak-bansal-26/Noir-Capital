const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getUserApplications, applyForJob } = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");

// ensure uploads/resumes exists
const fs = require("fs");
const resumesDir = path.join(process.cwd(), "uploads", "resumes");
fs.mkdirSync(resumesDir, { recursive: true });

// configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, resumesDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\\-_]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});
const upload = multer({ storage });

// protect all application routes (login required)
router.use(protect);

router.get("/", getUserApplications);
router.post("/", upload.single("resume"), applyForJob);

module.exports = router;
