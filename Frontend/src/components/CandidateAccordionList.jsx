import React, { useState } from 'react';
import './CandidateAccordionList.css';

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

const CandidateAccordionList = () => {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [updateModalIdx, setUpdateModalIdx] = useState(null);
  const [candidateStates, setCandidateStates] = useState(candidates.map(c => ({...c})));

  return (
    <div className="candidate-accordion-list">
      {candidates.map((candidate, idx) => (
          <div key={idx} className="candidate-row">
            <div className="candidate-main-row">
              <div className="name-status-col" style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:'0.25rem',padding:'0.1rem 0'}}>
                <span className="candidate-name" style={{fontWeight:700,fontSize:'1.08rem',marginBottom:'0.1rem'}}>{candidateStates[idx].name}</span>
                <span className="candidate-status" style={{background: statusColors[candidateStates[idx].status], color: '#181a20', fontSize: '0.95rem', padding: '0.22rem 0.8rem', borderRadius: '6px', boxShadow:'0 1px 6px #23243a22', marginTop:'0.1rem'}}>{candidateStates[idx].status}</span>
              </div>
              <button
                className="toggle-details-btn"
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
              >
                {expandedIdx === idx ? 'Hide Details' : 'View Details'}
              </button>
            </div>
          {expandedIdx === idx && (
            <div className="expanded-card" style={{background:'#181a20',color:'#fff',borderRadius:'12px',boxShadow:'0 6px 32px #FFC10733',padding:'2rem 1.5rem',position:'relative',marginTop:'0.5rem',display:'flex',flexDirection:'column'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1rem',paddingBottom:'0.5rem',background:'#181a20',borderBottom:'2px solid #23243a'}}>
                <h3 style={{fontWeight:800,fontSize:'1.1rem',color:'#FFC107',margin:0}}>Candidate Details</h3>
                <button className="close-btn" onClick={() => setExpandedIdx(null)} style={{background:'none',border:'none',fontSize:'1.2rem',color:'#FFC107',cursor:'pointer',marginLeft:'1.5rem'}}>×</button>
              </div>
              <div style={{paddingTop:'1.5rem'}}>
                <div style={{marginBottom:'0.7rem'}}>
                  <span style={{fontWeight:600,color:'#FFC107'}}>Name:</span>
                  <span style={{marginLeft:'0.5rem',color:'#fff'}}>{candidateStates[idx].name}</span>
                </div>
                <div style={{marginBottom:'0.7rem'}}>
                  <span style={{fontWeight:600,color:'#FFC107'}}>Status:</span>
                  <span style={{marginLeft:'0.5rem',color:statusColors[candidateStates[idx].status]}}>{candidateStates[idx].status}</span>
                </div>
                <div style={{marginBottom:'0.7rem'}}>
                  <span style={{fontWeight:600,color:'#FFC107'}}>Round:</span>
                  <span style={{marginLeft:'0.5rem',color:'#fff'}}>{candidateStates[idx].round}</span>
                </div>
                <div style={{marginBottom:'0.7rem'}}>
                  <span style={{fontWeight:600,color:'#FFC107'}}>Feedback:</span>
                  <span style={{marginLeft:'0.5rem',color:'#fff'}}>{candidateStates[idx].feedback}</span>
                </div>
                <div style={{marginBottom:'0.7rem'}}>
                  <span style={{fontWeight:600,color:'#FFC107'}}>Round Feedback:</span>
                  <span style={{marginLeft:'0.5rem',color:'#fff'}}>{candidateStates[idx].roundFeedback}</span>
                </div>
                <button onClick={() => setUpdateModalIdx(idx)} style={{marginTop:'1.2rem',background:'#FFC107',color:'#181a20',border:'none',borderRadius:'6px',padding:'0.6rem 1.2rem',fontWeight:700,cursor:'pointer',fontSize:'1rem'}}>Update</button>
              </div>
            </div>
          )}
          {updateModalIdx === idx && (
            <div className="modal-overlay">
              <div className="modal-content" style={{maxWidth:'350px',background:'#181a20',color:'#fff',borderRadius:'12px',boxShadow:'0 6px 32px #FFC10733',padding:'2rem 1.5rem',position:'relative'}}>
                <button className="modal-close" onClick={() => setUpdateModalIdx(null)} style={{position:'absolute',top:'1rem',right:'1rem',background:'none',border:'none',fontSize:'1.2rem',color:'#FFC107',cursor:'pointer'}}>×</button>
                <h2 style={{fontWeight:800,fontSize:'1.1rem',color:'#FFC107',marginBottom:'1rem'}}>Update Candidate</h2>
                <form onSubmit={e => {
                  e.preventDefault();
                  const form = e.target;
                  const updatedCandidate = {
                    ...candidateStates[idx],
                    status: form.status.value,
                    round: form.round.value,
                    feedback: form.feedback.value,
                    roundFeedback: form.roundFeedback.value
                  };
                  setCandidateStates(prev => prev.map((c, i) => i === idx ? updatedCandidate : c));
                  setUpdateModalIdx(null);
                }}>
                  <div style={{marginBottom:'0.7rem'}}>
                    <label style={{fontWeight:600,color:'#FFC107'}}>Status:</label>
                    <select name="status" defaultValue={candidateStates[idx].status || ''} style={{marginLeft:'0.5rem',padding:'0.4rem',borderRadius:'6px',border:'1.5px solid #FFC107',background:'#23243a',color:'#fff',fontWeight:500}}>
                      <option value="">Select Status</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Selected">Selected</option>
                      <option value="Scheduled for Next Round">Scheduled for Next Round</option>
                    </select>
                  </div>
                  <div style={{marginBottom:'0.7rem'}}>
                    <label style={{fontWeight:600,color:'#FFC107'}}>Round:</label>
                    <input name="round" type="text" defaultValue={candidateStates[idx].round} style={{marginLeft:'0.5rem',padding:'0.4rem',borderRadius:'6px',border:'1.5px solid #FFC107',background:'#23243a',color:'#fff',fontWeight:500}} />
                  </div>
                  <div style={{marginBottom:'0.7rem'}}>
                    <label style={{fontWeight:600,color:'#FFC107'}}>Feedback:</label>
                    <input name="feedback" type="text" defaultValue={candidateStates[idx].feedback} style={{marginLeft:'0.5rem',padding:'0.4rem',borderRadius:'6px',border:'1.5px solid #FFC107',background:'#23243a',color:'#fff',fontWeight:500}} />
                  </div>
                  <div style={{marginBottom:'0.7rem'}}>
                    <label style={{fontWeight:600,color:'#FFC107'}}>Round Feedback:</label>
                    <input name="roundFeedback" type="text" defaultValue={candidateStates[idx].roundFeedback} style={{marginLeft:'0.5rem',padding:'0.4rem',borderRadius:'6px',border:'1.5px solid #FFC107',background:'#23243a',color:'#fff',fontWeight:500}} />
                  </div>
                  <button type="submit" className="update-btn" style={{width:'100%',marginTop:'1rem',background:'#FFC107',color:'#181a20'}}>Save</button>
                </form>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CandidateAccordionList;
