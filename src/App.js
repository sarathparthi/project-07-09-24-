import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch,Link,useLocation} from 'react-router-dom';

import './App.css';
import ProductTable from './ProductTable'; // Ensure the path is correct

function App() {
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(true);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    // Show the welcome message only on the home page
    if (location.pathname === '/') {
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
    }
  }, [location]);

  // Function to toggle the display of the ProductTable
  const toggleTableVisibility = () => {
    setShowTable(prevState => !prevState); // Toggle the visibility
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>QR Scanner & Product Search</h1>
      </header>
      <div className="nav-buttons">
        <Link to="/">
          <button className="nav-button">
            Home
          </button>
        </Link>
        <Link to="/scanner">
          <button className="nav-button">
            Open QR Scanner
          </button>
        </Link>
        <Link to="/search">
          <button className="nav-button">
            Open Product Search
          </button>
        </Link>
        <Link to ="/table">
          <button className="nav-button">
              Show Table
          </button>
        </Link>
      </div>
      
      <main className="App-main">
        <div className="component-container">
          {showWelcome && <h2>Welcome to the Online Store</h2>}
        </div>
      </main>
    </div>
  );
}

export default App;
