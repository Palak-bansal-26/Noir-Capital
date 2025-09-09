const Job = require("../models/Job");

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error("❌ Error in createJob:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json({ jobs }); // wrap array in object
  } catch (error) {
    console.error("❌ Error in getJobs:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
