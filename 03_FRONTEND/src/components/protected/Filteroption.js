import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slider';
import "../../index.css";


const Filteroption = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [category, setcategory] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedcategory, setSelectedcategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, maxPrice]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [color, setColor] = useState([]);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await axios.get('https://api.Allproducts.com/category');
        setcategory(categoryResponse.data);
       //Fetch color
       const colorResponse = await axios.get('http://api.AllProducts.com/color')
       setColor(colorResponse.data);
      
       

        const productsResponse = await axios.get('https://api.AllProducts.com/products');
        const products = productsResponse.data;

        // Determine the maximum price from the fetched products
        const prices = products.map(product => product.price);
        const maxPrice = Math.max(...prices);
        setMaxPrice(maxPrice);

        // Set initial filtered products with all fetched products
        setFilteredProducts(products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Filter products based on selected category and price range
    const filtered = filteredProducts.filter(product => {
      const categoryMatch = selectedcategory === '' || product.category === selectedcategory;
      const priceMatch = product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1];
      const colorMatch = selectedColor === '' || product.color === selectedColor;
      const ratingMatch = product.rating >= selectedRating;
      return categoryMatch && priceMatch&& colorMatch&&ratingMatch;
    });

    setFilteredProducts(filtered);
  }, [selectedcategory, selectedPriceRange]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handlecategory = (category) => {
    console.log(`Selected category: ${category}`);
    setSelectedcategory(category);
    setShowDropdown(false); // Close dropdown after selection
  };
  const handlePriceRangeChange = (newValue) => {
    setSelectedPriceRange(newValue);
  };
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
  const handleRatingChange = (newValue) => {
    setSelectedRating(newValue);
  };


  return (
    <div>
      <h2 onClick={toggleDropdown}>Filter</h2>
         {showDropdown && (
        <div className="dropdown">
          {/* Category dropdown */}
          <select onChange={(e) => handlecategory(e.target.value)}>
            <option value="">category</option>
            {category.map((category, index) => (
              <option key={index} value={category}>
                {category}

              </option>

            ))}
          </select>
          <div className="price-slider">
            <h3>price</h3>

            <input
              type="range"
              name="selectedPriceRange"
              min={0}
              max={maxPrice}
              step={10}
              value={selectedPriceRange[1]}
              onChange={(e) => setSelectedPriceRange([selectedPriceRange[0], parseInt(e.target.value)])}
             />
          </div>
           { /* color dropdown*/}
          <select onChange={(e) => handleColorChange(e.target.value)}>
            <option value="">Color</option>
            {color.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
          {/*rating slider*/}
          <div className="rating-slider">
            <h3> Ratings</h3>
            <input
             type="range"
             name="selectedrating"
              min={0}
              max={5}
              step={1}
              value={selectedRating[1]}
              onChange={(e) => setSelectedRating([selectedRating[0], parseInt(e.target.value)])}
            />
          </div>


        </div>
      )}
    </div>
  );
};

export default Filteroption;

