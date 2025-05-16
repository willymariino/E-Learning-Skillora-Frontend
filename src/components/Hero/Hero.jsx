import './Hero.css'
import HeroShape1 from '../../assets/heroimages/main.png'
import toast from 'react-hot-toast'
import Popup from '../Popup/Popup'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { courses } from '../../data/courses'

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();

    // Image sources - main and fallback
    const mainImageUrl = HeroShape1;
    const fallbackImageUrl = "https://via.placeholder.com/500x400/1e293b/ffffff?text=Education+Illustration";
    
    // Direct URL for testing
    const directImageUrl = "https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=900&t=st=1686645973~exp=1686646573~hmac=c9361" +
      "1a28e4b27cbf3b2449d107d7d29f27f0de75aab19bdab7dd507bed38c83";

    // Check if the image exists
    useEffect(() => {
        console.log("Attempting to load hero image from:", mainImageUrl);
        
        const img = new Image();
        img.src = mainImageUrl;
        
        img.onload = () => {
            console.log("Hero image loaded successfully!");
            setImageError(false);
        };
        
        img.onerror = (e) => {
            console.error("Failed to load hero image:", e);
            setImageError(true);
        };
    }, [mainImageUrl]);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            toast('Please enter a search term', {
                position: 'top-right',
                icon: '⚠️',
            });
            return;
        }

        toast('Searching..', {
            position: 'top-right',
            autoClose: 5000,
            icon: '⌛',
        });

        // Navigate to search results page with the search query
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleImageError = (e) => {
        console.error("Image load error:", e);
        setImageError(true);
    }

    const imgSrc = imageError ? fallbackImageUrl : mainImageUrl;
    // Use direct URL for immediate testing - remove for production
    // const imgSrc = directImageUrl;

    return (
        <>
            <Popup />
            <br /><br />
            <div className="container-hero">
                <div className="content-wrapper">
                    <div className="content" data-aos="fade-right" data-aos-delay="100">
                        <div className="header-container" data-aos="fade-up" data-aos-delay="200">
                            <h1 className="heroHeader">
                                Education for a 
                                <div className="gradient-text">Brighter Tomorrow</div>
                            </h1>
                        </div>

                        <p className="hero-description" data-aos="fade-up" data-aos-delay="300">
                            Learn from industry experts and certified mentors. 
                            Access premium courses at affordable prices to transform your future.
                        </p>

                        <div data-aos="fade-up" data-aos-delay="400">
                            <div className="input">
                                <input 
                                    className="search-input" 
                                    type="text" 
                                    placeholder="What do you want to learn?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button className="search-button" onClick={handleSearch}>
                                    <i className="bi bi-search icon-hero"></i>
                                </button>
                            </div>
                        </div>

                        <br />

                        <div className="button-flex" data-aos="fade-up" data-aos-delay="500">
                            <button className="btn-fill">
                                Contact Us
                            </button>
                            <Link to="/courses">
                                <button className="btn-outline">
                                    Explore Courses
                                </button>
                            </Link>
                        </div>

                        <div className="stats-container" data-aos="fade-up" data-aos-delay="600">
                            <div className="stat-item" data-aos="zoom-in" data-aos-delay="700">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">Courses</span>
                            </div>
                            <div className="stat-item" data-aos="zoom-in" data-aos-delay="800">
                                <span className="stat-number">50k+</span>
                                <span className="stat-label">Students</span>
                            </div>
                            <div className="stat-item" data-aos="zoom-in" data-aos-delay="900">
                                <span className="stat-number">100+</span>
                                <span className="stat-label">Mentors</span>
                            </div>
                        </div>
                    </div>

                    <div className="image-container" data-aos="fade-left" data-aos-delay="200">
                        <div className="image-wrapper">
                            {/* Testing with both images to identify the issue */}
                            <img 
                                src={imgSrc} 
                                className="hero-image" 
                                alt="Education Illustration" 
                                onError={handleImageError}
                                style={{
                                    display: 'block',
                                    visibility: 'visible',
                                    opacity: 1,
                                    maxWidth: '100%',
                                    height: 'auto'
                                }}
                            />
                            
                            {/* Fallback div with color in case the image still doesn't show */}
                            {imageError && 
                                <div className="image-error-message">
                                    Image could not be loaded
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;


