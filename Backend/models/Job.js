const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Contract"],
    default: "Full-time",
  },
  totalRounds: { type: Number, default: 4 },
  description: { type: String },
  postedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
