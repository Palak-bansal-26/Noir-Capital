import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-subtitle">Page Not Found</p>
        <p className="not-found-text">
          The page you're looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="not-found-button">
          Go Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
