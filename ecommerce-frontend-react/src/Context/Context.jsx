import axios from "../axios";
import { useState, useEffect, createContext } from "react";

const AppContext = createContext({
  data: [],
  isError: "",
  refreshData: () => {},
});

export const AppProvider = ({ children, loggedIn }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");

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

  useEffect(() => {
    if (loggedIn) {
      refreshData();
    } else {
      setData([]);
    }
  }, [loggedIn]);

  return (
    <AppContext.Provider
      value={{
        data,
        isError,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;