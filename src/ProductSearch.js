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
        if (data.id === 1) {
          await fetch('http://192.168.157.134/startSequence1');
        } else if (data.id === 2) {
          await fetch('http://192.168.157.134/startSequence2');
        } else if (data.id === 3) {
          await fetch('http://192.168.157.134/startSequence3');
        }else if (data.id === 4) {
          await fetch('http://192.168.157.134/startSequence4');
        }else if (data.id === 5) {
          await fetch('http://192.168.157.134/startSequence5');
        }else if (data.id === 6) {
          await fetch('http://192.168.157.134/startSequence6');
        }else if (data.id === 7) {
          await fetch('http://192.168.157.134/startSequence7');
        }else if (data.id === 8) {
          await fetch('http://192.168.157.134/startSequence8');
        }else if (data.id === 9) {
          await fetch('http://192.168.157.134/startSequence9');
        }
      } else {
        setProduct(null);
        setError("Product not found");
      }
    } catch (err) {
      console.error('Error searching product:', err);     
    }
  };


  return (
    <div className="page-container">
      <div className="title-container">
        <h2 className="search-heading">Product Search</h2>
      </div>
      <div className="search-form-container">
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
      </div>
      {product && (
        <div className="product-info-container">
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
