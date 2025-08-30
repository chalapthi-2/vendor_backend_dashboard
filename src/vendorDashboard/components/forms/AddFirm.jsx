

import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleRegionChange = (e) => {
    const value = e.target.value;
    setRegion((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        alert("User not authenticated!");
        return;
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);

      category.forEach((value) => formData.append("category", value));
      region.forEach((value) => formData.append("region", value));

      if (file) {
        formData.append("image", file);
      }

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          token: `${loginToken}`, //  Token in headers
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Firm Added Successfully:", data);
        alert("Firm added successfully!");
        
        // reset form if needed
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
      } else if (data.message === "vendor can have only one firm"){
        alert("Firm Exists . Only 1 firm can be added")
      }
       else {
       // console.error("Server error:", data);
        alert( "Failed to add firm");
      }
        console.log("this is firmId" ,data.firmId)
        const mango = data.firmId;
        localStorage.setItem('firmId',mango)
    } catch (error) {
      console.error("Failed to add firm", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="addfirm-container">
      <h2 className="addfirm-title">Add Firm</h2>
      <form className="addfirm-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Firm Name:</label>
          <input
            type="text"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
            placeholder="Enter firm name"
            required
          />
        </div>

        <div className="form-group">
          <label>Area:</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter area"
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
          <label>Region:</label>
          <label>
            <input
              type="checkbox"
              value="south-indian"
              checked={region.includes("south-indian")}
              onChange={handleRegionChange}
            />
            South-Indian
          </label>
          <label>
            <input
              type="checkbox"
              value="north-indian"
              checked={region.includes("north-indian")}
              onChange={handleRegionChange}
            />
            North-Indian
          </label>
          <label>
            <input
              type="checkbox"
              value="chinese"
              checked={region.includes("chinese")}
              onChange={handleRegionChange}
            />
            Chinese
          </label>
          <label>
            <input
              type="checkbox"
              value="bakery"
              checked={region.includes("bakery")}
              onChange={handleRegionChange}
            />
            Bakery
          </label>
        </div>

        <div className="form-group">
          <label>Offer:</label>
          <input
            type="text"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            placeholder="Enter offer details"
          />
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])} 
          />
        </div>

        <button type="submit" className="addfirm-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFirm;
