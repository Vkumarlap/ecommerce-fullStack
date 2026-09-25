import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../axios";

const UpdateProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [image, setImage] = useState(null);

  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releasedate: "",
    availability: null,
    Quantity: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/product/${id}`);

        setProduct(response.data);

        const responseImage = await API.get(
          `/product/${id}/image`,
          {
            responseType: "blob",
          }
        );

        const imageFile = convertUrlToFile(
          responseImage.data,
          response.data.imageName
        );

        setImage(imageFile);

        setUpdateProduct({
          id: response.data.id,
          name: response.data.name ?? "",
          description: response.data.description ?? "",
          brand: response.data.brand ?? "",
          price: response.data.price ?? "",
          category: response.data.category ?? "",
          releasedate: response.data.releasedate ?? "",
          availability: response.data.availability ?? null,
          Quantity: response.data.Quantity ?? null,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const convertUrlToFile = (blobData, fileName) => {
    return new File([blobData], fileName, {
      type: blobData.type,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "product",
      new Blob([JSON.stringify(updateProduct)], {
        type: "application/json",
      })
    );

    if (image) {
      formData.append("imageFile", image);
    }

    try {
      const response = await API.put(
        `/product/${id}`,
        formData
      );

      console.log("Product updated successfully:", response.data);

      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);

      alert("Failed to update product. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateProduct({
      ...updateProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="update-product-container">
      <div
        className="center-container"
        style={{ marginTop: "7rem" }}
      >
        <h1>Update Product</h1>

        <form
          className="row g-3 pt-1"
          onSubmit={handleSubmit}
        >
          {/* NAME */}
          <div className="col-md-6">
            <label className="form-label">
              <h6>Name</h6>
            </label>

            <input
              type="text"
              className="form-control"
              placeholder={product.name}
              value={updateProduct.name}
              onChange={handleChange}
              name="name"
            />
          </div>

          {/* BRAND */}
          <div className="col-md-6">
            <label className="form-label">
              <h6>Brand</h6>
            </label>

            <input
              type="text"
              name="brand"
              className="form-control"
              placeholder={product.brand}
              value={updateProduct.brand}
              onChange={handleChange}
              id="brand"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>

            <input
              type="text"
              className="form-control"
              placeholder={product.description}
              name="description"
              onChange={handleChange}
              value={updateProduct.description}
              id="description"
            />
          </div>

          {/* PRICE */}
          <div className="col-5">
            <label className="form-label">
              <h6>Price</h6>
            </label>

            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              value={updateProduct.price}
              placeholder={product.price}
              name="price"
              id="price"
            />
          </div>

          {/* CATEGORY */}
          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>

            <select
              className="form-select"
              value={updateProduct.category}
              onChange={handleChange}
              name="category"
              id="category"
            >
              <option value="">Select category</option>

              <option value="laptop">Laptop</option>
              <option value="headphone">Headphone</option>
              <option value="mobile">Mobile</option>
              <option value="electronics">Electronics</option>
              <option value="toys">Toys</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>

          {/* QUANTITY */}
          <div className="col-md-4">
            <label className="form-label">
              <h6>Quantity</h6>
            </label>

            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              placeholder={product.Quantity}
              value={updateProduct.Quantity ?? ""}
              name="Quantity"
              id="Quantity"
            />
          </div>

          {/* IMAGE */}
          <div className="col-md-8">
            <label className="form-label">
              <h6>Image</h6>
            </label>

            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : "Image unavailable"
              }
              alt={product.imageName}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                padding: "5px",
                margin: "0",
              }}
            />

            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
              name="imageFile"
              id="imageFile"
            />
          </div>

          {/* AVAILABILITY */}
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="availability"
                id="gridCheck"
                checked={updateProduct.availability ?? false}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    availability: e.target.checked,
                  })
                }
              />

              <label className="form-check-label">
                Product Available
              </label>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;

