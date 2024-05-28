// external dependencies
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// internal dependency
import { fetchData } from "../../utilities/apputils";

// declaration of product detail component
const ProductDetail = () => {
  //   extracting query params
  const { id } = useParams();
  const navigate = useNavigate();

  //intializing the component state
  const [cartQuantity, setCartQuantity] = useState(1);
  const [product, setProduct] = useState([]);

  // helper function to capitalize the first capitalizeFirstLetter,for better presentation
  const capitalizeFirstLetter = (text = "abc") => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  //   other helper function

  // getting the role value 
  const role = JSON.parse(localStorage.getItem("user")).role;

  const admin = role ? false : true;
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
    if (productData.quantity <= 0) {
      alert("This product is out of stock and cannot be added to the cart.");
      return;
    }
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

  const handleDelete = async (productID) => {
    if (window.confirm('Are you sure you want to delete this product')) {
      try {
        await fetchData("delete", `product/deleteProducts/${productID}`);
        navigate("/Dashboard");
        alert("product is deleted successfully");

      } catch (error) {
        console.error('error deleting product :', error);
      }
    }
  }

  const handleAddToStore = (productData) => {

  }

  const handleRemoveFromCart = (productData) => {
    // Remove the selected product from the list of selected products

    // Get the cart from localStorage or create an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existsCartProduct = cart.filter(item => item.product._id !== productData._id);
    const selectedProduct = cart.filter(item => item.product._id === productData._id);

    if (selectedProduct.length > 0) {
      const originalQuantity = selectedProduct[0].quantity
      let newQuantity = 0
      if (originalQuantity > cartQuantity) {
        newQuantity = originalQuantity - cartQuantity
        existsCartProduct.push({product: productData, quantity: newQuantity})
        localStorage.setItem('cart', JSON.stringify(existsCartProduct));
      } else {
        localStorage.setItem('cart', JSON.stringify(existsCartProduct));
      }
    } else {
      // user is trying to remove from cart an item which is not in the cart
      // TODO: notify that this item is no in the cart
      // disable the remove from cart button, if this item is not in the cart
      // do nothing, becuase, this item cannot be removed from the cart

    }
    navigate("/checkout");

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
            {admin ? (<button onClick={() => handleAddToCart(product)} className="add">
              Add to Cart
            </button>) : (<button onClick={() => handleAddToStore(product)} className="add">
              Add to Store
            </button>)}
            <span> </span>
            {admin ? (<button onClick={() => handleRemoveFromCart(product)} className="add">
              Remove from Cart
            </button>) : (<button onClick={() => handleDelete(product._id)} className="add">
              Delete from store
            </button>)}
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
