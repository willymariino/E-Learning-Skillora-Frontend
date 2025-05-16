import React, { useState } from 'react';
import './ContactHome.css';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactHome = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        }
        
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(null), 3000);
    };

    const contactInfo = [
        {
            icon: <FaPhone />,
            title: "Phone",
            content: "+1 234 567 890",
            delay: 0.3
        },
        {
            icon: <FaEnvelope />,
            title: "Email",
            content: "support@skillora.com",
            delay: 0.4
        },
        {
            icon: <FaMapMarkerAlt />,
            title: "Location",
            content: "123 Learning Street, Education City",
            delay: 0.5
        }
    ];

    return (
        <motion.div 
            className="contact-home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="contact-home-wrapper">
                <motion.div 
                    className="contact-info-section"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h2
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="contact-title"
                    >
                        Get in Touch
                    </motion.h2>
                    
                    <motion.p
                        className="contact-description"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Have questions? We're here to help and answer any question you might have.
                    </motion.p>

                    <div className="contact-info-grid">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={info.title}
                                className="contact-info-item"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: info.delay }}
                            >
                                <div className="info-icon">{info.icon}</div>
                                <h3>{info.title}</h3>
                                <p>{info.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div 
                    className="contact-form-section"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.form 
                        className="contact-form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="form-grid">
                            <motion.div 
                                className="form-group"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </motion.div>
                            
                            <motion.div 
                                className="form-group"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </motion.div>
                        </div>

                        <motion.div 
                            className="form-group"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>
                        
                        <motion.div 
                            className="form-group"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                            ></textarea>
                        </motion.div>
                        
                        <motion.button 
                            type="submit"
                            className={`submit-button ${isSubmitting ? 'submitting' : ''} ${submitStatus ? submitStatus : ''}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>

                        {submitStatus && (
                            <motion.div 
                                className={`submit-status ${submitStatus}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {submitStatus === 'success' ? 
                                    'Message sent successfully!' : 
                                    'Error sending message. Please try again.'}
                            </motion.div>
                        )}
                    </motion.form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ContactHome;
