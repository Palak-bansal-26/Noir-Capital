import React from 'react';
import './CandidateDetailsCard.css';

const CandidateDetailsCard = ({ candidate }) => {
  if (!candidate) return null;
  return (
    <div className="candidate-details-card">
      <h2>Candidate Details</h2>
      <section className="details-section">
        <h3>Contact Details</h3>
        <div className="details-row">
          <span><strong>Name:</strong> {candidate.name}</span>
          <span><strong>Email:</strong> {candidate.email}</span>
          <span><strong>Phone:</strong> {candidate.phone}</span>
        </div>
      </section>
      <section className="details-section">
        <h3>Interview Timeline</h3>
        <ul className="timeline-list">
          {candidate.interviewHistory && candidate.interviewHistory.length > 0 ? (
            candidate.interviewHistory.map((round, i) => (
              <li key={i}>
                <div className="timeline-date">{round.date}</div>
                <div className="timeline-round">{round.round}</div>
                <div className="timeline-interviewer">{round.interviewer}</div>
                <div className="timeline-feedback">{round.feedback}</div>
              </li>
            ))
          ) : (
            <li>No interview rounds yet.</li>
          )}
        </ul>
      </section>
      <section className="details-section">
        <h3>Notes / Feedback</h3>
        <div className="notes-box">
          {candidate.feedback || 'No notes yet.'}
        </div>
      </section>
    </div>
  );
};

export default CandidateDetailsCard;
