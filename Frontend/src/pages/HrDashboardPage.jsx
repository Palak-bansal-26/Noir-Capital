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
      <table className="hr-dashboard-table" style={{width:'100%',background:'#23243a',borderRadius:'1rem',boxShadow:'0 2px 16px #23243a44',overflow:'hidden',borderCollapse:'separate',borderSpacing:0}}>
        <thead>
          <tr style={{background:'#181a20',color:'#43ea7a',fontWeight:800,fontSize:'1.08rem'}}>
            <th style={{padding:'1rem 0.7rem',textAlign:'left'}}>Job Title</th>
            <th style={{padding:'1rem 0.7rem',textAlign:'center'}}>Number of Applicants</th>
            <th style={{padding:'1rem 0.7rem',textAlign:'center'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.map((job, idx) => (
            <tr key={idx} style={{background:idx%2===0?'#23243a':'#181a20',color:'#fff'}}>
              <td style={{padding:'0.9rem 0.7rem',fontWeight:700,color:'#43ea7a',verticalAlign:'middle'}}>{job.jobTitle}</td>
              <td style={{padding:'0.9rem 0.7rem',textAlign:'center',fontWeight:600,verticalAlign:'middle'}}>{job.applicants}</td>
              <td style={{padding:'0.9rem 0.7rem',textAlign:'center',verticalAlign:'middle'}}>
                <button onClick={() => setSelectedJob(job.jobTitle)} className="view-app-btn" style={{margin:'0 auto',display:'inline-flex',alignItems:'center',gap:'0.5rem',fontWeight:700,fontSize:'1.08rem',letterSpacing:'0.02em',boxShadow:'0 2px 8px #43ea7a22'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
                    <rect x="3" y="5" width="18" height="14" rx="3" fill="#43ea7a"/>
                    <path d="M8 11H16M8 15H12" stroke="#23243a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>View Applications</span>
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
