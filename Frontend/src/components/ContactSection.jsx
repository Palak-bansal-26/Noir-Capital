import React from 'react';
import '../styles/ContactSection.css';

const Contact = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-section">
        {/* Left Side: Info */}
        <div className="contact-text">
          <h2>GET IN TOUCH</h2>
          <p>
            We're here to listen and guide you. Reach out with your questions,
            ideas, or business inquiries — our team at Noir Capital is ready
            to help you take your next step with confidence.
          </p>
          <div className="contact-details">
          <p><span className="highlight">Phone:</span> +91 8008094818</p>
          <p><span className="highlight">Email:</span> thenoircap@gmail.com</p>
          <div className="contact-address">
  <span className="highlight">Address:</span>
  <div className="address-lines">
    Building 3, iLabs Centre 18,<br />
    Hi-Tech City, Madhapur,<br />
    Telangana 500081
  </div>
</div>



            </div>

        </div>

        {/* Right Side: Form */}
        <form
          className="contact-form"
          action="https://formspree.io/f/mgvyjdjz"
          method="POST"
        >
          <h2>Contact Us</h2>

          <label>Name:</label>
          <input type="text" name="name" required />

          <label>Email:</label>
          <input type="email" name="email" required />

          <label>Message:</label>
          <textarea name="message" required />

          <input type="hidden" name="_subject" value="New message for Noir Capital" />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
