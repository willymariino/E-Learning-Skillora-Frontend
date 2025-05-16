import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import './Development.css'
import { Link } from "react-router-dom";
import { courses } from '../../data/courses';

const Business = () => {
  // Filter business related courses (Digital Marketing and SEO)
  const businessCourses = courses.filter(course => 
    course.id === 3 || course.id === 6
  );

  return (
    <div>
      <Navbar />
      <br /><br /><br /><br /><br /><br /><br/>
      <Link to='/' className="button-back">Go Back <i className="bi bi-box-arrow-left"></i></Link>
      <section className="articles">
        {businessCourses.map((course) => (
          <article key={course.id}>
            <div className="article-wrapper">
              <figure>
                <img src={course.image} alt={course.title} />
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

export default Business;
