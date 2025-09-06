const Application = require("../models/Application");
const Job = require("../models/Job");

/**
 * GET /api/applications
 * Returns applications for the logged-in user
 */
exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id })
      .populate("jobId", "title location type totalRounds");

    if (!applications || applications.length === 0) {
      return res.status(200).json({ message: "No applications found", applications: [] });
    }

    const result = applications.map((app) => {
      const totalRounds = app.totalRounds || app.jobId?.totalRounds || 4;
      const roundsCompleted = app.roundsCompleted || 0;
      const progress = Math.round((roundsCompleted / totalRounds) * 100);

      return {
        applicationId: app._id,
        jobId: app.jobId?._id || null,
        jobTitle: app.jobId?.title || "N/A",
        jobLocation: app.jobId?.location || "N/A",
        jobType: app.jobId?.type || "N/A",
        roundsCompleted,
        totalRounds,
        progress,
        status: app.status || (progress === 100 ? "Completed" : "In Progress"),
        qualification: app.qualification,
        resumeUrl: app.resumeUrl,
        appliedAt: app.appliedAt,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error in getUserApplications:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * POST /api/applications
 * Apply for a job (login required)
 * Accepts multipart/form-data: jobTitle (or jobId), qualification, resume(file)
 */
exports.applyForJob = async (req, res) => {
  try {
    const { jobTitle, jobId, qualification } = req.body;

    // resume was uploaded by multer and is at req.file
    if (!qualification || !req.file) {
      return res.status(400).json({ message: "Qualification and resume are required" });
    }

    // Find job: prefer jobId if provided, else try jobTitle
    let job;
    if (jobId) {
      job = await Job.findById(jobId);
    } else if (jobTitle) {
      job = await Job.findOne({ title: jobTitle });
    }

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Prevent duplicate applications by this user for this job
    const existing = await Application.findOne({
      userId: req.user.id,
      jobId: job._id,
    });
    if (existing) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    const application = new Application({
      userId: req.user.id,
      jobId: job._id,
      qualification,
      resumeUrl: `/uploads/resumes/${req.file.filename}`,
      roundsCompleted: 0,
      totalRounds: job.totalRounds || 4,
      status: "In Progress",
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.error("❌ Error in applyForJob:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
