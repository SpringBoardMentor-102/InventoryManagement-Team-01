// external dependencies
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// internal dependency
import { fetchData } from "../../utilities/apputils";

// declaration of product detail component
const ProductDetail = () => {
  //   extracting query params
  const { id } = useParams();

  //intializing the component state
  const [cartQuantity, setCartQuantity] = useState(0);
  const [product, setProduct] = useState([]);

  // helper function to capitalize the first capitalizeFirstLetter,for better presentation
  const capitalizeFirstLetter = (text = "abc") => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  //   other helper function

  //handler code for decrementing the quantity
  const setDecrease = () => {
    if (cartQuantity > 0) {
      setCartQuantity(cartQuantity - 1);
    }
  };
  //handler code for incrementing  the quantity
  const setIncrease = () => {
    if (cartQuantity < product.quantity) {
      setCartQuantity(cartQuantity + 1);
    }
  };

  // when ID changes, call the backend and fetch the product details of this new product ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchData("get", `product/GetProducts/${id}`);
        if (response !== null) {
          setProduct(response.data);
        } else {
          console.error("error", "UnAuthorized");
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (productData) => {
    // Add the selected product to the list of selected products
    console.log("Added to cart: ", productData);

    // [ {quantity: 7, product: { _id: "343433535346" }}, {quantity: 2, product: { _id: "085604804860" }} ] // get the cart list from session storage // if the cart list doesnt exist, create it and get it from the session storage (empty list) // add this item to the cart (THIS) // else the list was not empty // check if this item already exists in the cart // if it doesnt exist, add this (THIS) // if it does exist, remove old entry and add new entry
  };

  const handleRemoveFromCart = () => {
    // Remove the selected product from the list of selected products
    console.log("Removed from cart:", cartQuantity);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <div id="product-container">
        <div className="back">
          <FontAwesomeIcon icon={faArrowLeft} />
          <Link to="/Dashboard">Back to Dashboard</Link>
        </div>
        <div className="product-images">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="product">
          <p className="product-name">{product.name}</p>
          <h3>
            Category: {capitalizeFirstLetter(product.categoryId?.categoryName)}
          </h3>
          <h3>Price : ₹ {product.price}</h3>
          <h3>Quantity : {product.quantity}</h3>
          <h2>DESCRIPTION</h2>
          <p className="desc">{product.description}</p>
          <div className="buttons">
            <button onClick={() => handleAddToCart(product)} className="add">
              Add to Cart
            </button>
            <span> </span>
            <button onClick={handleRemoveFromCart} className="add">
              Remove from Cart
            </button>
          </div>
          <div className="change-button">
            <button onClick={setDecrease} className="minus">
              -
            </button>
            <button className="value">{cartQuantity}</button>
            <button onClick={setIncrease} className="plus">
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
