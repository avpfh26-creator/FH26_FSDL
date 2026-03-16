import React, { useState } from 'react';

const SurveyForm = () => {
  const [surveyData, setSurveyData] = useState({
    fullName: '',
    age: '',
    gender: '',
    rating: '5',
    feedback: '',
    subscribe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSurveyData({
      ...surveyData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Survey data:', surveyData);
    alert('Thank you for completing the survey!');
  };

  const formStyle = {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };

  return (
    <div style={formStyle}>
      <h2>Customer Satisfaction Survey</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Full Name:
          </label>
          <input
            type="text"
            name="fullName"
            value={surveyData.fullName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Age Group:
          </label>
          <select
            name="age"
            value={surveyData.age}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select age group</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-50">36-50</option>
            <option value="50+">50+</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Gender:
          </label>
          <div>
            <label style={{ marginRight: '15px' }}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={surveyData.gender === 'male'}
                onChange={handleChange}
              /> Male
            </label>
            <label style={{ marginRight: '15px' }}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={surveyData.gender === 'female'}
                onChange={handleChange}
              /> Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={surveyData.gender === 'other'}
                onChange={handleChange}
              /> Other
            </label>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Rating (1-10):
          </label>
          <input
            type="range"
            name="rating"
            min="1"
            max="10"
            value={surveyData.rating}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          <div style={{ textAlign: 'center', marginTop: '5px' }}>
            Rating: {surveyData.rating}/10
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Additional Feedback:
          </label>
          <textarea
            name="feedback"
            value={surveyData.feedback}
            onChange={handleChange}
            rows="4"
            style={inputStyle}
            placeholder="Please share your thoughts..."
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="checkbox"
              name="subscribe"
              checked={surveyData.subscribe}
              onChange={handleChange}
            /> Subscribe to newsletter
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit Survey
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;