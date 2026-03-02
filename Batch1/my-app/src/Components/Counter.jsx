import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter-container">
      <h2>Counter Component</h2>
      <p className="count-display">Count: {count}</p>
      <div className="button-group">
        <button onClick={increment} className="btn btn-primary">Increment</button>
        <button onClick={decrement} className="btn btn-secondary">Decrement</button>
        <button onClick={reset} className="btn btn-danger">Reset</button>
      </div>
    </div>
  );
};

export default Counter;