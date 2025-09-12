import React from 'react';
import { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="about-section">
      <div className="about-container">
        <div className={`about-content ${isVisible ? 'visible' : ''}`}>
          <h2 className="about-heading">ABOUT US</h2>

          <div className="about-text-wrapper">
            <div className={`about-paragraph fade-delay-1 ${isVisible ? 'visible' : ''}`}>
              <p>
                At Noir Capital, we believe that smart investing should be accessible to everyone. We pool
                investments from individuals and strategically allocate funds across various high-performing
                assets to ensure consistent growth and maximum returns throughout the year.
              </p>
            </div>

            <div className={`about-paragraph fade-delay-2 ${isVisible ? 'visible' : ''}`}>
              <p>
                Our unique approach sets us apart: we empower everyday people to make small, regular
                contributions that grow significantly over time. Whether you're just starting out or looking to
                diversify your portfolio, Noir Capital ensures that your money works harder and smarter.
              </p>
            </div>

            <div className={`about-paragraph fade-delay-3 ${isVisible ? 'visible' : ''}`}>
              <p>
                Join us and be part of a financial future where your growth is our mission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
