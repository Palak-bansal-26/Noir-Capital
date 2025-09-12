import React from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import TestimonialSection from '../components/TestimonialSection';
import WorkingWithSection from '../components/WorkingWithSection';

const Index = () => {
  return (
    <div className="main-wrapper">
      {/* <Header /> */}
      <HeroSection />
      <AboutSection />
      <WorkingWithSection />
       <section className="hero-image-section">
        <img
          src="/images/building.png" 
          alt="Hero Banner"
          className="hero-full-image"
        />
      </section>
      <TestimonialSection />
    </div>
  );
};

export default Index;



