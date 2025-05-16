import React from 'react';
import './Banner.css';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <motion.div 
      className="banner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="banner-overlay"></div>
      <motion.div 
        className="banner-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <motion.h1 
          className="banner-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Unlock Your Potential
        </motion.h1>
        <motion.p 
          className="banner-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Learn anytime, anywhere with our online courses.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a href="#courses" className="banner-button">
            <span>Get Started</span>
            <i className="bi bi-arrow-right"></i>
          </a>
        </motion.div>
        
        <div className="banner-stats">
          <motion.div 
            className="stat-item"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span className="stat-number">1000+</span>
            <span className="stat-label">Courses</span>
          </motion.div>
          <motion.div 
            className="stat-item"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <span className="stat-number">50k+</span>
            <span className="stat-label">Students</span>
          </motion.div>
          <motion.div 
            className="stat-item"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <span className="stat-number">4.8</span>
            <span className="stat-label">Rating</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Banner;
