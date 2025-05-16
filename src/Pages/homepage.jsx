import React from 'react';
import Hero from '../components/Hero/Hero.jsx'
import CourseCategory from '../components/CourseCategory/CourseCategory.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import Statistics from '../components/Statistics/Statistics.jsx';
import PopularCourses from '../components/PopularCourses/PopularCourses.jsx';
import About from '../components/About/About.jsx';
import Features from '../components/Features/Features.jsx';
import Banner from '../components/Banner/Banner.jsx';
import Reviews from '../components/Review/Review.jsx';
import ContactHome from '../components/ContactHome/ContactHome.jsx';
import Faq from '../components/faq/faq.jsx';
import Pricing from '../components/Pricing/Pricing.jsx';

const Homepage = () => {
    return (
        <div className="homepage">
            <Navbar/>
                <Hero />
                <Statistics/>
                <About/>
                <Features/>
                <CourseCategory />
                <PopularCourses/>
                <Reviews/>
                <Banner/>
                <Pricing/>
                <Faq/>
                <ContactHome/>
            <Footer/>
        </div>
    );
}

export default Homepage;
