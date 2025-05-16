import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { courses } from '../../data/courses'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const { getCartCount } = useCart();
  const { darkMode, toggleDarkMode, forceApplyDarkMode } = useTheme();

  const popularSearches = [
    'Web Development',
    'Python Programming',
    'UI/UX Design'
  ];

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Force apply dark mode on component mount
  useEffect(() => {
    if (darkMode) {
      forceApplyDarkMode(true);
    }
  }, [darkMode, forceApplyDarkMode]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Normalize the search query
    const normalizedQuery = query.toLowerCase().trim();
    
    // Define keyword mappings for better matching
    const keywordMappings = {
      'web development': ['mern', 'fullstack', 'full stack', 'web', 'development', 'javascript', 'react', 'node', 'frontend', 'backend'],
      'ui/ux': ['ui', 'ux', 'design', 'user interface', 'user experience', 'prototyping'],
      'mobile': ['flutter', 'app development', 'mobile', 'cross-platform'],
      'marketing': ['digital marketing', 'seo', 'social media', 'content'],
      'ai': ['artificial intelligence', 'machine learning', 'generative', 'nlp', 'agent', 'conversational'],
      'data science': ['data', 'statistics', 'machine learning', 'visualization', 'big data', 'analysis'],
      'blockchain': ['crypto', 'ethereum', 'smart contract', 'web3', 'decentralized'],
      'cloud': ['devops', 'aws', 'docker', 'ci/cd', 'deployment', 'infrastructure'],
      'cybersecurity': ['security', 'network', 'penetration testing', 'encryption', 'threat'],
      'database': ['sql', 'nosql', 'data modeling', 'database systems', 'optimization']
    };
    
    // Find relevant keywords for the search query
    let relevantKeywords = [normalizedQuery];
    
    // Add related keywords based on mappings
    Object.entries(keywordMappings).forEach(([category, keywords]) => {
      if (keywords.some(keyword => normalizedQuery.includes(keyword)) || 
          category.includes(normalizedQuery)) {
        relevantKeywords = [...relevantKeywords, ...keywords, category];
      }
    });
    
    // Remove duplicates
    relevantKeywords = [...new Set(relevantKeywords)];
    
    // Calculate relevance score for each course
    const scoredResults = courses.map(course => {
      let score = 0;
      
      // Check title (highest weight)
      const title = course.title.toLowerCase();
      if (title.includes(normalizedQuery)) {
        score += 10;
      }
      
      // Check if title contains any of the relevant keywords
      relevantKeywords.forEach(keyword => {
        if (title.includes(keyword)) {
          score += 5;
        }
      });
      
      // Check subtitle
      const subtitle = course.subtitle.toLowerCase();
      if (subtitle.includes(normalizedQuery)) {
        score += 8;
      }
      
      // Check if subtitle contains any of the relevant keywords
      relevantKeywords.forEach(keyword => {
        if (subtitle.includes(keyword)) {
          score += 4;
        }
      });
      
      // Check description
      const description = course.description.toLowerCase();
      if (description.includes(normalizedQuery)) {
        score += 6;
      }
      
      // Check if description contains any of the relevant keywords
      relevantKeywords.forEach(keyword => {
        if (description.includes(keyword)) {
          score += 3;
        }
      });
      
      // Check highlights
      const highlightsMatch = course.highlights.some(highlight => 
        highlight.toLowerCase().includes(normalizedQuery)
      );
      if (highlightsMatch) {
        score += 4;
      }
      
      // Check if highlights contain any of the relevant keywords
      const highlightsKeywordMatch = course.highlights.some(highlight => 
        relevantKeywords.some(keyword => highlight.toLowerCase().includes(keyword))
      );
      if (highlightsKeywordMatch) {
        score += 2;
      }
      
      // Check technologies
      const technologiesMatch = course.technologies.some(tech => 
        tech.title.toLowerCase().includes(normalizedQuery)
      );
      if (technologiesMatch) {
        score += 7;
      }
      
      // Check if technologies contain any of the relevant keywords
      const techKeywordMatch = course.technologies.some(tech => 
        relevantKeywords.some(keyword => tech.title.toLowerCase().includes(keyword))
      );
      if (techKeywordMatch) {
        score += 3;
      }
      
      return { course, score };
    });
    
    // Filter courses with a minimum score and sort by relevance
    const filteredResults = scoredResults
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.course);
    
    setSearchResults(filteredResults);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== '') {
      // Add to recent searches
      updateRecentSearches(searchQuery);
    }
  };

  const handleSearchItemClick = (searchTerm) => {
    setSearchQuery(searchTerm);
    handleSearch(searchTerm);
    updateRecentSearches(searchTerm);
  };

  const updateRecentSearches = (searchTerm) => {
    setRecentSearches(prev => {
      // Remove the term if it already exists to avoid duplicates
      const updated = [searchTerm, ...prev.filter(item => item !== searchTerm)].slice(0, 5);
      return updated;
    });
  };

  const clearRecentSearches = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearchModal = () => {
    setSearchModal(!searchModal);
    if (!searchModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
   <>
    <nav className={darkMode ? 'dark-nav' : ''}>
      <div className="container nav__container">
        <Link to="/" className="nav__logo">
          <img src={logo} alt="logo" />
        </Link>
        
        <i 
          className={`bi bi-list hamburger-icon ${isMobileMenuOpen ? "active" : ""}`} 
          onClick={toggleMobileMenu}
        ></i>

        <ul className={`nav__menu ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li className='last-li'>
            <Link to="/courses">All Courses</Link>
          </li>
          <li>
            <Link to="/contact" className="btn-nav">Get In Touch</Link>
          </li>
          <li>
            <div className="container-pill">
              <Link to="/cart">
                <i className="bi bi-cart" onClick={toggleModal}></i>
                <div className="pill">{getCartCount()}</div>
              </Link>
              <i className="bi bi-search" onClick={toggleSearchModal}></i>
              <i 
                className={`theme-toggle-icon bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`} 
                onClick={() => {
                  toggleDarkMode();
                  console.log("Dark mode toggled in navbar");
                }}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              ></i>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    {searchModal && (
      <div className="modern-search-overlay" onClick={toggleSearchModal}>
        <div className="modern-search-modal" onClick={e => e.stopPropagation()}>
          <div className="modern-search-header">
            <div className="modern-search-container">
              <i className="bi bi-search modern-search-icon"></i>
              <input 
                type="text" 
                placeholder="Search for courses..." 
                className="modern-search-input"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                  }
                }}
                autoFocus
              />
            </div>
            <button className="modern-search-close-btn" onClick={toggleSearchModal}>
              <i className="bi bi-x"></i>
            </button>
          </div>

          <div className="modern-search-content">
            {searchQuery ? (
              <div className="modern-search-section">
                <h3>Search Results</h3>
                <div className="modern-search-results">
                  {searchResults.length > 0 ? (
                    searchResults.map((course) => (
                      <Link 
                        to={`/enroll/${course.id}`} 
                        key={course.id} 
                        className="modern-search-result-item"
                        onClick={() => {
                          updateRecentSearches(searchQuery);
                          toggleSearchModal();
                        }}
                      >
                        <img src={course.image} alt={course.title} />
                        <div className="result-details">
                          <h4>{course.title}</h4>
                          <p>{course.subtitle}</p>
                          <span className="price">${course.price}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="no-results">
                      <i className="bi bi-search"></i>
                      <p>No courses found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="modern-search-section">
                  <h3>Popular Searches</h3>
                  <div className="modern-search-tags">
                    {popularSearches.map((search, index) => (
                      <span 
                        key={index} 
                        className="modern-search-tag"
                        onClick={() => handleSearchItemClick(search)}
                      >
                        <i className="bi bi-fire"></i>
                        {search}
                      </span>
                    ))}
                  </div>
                </div>

                {recentSearches.length > 0 && (
                  <div className="modern-search-section">
                    <div className="recent-searches-header">
                      <h3>Recent Searches</h3>
                      <button 
                        className="clear-searches-btn" 
                        onClick={clearRecentSearches}
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="modern-search-recent">
                      {recentSearches.map((search, index) => (
                        <div 
                          key={index} 
                          className="modern-search-recent-item"
                          onClick={() => handleSearchItemClick(search)}
                        >
                          <i className="bi bi-clock-history"></i>
                          <span>{search}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    )}
   </>
  );
};

export default Navbar;