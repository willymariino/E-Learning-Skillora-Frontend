import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './Development.css'
import { Link } from "react-router-dom";
import { courses } from '../../data/courses';

const Development = () => {
  // Filter development related courses (MERN, Flutter, and Database for Software Developers)
  const developmentCourses = courses.filter(course => 
    course.id === 1 || course.id === 2 || course.id === 14
  );

  // Handle image error
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/400x225/1e293b/ffffff?text=Development+Course";
  };

  return (
    <div>
      <Navbar />
      <br /><br /><br /><br /><br /><br /><br/>
      <Link to='/' className="button-back">Go Back <i className="bi bi-box-arrow-left"></i></Link>
      <section className="articles">
        {developmentCourses.map((course) => (
          <article key={course.id}>
            <div className="article-wrapper">
              <figure>
                <img 
                  src={course.image} 
                  alt={course.title}
                  onError={handleImageError}
                />
              </figure>
              <div className="article-body">
                <h2 className="course-name-course">{course.title}</h2>
                <p className="context">{course.subtitle}</p>
                <div className="container-price-course">
                  <Link to={`/enroll/${course.id}`} className="enroll">Enroll Course</Link>
                  <div className="price">${Math.floor(course.price)}</div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default Development;
