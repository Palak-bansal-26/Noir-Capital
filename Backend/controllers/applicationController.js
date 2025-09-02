const Application = require("../models/Application");
const Job = require("../models/Job");

// =====================
// Get all applications for logged-in user
// =====================
exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id })
      .populate("jobId", "title location type totalRounds");

    if (!applications || applications.length === 0) {
      return res.status(200).json({ message: "No applications found", applications: [] });
    }

    const result = applications.map(app => {
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
        appliedAt: app.appliedAt,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error in getUserApplications:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// =====================
// Apply for a Job
// =====================
exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user already applied for this job
    const existingApp = await Application.findOne({
      userId: req.user.id,
      jobId: jobId,
    });

    if (existingApp) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    // Create new application
    const application = new Application({
      userId: req.user.id,
      jobId,
      roundsCompleted: 0,
      totalRounds: job.totalRounds || 4,
      status: "In Progress",
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("❌ Error in applyForJob:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

//updating application round
exports.updateApplicationRound = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Append the new round to interviewHistory
    application.interviewHistory.push(req.body);

    // Optionally update interviewer, feedback, or status fields
    application.interviewer = req.body.interviewer;
    application.feedback = req.body.feedback;
    application.status = req.body.status || application.status;

    await application.save();
    res.status(200).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update application round' });
  }
};

