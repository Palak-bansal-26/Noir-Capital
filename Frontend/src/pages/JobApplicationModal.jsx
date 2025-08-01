import React, { useState } from 'react';
import ScheduleInterviewModal from './ScheduleInterviewModal';

// Dummy applicants data for demonstration
const applicantsData = {
  'Private Equity Analyst': [
    { name: 'Amit Sharma', email: 'amit@example.com', phone: '+91-1234567890', role: 'Private Equity Analyst', appliedOn: '2025-07-10', source: 'ATS', status: 'Pending',
      interviewHistory: [
        { round: 'HR', date: '2025-07-15', interviewer: 'Rohit S.', feedback: 'Good communication.' },
      ],
      interviewer: 'Rohit S.',
      feedback: 'Strong profile, needs technical round.'
    },
    { name: 'Priya Singh', email: 'priya@example.com', phone: '+91-9876543210', role: 'Private Equity Analyst', appliedOn: '2025-07-11', source: 'Career Page', status: 'Shortlisted',
      interviewHistory: [],
      interviewer: '',
      feedback: ''
    },
  ],
  'Hedge Fund Analyst': [
    { name: 'Rahul Verma', email: 'rahul@example.com', phone: '+91-5555555555', role: 'Hedge Fund Analyst', appliedOn: '2025-07-12', source: 'Referral', status: 'New',
      interviewHistory: [],
      interviewer: '',
      feedback: ''
    },
  ],
  'Risk & Compliance Manager': [
    { name: 'Sneha Rao', email: 'sneha@example.com', phone: '+91-4444444444', role: 'Risk & Compliance Manager', appliedOn: '2025-07-13', source: 'LinkedIn', status: 'Interviewing',
      interviewHistory: [
        { round: 'Technical', date: '2025-07-18', interviewer: 'Anjali M.', feedback: 'Strong technical skills.' },
        { round: 'HR', date: '2025-07-19', interviewer: 'Vaibhav K.', feedback: 'Positive attitude.' },
      ],
      interviewer: 'Vaibhav K.',
      feedback: 'Ready for final round.'
    },
  ],
  'Portfolio Manager': [],
  'Data Analyst': [
    { name: 'Vikas Kumar', email: 'vikas@example.com', phone: '+91-2222222222', role: 'Data Analyst', appliedOn: '2025-07-14', source: 'ATS', status: 'Rejected',
      interviewHistory: [],
      interviewer: '',
      feedback: ''
    },
    { name: 'Anjali Mehta', email: 'anjali@example.com', phone: '+91-3333333333', role: 'Data Analyst', appliedOn: '2025-07-15', source: 'Career Page', status: 'Shortlisted',
      interviewHistory: [
        { round: 'HR', date: '2025-07-20', interviewer: 'Ishu', feedback: 'Great fit.' },
      ],
      interviewer: 'Ishu',
      feedback: 'Schedule technical round.'
    },
    { name: 'Suresh Patil', email: 'suresh@example.com', phone: '+91-6666666666', role: 'Data Analyst', appliedOn: '2025-07-16', source: 'Referral', status: 'Hired',
      interviewHistory: [
        { round: 'Technical', date: '2025-07-18', interviewer: 'Vaibhav K.', feedback: 'Excellent technical skills.' },
        { round: 'HR', date: '2025-07-19', interviewer: 'Ishu', feedback: 'Good culture fit.' },
      ],
      interviewer: 'Ishu',
      feedback: 'Offer released.'
    },
  ],
};

const ResumeModal = ({ candidate, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Resume for {candidate.name}</h2>
      <button className="modal-close" onClick={onClose}>X</button>
      <p><strong>Email:</strong> {candidate.email}</p>
      <p><strong>Phone:</strong> {candidate.phone}</p>
      <p><strong>Applied Role:</strong> {candidate.role}</p>
      <p><strong>Resume Preview:</strong></p>
      <div style={{background:'#181818',padding:'1rem',borderRadius:'8px',marginBottom:'1rem'}}>Simulated resume preview or download link here.</div>
      <a href={candidate.resumeUrl || '#'} target="_blank" rel="noopener noreferrer" className="view-app-btn">Download Resume</a>
    </div>
  </div>
);

const JobApplicationsModal = ({ jobTitle, onClose }) => {
  const applicants = applicantsData[jobTitle] || [];
  const [scheduleFor, setScheduleFor] = useState(null);
  const [resumeFor, setResumeFor] = useState(null);
  const handleSchedule = (candidate, interview) => {
    // In a real app, update backend or state here
    alert(`Interview scheduled for ${candidate.name} on ${interview.date} at ${interview.time} with ${interview.interviewer}`);
    setScheduleFor(null);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Applications for {jobTitle}</h2>
        <button className="modal-close" onClick={onClose}>X</button>
        {applicants.length === 0 ? (
          <p>No applications found for this job.</p>
        ) : (
          <table className="modal-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Applied Role</th>
                <th>Applied On</th>
                <th>Source</th>
                <th>Status</th>
                <th>Interviewer</th>
                <th>Interview History</th>
                <th>Feedback / Notes</th>
                <th>Schedule</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app, idx) => (
                <tr key={idx}>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>{app.phone}</td>
                  <td>{app.role}</td>
                  <td>{app.appliedOn}</td>
                  <td>{app.source}</td>
                  <td>{app.status}</td>
                  <td>{app.interviewer || '-'}</td>
                  <td>
                    {app.interviewHistory && app.interviewHistory.length > 0 ? (
                      <ul style={{margin:0, padding:0, listStyle:'none'}}>
                        {app.interviewHistory.map((round, i) => (
                          <li key={i}>
                            <strong>{round.round}</strong> ({round.date})<br/>
                            Interviewer: {round.interviewer}<br/>
                            Feedback: {round.feedback}
                          </li>
                        ))}
                      </ul>
                    ) : '-'}
                  </td>
                  <td>{app.feedback || '-'}</td>
                  <td>
                    <button className="view-app-btn" onClick={() => setScheduleFor(app)}>
                      Schedule
                    </button>
                  </td>
                  <td>
                    <button className="view-app-btn" onClick={() => setResumeFor(app)}>
                      View Resume
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {scheduleFor && (
          <ScheduleInterviewModal
            candidate={scheduleFor}
            onClose={() => setScheduleFor(null)}
            onSchedule={interview => handleSchedule(scheduleFor, interview)}
          />
        )}
        {resumeFor && (
          <ResumeModal candidate={resumeFor} onClose={() => setResumeFor(null)} />
        )}
      </div>
    </div>
  );
};

export default JobApplicationsModal;
