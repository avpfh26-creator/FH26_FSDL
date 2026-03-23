import React, { useState } from 'react';
import './App.css';

function App() {
  // State variables
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Your GNews API key (replace with your actual key)
  const API_KEY = '5fae8f9167a074e66968bc480cd01598';

  // Function to fetch news
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build the API URL
      let url = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en&country=us&max=10`;
      
      // Add search term if provided
      if (searchTerm) {
        url = `https://gnews.io/api/v4/search?q=${searchTerm}&token=${API_KEY}&lang=en&max=10`;
      }
      
      // Make the API call
      const response = await fetch(url);
      const data = await response.json();
      
      // Check if the response is successful
      if (response.ok) {
        setArticles(data.articles);
      } else {
        setError(data.message || 'Failed to fetch news');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📰 GNews App</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search for news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        
        {/* Get Top News Button */}
        <button onClick={fetchNews} className="top-news-button">
          Get Top News
        </button>
      </header>

      {/* Loading Indicator */}
      {loading && (
        <div className="loading">
          <p>Loading news...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error">
          <p>❌ {error}</p>
        </div>
      )}

      {/* News Articles Grid */}
      <div className="articles-grid">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            {article.image && (
              <img 
                src={article.image} 
                alt={article.title}
                className="article-image"
              />
            )}
            <div className="article-content">
              <h3 className="article-title">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h3>
              <p className="article-description">
                {article.description || 'No description available'}
              </p>
              <div className="article-meta">
                <span className="article-source">{article.source.name}</span>
                <span className="article-date">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {!loading && !error && articles.length === 0 && (
        <div className="no-results">
          <p>No articles to display. Click "Get Top News" to start!</p>
        </div>
      )}
    </div>
  );
}

export default App;