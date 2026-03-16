import React, { useState } from 'react';

const FormEvents = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    country: '',
    agree: false
  });

  const [events, setEvents] = useState([]);
  const [touched, setTouched] = useState({});

  const addEvent = (eventName, details) => {
    const newEvent = {
      name: eventName,
      details: details,
      timestamp: new Date().toLocaleTimeString()
    };
    setEvents(prev => [newEvent, ...prev].slice(0, 5)); // Keep last 5 events
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    addEvent('onChange', `${name}: ${type === 'checkbox' ? checked : value}`);
  };

  const handleFocus = (e) => {
    addEvent('onFocus', `Focused on ${e.target.name}`);
  };

  const handleBlur = (e) => {
    addEvent('onBlur', `Left ${e.target.name} field`);
    setTouched({
      ...touched,
      [e.target.name]: true
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent('onSubmit', 'Form submitted');
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console for data.');
  };

  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      country: '',
      agree: false
    });
    setEvents([]);
    setTouched({});
    addEvent('onReset', 'Form reset');
  };

  const getFieldStyle = (fieldName) => {
    if (touched[fieldName] && !formData[fieldName]) {
      return { ...styles.input, border: '2px solid #dc3545' };
    }
    return styles.input;
  };

  return (
    <div style={styles.container}>
      <h2>Form Events Example</h2>

      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Enter username"
            style={getFieldStyle('username')}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Enter email"
            style={getFieldStyle('email')}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Country:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={getFieldStyle('country')}
            required
          >
            <option value="">Select a country</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
            <option value="australia">Australia</option>
            <option value="india">India</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            /> I agree to terms and conditions
          </label>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
          <button type="reset" style={styles.resetButton}>
            Reset
          </button>
        </div>
      </form>

      <div style={styles.eventsPanel}>
        <h4>Recent Form Events:</h4>
        {events.length > 0 ? (
          <ul style={styles.eventsList}>
            {events.map((event, index) => (
              <li key={index} style={styles.eventItem}>
                <span style={styles.eventName}>{event.name}</span>
                <span style={styles.eventDetails}>{event.details}</span>
                <span style={styles.eventTime}>{event.timestamp}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events yet. Interact with the form!</p>
        )}
      </div>

      <p style={styles.note}>
        <strong>Available Events:</strong> onChange, onFocus, onBlur, onSubmit, onReset
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
  formGroup: {
    marginBottom: '15px'
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
    fontSize: '16px',
    transition: 'border 0.3s'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px'
  },
  submitButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  resetButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  eventsPanel: {
    marginTop: '20px',
    backgroundColor: '#e9ecef',
    padding: '15px',
    borderRadius: '5px'
  },
  eventsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  eventItem: {
    padding: '8px',
    borderBottom: '1px solid #dee2e6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  eventName: {
    fontWeight: 'bold',
    color: '#007bff'
  },
  eventDetails: {
    color: '#6c757d',
    fontSize: '14px'
  },
  eventTime: {
    color: '#999',
    fontSize: '12px'
  },
  note: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666'
  }
};

export default FormEvents;