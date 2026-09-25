import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${id}`);

        setProduct(response.data);

        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `/product/${id}/image`,
          {
            responseType: "blob",
          }
        );

        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`/product/${id}`);

      alert("Product deleted successfully");

      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  if (!product) {
    return (
      <h2
        className="text-center"
        style={{ padding: "10rem" }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <>
      <div
        className="containers"
        style={{
          display: "flex",
        }}
      >
        {/* Product Image */}
        <img
          className="left-column-img"
          src={imageUrl}
          alt={product.imageName}
          style={{
            width: "50%",
            height: "auto",
          }}
        />

        {/* Product Details */}
        <div
          className="right-column"
          style={{
            width: "50%",
          }}
        >
          <div className="product-description">

            {/* Category + Listed Date */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "lighter",
                }}
              >
                {product.category}
              </span>

              <div
                className="release-date"
                style={{
                  marginBottom: "2rem",
                }}
              >
                <h6>
                  Listed:{" "}
                  <span>
                    <i>
                      {new Date(
                        product.releasedate
                      ).toLocaleDateString()}
                    </i>
                  </span>
                </h6>
              </div>
            </div>

            {/* Product Name */}
            <h1
              style={{
                fontSize: "2rem",
                marginBottom: "0.5rem",
                textTransform: "capitalize",
                letterSpacing: "1px",
              }}
            >
              {product.name}
            </h1>

            {/* Brand */}
            <i>{product.brand}</i>

            {/* Product Description */}
            <p
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                margin: "10px 0px 0px",
              }}
            >
              PRODUCT DESCRIPTION:
            </p>

            <p
              style={{
                marginBottom: "1rem",
              }}
            >
              {product.description}
            </p>
          </div>

          {/* Price + Stock */}
          <div className="product-price">

            {/* Price */}
            <span
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              ₹ {product.price}
            </span>

            {/* Stock Information */}
            <div
              style={{
                marginTop: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              {product.Quantity > 0 ? (
                <h6>
                  Stock Available:{" "}
                  <span
                    style={{
                      color: "green",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    {product.Quantity}
                  </span>
                </h6>
              ) : (
                <h6
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Out of Stock
                </h6>
              )}
            </div>
          </div>

          {/* Update + Delete */}
          <div
            className="update-button"
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            {/* Update Button */}
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleEditClick}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Update
            </button>

            {/* Delete Button */}
            <button
              className="btn btn-primary"
              type="button"
              onClick={deleteProduct}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;