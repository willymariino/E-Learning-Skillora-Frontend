import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import { useTheme } from '../../context/ThemeContext';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are SkillBot, a helpful assistant for the Skillora e-learning platform. Provide concise, friendly responses about courses, pricing, enrollment, and other educational topics. Keep responses under 3 sentences when possible. The platform offers courses in web development, data science, design, business, and AI ranging from $49 to $299. All courses include certificates upon completion and have a 30-day money-back guarantee.' }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { darkMode } = useTheme();

  // Knowledge base for the chatbot (used as fallback when API is not available)
  const knowledgeBase = {
    greetings: [
      "Hello! How can I help you with your learning journey today?",
      "Hi there! Welcome to Skillora. What would you like to learn about?",
      "Greetings! I'm SkillBot, your learning assistant. How may I assist you?"
    ],
    courses: [
      "We offer a variety of courses in web development, data science, design, business, and AI. You can browse all our courses in the 'All Courses' section.",
      "Our course catalog includes popular topics like JavaScript, Python, React, UI/UX Design, Data Science, and Machine Learning. Check out the 'All Courses' page to see the full list."
    ],
    pricing: [
      "Our courses range from $49 to $299 depending on the complexity and duration. We also offer special discounts for students and bulk purchases.",
      "Course pricing varies based on content depth and duration. Basic courses start at $49, while comprehensive specializations can go up to $299. We frequently offer promotions and discounts."
    ],
    enrollment: [
      "To enroll in a course, navigate to the course page and click the 'Enroll Now' button. You'll be guided through a simple checkout process.",
      "Enrolling is easy! Just find a course you like, click 'Enroll Now', and follow the checkout steps. Once enrolled, you'll have immediate access to all course materials."
    ],
    payment: [
      "We accept all major credit cards, PayPal, and bank transfers. Payment information is securely processed and we never store your full card details.",
      "Our payment system supports Visa, Mastercard, American Express, and PayPal. All transactions are encrypted and secure."
    ],
    certificates: [
      "Yes, you'll receive a certificate of completion after finishing a course. Our certificates can be added to your LinkedIn profile or resume.",
      "All our courses come with a completion certificate that you can download and share on your professional profiles or with employers."
    ],
    refunds: [
      "We offer a 30-day money-back guarantee if you're not satisfied with a course. Simply contact our support team to process your refund.",
      "Not happy with your purchase? No problem! We have a 30-day refund policy for all courses. Just reach out to our support team."
    ],
    instructors: [
      "Our instructors are industry professionals with years of experience in their fields. Each instructor goes through a rigorous vetting process.",
      "Skillora instructors are experts in their domains with real-world experience. Many work at top companies and bring practical knowledge to their teaching."
    ],
    support: [
      "For technical support or questions about your courses, you can contact our support team via the 'Contact' page or email support@skillora.com.",
      "Need help? Our support team is available 24/7. You can reach us through the Contact page or by emailing support@skillora.com."
    ],
    duration: [
      "Course duration varies from 2 weeks to 3 months, depending on the complexity and depth of the material. Each course page shows the estimated completion time.",
      "Most courses are self-paced, so you can learn at your own speed. On average, courses take 4-6 weeks to complete if you study a few hours per week."
    ],
    prerequisites: [
      "Prerequisites vary by course. Beginner courses have no prerequisites, while advanced courses may require prior knowledge. Check the course description for details.",
      "Each course page lists any prerequisites needed. We offer learning paths that guide you from beginner to advanced levels in a structured way."
    ],
    mobile: [
      "Yes, all our courses are mobile-friendly. You can learn on any device - computer, tablet, or smartphone.",
      "Our platform is fully responsive and works on all devices. We also offer a mobile app for iOS and Android for offline learning."
    ],
    fallback: [
      "I'm sorry, I don't have enough information to answer that question. Could you try rephrasing or ask something about our courses, pricing, or enrollment process?",
      "I'm not sure I understand. Could you ask about our courses, pricing, enrollment, or support options?",
      "I don't have that information right now. For specific questions, you might want to check our FAQ section or contact our support team."
    ]
  };

  // Function to get a random response from a category
  const getRandomResponse = (category) => {
    const responses = knowledgeBase[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Check if API key is available
  const isApiKeyAvailable = () => {
    // In Vite, we must use import.meta.env instead of process.env
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log("API Key check:", apiKey ? "Key exists" : "No key found", 
                "Length:", apiKey?.length);
    return apiKey && apiKey !== 'your_openai_api_key_here' && !apiKey.startsWith('sk-your-api-key');
  };

  // Function to get a response from the knowledge base
  const getLocalResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Check for greetings
    if (input.match(/\b(hi|hello|hey|greetings|howdy)\b/)) {
      return getRandomResponse('greetings');
    }
    // Check for course-related questions
    else if (input.match(/\b(courses?|classes|lessons|tutorials|learn|learning|study|curriculum)\b/)) {
      return getRandomResponse('courses');
    }
    // Check for pricing questions
    else if (input.match(/\b(price|cost|fee|pricing|how much|payment|pay|discount|offer)\b/)) {
      return getRandomResponse('pricing');
    }
    // Check for enrollment questions
    else if (input.match(/\b(enroll|sign up|register|join|start|begin|how to start)\b/)) {
      return getRandomResponse('enrollment');
    }
    // Check for payment questions
    else if (input.match(/\b(payment method|credit card|debit card|paypal|pay with|transaction)\b/)) {
      return getRandomResponse('payment');
    }
    // Check for certificate questions
    else if (input.match(/\b(certificate|certification|diploma|credential|proof|verify)\b/)) {
      return getRandomResponse('certificates');
    }
    // Check for refund questions
    else if (input.match(/\b(refund|money back|cancel|return|guarantee)\b/)) {
      return getRandomResponse('refunds');
    }
    // Check for instructor questions
    else if (input.match(/\b(instructor|teacher|professor|expert|who teaches|faculty)\b/)) {
      return getRandomResponse('instructors');
    }
    // Check for support questions
    else if (input.match(/\b(support|help|contact|assistance|service|problem|issue|trouble)\b/)) {
      return getRandomResponse('support');
    }
    // Check for duration questions
    else if (input.match(/\b(duration|how long|time|weeks|months|hours|length)\b/)) {
      return getRandomResponse('duration');
    }
    // Check for prerequisite questions
    else if (input.match(/\b(prerequisite|require|need to know|before|prior|experience|beginner)\b/)) {
      return getRandomResponse('prerequisites');
    }
    // Check for mobile/device questions
    else if (input.match(/\b(mobile|phone|tablet|device|app|offline|download)\b/)) {
      return getRandomResponse('mobile');
    }
    // Check for thank you messages
    else if (input.match(/\b(thank|thanks|appreciate|grateful)\b/)) {
      return "You're welcome! If you have any other questions, feel free to ask.";
    }
    // Fallback response
    else {
      return getRandomResponse('fallback');
    }
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check if API key is available
      if (isApiKeyAvailable()) {
        console.log("Attempting to use OpenAI API");
        // Use OpenAI API
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        
        console.log("Using API key:", apiKey ? "Found Vite key" : "No key found");
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { 
                role: 'system', 
                content: 'You are SkillBot, a helpful assistant for the Skillora e-learning platform. Provide concise, friendly responses about courses, pricing, enrollment, and other educational topics. Keep responses under 3 sentences when possible. The platform offers courses in web development, data science, design, business, and AI ranging from $49 to $299. All courses include certificates upon completion and have a 30-day money-back guarantee.' 
              },
              ...messages.filter(m => m.role !== 'system'),
              userMessage
            ],
            max_tokens: 150,
            temperature: 0.7,
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("API Error:", response.status, errorData);
          throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        const assistantMessage = { 
          role: 'assistant', 
          content: data.choices[0].message.content 
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        console.log("Using local knowledge base (no valid API key found)");
        // Use local knowledge base
        setTimeout(() => {
          const response = getLocalResponse(input);
          const assistantMessage = { role: 'assistant', content: response };
          setMessages(prev => [...prev, assistantMessage]);
        }, 1000); // Simulate API delay
      }
    } catch (error) {
      console.error('Error with chatbot:', error);
      
      // Use local knowledge base as fallback
      setTimeout(() => {
        const response = getLocalResponse(input);
        const assistantMessage = { role: 'assistant', content: response };
        setMessages(prev => [...prev, assistantMessage]);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`chatbot-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-robot'}`}></i>
        {!isOpen && <span className="chatbot-label">SkillBot</span>}
      </div>

      <div className={`chatbot-container ${isOpen ? 'open' : ''} ${darkMode ? 'dark-mode' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-title">
            <i className="bi bi-robot"></i>
            <h3>SkillBot</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="chatbot-close">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            message.role !== 'system' && (
              <div 
                key={index} 
                className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                {message.role === 'assistant' && <div className="bot-avatar"><i className="bi bi-robot"></i></div>}
                <div className="message-content">{message.content}</div>
              </div>
            )
          ))}
          {isLoading && (
            <div className="message assistant-message loading">
              <div className="bot-avatar"><i className="bi bi-robot"></i></div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask SkillBot a question..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            <i className="bi bi-send-fill"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot; 