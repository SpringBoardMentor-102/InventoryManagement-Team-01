import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import "../../index.css";
import ProductList from "./ProductList";
import { fetchData } from "../../utilities/apputils";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
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
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    // Taking token from session storage

    if (searchQuery.trim() !== "") {
      try {
        setLoading(true);
        const response = await fetchData(
          "get",
          `product/searchProduct?name=${searchQuery}&sortField=${sortField}&sortOrder=${sortOrder}`
        );
        console.log(response);

        setSearchResults(response.data);
        setShowResults(true);
      } catch (error) {
        let response = error.response;
        console.log(response?.status);
        setShowResults(false);
        if (response) {
          if (response?.status === 404) {
            console.log("No search results...");
          }
        }
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
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
            <button onClick={handleSearch} className="material-icons-sharp">
              search
            </button>
          </div>
          {loading && <p>Loading...</p>}
          {showResults && searchResults.length > 0 && (
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
                  .sort((a, b) => {
                    if (sortField === "status") {
                      const statusOrder = { available: 1, out_of_stock: 2 };
                      return sortOrder === "asc"
                        ? statusOrder[a[sortField]] - statusOrder[b[sortField]]
                        : statusOrder[b[sortField]] - statusOrder[a[sortField]];
                    } else if (
                      sortField === "price" ||
                      sortField === "quantity"
                    ) {
                      return sortOrder === "asc"
                        ? a[sortField] - b[sortField]
                        : b[sortField] - a[sortField];
                    } else {
                      const valueA =
                        typeof a[sortField] === "string"
                          ? a[sortField].toLowerCase()
                          : a[sortField];
                      const valueB =
                        typeof b[sortField] === "string"
                          ? b[sortField].toLowerCase()
                          : b[sortField];
                      if (
                        typeof valueA === "string" &&
                        typeof valueB === "string"
                      ) {
                        return sortOrder === "asc"
                          ? valueA.localeCompare(valueB)
                          : valueB.localeCompare(valueA);
                      } else {
                        return 0;
                      }
                    }
                  })
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
            </table>
          )}
          {showResults && searchResults.length === 0 && (
            <table className="table-container">
              <th>No such product found.</th>
            </table>
          )}
          {!showResults && <ProductList />}
        </div>
      </div>
    </>
  );
}

export default Search;
