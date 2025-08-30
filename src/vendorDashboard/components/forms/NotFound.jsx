import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ fontSize: "80px", margin: "0" }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn’t exist.</p>
       <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go Back Home
      </Link> 
    </div>
  );
};

export default NotFound;
