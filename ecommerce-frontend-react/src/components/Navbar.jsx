import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../axios"; // axios instance that sends the JWT automatically

const Navbar = ({ onSelectCategory, onSearch }) => {
  const navigate = useNavigate();

  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.get("/products");
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = async (value) => {
    setInput(value);

    if (value.length >= 1) {
      setShowSearchResults(true);

      try {
        const response = await API.get(
          `/products/search?keyword=${encodeURIComponent(value)}`
        );

        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const toggleTheme = () => {
    const newTheme =
      theme === "dark-theme" ? "light-theme" : "dark-theme";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleLogoutClick = () => {
    navigate("/logout");
  };

  const handleSearchProductClick = (id) => {
    setShowSearchResults(false);
    setInput("");
    navigate(`/product/${id}`);
  };

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top">
          <div className="container-fluid">

            <a
              className="navbar-brand"
              href="https://github.com/Vkumarlap"
            >
              Vkumar
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                {/* HOME */}
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/"
                  >
                    Home
                  </Link>
                </li>

                {/* ADD PRODUCT */}
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/add_product"
                  >
                    Add Product
                  </Link>
                </li>

                {/* CATEGORIES */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>

                  <ul className="dropdown-menu">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            handleCategorySelect(category)
                          }
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="nav-item"></li>
              </ul>

              {/* THEME BUTTON */}
              <button
                className="theme-btn"
                onClick={() => toggleTheme()}
              >
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>

              <div className="d-flex align-items-center cart">

                {/* SEARCH */}
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={input}
                  onChange={(e) =>
                    handleChange(e.target.value)
                  }
                  onFocus={() =>
                    setSearchFocused(true)
                  }
                  onBlur={() =>
                    setSearchFocused(false)
                  }
                />

                {/* SEARCH RESULTS */}
                {showSearchResults && (
                  <ul className="list-group">

                    {searchResults.length > 0
                      ? searchResults.map((result) => (
                          <li
                            key={result.id}
                            className="list-group-item"
                          >
                            <button
                              type="button"
                              className="search-result-link"
                              onClick={() =>
                                handleSearchProductClick(
                                  result.id
                                )
                              }
                            >
                              <span>{result.name}</span>
                            </button>
                          </li>
                        ))
                      : noResults && (
                          <p className="no-results-message">
                            No Product with such Name
                          </p>
                        )}

                  </ul>
                )}

                {/* LOGOUT */}
                <button
                  className="btn btn-outline-danger ms-2"
                  type="button"
                  onClick={handleLogoutClick}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </button>

              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;