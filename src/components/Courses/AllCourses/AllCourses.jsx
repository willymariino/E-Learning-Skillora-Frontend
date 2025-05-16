import React, { useState } from 'react';
import './AllCourses.css'
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { courses } from '../../../data/courses';
import toast from 'react-hot-toast';
import { useCart } from '../../../context/CartContext';

const AllCourses = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [imageErrors, setImageErrors] = useState({});

    const handleAddToCart = (course) => {
        addToCart(course);
    };

    const handleCheckout = () => {
        toast.error("Please add items to your cart first!");
        setTimeout(() => {
            navigate('/cart');
        }, 2000);
    };

    const handleEnroll = (course) => {
        // Navigate to the enroll page for this specific course
        navigate(`/enroll/${course.id}`);
    };

    const handleImageError = (courseId) => {
        setImageErrors(prev => ({
            ...prev,
            [courseId]: true
        }));
    };

    // Fallback image URL - a generic course placeholder
    const fallbackImage = "https://via.placeholder.com/400x225/1e293b/ffffff?text=Course+Thumbnail";

    return (
        <div className="all-courses-container">
            <Navbar />
            <br /><br />
            <div className="courses-hero">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="shape-1"></div>
                <div className="shape-2"></div>
                <div className="shape-3"></div>
                <div className="particles">
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                </div>
                <div className="hero-content">
                    <Link to='/' className="back-button">
                        <i className="bi bi-arrow-left"></i>
                        Back to Home
                    </Link>
                    <h1 className="hero-title">Explore Our Courses</h1>
                    <p className="hero-subtitle">Discover a world of learning opportunities</p>
                </div>
            </div>

            <div className="courses-simple-container">
                {courses.map((course) => (
                    <div key={course.id} className="course-simple-card">
                        <div className="course-simple-image">
                            <img 
                                src={imageErrors[course.id] ? fallbackImage : course.image} 
                                alt={course.title}
                                onError={() => handleImageError(course.id)}
                                loading="lazy"
                                crossOrigin="anonymous"
                            />
                            <div className="course-simple-price">
                                {discount > 0 ? (
                                    <>
                                        <span className="original-price">${Math.floor(course.price)}</span>
                                        ${Math.floor(course.price * (1 - discount/100))}
                                    </>
                                ) : (
                                    `$${Math.floor(course.price)}`
                                )}
                            </div>
                        </div>
                        <div className="course-simple-content">
                            <h3 className="course-simple-title">{course.title}</h3>
                            <p className="course-simple-subtitle">{course.subtitle}</p>
                            <div className="course-buttons">
                                <button 
                                    className="add-to-cart-button"
                                    onClick={() => handleAddToCart(course)}
                                >
                                    <i className="bi bi-bag-plus"></i> Add to Cart
                                </button>
                                <button 
                                    className="btn-outline"
                                    onClick={() => handleEnroll(course)}
                                >
                                    <i className="bi bi-journal-check"></i> Enroll Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default AllCourses;
