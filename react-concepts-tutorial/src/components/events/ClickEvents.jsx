import React, { useState } from 'react';

const ClickEvents = () => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClick, setLastClick] = useState('');
  const [buttonColor, setButtonColor] = useState('#007bff');

  const handleClick = (e) => {
    console.log('Button clicked!', e);
    setClickCount(prev => prev + 1);
    setLastClick(new Date().toLocaleTimeString());
  };

  const handleDoubleClick = () => {
    alert('Double clicked! Button color will change!');
    const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];
    setButtonColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  const handleRightClick = (e) => {
    e.preventDefault(); // Prevent context menu
    console.log('Right click prevented!');
    alert('Right click is disabled on this button!');
  };

  const resetCounter = () => {
    setClickCount(0);
    setLastClick('');
    setButtonColor('#007bff');
  };

  return (
    <div style={styles.container}>
      <h2>Click Events Example</h2>
      
      <div style={styles.counterBox}>
        <p style={styles.countText}>Button clicked: <strong>{clickCount}</strong> times</p>
        {lastClick && <p>Last click: {lastClick}</p>}
      </div>

      <div style={styles.buttonGroup}>
        <button
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onContextMenu={handleRightClick}
          style={{...styles.button, backgroundColor: buttonColor}}
        >
          Click Me (Single, Double, Right)
        </button>

        <button onClick={resetCounter} style={styles.resetButton}>
          Reset Counter
        </button>
      </div>

      <p style={styles.note}>
        <strong>Try:</strong> Single click, double click, and right click on the blue button
      </p>
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
  counterBox: {
    backgroundColor: '#e9ecef',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px'
  },
  countText: {
    fontSize: '18px',
    margin: '0'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '15px'
  },
  button: {
    padding: '10px 20px',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s'
  },
  resetButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  note: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center'
  }
};

export default ClickEvents;