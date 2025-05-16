import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './Development.css'
import { Link } from "react-router-dom";
import { courses } from '../../data/courses';

const Design = () => {
  // Filter design related courses (UI/UX, UX Leadership, Graphic Design, and Design Systems)
  const designCourses = courses.filter(course => 
    course.id === 4 || course.id === 5 || course.id === 15 || course.id === 16
  );

  // Handle image error
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/400x225/1e293b/ffffff?text=Design+Course";
  };

  return (
    <div>
      <Navbar />
      <br /><br /><br /><br /><br /><br /><br/>
      <Link to='/' className="button-back">Go Back <i className="bi bi-box-arrow-left"></i></Link>
      <section className="articles">
        {designCourses.map((course) => (
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

export default Design;
