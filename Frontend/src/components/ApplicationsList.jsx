import React from "react";

const ApplicationsList = ({ applications }) => {
  if (!applications || applications.length === 0)
    return <p>No applications found.</p>;

  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>Applicant Name</th>
          <th>Email</th>
          <th>Job Title</th>
          <th>Location</th>
          <th>Type</th>
          <th>Progress</th>
          <th>Status</th>
          <th>Resume</th>
          <th>Applied At</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.applicationId}>
            <td>{app.applicantName}</td>
            <td>{app.applicantEmail}</td>
            <td>{app.jobTitle}</td>
            <td>{app.jobLocation}</td>
            <td>{app.jobType}</td>
            <td>
              {app.progress}% ({app.roundsCompleted}/{app.totalRounds})
            </td>
            <td>{app.status}</td>
            <td>
              {app.resumeUrl ? (
                <a
                  href={import.meta.env.VITE_JOB_API_URL.replace("/api", "") + app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              ) : (
                "N/A"
              )}
            </td>
            <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationsList;
