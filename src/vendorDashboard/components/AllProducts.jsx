
import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const res = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductData = await res.json();
      setProducts(newProductData.products);
    } catch (error) {
      console.log("Failed to fetch products", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE',
      });
      setProducts(products.filter((p) => p._id !== productId));
    } catch (error) {
      console.log("Failed to delete product", error);
    }
  };

  useEffect(() => {
    productsHandler();
  }, []);

  return (
    <div>
      {!products ? (
        <p>No Products Added</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  {item.image && (
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.productName}
                      width="80"
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
