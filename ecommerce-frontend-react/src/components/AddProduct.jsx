import React, { useState } from "react";
import API from "../axios"; // instance that sends the JWT automatically

const emptyProduct = {
  name: "",
  brand: "",
  description: "",
  price: "",
  category: "",
  stockQuantity: "",
  releaseDate: "",
  productAvailable: false,
};

const AddProduct = () => {
  const [product, setProduct] = useState(emptyProduct);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0); // used to clear the file input

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0] || null);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please select a product image.");
      return;
    }

    // Send real numbers / null instead of "" strings
    const payload = {
      ...product,
      price: product.price === "" ? null : Number(product.price),
      stockQuantity:
        product.stockQuantity === "" ? null : Number(product.stockQuantity),
      releaseDate: product.releaseDate === "" ? null : product.releaseDate,
    };

    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    setLoading(true);
    try {
      // Do NOT set Content-Type manually: the browser adds the multipart boundary
      const response = await API.post("/product", formData);
      console.log("Product added successfully:", response.data);
      alert("Product added successfully");

      setProduct(emptyProduct);
      setImage(null);
      setFileInputKey((k) => k + 1);
    } catch (error) {
      console.error("Error adding product:", error);
      const status = error.response?.status;
      if (!error.response) {
        alert("Cannot reach the server.");
      } else if (status === 401 || status === 403) {
        alert("You are not authorised. Please sign in again.");
      } else if (status === 413) {
        alert("Image is too large.");
      } else {
        alert(`Error adding product (HTTP ${status}).`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label className="form-label" htmlFor="name">
              <h6>Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              onChange={handleInputChange}
              value={product.name}
              name="name"
              id="name"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="brand">
              <h6>Brand</h6>
            </label>
            <input
              type="text"
              name="brand"
              className="form-control"
              placeholder="Enter your Brand"
              value={product.brand}
              onChange={handleInputChange}
              id="brand"
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="description">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Add product description"
              value={product.description}
              name="description"
              onChange={handleInputChange}
              id="description"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="price">
              <h6>Price</h6>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="form-control"
              placeholder="Eg: 1000"
              onChange={handleInputChange}
              value={product.price}
              name="price"
              id="price"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="category">
              <h6>Category</h6>
            </label>
            <select
              className="form-select"
              value={product.category}
              onChange={handleInputChange}
              name="category"
              id="category"
              required
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="stockQuantity">
              <h6>Stock Quantity</h6>
            </label>
            <input
              type="number"
              min="0"
              step="1"
              className="form-control"
              placeholder="Stock Remaining"
              onChange={handleInputChange}
              value={product.stockQuantity}
              name="stockQuantity"
              id="stockQuantity"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="releaseDate">
              <h6>Release Date</h6>
            </label>
            <input
              type="date"
              className="form-control"
              value={product.releaseDate}
              name="releaseDate"
              onChange={handleInputChange}
              id="releaseDate"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="imageFile">
              <h6>Image</h6>
            </label>
            <input
              key={fileInputKey}
              className="form-control"
              type="file"
              accept="image/*"
              id="imageFile"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                id="gridCheck"
                checked={product.productAvailable}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    productAvailable: e.target.checked,
                  }))
                }
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Product Available
              </label>
            </div>
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
