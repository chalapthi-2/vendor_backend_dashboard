




import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (!response.ok) {
        alert(data.error || "Invalid credentials");
        return;
      }

      alert("Login successful");
      setEmail("");
      setPassword("");

      // store login token
      localStorage.setItem("loginToken", data.token);

      const vendorId = data.vendorId;
      if (!vendorId) {
        console.error("Vendor ID missing in login response:", data);
        return;
      }

      // fetch vendor details
      const vendorRes = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      const vendorData = await vendorRes.json();

      if (!vendorRes.ok) {
        console.error("Error fetching vendor:", vendorData);
        return;
      }

      console.log("Vendor Data:", vendorData);

      // save firm details
      localStorage.setItem("firmId", vendorData.vendorFirmId || "");
      localStorage.setItem("firmName", vendorData.vendorFirmName);

      //  tells LandingPage we’re logged in
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Vendor Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
