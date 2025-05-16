import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/homepage';
import AllCourses from './components/Courses/AllCourses/AllCourses';
import Development from './components/Courses/Development';
import Design from './components/Courses/Design';
import Business from './components/Courses/Business';
import AI from './components/Courses/AI';
import Data from './components/Courses/data';
import NotFoundPage from './components/NotFound/NotFound';
import Enroll from './components/Enroll/Enroll';
import Cart from './components/Cart/Cart';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import CourseDetails from './components/Courses/CourseDetails';
import Chatbot from './components/Chatbot/Chatbot';
import Faq from './components/faq/faq';
import Pricing from './components/Pricing/Pricing';
import SearchResults from './components/SearchResults/SearchResults';

// AOS imports
import AOS from 'aos';
import 'aos/dist/aos.css';

//------------routes-----------------
import About from './components/AboutUrl/AboutUrl';
import Contact from './components/Contact/Contact';
import Checkout from './components/Checkout/Checkout';

//------------------------------------

const App = () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: false,
    mirror: true,
    offset: 50,
    easing: 'ease-in-out',
  });

  return (
    <CartProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path='/' element={<Homepage/>}></Route>
          <Route path='/courses' element={<AllCourses/>}></Route>
          <Route path='/courses/:id' element={<CourseDetails/>}></Route>
          <Route path='/development' element={<Development/>}></Route>
          <Route path='/design' element={<Design/>}></Route>
          <Route path='/business' element={<Business/>}></Route>
          <Route path='/ai' element={<AI/>}></Route>
          <Route path='/data' element={<Data/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/enroll/:id' element={<Enroll/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/faq' element={<Faq/>}></Route>
          <Route path='/pricing' element={<Pricing/>}></Route>
          <Route path='/search' element={<SearchResults/>}></Route>
          <Route path='*' element={<NotFoundPage/>}></Route>
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
