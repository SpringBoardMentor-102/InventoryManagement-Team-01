import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { fetchData } from "../../utilities/apputils";
import ManageProduct from "./ManageProduct";

const ProductList = ({products,error,loading}) => {

  const capitalizeFirstLetter = (text = "abc") => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };


  if (loading) {
    return <div> loading...</div>;
  }
  if (error) {
    return <div>Error :{error}</div>;
  }

  return (
    <div >
      {/* <ManageProduct /> */}
    <div className="product-container">

      {products?.map((item) => (

        <div className="item-container" key={item._id}>
          <Link to={`/product/${item._id}`}>
            <img
              className="item-image"
              src={item.imageUrl}
              alt="displayed item"
            />
            <div className="details-container">
              <div className="company-name">{item.name}</div>
              <div className="item-name">{item.description}</div>
              {/* Added categories  */}
              <div className="category">
                {capitalizeFirstLetter(item.categoryId?.categoryName)}
              </div>
              <div className="price">
                <span className="current-price">Rs {item.price}</span>
              </div>
              </div>
          </Link>
        </div>
      ))}
    </div>
    </div>

  );
};

export default ProductList;
