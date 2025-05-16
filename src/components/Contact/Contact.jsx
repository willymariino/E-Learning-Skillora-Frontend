import React, { useState } from 'react';
import './Contact.css';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      content: "support@elearning.com",
      link: "mailto:support@elearning.com"
    },
    {
      icon: <FaPhone />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Us",
      content: "123 Education Street, Learning City, 12345",
      link: "https://maps.google.com"
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      content: "Mon - Fri: 9:00 AM - 6:00 PM",
      link: null
    }
  ];

  return (
    <div className="contact-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="contact-hero">
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
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle"
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="contact-container">


        {/* Contact Info Cards */}
        <section className="contact-info-section">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index}
                className="contact-info-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="contact-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                {info.link ? (
                  <a href={info.link} className="contact-link">{info.content}</a>
                ) : (
                  <p>{info.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Form and Map Section */}
        <section className="contact-form-section">
          <div className="form-map-container">
            {/* Contact Form */}
            <motion.div 
              className="contact-form-container"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div 
              className="map-container"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986532962815!3d40.69714941978941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1641234567890!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

   <section id="contact">
     <div className="form-wrapper">
      <div class="container-form">
    <div class="illustration">
        <img src="https://colorlib.com/etc/cf/ContactFrom_v12/images/img-01.png" alt="Illustration"/>
    </div>
    <div class="contact-form">
        <h2>Get in touch</h2>
        <form>
            <input type="text" placeholder="Name" required/>
            <input type="email" placeholder="Email" required/>
            <textarea placeholder="Message" required></textarea>
            <button type="submit">Send</button>
        </form>
    </div>
</div>
    </div>

   </section>


export default Contact;
