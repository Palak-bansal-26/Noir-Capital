import React, { useState } from 'react';
import JobApplicationsModal from './JobApplicationModal';

// Dummy data for demonstration
const jobApplications = [
  { jobTitle: 'Private Equity Analyst', applicants: 2 },
  { jobTitle: 'Hedge Fund Analyst', applicants: 1 },
  { jobTitle: 'Risk & Compliance Manager', applicants: 1 },
  { jobTitle: 'Portfolio Manager', applicants: 0 },
  { jobTitle: 'Data Analyst', applicants: 3 },
];

const HRDashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  // Simulated functions for fetching candidate info from different sources
  function fetchFromATS() {
    // Simulate fetching from an ATS
    return [
    { name: 'a Sharma', source: 'ATS', status: 'Pending' },
      { name: 'Priya Singh', source: 'ATS', status: 'Reviewed' },
    ];
  }

  function fetchFromResumeDB() {
    // Simulate fetching from a resume database or Google Drive
    return [
      { name: 'Rahul Verma', source: 'Resume DB', status: 'Pending' },
    ];
  }

  function fetchFromHRDashboard() {
    // Simulate fetching from the HR dashboard itself
    return [
      { name: 'Sneha Rao', source: 'HR Dashboard', status: 'Interviewed' },
    ];
  }

  function fetchFromEmailInbox() {
    // Simulate fetching from email inbox
    return [
      { name: 'Vikas Kumar', source: 'Email', status: 'Pending' },
    ];
  }

  function fetchFromCareerPortal() {
    // Simulate fetching from company career portal/backend
    return [
      { name: 'Anjali Mehta', source: 'Career Portal', status: 'Reviewed' },
    ];
  }

  // Example: How to view a resume (in a real app, this would open a modal or link to a file)
  function viewResume(candidate) {
    alert(`Resume for ${candidate.name}:\n\n(Simulated resume preview or download link here)`);
  }

  // Make viewResume globally accessible for modal button
  if (typeof window !== 'undefined') {
    window.viewResume = viewResume;
  }

  return (
    <div className="hr-dashboard-container">
      <h1>HR Dashboard: Job Applications Overview</h1>
      <table className="hr-dashboard-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Number of Applicants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.map((job, idx) => (
            <tr key={idx}>
              <td>{job.jobTitle}</td>
              <td>{job.applicants}</td>
              <td>
                <button onClick={() => setSelectedJob(job.jobTitle)} className="view-app-btn">
                  View Applications
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedJob && (
        <JobApplicationsModal jobTitle={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default HRDashboard;
