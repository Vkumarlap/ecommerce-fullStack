import "./App.css";
import React, { useState } from "react";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import UpdateProduct from "./components/UpdateProduct";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AppProvider } from "./Context/Context";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Protected Route
const Protected = ({ loggedIn, children }) => {
  return loggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  // User is logged in only when JWT exists
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <AppProvider loggedIn={loggedIn}>
      <BrowserRouter>

        {/* Navbar only for logged-in users */}
        {loggedIn && (
          <Navbar
            onSelectCategory={handleCategorySelect}
            onLogout={handleLogout}
          />
        )}

        <Routes>

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Register />
              )
            }
          />

          {/* LOGOUT */}
          <Route
            path="/logout"
            element={
              <Logout onLogout={handleLogout} />
            }
          />

          {/* HOME */}
          <Route
            path="/"
            element={
              <Protected loggedIn={loggedIn}>
                <Home selectedCategory={selectedCategory} />
              </Protected>
            }
          />

          {/* ADD PRODUCT */}
          <Route
            path="/add_product"
            element={
              <Protected loggedIn={loggedIn}>
                <AddProduct />
              </Protected>
            }
          />

          {/* PRODUCT */}
          <Route
            path="/product"
            element={
              <Protected loggedIn={loggedIn}>
                <Product />
              </Protected>
            }
          />

          {/* PRODUCT DETAILS */}
          <Route
            path="/product/:id"
            element={
              <Protected loggedIn={loggedIn}>
                <Product />
              </Protected>
            }
          />

          {/* CART */}
          <Route
            path="/cart"
            element={
              <Protected loggedIn={loggedIn}>
                <Cart />
              </Protected>
            }
          />

          {/* UPDATE PRODUCT */}
          <Route
            path="/product/update/:id"
            element={
              <Protected loggedIn={loggedIn}>
                <UpdateProduct />
              </Protected>
            }
          />

          {/* UNKNOWN URL */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;