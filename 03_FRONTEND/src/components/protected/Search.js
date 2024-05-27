import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import "../../index.css";
import ProductList from "./ProductList";
import { fetchData } from "../../utilities/apputils";
import Filteroption from "./Filteroption";

// Search component
const Search = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [originalSearchResult, setOriginalSearchResult] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [saveCategoryId, setSaveCategoryId] = useState(false);
  const [prevFilterOption, setPrevFilterOption] = useState({
    price: "",
    category: "",
    availablity: ""
  });

  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showResults, setShowResults] = useState(false);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch products for dashboard products
  const fetchProducts = async () => {
    try {
      const response = await fetchData("get", "product/getAllProducts");
      if (response !== null) {
        setProducts(response.data.products);
        setOriginalProducts(response.data.products);
        setLoadingProduct(false);
      } else {
        setError("UnAuthorized");
        setLoadingProduct(false);
      }
    } catch (error) {
      setError(error.message);
      setLoadingProduct(false);
    }
  };

  // useEffect hook to fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to toggle sort order
  const toggleSortOrder = (field) => {
    if (field === sortField) {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Function to handle key press event
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  const handleSearch = async (query = searchQuery) => {
    if (query.trim() !== "") {
      try {
        setLoading(true);
        const response = await fetchData(
          "get",
          `product/searchProduct?name=${query}&sortField=${sortField}&sortOrder=${sortOrder}`
        );

        setOriginalSearchResult(response.data);
        setShowResults(true);
        setSearchResults(response.data);

        // Update recent searches
        setRecentSearches((prevRecentSearches) => {
          const updatedRecentSearches = [query, ...prevRecentSearches.filter(q => q !== query)];
          return updatedRecentSearches.slice(0, 5); // Keep only the last 5 searches
        });
      } catch (error) {
        let response = error.response;
        setShowResults(false);
        if (response && response.status === 404) {
          // Handle 404 error
        }
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
      setOriginalSearchResult([]);
      setShowResults(false);
    }
  };

  // Function to handle input change
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle recent search click
  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  // Function to get products by category
  const getCategory = (filterCriteria) => {
    let filteredProducts;
    setSaveCategoryId(true);
    setPrevFilterOption(filterCriteria);

    if (showResults) {
      filteredProducts = originalSearchResult?.filter(product => filterCriteria?.category === "" ? true : (product?.categoryId === filterCriteria?.category));
      filteredProducts = filteredProducts?.filter(product => filterCriteria?.availablity === "" ? true : (product?.status === filterCriteria?.availablity));
      filteredProducts = filteredProducts?.filter(product => filterCriteria?.price === "" ? true : (product?.price <= Number(filterCriteria?.price)));

      setSearchResults(filteredProducts);
      setShowResults(true);
    } else {
      filteredProducts = originalProducts?.filter(product => filterCriteria?.category === "" ? true : (product?.categoryId?._id === filterCriteria.category));
      filteredProducts = filteredProducts?.filter(product => filterCriteria?.availablity === "" ? true : (product?.status === filterCriteria.availablity));
      filteredProducts = filteredProducts?.filter(product => filterCriteria?.price === "" ? true : (product?.price <= Number(filterCriteria.price)));

      setProducts(filteredProducts);
      setShowResults(false);
    }
  };

  return (
    <>
      <div className="searchpage-container">
        <div className="search-block">
          <div style={{ display: "flex", position: "fixed", top: "10px" }}>
            <div style={{ width: "60vw" }}>
              <div className="search-bar">
                <input
                  type="text"
                  id="search-input"
                  placeholder="Search here..."
                  value={searchQuery}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={() => handleSearch()} className="material-icons-sharp">
                  search
                </button>
              </div>
              {recentSearches.length > 0 && (
                <div className="recent-searches">
                  <p>Recent Searches:</p>
                  <ul>
                    {recentSearches.map((query, index) => (
                      <li key={index} onClick={() => handleRecentSearchClick(query)}>
                        {/* {query} */}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* filter */}
            <div style={{ marginTop: "10px" }}>
              <Filteroption getCategory={getCategory} />
            </div>
          </div>

          {loading && <p>Loading...</p>}
          {showResults && searchResults?.length > 0 && (
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
              <thead>
                <tr>
                  <th>No such product found.</th>
                </tr>
              </thead>
            </table>
          )}
          {!showResults && (
            <ProductList products={products} error={error} loading={loadingProduct} />
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
