import axios from "../axios"; // the instance WITH the JWT interceptors
import { useState, useEffect, createContext } from "react";

const AppContext = createContext({
  data: [],
  isError: "",
  cart: [],
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  clearCart: () => {},
  refreshData: () => {},
});

export const AppProvider = ({ children, loggedIn }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const refreshData = async () => {
    try {
      const response = await axios.get("/products");
      setData(response.data);
      setIsError("");
    } catch (error) {
      console.error("Product fetch error:", error);
      setIsError(error.message);
    }
  };

  // Fetch products only when logged in (also runs right after login).
  // This avoids the 401 -> redirect -> reload loop on /login.
  useEffect(() => {
    if (loggedIn) {
      refreshData();
    } else {
      setData([]);
    }
  }, [loggedIn]);

  // Persist cart (single place, so no manual localStorage calls above)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <AppContext.Provider
      value={{
        data,
        isError,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
