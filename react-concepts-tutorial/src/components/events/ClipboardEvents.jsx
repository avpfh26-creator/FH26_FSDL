import React, { useState } from 'react';

const ClipboardEvents = () => {
  const [text, setText] = useState('');
  const [clipboardHistory, setClipboardHistory] = useState([]);
  const [lastAction, setLastAction] = useState('');

  const handleCopy = (e) => {
    e.preventDefault();
    setLastAction('Text copied to clipboard!');
    addToHistory('copy', window.getSelection().toString());
    // Custom copy message
    alert('Copied! You can now paste elsewhere.');
  };

  const handleCut = (e) => {
    setLastAction('Text cut from field!');
    addToHistory('cut', text);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    setLastAction(`Pasted: "${pastedText.substring(0, 30)}${pastedText.length > 30 ? '...' : ''}"`);
    addToHistory('paste', pastedText);
    setText(prev => prev + pastedText);
  };

  const addToHistory = (action, content) => {
    if (content && content.trim()) {
      setClipboardHistory(prev => [
        {
          action,
          content: content.substring(0, 50),
          timestamp: new Date().toLocaleTimeString()
        },
        ...prev
      ].slice(0, 5));
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const clearHistory = () => {
    setClipboardHistory([]);
    setLastAction('History cleared');
  };

  return (
    <div style={styles.container}>
      <h2>Clipboard Events Example</h2>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Type or paste text here:</label>
        <textarea
          value={text}
          onChange={handleTextChange}
          onCopy={handleCopy}
          onCut={handleCut}
          onPaste={handlePaste}
          placeholder="Try copying, cutting, or pasting text here..."
          rows="4"
          style={styles.textarea}
        />
      </div>

      <div style={styles.infoPanel}>
        <p><strong>Last Action:</strong> {lastAction || 'No action yet'}</p>
      </div>

      <div style={styles.historyPanel}>
        <div style={styles.historyHeader}>
          <h4 style={{ margin: '0' }}>Clipboard History:</h4>
          <button onClick={clearHistory} style={styles.clearButton}>
            Clear History
          </button>
        </div>
        
        {clipboardHistory.length > 0 ? (
          <ul style={styles.historyList}>
            {clipboardHistory.map((item, index) => (
              <li key={index} style={styles.historyItem}>
                <span style={{
                  ...styles.actionBadge,
                  backgroundColor: item.action === 'copy' ? '#007bff' :
                                 item.action === 'cut' ? '#dc3545' : '#28a745'
                }}>
                  {item.action}
                </span>
                <span style={styles.contentText}>"{item.content}"</span>
                <span style={styles.timeText}>{item.timestamp}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noHistory}>No clipboard actions yet</p>
        )}
      </div>

      <div style={styles.tips}>
        <h4>📋 Clipboard Events:</h4>
        <ul>
          <li><strong>onCopy:</strong> Fired when copying text</li>
          <li><strong>onCut:</strong> Fired when cutting text</li>
          <li><strong>onPaste:</strong> Fired when pasting text</li>
        </ul>
        <p style={styles.note}>
          <strong>Note:</strong> Try selecting text and using Ctrl+C (Copy), 
          Ctrl+X (Cut), or Ctrl+V (Paste)
        </p>
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
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'vertical'
  },
  infoPanel: {
    backgroundColor: '#e9ecef',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px'
  },
  historyPanel: {
    backgroundColor: '#d4edda',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px'
  },
  historyHeader: {
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
  historyList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  historyItem: {
    padding: '8px',
    borderBottom: '1px solid #c3e6cb',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  actionBadge: {
    padding: '3px 8px',
    color: 'white',
    borderRadius: '3px',
    fontSize: '12px',
    textTransform: 'uppercase'
  },
  contentText: {
    flex: 1,
    fontSize: '14px',
    color: '#333'
  },
  timeText: {
    fontSize: '12px',
    color: '#999'
  },
  noHistory: {
    color: '#666',
    fontStyle: 'italic',
    margin: 0
  },
  tips: {
    backgroundColor: '#fff3cd',
    padding: '15px',
    borderRadius: '5px'
  },
  note: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#856404'
  }
};

export default ClipboardEvents;