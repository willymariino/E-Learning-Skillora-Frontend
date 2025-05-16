import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart items from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (course) => {
    const isItemInCart = cartItems.find(item => item.id === course.id);
    
    if (isItemInCart) {
      toast.error('Course already in cart');
      return;
    }

    setCartItems([...cartItems, course]);
    toast.success('Course added to cart');
  };

  const removeFromCart = (courseId) => {
    setCartItems(cartItems.filter(item => item.id !== courseId));
    toast.success('Course removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
}; 