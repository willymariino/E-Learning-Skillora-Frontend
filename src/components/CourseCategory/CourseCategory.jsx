import React from "react";
import "./CourseCategory.css";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courses } from '../../data/courses';

const CourseCategory = () => {
  // Filter courses by category
  const webDevCourses = courses.filter(course => 
    course.title.toLowerCase().includes('fullstack') || 
    course.title.toLowerCase().includes('web development') ||
    course.description.toLowerCase().includes('mern') ||
    (course.technologies && course.technologies.some(tech => 
      tech.title.toLowerCase().includes('frontend') || 
      tech.title.toLowerCase().includes('backend') ||
      tech.title.toLowerCase().includes('full stack')
    ))
  );
  
  const uiUxCourses = courses.filter(course => 
    course.title.toLowerCase().includes('ui/ux') || 
    course.title.toLowerCase().includes('design') ||
    (course.technologies && course.technologies.some(tech => 
      tech.title.toLowerCase().includes('ui') || 
      tech.title.toLowerCase().includes('ux') ||
      tech.title.toLowerCase().includes('design')
    ))
  );
  
  const mobileCourses = courses.filter(course => 
    course.title.toLowerCase().includes('app') || 
    course.title.toLowerCase().includes('flutter') ||
    course.description.toLowerCase().includes('mobile') ||
    (course.technologies && course.technologies.some(tech => 
      tech.title.toLowerCase().includes('mobile')
    ))
  );
  
  const aiCourses = courses.filter(course => 
    course.title.toLowerCase().includes('ai') || 
    course.title.toLowerCase().includes('artificial intelligence') ||
    course.description.toLowerCase().includes('ai') ||
    (course.technologies && course.technologies.some(tech => 
      tech.title.toLowerCase().includes('ai') || 
      tech.title.toLowerCase().includes('machine learning')
    ))
  );
  
  const dataCourses = courses.filter(course => 
    course.title.toLowerCase().includes('data') || 
    course.description.toLowerCase().includes('data science') ||
    (course.technologies && course.technologies.some(tech => 
      tech.title.toLowerCase().includes('data')
    ))
  );
  
  const businessCourses = courses.filter(course => 
    course.title.toLowerCase().includes('marketing') || 
    course.title.toLowerCase().includes('business') || 
    course.title.toLowerCase().includes('seo') ||
    course.description.toLowerCase().includes('marketing') || 
    course.description.toLowerCase().includes('business') ||
    (course.technologies && course.technologies.some(tech => 
      tech.title.toLowerCase().includes('marketing') || 
      tech.title.toLowerCase().includes('seo')
    ))
  );

  const categories = [
    {
      title: "Development",
      icon: "bi-code-slash",
      description: `${webDevCourses.length} courses including MERN stack development`,
      path: "/development",
      iconClass: "icon1"
    },
    {
      title: "UI/UX, Design",
      icon: "bi-brush",
      description: `${uiUxCourses.length} courses on user interface & experience design`,
      path: "/design",
      iconClass: "icon2"
    },
    {
      title: "Mobile Development",
      icon: "bi-phone",
      description: `${mobileCourses.length} courses including Flutter app development`,
      path: "/development",
      iconClass: "icon3"
    },
    {
      title: "Artificial Intelligence",
      icon: "bi-robot",
      description: `${aiCourses.length} courses including AI Agent Development`,
      path: "/ai",
      iconClass: "icon4"
    },
    {
      title: "Data Science",
      icon: "bi-database",
      description: `${dataCourses.length} courses including Data Science Masterclass`,
      path: "/data",
      iconClass: "icon5"
    },
    {
      title: "Business & Marketing",
      icon: "bi-graph-up",
      description: `${businessCourses.length} courses including Digital Marketing, best deal`,
      path: "/business",
      iconClass: "icon3"
    }
  ];

  return (
    <div className="course-category-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="category-header"
      >
        <h1 className="title">Explore Our Course Categories</h1>
        <p className="course-category-context-top">
          Discover a world of knowledge across various disciplines
        </p>
      </motion.div>

      <div className="categories-grid">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link to={category.path} className="category-link">
              <div className="course-category">
                <div className="category-content">
                  <div className="icon-container">
                    <i className={`bi ${category.icon} ${category.iconClass}`}></i>
                  </div>
                  <h2 className="course-name">{category.title}</h2>
                  <p className="context-category-course">{category.description}</p>
                </div>
                <br />
                <div className="category-overlay">
                  <span className="explore-text">Explore Courses →</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseCategory;
