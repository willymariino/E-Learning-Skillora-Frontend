import React, { useState, useEffect, useContext } from 'react';
import './Checkout.css';
import { useCart } from '../../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaTag, FaCreditCard, FaLock } from 'react-icons/fa';

const Checkout = () => {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const toastFail = () => {
    toast.error('Checkout is not available yet.');
}

  useEffect(() => {
    // Check if cart is empty
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      navigate('/cart');
      return;
    }

    // Get discount from localStorage if available
    const savedDiscount = localStorage.getItem('cartDiscount');
    if (savedDiscount) {
      setDiscount(parseInt(savedDiscount));
      if (parseInt(savedDiscount) === 40) {
        setCouponCode('SKILLORA12');
      }
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'SKILLORA12') {
      setDiscount(40);
      localStorage.setItem('cartDiscount', 40);
      toast.success('Coupon applied! 40% discount');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const getDiscountAmount = () => {
    return (getCartTotal() * discount) / 100;
  };

  const getFinalTotal = () => {
    return getCartTotal() - getDiscountAmount();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    for (const key in formData) {
      if (!formData[key]) {
        toast.error(`Please fill in all fields`);
        return;
      }
    }

    const toastFail = () => {
      toast.error('Checkout is not available yet.');
  }
    // Clear cart and redirect to courses page
    setTimeout(() => {
      clearCart();
      localStorage.removeItem('cartDiscount');
      navigate('/courses');
    }, 2000);
  };

  return (
    <div className="checkout-page">
      <Navbar />
      <div className="checkout-container">
        <div className="checkout-header">
          <Link to="/cart" className="back-to-cart">
            <FaArrowLeft /> Back to Cart
          </Link>
          <h1>Checkout</h1>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h2>Billing Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>Payment Information</h2>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <div className="card-input-container">
                    <FaCreditCard className="card-icon" />
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="place-order-btn" onClick={toastFail}>
                Place Order
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="order-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="order-item-details">
                    <h3>{item.title}</h3>
                    <span className="order-item-price">${Math.floor(item.price)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="coupon-section checkout-coupon">
              <div className="coupon-input-container">
                <FaTag className="coupon-icon" />
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="coupon-input"
                />
                <button onClick={applyCoupon} className="apply-coupon-btn">
                  Apply
                </button>
              </div>
              {discount > 0 && (
                <div className="applied-coupon">
                  Coupon SKILLORA12 applied ({discount}% off)
                </div>
              )}
            </div>

            <div className="order-totals">
              <div className="order-total-row">
                <span>Subtotal</span>
                <span>${Math.floor(getCartTotal())}</span>
              </div>
              <div className="order-total-row">
                <span>Discount</span>
                <span className="discount">-${Math.floor(getDiscountAmount())}</span>
              </div>
              <div className="order-total-row total">
                <span>Total</span>
                <span>${Math.floor(getFinalTotal())}</span>
              </div>
            </div>

            <div className="secure-payment">
              <FaLock />
              <span>Your payment information is secure</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
