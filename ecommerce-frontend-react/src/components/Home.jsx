import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Home = ({ selectedCategory }) => {
  const { data, isError, refreshData } = useContext(AppContext);

  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Fetch products
  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  // Fetch images for products
  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `/product/${product.id}/image`,
                {
                  responseType: "blob",
                }
              );

              const imageUrl = URL.createObjectURL(response.data);

              return {
                ...product,
                imageUrl,
              };
            } catch (error) {
              console.error(
                `Error fetching image for product ID: ${product.id}`,
                error
              );

              return {
                ...product,
                imageUrl: null,
              };
            }
          })
        );

        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.category === selectedCategory
      )
    : products;

  // Error screen
  if (isError) {
    return (
      <h2
        className="text-center"
        style={{ padding: "18rem" }}
      >
        <img
          src={unplugged}
          alt="Error"
          style={{
            width: "100px",
            height: "100px",
          }}
        />
      </h2>
    );
  }

  return (
    <>
      <div
        className="grid"
        style={{
          marginTop: "64px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredProducts.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Products Available
          </h2>
        ) : (
          filteredProducts.map((product) => {
            const {
              id,
              brand,
              name,
              price,
              Quantity,
              imageUrl,
            } = product;

            return (
              <div
                className="card mb-3"
                style={{
                  width: "250px",
                  height: "360px",
                  boxShadow:
                    "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor:
                    Quantity > 0 ? "#fff" : "#ccc",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                }}
                key={id}
              >
                <Link
                  to={`/product/${id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {/* Product Image */}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={name}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        padding: "5px",
                        margin: "0",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "150px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Image unavailable
                    </div>
                  )}

                  {/* Product Details */}
                  <div
                    className="card-body"
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <h5
                        className="card-title"
                        style={{
                          margin: "0 0 10px 0",
                          fontSize: "1.2rem",
                        }}
                      >
                        {name.toUpperCase()}
                      </h5>

                      <i
                        className="card-brand"
                        style={{
                          fontStyle: "italic",
                          fontSize: "0.8rem",
                        }}
                      >
                        {"~ " + brand}
                      </i>
                    </div>

                    <hr
                      className="hr-line"
                      style={{
                        margin: "10px 0",
                      }}
                    />

                    {/* Price */}
                    <div className="home-cart-price">
                      <h5
                        className="card-text"
                        style={{
                          fontWeight: "600",
                          fontSize: "1.1rem",
                          marginBottom: "5px",
                        }}
                      >
                        <i className="bi bi-currency-rupee"></i>{" "}
                        {price}
                      </h5>
                    </div>

                    {/* Stock */}
                   

<div
  style={{
    margin: "10px 25px 0px",
    textAlign: "center",
  }}
>
  {Quantity > 0 ? (
    <span
      style={{
        color: "#863030",
        backgroundColor: "#5661d5",
        fontWeight: "600",
        display: "block",
        padding: "7px 10px",
        borderRadius: "6px",
        fontSize: "0.9rem",
      }}
    >
      In Stock: {Quantity}
    </span>
  ) : (
    <span
      style={{
        color: "#DC2626",
        backgroundColor: "#f41111",
        fontWeight: "600",
        display: "block",
        padding: "7px 10px",
        borderRadius: "6px",
        fontSize: "0.9rem",
      }}
    >
      Out Of Stock
    </span>
  )}
</div>


                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;