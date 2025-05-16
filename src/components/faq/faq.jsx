import React, { useState } from 'react';
import './faq.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';

const Faq = () => {
  // State to manage which FAQ item is open
  const [activeIndex, setActiveIndex] = useState(null);
  const location = useLocation();
  const isStandalonePage = location.pathname === '/FAQ';

  const faqData = [
    {
      question: "What courses are available on this platform?",
      answer: "We offer a wide range of courses across various subjects, including technology, business, arts, and more. You can browse our course catalog to find the perfect fit for your learning goals.",
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer: "Yes, most of our courses provide a certificate of completion. You can download and share your certificate once you finish all the required modules and assessments.",
    },
    {
      question: "Can I access courses offline?",
      answer: "Yes, you can download course materials and videos for offline access through our mobile app. This allows you to learn even without an internet connection.",
    },
    {
      question: "How do I enroll in a course?",
      answer: "To enroll, simply browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. Follow the prompts to complete the enrollment process.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods, including credit/debit cards, PayPal, and other regional payment options. You can view all available methods during checkout.",
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a free trial for select courses. You can explore the course content and decide if it’s right for you before committing to a purchase.",
    },
  ];

  // Toggle FAQ item
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const FaqContent = () => (
    <div className="faq-section">
      <h1 className="faq-heading">Frequently asked questions</h1>
      <div className="faq-container">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <div className="question-text">{faq.question}</div>
              <span className="faq-icon"></span>
            </div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (isStandalonePage) {
    return (
      <>
        <Navbar />
        <FaqContent />
        <Footer />
      </>
    );
  }

  return <FaqContent />;
};

export default Faq;
