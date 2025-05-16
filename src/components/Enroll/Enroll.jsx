import React from "react";
import "./Enroll.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaClock, FaUsers, FaCertificate, FaCode, FaDatabase, FaMobile, FaSearch, FaPalette, FaTasks } from "react-icons/fa";
import toast from "react-hot-toast";
import certificate from '../../assets/certificate.png';
import { courses } from '../../data/courses';
import { useCart } from '../../context/CartContext';

const iconMap = {
  FaCode,
  FaDatabase,
  FaMobile,
  FaSearch,
  FaPalette,
  FaTasks
};

const Enroll = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="enroll-container">
          <div className="error-message">
            <h2>Course not found</h2>
            <Link to="/courses" className="back-button">
              <i className="bi bi-arrow-left"></i>
              Back to Courses
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(course);
  };

  const checkout = () => {
    addToCart(course);
    navigate('/checkout');
  };

  return (
    <>
      <Navbar />
      <div className="enroll-container">
        <div className="enroll-header">
          <Link to="/" className="back-button">
            <i className="bi bi-arrow-left"></i>
            Back to Home
          </Link>
          <h1>{course.title}</h1>
          <p className="course-subtitle">{course.subtitle}</p>
        </div>

        <div className="enroll-content">
          <div className="course-preview">
            <div className="preview-image">
              <img src={course.image} alt="course preview" />
            </div>
            <div className="instructor-section">
              <h3>Course Instructors</h3>
              <div className="instructor-grid">
                {course.instructors.map((instructor, index) => (
                  <div key={index} className="instructor-card">
                    <img src={instructor.image} alt={instructor.name} className="instructor-image"/>
                    <span>{instructor.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="course-details">
            <div className="course-info">
              <div className="rating">
                <span className="stars">★★★★☆</span>
                <span className="rating-number">{course.rating}</span>
                <span className="rating-count">({course.ratingCount} ratings)</span>
              </div>
              <h2 className="price">${Math.floor(course.price)}</h2>
              <div className="course-features">
                <div className="feature">
                  <FaClock className="feature-icon" />
                  <span>{course.duration} Duration</span>
                </div>
                <div className="feature">
                  <FaUsers className="feature-icon" />
                  <span>{course.studentsEnrolled} Students</span>
                </div>
                <div className="feature">
                  <FaCertificate className="feature-icon" />
                  <span>Certificate Included</span>
                </div>
              </div>
            </div>

            <div className="course-description">
              <h3>About This Course</h3>
              <p>{course.description}</p>
              <div className="course-highlights">
                <h4>Course Highlights</h4>
                <ul>
                  {course.highlights.map((highlight, index) => (
                    <li key={index}>
                      <FaCheckCircle className="highlight-icon" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="course-actions">
              <button className="add-to-cart" onClick={handleAddToCart}>
                <i className="bi bi-cart"></i>
                Add to Cart
              </button>
              <button className="checkout" onClick={checkout}>
                <i className="bi bi-credit-card"></i>
                Checkout
              </button>
            </div>
          </div>
        </div>

        <div className="course-technologies">
          <h2>Technologies You'll Learn</h2>
          <div className="tech-grid">
            {course.technologies.map((tech, index) => {
              const Icon = iconMap[tech.icon];
              return (
                <div
                  key={index}
                  className="tech-card"
                  style={{ borderBottom: `4px solid ${tech.color}` }}
                >
                  <div className="tech-icon" style={{ color: tech.color }}>
                    {Icon && <Icon />}
                  </div>
                  <span className="tech-name">{tech.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="certificate-section">
          <h2>Course Certificate</h2>
          <p>Upon successful completion, you'll receive a verified certificate</p>
          <div className="certificate-preview">
            <img src={certificate} alt="course certificate" />
          </div>
        </div>

        <div className="similar-courses-section">
          <h2>Similar Courses</h2>
          <p>Explore more courses to enhance your skills</p>
          <div className="similar-courses-grid">
            {courses
              .filter(c => c.id !== parseInt(id))
              .map(c => {
                // Calculate similarity score based on matching technologies and course topics
                const techMatchCount = c.technologies.filter(tech => 
                  course.technologies.some(courseTech => 
                    courseTech.title === tech.title
                  )
                ).length;
                
                // Check for keyword matches in title and description
                const courseKeywords = course.title.toLowerCase().split(' ')
                  .concat(course.description.toLowerCase().split(' '));
                const otherKeywords = c.title.toLowerCase().split(' ')
                  .concat(c.description.toLowerCase().split(' '));
                
                const keywordMatchCount = courseKeywords.filter(keyword => 
                  keyword.length > 3 && otherKeywords.includes(keyword)
                ).length;
                
                // Calculate total similarity score
                return {
                  course: c,
                  score: (techMatchCount * 3) + keywordMatchCount
                };
              })
              .filter(item => item.score > 0) // Only include courses with some similarity
              .sort((a, b) => b.score - a.score) // Sort by similarity score
              .slice(0, 3) // Take top 3 most similar courses
              .map(({ course: similarCourse }) => (
                <div key={similarCourse.id} className="similar-course-card" onClick={() => navigate(`/enroll/${similarCourse.id}`)}>
                  <div className="similar-course-image">
                    <img 
                      src={similarCourse.image} 
                      alt={similarCourse.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x225/1e293b/ffffff?text=Course+Thumbnail";
                      }}
                      loading="lazy"
                      crossOrigin="anonymous"
                    />
                    <div className="similar-course-price">${Math.floor(similarCourse.price)}</div>
                  </div>
                  <div className="similar-course-content">
                    <h3 className="similar-course-title">{similarCourse.title}</h3>
                    <p className="similar-course-subtitle">{similarCourse.subtitle}</p>
                    <div className="similar-course-meta">
                      <div className="similar-course-rating">
                        <span className="stars">★★★★☆</span>
                        <span className="rating-number">{similarCourse.rating}</span>
                      </div>
                      <div className="similar-course-students">
                        <i className="bi bi-people"></i> {similarCourse.studentsEnrolled}
                      </div>
                    </div>
                    <div className="similar-course-tech">
                      {similarCourse.technologies.slice(0, 2).map((tech, idx) => (
                        <span key={idx} className="tech-tag" style={{ backgroundColor: `${tech.color}20`, color: tech.color }}>
                          {tech.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Enroll;
