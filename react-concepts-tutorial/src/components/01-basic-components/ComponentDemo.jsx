import React from 'react';
import FunctionalComponent from './FunctionalComponent';
import ClassComponent from './ClassComponent';

// Component Demo - Shows both component types
function ComponentDemo() {
  return (
    <div style={styles.mainContainer}>
      <h1 style={styles.mainTitle}>React Components Demo</h1>
      <p style={styles.mainDescription}>
        React has two types of components: Functional and Class components.
        Both can render UI and manage logic, but they have different syntax and features.
      </p>
      
      <div style={styles.componentsContainer}>
        <FunctionalComponent />
        <ClassComponent />
      </div>

      <div style={styles.summary}>
        <h3>When to Use Which?</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Functional Components</th>
              <th>Class Components</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Modern React (with Hooks)</td>
              <td>Legacy codebases</td>
            </tr>
            <tr>
              <td>Simpler and cleaner code</td>
              <td>Complex lifecycle needs</td>
            </tr>
            <tr>
              <td>Recommended for new projects</td>
              <td>Error boundaries only possible here</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  mainContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  mainTitle: {
    color: '#333',
    textAlign: 'center',
    borderBottom: '3px solid #4CAF50',
    paddingBottom: '10px'
  },
  mainDescription: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
    marginBottom: '30px'
  },
  componentsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '30px'
  },
  summary: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px'
  }
};

export default ComponentDemo;