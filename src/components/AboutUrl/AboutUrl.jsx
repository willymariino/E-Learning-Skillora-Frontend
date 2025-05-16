import React from 'react';
import './AboutUrl.css'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaBook, FaLaptopCode } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaGraduationCap />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience"
    },
    {
      icon: <FaUsers />,
      title: "Community Learning",
      description: "Join a vibrant community of learners and share knowledge"
    },
    {
      icon: <FaBook />,
      title: "Comprehensive Courses",
      description: "Access a wide range of courses covering various topics"
    },
    {
      icon: <FaLaptopCode />,
      title: "Practical Projects",
      description: "Build real-world projects to enhance your portfolio"
    }
  ];

  return (
    <div className="about-page">
      <Navbar/>
      
      {/* Hero Section */}
      
      <section className="about-hero">
      <Link to='/' className="back-button">
                        <i className="bi bi-arrow-left"></i> 
                        Back to Home
                    </Link>
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
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-title"
          >
            Empowering Education Through Technology
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle"
          >
            Join thousands of learners worldwide in their journey to success
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="about-container">
        <br />
        {/* Mission Section */}
        <section className="about-section">
          <h2>Our Mission</h2>
          <p className="mission-text">
            We're dedicated to making quality education accessible to everyone. Our platform combines cutting-edge technology with expert knowledge to create an engaging learning experience that helps students achieve their goals.
          </p>
        </section>

        {/* Features Grid */}
        <section className="features-section">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Active Students</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Courses</p>
            </div>
            <div className="stat-item">
              <h3>95%</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to Start Learning?</h2>
          <p className='context-abouturl'>Join our community of learners today and take the first step towards your goals.</p>
          <div className="cta-buttons">
            <Link to="/courses" className="btn-primary">Explore Courses</Link>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </section>
      </div>

      <Footer/>
    </div>
  );
}

export default About;
