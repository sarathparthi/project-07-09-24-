import React, { useState, useEffect } from 'react';
import './producttable.css';

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/all-products');
        console.log('Response Status:', response.status); 
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched Data:', data);
          setProducts(data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        setError('Error fetching products: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main-container">
      <div className="title-container">
        <h1 className="page-title">Available Products List</h1>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Barcode</th>
              <th>Product Name</th>
              {/*<th>Quantity</th>  New quantity column */}
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.barcode}</td>
                  <td>{product.product_name}</td>
                  {/*<td>{product.quantity}</td>  Display the product quantity */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
