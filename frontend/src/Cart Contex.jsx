import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

 const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const reduceQuantity = (id) => {
  setCart((prev) =>
    prev
      .map((p) =>
        p.id === id ? { ...p, qty: p.qty - 1 } : p
      )
      .filter((p) => p.qty > 0) // remove if qty = 0
  );
};

  const updatequantity = (id) =>{
    setCart((prev) =>
    prev
      .map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      )
      .filter((p) => p.qty > 0) // remove if qty = 0
  );
  }

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updatequantity,reduceQuantity }}>
      {children}
    </CartContext.Provider>
  );
}