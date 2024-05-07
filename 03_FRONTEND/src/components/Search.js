import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import "../../src/index.css";
import ProductList from "./ProductList";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showResults, setShowResults] = useState(false);
  const toggleSortOrder = (field) => {
    if (field === sortField) {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }


  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      try {
        setLoading(true);
        const url = `${BACKEND_URL}/product/searchProduct?name=${searchQuery}&sortField=${sortField}&sortOrder=${sortOrder}`;
        console.log("Request URL:", url);
        const response = await axios.get(url);
        setSearchResults(response.data);
        setShowResults(true);
      } catch (error) {
        let response = error.response;
        console.log(response?.status);
        setShowResults(false);
        if (response) {
          if (response?.status === 404) {
            console.log("No search results...")
          }
        }
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults(false);
    }
  };


  const handleChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery state as user types
  };

  return (

    <>
      <div className="searchpage-container">
        <div className="search-block">
          <div className="search-bar">
            <input
              type="text"
              id="search-input"
              placeholder="Search here..."
              value={searchQuery}
              onChange={handleChange} // Call handleChange when input value changes
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch} className="material-icons-sharp">search</button>
          </div>
          {showResults ? (
            <table className="table-container">
              <thead>
                <tr>
                  <th>Product</th>
                  <th onClick={() => toggleSortOrder("name")}>
                    Product Name
                    {sortField === "name" && (
                      <FontAwesomeIcon
                        icon={sortOrder === "asc" ? faArrowUp : faArrowDown}
                      />
                    )}
                  </th>
                  <th onClick={() => toggleSortOrder("price")}>
                    Price
                    {sortField === "price" && (
                      <FontAwesomeIcon
                        icon={sortOrder === "asc" ? faArrowUp : faArrowDown}
                      />
                    )}
                  </th>
                  <th onClick={() => toggleSortOrder("quantity")}>
                    Quantity
                    {sortField === "quantity" && (
                      <FontAwesomeIcon
                        icon={sortOrder === "asc" ? faArrowUp : faArrowDown}
                      />
                    )}
                  </th>
                  <th onClick={() => toggleSortOrder("status")}>
                    Status
                    {sortField === "status" && (
                      <FontAwesomeIcon
                        icon={sortOrder === "asc" ? faArrowUp : faArrowDown}
                      />
                    )}
                  </th>

                </tr>
              </thead>
              <tbody>
                {searchResults
                  .sort((a, b) =>
                    sortOrder === "asc"
                      ? String(a[sortField]).localeCompare(String(b[sortField]))
                      : String(b[sortField]).localeCompare(String(a[sortField]))
                  )
                  .map((product, index) => (
                    <tr key={index} className="trows">
                      <td>
                        <img
                          src={product.imageUrl}
                          alt="Product"
                          style={{ width: "200px", height: "200px" }}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>) : (<ProductList />)}
        </div>
      </div>
    </>
  );
}

export default Search;
