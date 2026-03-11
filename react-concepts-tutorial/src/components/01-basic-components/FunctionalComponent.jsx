import React from 'react';

// Functional Component - Simple function that returns JSX
function FunctionalComponent() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>1. Functional Component</h2>
      <p style={styles.description}>
        This is a functional component. It's a JavaScript function that returns JSX.
      </p>
      <div style={styles.features}>
        <h3>Features:</h3>
        <ul>
          <li>Simple JavaScript function</li>
          <li>Uses Hooks for state and lifecycle</li>
          <li>Recommended approach in modern React</li>
          <li>Easier to read and test</li>
        </ul>
      </div>
    </div>
  );
}

// Inline styles object
const styles = {
  container: {
    border: '2px solid #4CAF50',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#f9f9f9'
  },
  title: {
    color: '#4CAF50',
    marginTop: 0
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.5'
  },
  features: {
    backgroundColor: '#e8f5e9',
    padding: '10px',
    borderRadius: '4px'
  }
};

export default FunctionalComponent;