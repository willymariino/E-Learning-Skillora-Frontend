import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import toast, { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'

// Initialize dark mode based on localStorage or set to dark by default
const initializeDarkMode = () => {
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme !== null) {
    // If there's a saved preference, use it
    if (JSON.parse(savedTheme)) {
      document.body.classList.add('dark-mode');
    }
  } else {
    // If no saved preference, default to dark mode
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
  }
};

// Run initialization immediately
initializeDarkMode();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
)
