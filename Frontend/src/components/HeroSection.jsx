import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import newHeroBg from "./bg3.jpg";
// Correct relative path to hero.png in the same folder

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  /* 👇 Click event navigates to Contact page */
  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <section
      className={`hero-bg ${isVisible ? "fade-in" : ""}`}
      style={{
        backgroundImage: `url(${newHeroBg})`, // Use imported image here
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "70vh", // Adjust based on design spec
      }}
      // Priyanshu verma (30-Aug-2025): Updated hero section background image
    >
      <div className="hero-content-container">
        <h1 className="hero-title">
          Founders of <span className="highlight-gold">Noir Capital</span>
        </h1>
        <p className="hero-subtext">
          It's not just about the numbers, we know what your money needs.
        </p>
        <button className="hero-button" onClick={handleContactClick}>
          Let's Talk
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
