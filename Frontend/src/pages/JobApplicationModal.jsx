import React, { useState } from 'react';
import CandidateAccordionList from '../components/CandidateAccordionList';

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
  <div className="modal-content" style={{maxWidth:'420px',background:'#181a20',boxShadow:'0 6px 32px #FFC10733'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1rem'}}>
  <h2 style={{fontWeight:800,fontSize:'1.3rem',color:'#fff',letterSpacing:'0.02em'}}>Resume for {candidate.name}</h2>
        <button className="modal-close" onClick={onClose} style={{background:'none',border:'none',fontSize:'1.2rem',color:'#fff',cursor:'pointer'}}>×</button>
      </div>
  <div style={{background:'#181a20',padding:'1rem',borderRadius:'10px',marginBottom:'1rem',color:'#fff',boxShadow:'0 2px 12px #23243a22'}}>
        <p style={{marginBottom:'0.5rem'}}><strong>Email:</strong> {candidate.email}</p>
        <p style={{marginBottom:'0.5rem'}}><strong>Phone:</strong> {candidate.phone}</p>
        <p style={{marginBottom:'0.5rem'}}><strong>Applied Role:</strong> {candidate.role}</p>
        <p style={{marginBottom:'0.5rem'}}><strong>Resume Preview:</strong></p>
        <div style={{background:'#23243a',padding:'0.7rem',borderRadius:'6px',marginBottom:'0.7rem',color:'#43ea7a',fontWeight:600,fontSize:'0.98rem'}}>Simulated resume preview or download link here.</div>
        <a href={candidate.resumeUrl || '#'} target="_blank" rel="noopener noreferrer" className="view-app-btn" style={{width:'100%',display:'block',textAlign:'center',marginTop:'0.5rem',fontWeight:700,letterSpacing:'0.02em'}}>Download Resume</a>
      </div>
    </div>
  </div>
);

const HeaderWithClose = ({ heading, onClose }) => (
  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',paddingBottom:'0.5rem',marginBottom:'1rem',background:'#181a20',borderBottom:'2px solid #23243a'}}>
    <h2 style={{fontWeight:800,fontSize:'1.25rem',color:'#43ea7a',letterSpacing:'0.02em',margin:0}}>{heading}</h2>
    <button onClick={onClose} style={{background:'none',border:'none',fontSize:'1.2rem',color:'#43ea7a',cursor:'pointer',marginLeft:'1.5rem'}}>×</button>
  </div>
);

const JobApplicationsModal = ({ jobTitle, onClose }) => {
  const [feedbackModal, setFeedbackModal] = useState(null);
  const applicants = applicantsData[jobTitle] || [];
  const [resumeFor, setResumeFor] = useState(null);
  const [roundUpdateFor, setRoundUpdateFor] = useState(null);
  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{maxHeight:'80vh',overflowY:'auto',background:'#181a20',color:'#fff',borderRadius:'12px',boxShadow:'0 6px 32px #43ea7a33',padding:'2rem 1.5rem',position:'relative'}}>
        <HeaderWithClose heading={`Applications for ${jobTitle}`} onClose={onClose} />
        {applicants.length === 0 ? (
          <p>No applications found for this job.</p>
        ) : (
          <CandidateAccordionList candidates={applicants} />
        )}
        {resumeFor && (
          <ResumeModal candidate={resumeFor} onClose={() => setResumeFor(null)} />
        )}
        {roundUpdateFor && (
          <div className="modal-overlay">
            <div className="modal-content" style={{maxWidth:'520px',background:'#181a20',boxShadow:'0 6px 32px #FFC10733'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1rem'}}>
                <h2 style={{fontWeight:900,fontSize:'1.45rem',color:'#fff !important',letterSpacing:'0.04em',textShadow:'0 2px 12px #181a20cc',margin:'0',padding:'0.2rem 0',borderBottom:'2px solid #43ea7a',background:'#23243a',borderRadius:'8px 8px 0 0',boxShadow:'0 2px 8px #43ea7a22'}}>Update Rounds for <span style={{color:'#fff !important'}}>{roundUpdateFor.name}</span></h2>
                <button className="modal-close" onClick={() => setRoundUpdateFor(null)} style={{background:'none',border:'none',fontSize:'1.2rem',color:'#fff',cursor:'pointer'}}>×</button>
              </div>
              <div style={{background:'#181a20',padding:'1rem',borderRadius:'10px',boxShadow:'0 2px 12px #23243a22',color:'#fff !important'}}>
                <form onSubmit={e => {e.preventDefault(); alert('Round updated!'); setRoundUpdateFor(null);}}>
                  <label style={{display:'block',marginBottom:'0.7rem',color:'#fff',fontWeight:600}}>Round Name:
                    <input type="text" defaultValue={roundUpdateFor.interviewHistory?.slice(-1)[0]?.round || ''} style={{marginLeft:'0.5rem',padding:'0.4rem',borderRadius:'6px',border:'1.5px solid #fff',background:'#23243a',color:'#fff',fontWeight:500}} />
                  </label>
                  <label style={{display:'block',marginBottom:'0.7rem',color:'#fff',fontWeight:600}}>Date:
                    <input type="date" style={{marginLeft:'0.5rem',padding:'0.4rem',borderRadius:'6px',border:'1.5px solid #fff',background:'#23243a',color:'#fff',fontWeight:500}} />
                  </label>
                  <label style={{display:'block',marginBottom:'0.7rem',color:'#fff',fontWeight:600}}>Interviewer:
                    <input type="text" defaultValue={roundUpdateFor.interviewer || ''} style={{marginLeft:'0.5rem',padding:'0.4rem',borderRadius:'6px',border:'1.5px solid #fff',background:'#23243a',color:'#fff',fontWeight:500}} />
                  </label>
                  <label style={{display:'block',marginBottom:'0.7rem',color:'#fff',fontWeight:600}}>Feedback:
                    <input type="text" defaultValue={roundUpdateFor.feedback || ''} style={{marginLeft:'0.5rem',padding:'0.4rem',borderRadius:'6px',border:'1.5px solid #fff',background:'#23243a',color:'#fff',fontWeight:500}} />
                  </label>
                  <button type="submit" className="view-app-btn" style={{background:'#43ea7a',color:'#181a20',marginTop:'1rem',width:'100%',fontWeight:700,letterSpacing:'0.02em',boxShadow:'0 2px 8px #43ea7a22'}}>
                    <span style={{display:'inline-flex',alignItems:'center',gap:'0.4rem',justifyContent:'center'}}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign:'middle'}}>
                        <rect x="3" y="5" width="18" height="14" rx="3" fill="#181a20"/>
                        <path d="M8 11H16M8 15H12" stroke="#43ea7a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{fontWeight:700,fontSize:'1.01rem',letterSpacing:'0.01em'}}>Save</span>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {feedbackModal && (
          <div className="modal-overlay">
            <div className="modal-content" style={{maxWidth:'400px',background:'#181a20',color:'#fff',borderRadius:'12px',boxShadow:'0 6px 32px #FFC10733',padding:'2rem 1.5rem',position:'relative'}}>
              <button className="modal-close" onClick={() => setFeedbackModal(null)} style={{position:'absolute',top:'1rem',right:'1rem',background:'none',border:'none',fontSize:'1.2rem',color:'#FFC107',cursor:'pointer'}}>×</button>
              <h2 style={{fontWeight:800,fontSize:'1.2rem',color:'#FFC107',marginBottom:'1rem'}}>Feedback Details</h2>
              <div style={{marginBottom:'1rem'}}>
                <strong>Candidate:</strong> {feedbackModal.app.name}<br/>
                <strong>Role:</strong> {feedbackModal.app.role}<br/>
                <strong>Round:</strong> {feedbackModal.round.round}<br/>
                <strong>Date:</strong> {feedbackModal.round.date}<br/>
                <strong>Interviewer:</strong> {feedbackModal.round.interviewer}
              </div>
              <div style={{background:'#23243a',padding:'1rem',borderRadius:'8px',color:'#FFC107',fontWeight:600}}>
                {feedbackModal.round.feedback}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationsModal;
