import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
      );
  
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const updateQuantity = (index, qty) => {
    const updated = [...cartItems];
    updated[index].quantity = qty;
    setCartItems(updated);
  };

  const clearCart = () => setCartItems([]);


  const createOrder = async (address) => {
    const formattedProducts = cartItems.map((item) => ({
      product: item._id,
      color: item.selectedColor,
      size: item.selectedSize,
      quantity: item.quantity,
    }));

    try{
      const res = await axios.post(
        "https://ecom-fans-ac.onrender.com/api/orders",
        { products: formattedProducts, address },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      clearCart();
      return res.data;

    }catch (err) { 
      console.error("Error creating order:", err);
      throw err;
    }
  }


  const getAllOrdersOfUser = async (id) => {
    try {
      const res = await axios.get(
        "https://ecom-fans-ac.onrender.com/api/orders/user/:id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.error("Error fetching orders:", err);
      throw err;
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        createOrder,
        getAllOrdersOfUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
