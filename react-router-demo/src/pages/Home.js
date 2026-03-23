import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Home page mounted - State persists!');
    return () => console.log('Home page unmounted');
  }, []);

  const handleExploreClick = () => {
    navigate('/about');
  };

  return (
    <div className="page-container">
      <h1>🏠 Welcome to Home Page</h1>
      <p>This is a Single Page Application (SPA) using React Router.</p>
      
      <div className="feature-box">
        <h3>✨ Key SPA Features:</h3>
        <ul>
          <li>✅ No page reload when navigating</li>
          <li>✅ State persists between pages</li>
          <li>✅ Smooth, fast transitions</li>
          <li>✅ Client-side routing</li>
        </ul>
      </div>

      <div className="counter-demo">
        <h3>State Persistence Demo:</h3>
        <p>This counter shows that React state survives navigation!</p>
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
        <p className="hint">Try navigating to About/Contact and back - count remains!</p>
      </div>

      <button className="explore-btn" onClick={handleExploreClick}>
        Explore About Page →
      </button>
    </div>
  );
}

export default Home;