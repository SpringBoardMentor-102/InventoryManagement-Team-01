import axios from "axios";
import React, { useState } from "react";
import  ProductData from './ProductData.json'
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

import "../../src/index.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const url = `${BACKEND_URL}/product/searchProduct?name=${searchQuery}`;
            console.log("Request URL:", url); // Log the constructed URL
            const response = await axios.get(url);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
      <div className="search-container">
         <div className="search-bar">
      <input type="text" id="search-input" placeholder="Search here..."/> 
          <button onClick={handleSearch} className="material-icons-sharp">search</button>
    </div>
  
        <table className="table-container">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((product, index) => (
              <tr key={index} className="trows">
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
export default Search