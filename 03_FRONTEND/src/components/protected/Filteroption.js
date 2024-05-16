import React, { useState, useEffect } from 'react';
import axios from 'axios'; // importing axios
import { fetchData } from '../../utilities/apputils';

const FilterComponent = ({ handleFilter ,getCategory }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchData(
          "get",
          `category/getallcategory`
        );
        setCategories(response.data);


        console.log("responce of api",response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array 

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log("selected value===", selectedValue);
    // handleFilter(selectedValue);
    getCategory(selectedValue);
    
  };

  return (
    <div>
      <button onClick={toggleDropdown} style={{fontSize: "16px",
    fontWeight: "bold"}}>Filter</button>
      {showDropdown && (
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select Filter</option>
          <optgroup label="Price">
            <option value="low">Price :Low</option>
            <option value="medium">Price :Medium</option>
            <option value="high">Price :High</option>
          </optgroup>
          <optgroup label="Category">
            {categories?.map((item,index)=>
            (
              <option key={item._id} value={item._id}>{item.categoryName}</option>
            ))}
            
            {/* <option value="6634e46151121271c7232e10">Mobile phones</option>
            <option value="6634e46851121271c7232e13">Watch</option> */}
          </optgroup>
          <optgroup label="Availability">
            <option value="available">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </optgroup>
          <optgroup label="Rating">
            <option value="1">Rating 1</option>
            <option value="2">Rating 2</option>
            <option value="3">Rating 3</option>
            <option value="4">Rating 4</option>
            <option value="5">Rating 5</option>
          </optgroup>
        </select>
      )}
    </div>
  );
};

export default FilterComponent;
