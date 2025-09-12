import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Award, TrendingUp, Shield, Users } from 'lucide-react';

const WorkingWithSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering outstanding results"
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "Focused on sustainable business expansion"
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Building lasting relationships with integrity"
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Collaborative approach to success"
    }
  ];

  return (
    <section ref={sectionRef} className="working-section">
      <div className="working-container">
        <div className={`working-header ${isVisible ? 'fade-in-up' : ''}`}>
          <h2 className="working-title">
            Working With the Best <span className="text-gold">Clients and Partners</span>
          </h2>
          <p className="working-subtitle">
            We pride ourselves on building lasting relationships with our clients and strategic partners who share our vision for financial excellence.
          </p>
          <div className="gold-underline"></div>
        </div>

        <div className="working-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`working-card ${isVisible ? `fade-in-up delay-${index}` : ''}`}
              >
                <div className="card-inner">
                  <Icon className="card-icon" size={48} />
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-description">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkingWithSection;
