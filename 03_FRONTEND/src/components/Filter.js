// Filter.js
import React, { useState } from 'react';
import Search from './Search';
import ProductList from './ProductList';
// import './Search.css';

const Filter = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([...products]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filtered = products.filter(product =>
      
    products.id.toString().includes(searchTerm) ||
    products.item_name.toLowerCase().includes(searchTerm.toLowerCase())||
    products.company.toLowerCase().includes(searchTerm.toLowerCase())||
    products.current_price.toString().includes(searchTerm)||
    products.discount_percentage.toString().includes(searchTerm)||
    products.return_period.toString().includes(searchTerm)||
    products.rating.toString().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <h1>Filter</h1>
      <Search value={searchTerm} onChange={handleSearch} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Filter;
