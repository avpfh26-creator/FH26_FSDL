import React, { useState } from 'react';

const MouseEvents = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mouseActivity, setMouseActivity] = useState('Move mouse over the box');

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setMouseActivity('Mouse entered the box! 🎉');
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMouseActivity('Mouse left the box 👋');
  };

  const handleMouseDown = () => {
    setMouseActivity('Mouse button pressed down! 👇');
  };

  const handleMouseUp = () => {
    setMouseActivity('Mouse button released! 👆');
  };

  return (
    <div style={styles.container}>
      <h2>Mouse Events Example</h2>

      <div
        style={{
          ...styles.mouseBox,
          backgroundColor: isHovering ? '#e3f2fd' : '#f5f5f5',
          border: isHovering ? '2px solid #007bff' : '2px solid #ccc'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <p style={styles.boxText}>
          {isHovering ? '🖱️ Mouse is inside!' : '⬜ Move mouse here'}
        </p>
      </div>

      <div style={styles.infoPanel}>
        <p><strong>Mouse Position:</strong> X: {mousePosition.x}, Y: {mousePosition.y}</p>
        <p><strong>Status:</strong> {mouseActivity}</p>
        <p><strong>Hovering:</strong> {isHovering ? 'Yes' : 'No'}</p>
      </div>

      <div style={styles.eventsList}>
        <h4>Available Mouse Events:</h4>
        <ul>
          <li>onMouseMove - Track mouse position</li>
          <li>onMouseEnter - Mouse enters element</li>
          <li>onMouseLeave - Mouse leaves element</li>
          <li>onMouseDown - Mouse button pressed</li>
          <li>onMouseUp - Mouse button released</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  mouseBox: {
    width: '100%',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    marginBottom: '20px',
    transition: 'all 0.3s',
    cursor: 'crosshair'
  },
  boxText: {
    fontSize: '18px',
    fontWeight: 'bold'
  },
  infoPanel: {
    backgroundColor: '#e9ecef',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px'
  },
  eventsList: {
    backgroundColor: '#d4edda',
    padding: '15px',
    borderRadius: '5px'
  }
};

export default MouseEvents;