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
  const [cartQuantity, setCartQuantity] = useState(1);
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

    // get the cart from localStorage or create an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existsIndex = cart.findIndex(item => item.product._id === productData._id);

      if (existsIndex !== -1) {
        // Update quantity if product already exists
        cart[existsIndex].quantity += cartQuantity;
      } else {
        // Add the product to the cart if it doesn't exist
        cart.push({ product: productData, quantity: cartQuantity });
      }

    // Save the updated cart back to localStorage 
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleRemoveFromCart = (productData) => {
    // Remove the selected product from the list of selected products
    
    // Get the cart from localStorage or create an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filter out the product to be removed
    const updatedCart = cart.filter(item => item.product._id !== productData._id);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

   
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
            <button onClick={()=>handleRemoveFromCart(product)} className="add">
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
