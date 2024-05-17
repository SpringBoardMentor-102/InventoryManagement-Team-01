import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import "../../index.css";
import ProductList from "./ProductList";
import { fetchData } from "../../utilities/apputils";
import Filteroption from "./Filteroption";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [originalSearchResult, setOriginalSearchResult] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [saveCategoryId, setSaveCategoryId] = useState("");
  const [searchFilterResults, setSearchFilterResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showResults, setShowResults] = useState(false);
  //product state
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState(null);


  const fetchProducts = async () => {
    try {
      const response = await fetchData("get", "product/getAllProducts");
      console.log("product list----", response);
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


  useEffect(() => {
    fetchProducts();

  }, []);

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
        // console.log("searched products ***********", response);
        // console.log("saveCategoryId", saveCategoryId);
        setOriginalSearchResult(response.data);



        setShowResults(true);
        if (saveCategoryId == "") {
          setSearchResults(response.data);

        }



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

      // //testing category api
      // try{
      //   const response2 = await fetchData(
      //     "get",
      //     ""
      //   );
      // }catch(error){

      // }

    } else {
      setSearchResults([]);
      setOriginalSearchResult([])
      setShowResults(false);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery state as user types
  };

  useEffect(() => {

    if (showResults) {
      if (saveCategoryId) {
        getCategory(saveCategoryId);
      }
    }

  }, [showResults])

  const getCategory = (categoryId) => {

    // console.log("product filter result &&&&&",showResults);
    // console.log("category data in serach==", categoryId);
    let filtered;
    setSaveCategoryId(categoryId);

    if (showResults) {
      filtered = originalSearchResult?.filter(product => product?.categoryId === categoryId);
      // console.log("filtered result",filtered,searchResults);
      setSearchResults(filtered);
      // setSearchFilterResults(filtered);
      setShowResults(true);
    } else {
      filtered = originalProducts?.filter(product => product?.categoryId?._id === categoryId);
      // console.log("product filter result",filtered,originalProducts);
      setProducts(filtered);
      setShowResults(false);

    }
  }

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
                  onChange={handleChange} // Call handleChange when input value changes
                  onKeyPress={() => handleKeyPress}
                />
                <button onClick={handleSearch} className="material-icons-sharp">
                  search
                </button>
              </div>
            </div>
            {/* filter */}
            <div style={{ marginTop: "10px" }}>
              <Filteroption getCategory={getCategory} />
            </div>
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
          {!showResults && <ProductList products={products} error={error} loading={loadingProduct} />}
        </div>
      </div>
    </>
  );
}

export default Search;
