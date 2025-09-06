const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    qualification: { type: String, required: true },
    resumeUrl: { type: String, required: true }, // path like /uploads/resumes/<file>
    roundsCompleted: { type: Number, default: 0 },
    totalRounds: { type: Number, default: 4 },
    status: {
      type: String,
      enum: ["In Progress", "Accepted", "Rejected"],
      default: "In Progress",
    },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
