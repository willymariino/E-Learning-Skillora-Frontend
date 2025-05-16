import React, { useCallback, useState, useEffect } from "react";
import './About.css';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

const About = () => {
 
  const toastUnavailable = () => {
    toast('Sorry, This Video Is Unavailable', {
      position: 'top-right',
      autoClose: 5000,
      icon: '😓',
    });
  };

 
  return (
    <div className="about-page-section">    
      <div className="about-page-container">
        <div className="about-page-content-wrapper">
          <div className="about-page-text-section">
            <div className="about-page-section-badge">About Us</div>
            <h2 className="about-page-heading">Why Choose Us, <span className="about-page-highlight">What We Provide</span></h2>
            
            <p className="about-page-intro">
              We are dedicated to providing the best learning experience with cutting-edge technology and expert instructors.
            </p>
            
            <div className="about-page-features-grid">
              <div className="about-page-feature-card">
                <div className="about-page-feature-icon-wrapper">
                  <i className="bi bi-check2-all"></i>
                </div>
                <h3 className="about-page-feature-title">Quality Content</h3>
                <p className="about-page-feature-description">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos quisquam at beatae aut sint libero.
                </p>
              </div>
              
              <div className="about-page-feature-card">
                <div className="about-page-feature-icon-wrapper">
                  <i className="bi bi-laptop"></i>
                </div>
                <h3 className="about-page-feature-title">Modern Platform</h3>
                <p className="about-page-feature-description">
                  Lorem ipsum, dolor sit amet consectetur adipisicing.
                </p>
              </div>
              
              <div className="about-page-feature-card">
                <div className="about-page-feature-icon-wrapper">
                  <i className="bi bi-people-fill"></i>
                </div>
                <h3 className="about-page-feature-title">Expert Instructors</h3>
                <p className="about-page-feature-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, perspiciatis?
                </p>
              </div>

              <div className="about-page-feature-card">
                <div className="about-page-feature-icon-wrapper">
                  <i className="bi bi-clock-history"></i>
                </div>
                <h3 className="about-page-feature-title">Ongoing Support</h3>
                <p className="about-page-feature-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, perspiciatis?
                </p>
              </div>
            </div>
            
           
          </div>
          
          <div className="about-page-video-section">
            <div className="about-page-video-container" onClick={toastUnavailable}>
              <div className="about-page-video-overlay">
                <div className="about-page-play-button-wrapper">
                  <i className="bi bi-play-fill about-page-play-icon"></i>
                </div>
              </div>

              <iframe
                className="about-page-video-frame"
                src="https://www.youtube.com/embed/svg%3E?"
                title="About Us Video"
                allowFullScreen
              ></iframe>
            </div>
            



            <div className="about-page-cta">
              <Link to="/about" className="about-page-button">
                <span>View More</span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>






            
            <div className="about-page-dots-decoration">
              <img src="/images/dots-pattern.svg" alt="" aria-hidden="true" />
            </div>
            
            <div className="about-page-blob-decoration"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;