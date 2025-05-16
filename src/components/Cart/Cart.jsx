import React, { useState } from 'react';
import './Cart.css';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowLeft, FaTag } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'SKILLORA12') {
      setDiscount(40);
      toast.success('Coupon applied! 40% discount');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    
    // Store discount in localStorage to access it in checkout page
    localStorage.setItem('cartDiscount', discount);
    navigate('/checkout');
  };

  const getDiscountAmount = () => {
    return (getCartTotal() * discount) / 100;
  };

  const getFinalTotal = () => {
    return getCartTotal() - getDiscountAmount();
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="cart-wrapper">
        <div className="cart-container">
          <div className="cart-header-section">
            <Link to="/courses" className="back-to-courses">
              <FaArrowLeft /> Continue Shopping
            </Link>
            {cartItems.length > 0 && (
              <button className="clear-all-btn" onClick={clearCart}>
                Clear All
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-cart-icon">
                <FaShoppingCart />
              </div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any courses yet.</p>
              <Link to="/courses" className="browse-courses">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="cart-content">
              <h1 className="cart-title">Shopping Cart ({cartItems.length})</h1>
              
              <div className="cart-grid">
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="item-details">
                        <div className="item-info">
                          <h3>{item.title}</h3>
                          <p className="item-subtitle">{item.subtitle}</p>
                          <div className="item-meta">
                            <span className="students">
                              {item.studentsEnrolled} students enrolled
                            </span>
                            <span className="rating">★ {item.rating}</span>
                          </div>
                        </div>
                        <div className="item-actions">
                          <span className="item-price">${Math.floor(item.price)}</span>
                          <button
                            className="remove-item"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <FaTrash />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <h2>Order Summary</h2>
                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>${Math.floor(getCartTotal())}</span>
                    </div>
                    
                    <div className="coupon-section">
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
                    
                    <div className="summary-row">
                      <span>Discount</span>
                      <span className="discount">-${Math.floor(getDiscountAmount())}</span>
                    </div>
                    <div className="summary-total">
                      <span>Total</span>
                      <span>${Math.floor(getFinalTotal())}</span>
                    </div>
                  </div>
                  <button className="checkout-button" onClick={handleCheckout}>
                    Proceed to Checkout
                  </button>
                  <div className="secure-checkout">
                    <i className="bi bi-shield-check"></i>
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart; 