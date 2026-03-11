import React from 'react';

// Method 1: Destructure in parameters
function PropsDestructuring({ 
  name, 
  age, 
  email, 
  address = {}, 
  skills = [],
  isActive = false 
}) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Props Destructuring</h2>
      <p style={styles.description}>
        Destructuring makes props cleaner and easier to use.
      </p>

      <div style={styles.userCard}>
        <h3>User Profile</h3>
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <strong>Name:</strong> {name}
          </div>
          <div style={styles.infoItem}>
            <strong>Age:</strong> {age}
          </div>
          <div style={styles.infoItem}>
            <strong>Email:</strong> {email}
          </div>
          <div style={styles.infoItem}>
            <strong>Status:</strong> 
            <span style={{ color: isActive ? 'green' : 'red' }}>
              {isActive ? ' Active' : ' Inactive'}
            </span>
          </div>
          <div style={styles.infoItem}>
            <strong>Address:</strong> {address.city}, {address.country}
          </div>
          <div style={styles.infoItem}>
            <strong>Skills:</strong> {skills.join(' • ')}
          </div>
        </div>
      </div>

      <div style={styles.codeExample}>
        <h4>Destructuring Methods:</h4>
        <pre style={styles.pre}>
          {`// Method 1: In parameters
function Component({ prop1, prop2 }) {
  return <div>{prop1} {prop2}</div>;
}

// Method 2: Inside function
function Component(props) {
  const { prop1, prop2 } = props;
  return <div>{prop1} {prop2}</div>;
}`}
        </pre>
      </div>
    </div>
  );
}

// Default values for destructured props
PropsDestructuring.defaultProps = {
  name: 'John Doe',
  age: 25,
  email: 'john@example.com',
  address: { city: 'New York', country: 'USA' },
  skills: ['JavaScript', 'React'],
  isActive: true
};

const styles = {
  container: {
    border: '2px solid #9C27B0',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#f3e5f5'
  },
  title: {
    color: '#9C27B0',
    marginTop: 0
  },
  description: {
    fontSize: '16px',
    marginBottom: '20px'
  },
  userCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginTop: '15px'
  },
  infoItem: {
    padding: '8px',
    backgroundColor: '#f3e5f5',
    borderRadius: '4px'
  },
  codeExample: {
    marginTop: '20px',
    backgroundColor: '#1e1e1e',
    padding: '15px',
    borderRadius: '4px'
  },
  pre: {
    color: '#d4d4d4',
    fontFamily: 'monospace',
    fontSize: '14px',
    lineHeight: '1.5',
    overflowX: 'auto'
  }
};

export default PropsDestructuring;