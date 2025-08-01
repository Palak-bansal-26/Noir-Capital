import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'HR Dashboard', path: '/hr-dashboard' },
  ];

  // Simulate login state (replace with real auth)
  const isLoggedIn = true; // Set to true for demo

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="logo">
            NOIR CAPITAL
          </Link>
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link ${
                  item.disabled
                    ? 'disabled'
                    : location.pathname === item.path
                    ? 'active'
                    : ''
                }`}
                onClick={item.disabled ? (e) => e.preventDefault() : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          {isLoggedIn && (
            <div style={{ position: 'relative', marginLeft: '1rem' }}>
              <button
                className="profile-icon-btn"
                onClick={() => setProfileMenuOpen((open) => !open)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <User size={28} color="#d4af37" />
              </button>
              {profileMenuOpen && (
                <div
                  className="profile-menu"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '2.5rem',
                    background: '#222',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px #000',
                    minWidth: '160px',
                    zIndex: 100,
                  }}
                >
                  <button
                    className="profile-menu-item"
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      color: '#d4af37',
                      padding: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '1rem',
                    }}
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate('/dashboard');
                    }}
                  >
                    My Dashboard
                  </button>
                  <button
                    className="profile-menu-item"
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      color: '#fff',
                      padding: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '1rem',
                    }}
                    onClick={() => {
                      setProfileMenuOpen(false);
                      /* add logout logic here */
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <nav className="nav-mobile">
            <div className="nav-mobile-links">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-link-mobile ${
                    item.disabled
                      ? 'disabled'
                      : location.pathname === item.path
                      ? 'active'
                      : ''
                  }`}
                  onClick={(e) => {
                    if (item.disabled) {
                      e.preventDefault();
                    } else {
                      setIsOpen(false);
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <button className="talk-btn-mobile">Let's Talk</button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
