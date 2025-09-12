import React from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Contact Info */}
          <div className="footer-block fade-in">
            <h3 className="footer-heading">CONTACT</h3>
            <div className="footer-info-group">
              <div className="footer-info-item">
                <Mail className="footer-icon" size={16} />
                <p className="footer-text">thenoircap@gmail.com</p>
              </div>
              <div className="footer-info-item">
                <Phone className="footer-icon" size={16} />
                <p className="footer-text">+91 8008094818</p>
              </div>
              <div className="footer-info-item">
                <Phone className="footer-icon" size={16} />
                <p className="footer-text">+91 9133289821</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="footer-block fade-in">
            <h3 className="footer-heading">LOCATION</h3>
            <div className="footer-info-item">
              <MapPin className="footer-icon" size={16} />
              <p className="footer-text">
                Building 3, iLabs Centre 18, Software Units Layout Hi-Tech City, Inorbit Mall Rd, Madhapur, Telangana 500081
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="footer-block fade-in">
            <h3 className="footer-heading">OPENING HOURS</h3>
            <div className="footer-info-item">
              <Clock className="footer-icon" size={16} />
              <div className="footer-hours">
                <p>Mon - Fri: 8am - 6pm</p>
                <p>Saturday: 8am - 1pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer-bottom">
          <div className="footer-brand">NOIR CAPITAL</div>
          <div className="footer-copy">© 2021 Noir Capital. All rights reserved.</div>
        </div>

        {/* Back to top */}
        <div className="footer-back">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="back-to-top"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

