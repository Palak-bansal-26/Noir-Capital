import React from 'react';

const getProgressClass = (percent, status) => {
  if (percent === 100) return status === 'Accepted' ? 'accepted' : 'rejected';
  if (percent >= 50) return 'almost';
  return 'inprogress';
};

const DashboardCard = ({ job, onClick }) => {
  const completedRounds = job.interviewRounds.filter(r => r.completed).length;
  const totalRounds = job.interviewRounds.length;
  const percent = Math.round((completedRounds / totalRounds) * 100);
  const progressClass = getProgressClass(percent, job.status);
  return (
    <div className="dashboard-card" onClick={onClick}>
      <h3>{job.jobTitle} – NOIR Capital</h3>
      <div className="progress-bar">
        <div
          className={`progress-bar-inner ${progressClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="progress-label">{percent}%</span>
      <div style={{margin:'10px 0',fontWeight:'bold',color:'#d4af37'}}>
        Rounds Cleared: {completedRounds} / {totalRounds}
      </div>
      <div style={{display:'flex',gap:'12px',margin:'12px 0'}}>
        {job.interviewRounds.map((round,i)=>(
          <span key={i} style={{color:round.completed?'#2ecc40':'#f1c40f',fontWeight:'bold'}}>{round.name}</span>
        ))}
      </div>
      <div style={{fontSize:'1.2rem'}}>
        {percent === 100 ? (job.status === 'Accepted' ? '✅ Accepted' : '❌ Rejected') : (percent >= 50 ? '🔵 Almost There' : '🟡 In Progress')}
      </div>
    </div>
  );
};

export default DashboardCard;
