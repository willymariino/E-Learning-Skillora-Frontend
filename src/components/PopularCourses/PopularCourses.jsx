import React from 'react';
import './PopularCourses.css'
import { Link } from 'react-router-dom'
import { courses } from '../../data/courses';
import { FaStar, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PopularCourses = () => {
  // Get only the first 3 courses for popular courses section
  const popularCourses = courses.slice(0, 3);

  return (
    <div className="pop-courses-section">
      {/* Decorative elements */}
      <div className="dot-1"></div>
      <div className="dot-2"></div>
      <div className="dot-3"></div>
      <div className="line-1"></div>
      <div className="line-2"></div>
      
      <motion.h1 
        className='pop-courses-title'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Popular Courses
      </motion.h1>
      <motion.p 
        className='pop-courses-subtitle'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="pop-courses-highlight">Discover our top-rated courses</span>
      </motion.p>
      
      <section className="pop-courses-grid">
        {popularCourses.map((course, index) => (
          <motion.article 
            key={course.id}
            className="pop-course-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.2 + index * 0.2,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
          >
            <div>
              <div>
                <img src={course.image} alt={course.title} className="pop-course-image" />
                <div className="pop-course-overlay">
                  <span className="pop-course-category">
                    {index === 0 ? "🔥" : index === 1 ? "🔥" : "🔥"}
                  </span>
                </div>
              </div>
              <div className="pop-course-content">
                <h2 className="pop-course-title">{course.title}</h2>
                <div className="pop-course-meta">
                  <div className="pop-course-rating">
                    <FaStar className="pop-course-star-icon" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="pop-course-students">
                    <FaUsers className="pop-course-users-icon" />
                    <span>{course.studentsEnrolled}</span>
                  </div>
                </div>
                <div className="pop-course-footer">
                  <div className="pop-course-price">${course.price}</div>
                  <Link to={`/enroll/${course.id}`} className="pop-course-button">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}

export default PopularCourses;
