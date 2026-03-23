import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleTimeString());
  const navigate = useNavigate();

  useEffect(() => {
    console.log('About page mounted');
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      console.log('About page unmounted');
      clearInterval(interval);
    };
  }, []);

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <div className="page-container">
      <h1>📖 About React Router</h1>
      
      <div className="info-card">
        <h3>What is React Router?</h3>
        <p>React Router is a standard library for routing in React applications. It enables navigation between different components without reloading the page.</p>
      </div>

      <div className="info-card">
        <h3>Why Use React Router?</h3>
        <ul>
          <li>🎯 Single Page Application (SPA) behavior</li>
          <li>⚡ Fast navigation without page reloads</li>
          <li>💾 Preserves component state</li>
          <li>🔗 Bookmarkable URLs</li>
          <li>📱 Smooth user experience</li>
        </ul>
      </div>

      <div className="live-demo">
        <h3>🕐 Live Demo - Component State:</h3>
        <p>Current time: <strong>{timestamp}</strong></p>
        <p className="hint">This timer continues running even as you navigate!</p>
      </div>

      <button onClick={handleContactClick} className="contact-btn">
        Go to Contact →
      </button>
    </div>
  );
}

export default About;