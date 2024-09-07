import React, { useState } from 'react';
import './product.css'; // Import the CSS file

const ProductSearch = () => {
  const [searchName, setSearchName] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/search-product?name=${searchName}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setError("");

        // Trigger Arduino action if product name is found
        if (data.product_name === "arun") {
          // Trigger 5-second blink
          await fetch('http://192.168.199.179/blink5s');
        } else if (data.product_name === "pigggg") {
          // Trigger 10-second blink
          await fetch('http://192.168.199.179/blink10s');
        }else if(data.product_name === "su"){
          await fetch('http://192.168.199.179/blink15s');
        }
      } else {
        setProduct(null);
        setError("Product not found");
      }
    } catch (err) {
      console.error('Error searching product:', err);
      setError("An error occurred while searching for the product.");
    }
  };

  return (
    <div className="product-search">
      <h2 className="search-heading">Search Product by Name</h2>
      <div className="search-form">
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter product name"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      {product && (
        <div className="product-info">
          <h3>Product Found:</h3>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Barcode:</strong> {product.barcode}</p>
          <p><strong>Name:</strong> {product.product_name}</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ProductSearch;
