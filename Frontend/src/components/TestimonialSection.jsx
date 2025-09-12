import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Quote } from 'lucide-react';

const TestimonialSection = () => {
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

  const testimonials = [
    {
      quote:
        "Noir Capital completely changed the way I look at investing. With their smart strategies and transparent approach, I saw consistent growth in my portfolio, even with small daily contributions. It feels like my money is working 24/7—just like they promised.",
      author: "Rohit Mehra",
      title: "Financial Analyst",
    },
    {
      quote:
        "As someone with zero financial background, I was hesitant to invest. But Noir Capital made it simple. Their daily micro-investment plans fit perfectly into my routine, and the returns have exceeded all expectations. It feels empowering to finally grow my wealth smartly.",
      author: "Ananya Verma",
      title: "Marketing Professional",
    },
  ];

  return (
    <section ref={sectionRef} className="testimonial-section">
      <div className="testimonial-container">
        <div className={`testimonial-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="testimonial-title">TESTIMONIALS</h2>
          <div className="testimonial-divider" />
        </div>

        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card fade-delay-${index} ${isVisible ? 'visible' : ''}`}
            >
              <div className="testimonial-inner">
                <Quote className="testimonial-quote-icon" size={40} />
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-footer">
                  <p className="testimonial-author">— {testimonial.author}</p>
                  <p className="testimonial-title-text">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
