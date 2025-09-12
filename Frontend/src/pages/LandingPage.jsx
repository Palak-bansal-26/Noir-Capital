import React from 'react';
import { useNavigate } from 'react-router-dom';
import LOGO from '../utils/noir.jpg'
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  // This function will navigate to the AuthPage with the correct user type
  const handleNavigate = (type) => {
    navigate(`/auth?type=${type}`);
  };

  return (
    <div className="landing-container">
  <img src={LOGO} alt="Noir Capital Logo" className="landing-logo small" />
      <h1 className="landing-title">NOIR CAPITAL</h1>
      <p className="landing-description">Welcome to the Noir Capital secure portal.<br/>Please select your access point.</p>

      <div className="button-group portal-group">
        <button onClick={() => handleNavigate('user')} className="user-button">
          User Portal
        </button>
        <button onClick={() => handleNavigate('admin')} className="admin-button">
          Admin Portal
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
