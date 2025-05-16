import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { courses } from '../../data/courses';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './SearchResults.css';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [imageErrors, setImageErrors] = useState({});

    // Parse query parameters
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query') || '';
        setSearchQuery(query);
        filterCourses(query);
    }, [location.search]);

    // Filter courses based on search query
    const filterCourses = (query) => {
        if (!query.trim()) {
            setFilteredCourses([]);
            return;
        }

        // Case-insensitive search in title, subtitle, and description
        const filtered = courses.filter(course => 
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.subtitle.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase()) ||
            (course.highlights && course.highlights.some(highlight => 
                highlight.toLowerCase().includes(query.toLowerCase())
            ))
        );
        
        setFilteredCourses(filtered);
    };

    // Handle new search
    const handleSearch = () => {
        if (!searchQuery.trim()) {
            toast('Please enter a search term', {
                position: 'top-right',
                icon: '⚠️',
            });
            return;
        }

        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Handle image load errors
    const handleImageError = (courseId) => {
        setImageErrors(prev => ({
            ...prev,
            [courseId]: true
        }));
    };

    // Add to cart
    const handleAddToCart = (course) => {
        addToCart(course);
        toast.success(`${course.title} added to cart!`);
    };

    // Enroll in course
    const handleEnroll = (course) => {
        navigate(`/enroll/${course.id}`);
    };

    // Fallback image
    const fallbackImage = "https://via.placeholder.com/400x225/1e293b/ffffff?text=Course+Thumbnail";

    return (
        <div className="search-results-page">
            <Navbar />
            <div className="search-results-container">
                <div className="search-header">
                    <h1>Search Results</h1>
                    <div className="search-box">
                        <input 
                            type="text" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Search courses..." 
                            className="search-input"
                        />
                        <button onClick={handleSearch} className="search-button">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                {filteredCourses.length === 0 ? (
                    <div className="no-results">
                        <i className="bi bi-search-heart"></i>
                        <h2>No courses found for "{searchQuery}"</h2>
                        <p>Try different keywords or check out our <Link to="/courses">course catalog</Link></p>
                    </div>
                ) : (
                    <>
                        <div className="results-info">
                            <p>Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
                        </div>
                        <div className="courses-grid">
                            {filteredCourses.map(course => (
                                <div key={course.id} className="course-card">
                                    <div className="course-image">
                                        <img 
                                            src={imageErrors[course.id] ? fallbackImage : course.image} 
                                            alt={course.title}
                                            onError={() => handleImageError(course.id)}
                                        />
                                    </div>
                                    <div className="course-content">
                                        <h3 className="course-title">{course.title}</h3>
                                        <p className="course-subtitle">{course.subtitle}</p>
                                        <div className="course-meta">
                                            <span className="course-rating">
                                                <i className="bi bi-star-fill"></i> {course.rating} ({course.ratingCount})
                                            </span>
                                            <span className="course-duration">
                                                <i className="bi bi-clock"></i> {course.duration}
                                            </span>
                                        </div>
                                        <div className="course-price">${course.price}</div>
                                        <div className="course-actions">
                                            <button 
                                                className="add-to-cart-btn"
                                                onClick={() => handleAddToCart(course)}
                                            >
                                                <i className="bi bi-cart-plus"></i> Add to Cart
                                            </button>
                                            <button 
                                                className="enroll-btn"
                                                onClick={() => handleEnroll(course)}
                                            >
                                                Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchResults; 