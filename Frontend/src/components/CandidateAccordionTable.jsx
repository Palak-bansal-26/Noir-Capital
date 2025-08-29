import React, { useState } from 'react';
import './CandidateAccordionTable.css';

const candidates = [
  {
    name: 'Amit Sharma',
    status: 'Shortlisted',
    email: 'amit@example.com',
    resumeUrl: '#',
    round: 'HR',
    feedback: 'Strong profile, needs technical round.',
    roundFeedback: 'Good communication.'
  },
  {
    name: 'Priya Singh',
    status: 'In Process',
    email: 'priya@example.com',
    resumeUrl: '#',
    round: 'Technical',
    feedback: 'Excellent technical skills.',
    roundFeedback: 'Needs more experience.'
  },
  {
    name: 'Rahul Verma',
    status: 'Rejected',
    email: 'rahul@example.com',
    resumeUrl: '#',
    round: 'HR',
    feedback: 'Good communication.',
    roundFeedback: 'Not a fit for this role.'
  }
];

const statusColors = {
  Shortlisted: '#43ea7a',
  'In Process': '#FFC107',
  Rejected: '#ff4d4f'
};

const CandidateAccordionTable = () => {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [updateModalIdx, setUpdateModalIdx] = useState(null);

  return (
    <table className="candidate-accordion-table">
      <thead>
        <tr>
          <th>Name & Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate, idx) => (
          <React.Fragment key={idx}>
            <tr>
              <td>
                <div className="name-status-col">
                  <span className="candidate-name">{candidate.name}</span>
                  <span className="candidate-status" style={{background: statusColors[candidate.status], color: '#181a20'}}>{candidate.status}</span>
                </div>
              </td>
              <td>
                <button className="toggle-details-btn" onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}>
                  {expandedIdx === idx ? 'Hide Details' : 'View Details'}
                </button>
              </td>
            </tr>
            {expandedIdx === idx && (
              <tr className="details-row">
                <td colSpan={2}>
                  <div className="candidate-details-card">
                    <div className="candidate-detail"><strong>Email:</strong> {candidate.email}</div>
                    <div className="candidate-detail"><strong>Resume:</strong> <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">Download</a></div>
                    <div className="candidate-detail"><strong>Round:</strong> {candidate.round}</div>
                    <div className="candidate-detail"><strong>Feedback:</strong> {candidate.feedback}</div>
                    <div className="candidate-detail"><strong>Round Feedback:</strong> {candidate.roundFeedback}</div>
                    <div className="candidate-detail"><button className="update-btn" onClick={() => setUpdateModalIdx(idx)}>Update</button></div>
                  </div>
                  {updateModalIdx === idx && (
                    <div className="modal-overlay">
                      <div className="modal-content" style={{maxWidth:'350px',background:'#fff',color:'#23243a',borderRadius:'10px',boxShadow:'0 6px 32px #FFC10733',padding:'2rem 1.5rem',position:'relative'}}>
                        <button className="modal-close" onClick={() => setUpdateModalIdx(null)} style={{position:'absolute',top:'1rem',right:'1rem',background:'none',border:'none',fontSize:'1.2rem',color:'#FFC107',cursor:'pointer'}}>×</button>
                        <h2 style={{fontWeight:800,fontSize:'1.1rem',color:'#FFC107',marginBottom:'1rem'}}>Update Candidate</h2>
                        <form onSubmit={e => {e.preventDefault(); setUpdateModalIdx(null);}}>
                          <div style={{marginBottom:'0.7rem'}}>
                            <label style={{fontWeight:600}}>Round:</label>
                            <input type="text" defaultValue={candidate.round} style={{marginLeft:'0.5rem',padding:'0.4rem',borderRadius:'6px',border:'1.5px solid #FFC107',background:'#f8f8f8',color:'#23243a',fontWeight:500}} />
                          </div>
                          <div style={{marginBottom:'0.7rem'}}>
                            <label style={{fontWeight:600}}>Feedback:</label>
                            <input type="text" defaultValue={candidate.feedback} style={{marginLeft:'0.5rem',padding:'0.4rem',borderRadius:'6px',border:'1.5px solid #FFC107',background:'#f8f8f8',color:'#23243a',fontWeight:500}} />
                          </div>
                          <div style={{marginBottom:'0.7rem'}}>
                            <label style={{fontWeight:600}}>Round Feedback:</label>
                            <input type="text" defaultValue={candidate.roundFeedback} style={{marginLeft:'0.5rem',padding:'0.4rem',borderRadius:'6px',border:'1.5px solid #FFC107',background:'#f8f8f8',color:'#23243a',fontWeight:500}} />
                          </div>
                          <button type="submit" className="update-btn" style={{width:'100%',marginTop:'1rem'}}>Save</button>
                        </form>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default CandidateAccordionTable;
