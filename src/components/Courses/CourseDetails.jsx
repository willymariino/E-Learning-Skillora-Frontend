import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../../data/courses';
import Navbar from '../Navbar/Navbar';
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="course-not-found">
          <h2>Course Not Found</h2>
          <p>The course you're looking for doesn't exist.</p>
          <Link to="/courses" className="back-to-courses">
            Back to Courses
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="course-details-container">
        <div className="course-details-header">
          <div className="course-details-content">
            <h1>{course.title}</h1>
            <p className="subtitle">{course.subtitle}</p>
            <div className="course-meta">
              <span className="rating">
                <i className="bi bi-star-fill"></i>
                {course.rating} ({course.ratingCount} ratings)
              </span>
              <span className="students">
                <i className="bi bi-people-fill"></i>
                {course.studentsEnrolled} students
              </span>
              <span className="duration">
                <i className="bi bi-clock-fill"></i>
                {course.duration}
              </span>
            </div>
            <div className="course-actions">
              <span className="price">${course.price}</span>
              <Link to={`/enroll/${course.id}`} className="enroll-button">
                Enroll Now
              </Link>
            </div>
          </div>
          <div className="course-image">
            <img src={course.image} alt={course.title} />
          </div>
        </div>

        <div className="course-details-body">
          <div className="course-description">
            <h2>About this course</h2>
            <p>{course.description}</p>
          </div>

          <div className="course-highlights">
            <h2>What you'll learn</h2>
            <ul>
              {course.highlights.map((highlight, index) => (
                <li key={index}>
                  <i className="bi bi-check-circle-fill"></i>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="course-instructors">
            <h2>Instructors</h2>
            <div className="instructors-grid">
              {course.instructors.map((instructor, index) => (
                <div key={index} className="instructor-card">
                  <img src={instructor.image} alt={instructor.name} />
                  <h3>{instructor.name}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="course-technologies">
            <h2>Technologies Covered</h2>
            <div className="technologies-grid">
              {course.technologies.map((tech, index) => (
                <div key={index} className="technology-card" style={{ borderColor: tech.color }}>
                  <i className={`bi bi-code-slash`} style={{ color: tech.color }}></i>
                  <span>{tech.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails; 