import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';  // Import necessary components from react-router-dom
import './index.css';
import App from './App';
import BarcodeScanner from './BarcodeScanner';  // Import BarcodeScanner for the new route
import ProductSearch from './ProductSearch';  // Import ProductSearch for the new route
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />  {/* Home Route */}
        <Route path="/scanner" element={<BarcodeScanner />} />  {/* Route for the Barcode Scanner */}
        <Route path="/search" element={<ProductSearch />} />  {/* Route for the Product Search */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
