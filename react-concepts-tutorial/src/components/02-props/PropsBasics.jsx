import React from 'react';

// Component receiving props
function PropsBasics(props) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Props Basics</h2>
      <p style={styles.description}>
        Props (Properties) are read-only inputs passed to components.
      </p>

      <div style={styles.propsDisplay}>
        <h3>Received Props:</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Prop Name</th>
              <th>Prop Value</th>
              <th>Data Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>name</td>
              <td>{props.name}</td>
              <td>{typeof props.name}</td>
            </tr>
            <tr>
              <td>age</td>
              <td>{props.age}</td>
              <td>{typeof props.age}</td>
            </tr>
            <tr>
              <td>isStudent</td>
              <td>{props.isStudent ? 'Yes' : 'No'}</td>
              <td>{typeof props.isStudent}</td>
            </tr>
            <tr>
              <td>hobbies</td>
              <td>{props.hobbies?.join(', ')}</td>
              <td>Array</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.note}>
        <strong>Note:</strong> Props are immutable - you cannot modify them in the child component!
      </div>
    </div>
  );
}

// Default props - used when props aren't provided
PropsBasics.defaultProps = {
  name: 'Guest User',
  age: 18,
  isStudent: false,
  hobbies: ['No hobbies listed']
};

const styles = {
  container: {
    border: '2px solid #FF9800',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#fff3e0'
  },
  title: {
    color: '#FF9800',
    marginTop: 0
  },
  description: {
    fontSize: '16px',
    marginBottom: '20px'
  },
  propsDisplay: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '4px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px'
  },
  note: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#ffe0b2',
    borderRadius: '4px',
    fontStyle: 'italic'
  }
};

export default PropsBasics;