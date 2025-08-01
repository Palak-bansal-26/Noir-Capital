import React, { useState } from 'react';

const ScheduleInterviewModal = ({ candidate, onClose, onSchedule }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [interviewer, setInterviewer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && time && interviewer) {
      onSchedule({ date, time, interviewer });
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Schedule Interview for {candidate.name}</h2>
        <button className="modal-close" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <label>Date:</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
          <label>Time:</label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
          <label>Interviewer:</label>
          <input type="text" value={interviewer} onChange={e => setInterviewer(e.target.value)} required placeholder="Enter interviewer name" />
          <button type="submit" className="view-app-btn">Schedule</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
