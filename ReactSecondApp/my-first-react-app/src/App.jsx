import React, { useState } from 'react';
import './App.css'; // We'll update this CSS next

function App() {
  // Step 1: Create a state variable for the count
  // useState(0) initializes the count to 0
  // count: the current value
  // setCount: function to update the count
  const [count, setCount] = useState(0);

  // Step 2: Create functions to handle button clicks
  const increment = () => {
    setCount(count + 1); // Add 1 to current count
  };

  const decrement = () => {
    setCount(count - 1); // Subtract 1 from current count
  };

  const reset = () => {
    setCount(0); // Set count back to 0
  };

  // Step 3: What to display on the screen
  return (
    <div className="App">
      <h1>Simple Counter App</h1>
      
      {/* Display the current count */}
      <div className="counter-display">
        <h2>{count}</h2>
      </div>

      {/* Container for all buttons */}
      <div className="button-container">
        {/* Increment button - calls increment function when clicked */}
        <button onClick={increment} className="btn increment-btn">
          Increment (+)
        </button>

        {/* Decrement button - calls decrement function when clicked */}
        <button onClick={decrement} className="btn decrement-btn">
          Decrement (-)
        </button>

        {/* Reset button - calls reset function when clicked */}
        <button onClick={reset} className="btn reset-btn">
          Reset
        </button>
      </div>

      {/* Optional: Show message when count reaches certain numbers */}
      {count === 10 && (
        <p className="message">🎉 You reached 10! Keep going!</p>
      )}
      
      {count === -5 && (
        <p className="message warning">⚠️ Below -5? Everything okay?</p>
      )}
    </div>
  );
}

export default App;