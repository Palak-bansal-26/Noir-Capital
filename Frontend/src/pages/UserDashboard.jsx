import React, { useState, useEffect } from "react";
import "./UserDashboard.css";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const statusConfig = {
  Accepted: {
    badgeClass: "accepted",
    icon: <FaCheckCircle />,
    label: "Accepted",
  },
  Rejected: {
    badgeClass: "rejected",
    icon: <FaTimesCircle />,
    label: "Rejected",
  },
  "In Progress": {
    badgeClass: "inprogress",
    icon: <FaClock />,
    label: "In Progress",
  },
};

const colorClasses = ["frontend", "backend", "uiux"]; // reuse your css classes

const UserDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [openJob, setOpenJob] = useState(null);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token"); // get JWT
        const res = await fetch("http://localhost:5000/api/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
        setJobs([]);
      }
    };
    fetchJobs();
  }, []);

  const handleCardClick = (job) => {
    setOpenJob(job);
  };

  const closeModal = () => setOpenJob(null);

  return (
    <div className="ud-root">
      <div className="ud-title">Job Application Status</div>
      <div className="ud-cards">
        {jobs.length === 0 ? (
          <div style={{ color: "#999", marginTop: "2rem" }}>
            No job applications found.
          </div>
        ) : (
          jobs.map((job, idx) => {
            const status =
              statusConfig[job.status] || statusConfig["In Progress"];
            const title = job.jobTitle || "Untitled Job";
            const roundsCompleted = job.roundsCompleted || 0;
            const totalRounds = job.totalRounds || 4;
            const progress = job.progress || 0;

            return (
              <div
                className="ud-card"
                key={job.applicationId || idx}
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(job)}
                tabIndex={0}
                role="button"
                aria-label={`Open details for ${title}`}
              >
                <div
                  className={`ud-card-title ${
                    colorClasses[idx % colorClasses.length]
                  }`}
                >
                  {title}
                </div>
                <div className="ud-card-company">
                  {job.jobLocation || "NOIR Capital"}
                </div>
                <div className="ud-card-rounds">
                  Rounds Completed: {roundsCompleted} / {totalRounds}
                </div>
                <div className="ud-progress-bar">
                  <div
                    className="ud-progress-bar-inner"
                    style={{
                      width: `${progress}%`,
                      background:
                        job.status === "Accepted"
                          ? "#43ea7a"
                          : job.status === "Rejected"
                          ? "#ff5252"
                          : "#ffe082",
                    }}
                  ></div>
                </div>
                <div className="ud-card-progress">{progress}% completed</div>
                <div className={`ud-status-badge ${status.badgeClass}`}>
                  {status.icon}
                  {status.label}
                </div>
              </div>
            );
          })
        )}
      </div>

      {openJob && (
        <div className="ud-modal-overlay" onClick={closeModal}>
          <div className="ud-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="ud-modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 style={{ marginBottom: "1rem" }}>
              {openJob.jobTitle || "Untitled Job"}
            </h2>
            <div>
              <strong>Company:</strong>{" "}
              {openJob.jobLocation || "NOIR Capital"}
            </div>
            <div>
              <strong>Rounds Completed:</strong>{" "}
              {openJob.roundsCompleted || 0} / {openJob.totalRounds || 4}
            </div>
            <div>
              <strong>Status:</strong>{" "}
              {statusConfig[openJob.status]?.label || "In Progress"}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <div className="ud-progress-bar">
                <div
                  className="ud-progress-bar-inner"
                  style={{
                    width: `${openJob.progress || 0}%`,
                    background:
                      openJob.status === "Accepted"
                        ? "#43ea7a"
                        : openJob.status === "Rejected"
                        ? "#ff5252"
                        : "#ffe082",
                  }}
                ></div>
              </div>
              <div className="ud-card-progress">
                {openJob.progress || 0}% completed
              </div>
            </div>
            <div
              className={`ud-status-badge ${
                statusConfig[openJob.status]?.badgeClass || "inprogress"
              }`}
              style={{ marginTop: "1rem" }}
            >
              {statusConfig[openJob.status]?.icon}
              {statusConfig[openJob.status]?.label || "In Progress"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
