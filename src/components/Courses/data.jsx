import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './Development.css';  // Re-import with semicolon to ensure it loads
import { Link } from "react-router-dom";
import { courses } from '../../data/courses';

const Data = () => {
  // Filter Data Science related courses
  const dataCourses = courses.filter(course => 
    course.title.toLowerCase().includes('data') || 
    course.description.toLowerCase().includes('data science') ||
    (course.technologies && course.technologies.some(tech => 
      tech.title.toLowerCase().includes('data')
    ))
  );

  // Handle image error
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/400x225/1e293b/ffffff?text=Data+Science+Course";
  };

  return (
    <div>
      <Navbar />
      <br /><br /><br /><br /><br /><br /><br/>
      <Link to='/' className="button-back">Go Back <i className="bi bi-box-arrow-left"></i></Link>
      {dataCourses.length === 0 ? (
        <div>
          <br /><br /><br /><br /><br /><br /><br/>
          <div className="icon-nocourse"><i className="bi bi-camera-video-off"></i></div>
          <h2 className="nocourse">No Course Yet Have Been Uploaded About Data Science</h2>
          <p className="nocourse-context">
            Sorry For Our Inconvenience, We'll Will Update After Making A Course About Data Science.
          </p>
        </div>
      ) : (
        <section className="articles">
          {dataCourses.map((course) => (
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
      )}
      <Footer />
    </div>
  );
};

export default Data;
