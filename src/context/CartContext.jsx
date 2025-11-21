import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, qty: Number(qty) } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const itemsPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shippingPrice = itemsPrice > 3000 || itemsPrice === 0 ? 0 : 99;
    const totalPrice = itemsPrice + shippingPrice;
    return { itemsPrice, shippingPrice, totalPrice };
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, clearCart, totals }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
