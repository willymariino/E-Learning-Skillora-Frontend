import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a small delay for better UX
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 9000000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`popup-overlay ${isVisible ? 'visible' : ''}`} data-aos="fade">
      <div className="popup-content" data-aos="zoom-in" data-aos-delay="200">
        <div className="popup-header">
          <h2 data-aos="fade-down" data-aos-delay="400">🎉 Limited Time Offer!</h2>
          <button onClick={handleClose} className="close-button">
            <i className="bi bi-x"></i>
          </button>
        </div>
        
        <div className="popup-body" data-aos="fade-up" data-aos-delay="600">
          <div className="discount-badge">40% OFF</div>
          <p className="popup-description">
            Use Code <span className="highlight-code">SKILLORA12</span>
          </p>
          <p className="popup-subtitle">On All Premium Courses</p>
        </div>

        <div className="popup-footer" data-aos="fade-up" data-aos-delay="800">
          <button onClick={handleClose} className="action-button">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
