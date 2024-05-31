import React, { useState, useEffect } from 'react';
import { fetchData } from '../../utilities/apputils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";


// FilterComponent functional component
const FilterComponent = ({ getCategory }) => {
  // State variables using useState hook
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedFilterOption, setSelectedFilterOption] = useState(
    {
      "price": "",
      "category": "",
      "availablity": ""

    }
  );
  // getting the role value 
  const role = JSON.parse(localStorage.getItem("user")).role;

  const admin = role ? false : true;

  // useEffect hook to fetch categories when component mounts
  useEffect(() => {
    // Function to fetch categories
    const fetchCategories = async () => {
      try {
        // Fetch categories from API
        const response = await fetchData(
          "get",
          `category/getallcategory`
        );
        setCategories(response.data);
      } catch (error) {
        // Handle errors if any
      }
    };
    // Call fetchCategories function
    fetchCategories();
  }, []);  // Empty dependency array

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  // Price = Function to handle option change
  const handleFilterOptionChange = (filedName, event) => {

    const value = event.target.value;

    let updatedFilter;
    if (filedName === "price") {

      updatedFilter = { ...selectedFilterOption, price: value };
      setSelectedFilterOption(updatedFilter);

    }
    if (filedName === "category") {
      var Category = categories.find(category => category._id === value)? categories.find(category => category._id === value).categoryName: "";
      updatedFilter = { ...selectedFilterOption, category: value, Category: Category};
      setSelectedFilterOption(updatedFilter);

    } if (filedName === "availablity") {

      updatedFilter = { ...selectedFilterOption, availablity: value };
      setSelectedFilterOption(updatedFilter);

    }
  };

  useEffect(() => {
    getCategory(selectedFilterOption);

  }, [selectedFilterOption])

  return (
    <div

    >
      <button className="filter-button" onClick={toggleDropdown}
        style={{
          fontSize: "16px",
          fontWeight: "bold"
        }}

      ><FontAwesomeIcon icon={faFilter} /> Filter </button>
      {showDropdown && (
        <div className='filter' >
          
          {/* <div> Select Filter</div> */}
            <label >Select Price</label>
          <select  style={{
            backgroundColor: "#f5f5f5"
          }} value={selectedFilterOption.price} onChange={(event) => handleFilterOptionChange("price", event)}>
            <optgroup label="price"

            >
              {/* <option value="">Select Price</option> */}
              <option value=""></option>
              <option value={500}>less than 500</option>
              <option value={1000}>less than 1000</option>
              <option value={10000}>less than 10000</option>
              <option value={50000}>less than 50000</option>
              <option value={100000}>less than 100000</option>
            </optgroup>
          </select>
          <label >Select Category</label>
          <select style={{
            backgroundColor: "#f5f5f5"
          }} value={selectedFilterOption.category} onChange={(event) => handleFilterOptionChange("category", event)}>
            <optgroup label="category">
              <option value=""></option>
              {categories?.map((item, index) =>
              (
                <option key={item._id} value={item._id}>{item.categoryName}</option>
              ))}

            </optgroup>
          </select>

          {admin ? (null) : (<><label >Select Availablity</label>
          <select style={{
            backgroundColor: "#f5f5f5"
          }} value={selectedFilterOption.availablity} onChange={(event) => handleFilterOptionChange("availablity", event)}>

            <optgroup label="availablity">
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="out_of_stock">Out of Stock</option>
            </optgroup>            
          </select></>)}
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
