
import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]); 
  const [description, setDescription] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleBestSeller = (e) => {
    const value = e.target.value === "true";
    setBestSeller(value);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");

      if (!loginToken || !firmId) {
        console.error("User not authenticated");
        alert("Please login again!");
        return;
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("bestSeller", bestSeller);
      if (image) formData.append("image", image);

      category.forEach((value) => formData.append("category", value));

      const res = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loginToken}`, 
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      console.log("Product added:", data);
      alert("Product added successfully!");

      // reset form
      setProductName("");
      setPrice("");
      setCategory([]);
      setDescription("");
      setBestSeller(false);
      setImage(null);
    } catch (err) {
      console.error("Error adding product:", err.message);
      alert("Error adding product: " + err.message);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form className="add-product-form" onSubmit={handleAddProduct}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <label>
            <input
              type="checkbox"
              value="veg"
              checked={category.includes("veg")}
              onChange={handleCategoryChange}
            />
            Veg
          </label>
          <label>
            <input
              type="checkbox"
              value="non-veg"
              checked={category.includes("non-veg")}
              onChange={handleCategoryChange}
            />
            Non-Veg
          </label>
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Bestseller:</label>
          <div>
            <input
              type="radio"
              name="bestSeller"
              value="true"
              checked={bestSeller === true}
              onChange={handleBestSeller}
            />
            <label>Yes</label>
            <input
              type="radio"
              name="bestSeller"
              value="false"
              checked={bestSeller === false}
              onChange={handleBestSeller}
            />
            <label>No</label>
          </div>
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button className="submit-btn" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
