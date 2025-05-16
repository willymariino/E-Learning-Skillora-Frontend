import React, { useState } from 'react';
import './Review.css';
import { motion } from 'framer-motion';

const Review = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      review: "This product is amazing! I highly recommend it to everyone.",
      stars: 5,
      image: "https://i.pinimg.com/474x/50/42/90/504290aa11c08e6aa19831be382c8de2.jpg",
      role: "Web Developer"
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "Great quality and excellent customer service.",
      stars: 4,
      image: "https://i.pinimg.com/474x/50/42/90/504290aa11c08e6aa19831be382c8de2.jpg",
      role: "UI Designer"
    },
    {
      id: 3,
      name: "Alice Johnson",
      review: "Absolutely love it! Worth every penny.",
      stars: 5,
      image: "https://i.pinimg.com/474x/50/42/90/504290aa11c08e6aa19831be382c8de2.jpg",
      role: "Student"
    },
    {
      id: 4,
      name: "Bob Brown",
      review: "Good product, but delivery took longer than expected.",
      stars: 4,
      image: "https://i.pinimg.com/474x/50/42/90/504290aa11c08e6aa19831be382c8de2.jpg",
      role: "Freelancer"
    },
    {
      id: 5,
      name: "Charlie Davis",
      review: "Fantastic experience! Will buy again.",
      stars: 5,
      image: "https://i.pinimg.com/474x/50/42/90/504290aa11c08e6aa19831be382c8de2.jpg",
      role: "Digital Marketer"
    },
    {
      id: 6,
      name: "Eva Wilson",
      review: "The product is okay, but could be better.",
      stars: 4,
      image: "https://i.pinimg.com/474x/50/42/90/504290aa11c08e6aa19831be382c8de2.jpg",
      role: "Student"
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const renderStars = (stars) => {
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

  return (
    <motion.div 
      className="review-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <div className="dot-1"></div>
      <div className="dot-2"></div>
      <div className="dot-3"></div>
      <div className="line-1"></div>
      <div className="line-2"></div>
      
      <br /><br /><br />
      <motion.h1 
        className='text-center title'
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Reviews
      </motion.h1>
      <motion.p 
        className='text-center'
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className='text-dark'>What <span className='highlight'>People Say About Us</span></p>
      </motion.p>
      
      <div className="review-content">
        <motion.div 
          className="slider-wrapper"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="slider-container">
            <div
              className="slider"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <motion.div 
                  key={review.id} 
                  className="slide"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="review-card">
                    <div className="review-card-header">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="profile-pic"
                      />
                      <div className="reviewer-info">
                        <h3 className="reviewer-name">{review.name}</h3>
                        <p className="reviewer-role">{review.role}</p>
                      </div>
                    </div>
                    <div className="stars">{renderStars(review.stars)}</div>
                    <p className="review-text">{review.review}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="controls">
              <button className="prev-btn" onClick={prevSlide}>
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="next-btn" onClick={nextSlide}>
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="review-aspects"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Review of different aspects</h3>
          {[
            { name: "Support", rating: 4.5 },
            { name: "User Interface", rating: 5.0 },
            { name: "Mobile Experience", rating: 5.0 }
          ].map((aspect, index) => (
            <motion.div 
              key={aspect.name}
              className="aspect"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + (index * 0.1) }}
            >
              <span>{aspect.name}</span>
              <span className="stars">{"★".repeat(Math.floor(aspect.rating))}{"☆".repeat(5 - Math.floor(aspect.rating))} ({aspect.rating})</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Review;