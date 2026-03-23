import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const goBackHome = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <h1>📧 Contact Us</h1>
      <p>Have questions? We'd love to hear from you!</p>

      {submitted && (
        <div className="success-message">
          ✅ Thank you {formData.name}! We'll contact you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Enter your message"
          />
        </div>

        <button type="submit" className="submit-btn">
          Send Message
        </button>
      </form>

      <button onClick={goBackHome} className="back-btn">
        ← Back to Home
      </button>

      <div className="spa-note">
        <p>💡 <strong>SPA Note:</strong> Fill out the form, navigate away, and come back - the form data resets because the component remounts!</p>
      </div>
    </div>
  );
}

export default Contact;