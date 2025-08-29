import React, { useState } from 'react';
import './CandidateList.css';

const candidates = [
  {
    name: 'Amit Sharma',
    email: 'amit@example.com',
    resumeUrl: '#',
    round: 'HR',
    feedback: 'Strong profile, needs technical round.'
  },
  {
    name: 'Priya Singh',
    email: 'priya@example.com',
    resumeUrl: '#',
    round: 'Technical',
    feedback: 'Excellent technical skills.'
  },
  {
    name: 'Rahul Verma',
    email: 'rahul@example.com',
    resumeUrl: '#',
    round: 'HR',
    feedback: 'Good communication.'
  }
];

const CandidateList = () => {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <table className="candidate-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate, idx) => (
          <React.Fragment key={idx}>
            <tr>
              <td>{candidate.name}</td>
              <td>
                <button className="view-details-btn" onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}>
                  {expandedIdx === idx ? 'Hide Details' : 'View Details'}
                </button>
              </td>
            </tr>
            {expandedIdx === idx && (
              <tr className="details-row">
                <td colSpan={2}>
                  <div className="candidate-details">
                    <div><strong>Email:</strong> {candidate.email}</div>
                    <div><strong>Resume:</strong> <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">Download</a></div>
                    <div><strong>Round:</strong> {candidate.round}</div>
                    <div><strong>Feedback:</strong> {candidate.feedback}</div>
                    <div><button className="update-btn">Update</button></div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default CandidateList;
