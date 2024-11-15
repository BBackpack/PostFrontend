import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, Routes, Route, useMatch, useResolvedPath } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/manageSupplies.css";

const manageSupplies = () => {
    // Supplies data state
    const [supplies, setSupplies] = useState([
      { id: 1, name: "Tape", quantity: 5, status: "Low" },
      { id: 2, name: "Boxes", quantity: 20, status: "In Stock" },
      { id: 3, name: "Envelopes", quantity: 50, status: "In Stock" },
    ]);
  
    const [searchQuery, setSearchQuery] = useState("");
  
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
  
    const handleRestock = (id) => {
      setSupplies((prevSupplies) =>
        prevSupplies.map((supply) =>
          supply.id === id ? { ...supply, quantity: supply.quantity + 10 } : supply
        )
      );
    };
  
    return (
      <div className="container">
        {/* Navigation bar */}
        <nav className="nav">
          <Link to="/manage-supplies" className="homePage">Employee Dashboard</Link>
          <ul>
            <li><Link to="/employee-supplies">Dashboard</Link></li>
            <li><Link to="/manage-packages">Manage Packages</Link></li>
            <li><Link to="/employee-supplies" className="active">Supplies</Link></li>
            <li><Link to="/incoming-packages">Incoming Packages</Link></li>
            <li><Link to="/employee-profile">Profile</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
  
        {/* Main content area */}
        <div className="manage-content">
          <h1>Manage Supplies</h1>
          <p>Monitor and restock supply levels below.</p>
  
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search supplies..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
  
          {/* Supplies Table */}
          <table className="supplies-table">
            <thead>
              <tr>
                <th>Supply Name</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {supplies
                .filter((supply) => supply.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((supply) => (
                  <tr key={supply.id}>
                    <td>{supply.name}</td>
                    <td>{supply.quantity}</td>
                    <td>{supply.status}</td>
                    <td>
                      <button
                        onClick={() => handleRestock(supply.id)}
                        className="action-link restock-btn"
                      >
                        Restock
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
  
        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2024 United Mail Services - Manage Supplies. All rights reserved.</p>
        </footer>
      </div>
    );
  };
  
  export default manageSupplies;