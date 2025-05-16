import React from "react";
import "./Footer.css";
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <>
      <footer className="footer" data-aos="fade-up">
        <div className="footer__container bd-container">
          <div className="footer__logo" data-aos="fade-up" data-aos-delay="100">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <p className="footer__description" data-aos="fade-up" data-aos-delay="200">
            Educating Students is our Job, Best E-Learning Platform
          </p>

          <div className="footer__social" data-aos="fade-up" data-aos-delay="300">
            <a href="#" className="footer__link" data-aos="zoom-in" data-aos-delay="400">
              <i className="bi bi-youtube"></i>
            </a>
            <a href="#" className="footer__link" data-aos="zoom-in" data-aos-delay="500">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="footer__link" data-aos="zoom-in" data-aos-delay="600">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
          <p className="footer__copy" data-aos="fade-up" data-aos-delay="700">&#169; 2025 Skillora. All right reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
