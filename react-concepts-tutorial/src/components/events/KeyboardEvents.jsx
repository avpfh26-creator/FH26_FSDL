import React, { useState } from 'react';

const KeyboardEvents = () => {
  const [input, setInput] = useState('');
  const [keyInfo, setKeyInfo] = useState({
    key: '',
    code: '',
    altKey: false,
    ctrlKey: false,
    shiftKey: false
  });
  const [pressedKeys, setPressedKeys] = useState([]);

  const handleKeyDown = (e) => {
    setKeyInfo({
      key: e.key,
      code: e.code,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey
    });

    // Add to pressed keys list (avoid duplicates)
    if (!pressedKeys.includes(e.key)) {
      setPressedKeys(prev => [...prev, e.key]);
    }

    // Prevent specific keys
    if (e.key === 'F5') {
      e.preventDefault();
      alert('F5 is disabled!');
    }
  };

  const handleKeyUp = (e) => {
    // Remove from pressed keys list
    setPressedKeys(prev => prev.filter(key => key !== e.key));
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const clearKeys = () => {
    setPressedKeys([]);
    setKeyInfo({
      key: '',
      code: '',
      altKey: false,
      ctrlKey: false,
      shiftKey: false
    });
  };

  return (
    <div style={styles.container}>
      <h2>Keyboard Events Example</h2>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Type here:</label>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          placeholder="Start typing..."
          style={styles.input}
        />
      </div>

      <div style={styles.infoPanel}>
        <h4>Current Key Information:</h4>
        <p><strong>Key pressed:</strong> {keyInfo.key || 'None'}</p>
        <p><strong>Key code:</strong> {keyInfo.code || 'None'}</p>
        <p><strong>Alt key:</strong> {keyInfo.altKey ? 'Yes' : 'No'}</p>
        <p><strong>Ctrl key:</strong> {keyInfo.ctrlKey ? 'Yes' : 'No'}</p>
        <p><strong>Shift key:</strong> {keyInfo.shiftKey ? 'Yes' : 'No'}</p>
      </div>

      <div style={styles.pressedKeysPanel}>
        <div style={styles.pressedKeysHeader}>
          <h4 style={{ margin: '0' }}>Currently Pressed Keys:</h4>
          <button onClick={clearKeys} style={styles.clearButton}>
            Clear
          </button>
        </div>
        <div style={styles.keysContainer}>
          {pressedKeys.length > 0 ? (
            pressedKeys.map((key, index) => (
              <span key={index} style={styles.keyBadge}>
                {key}
              </span>
            ))
          ) : (
            <p>No keys pressed</p>
          )}
        </div>
      </div>

      <p style={styles.note}>
        <strong>Note:</strong> F5 key is disabled (try pressing it!)
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
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  infoPanel: {
    backgroundColor: '#e9ecef',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px'
  },
  pressedKeysPanel: {
    backgroundColor: '#d4edda',
    padding: '15px',
    borderRadius: '5px'
  },
  pressedKeysHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  clearButton: {
    padding: '5px 10px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  },
  keysContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  keyBadge: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '3px',
    fontSize: '14px'
  },
  note: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666'
  }
};

export default KeyboardEvents;