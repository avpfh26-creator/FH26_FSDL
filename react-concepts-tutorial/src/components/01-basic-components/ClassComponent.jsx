import React, { Component } from 'react';

// Class Component - Extends React.Component
class ClassComponent extends Component {
  // Constructor - called when component is created
  constructor(props) {
    super(props);
    this.state = {
      message: 'This is class component state',
      count: 0
    };
  }

  // Lifecycle method - called after component mounts
  componentDidMount() {
    console.log('Class Component mounted');
  }

  // Lifecycle method - called when component updates
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log(`Count updated from ${prevState.count} to ${this.state.count}`);
    }
  }

  // Lifecycle method - called before component unmounts
  componentWillUnmount() {
    console.log('Class Component will unmount');
  }

  // Custom method to update count
  incrementCount = () => {
    this.setState({ count: this.state.count + 10 });
  };

  // render method - must return JSX
  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>2. Class Component</h2>
        <p style={styles.description}>
          This is a class component. It extends React.Component and has lifecycle methods.
        </p>
        
        <div style={styles.features}>
          <h3>Features:</h3>
          <ul>
            <li>Has lifecycle methods</li>
            <li>Uses this.state and this.setState()</li>
            <li>Legacy approach (still maintained)</li>
            <li>Requires binding event handlers</li>
          </ul>
        </div>

        <div style={styles.demo}>
          <h4>State Demo:</h4>
          <p>Message: {this.state.message}</p>
          <p>Count: {this.state.count}</p>
          <button onClick={this.incrementCount} style={styles.button}>
            Increment Count
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    border: '2px solid #2196F3',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#f9f9f9'
  },
  title: {
    color: '#2196F3',
    marginTop: 0
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.5'
  },
  features: {
    backgroundColor: '#e3f2fd',
    padding: '10px',
    borderRadius: '4px'
  },
  demo: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px'
  },
  button: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default ClassComponent;