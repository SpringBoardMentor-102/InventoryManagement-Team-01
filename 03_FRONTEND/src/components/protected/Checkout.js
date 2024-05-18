
import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";



const Checkout = () => {
  const [items, setItems] = useState([]); // Use an empty array initially
  const navigate = useNavigate();// for navigation
  useEffect(() => {
    const fetchCartItems = () => {
      // get the cart from localStorage or create an empty array
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log(cart);
      setItems(cart);
    };
    fetchCartItems();
  }, []);
      
  const handleImageClick = (productData) => {
    navigate(`/product/${productData}`);
  };

  return (
    <>
      <div style={{ marginBottom: "13px" }}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <Link to="/Dashboard">Back to Dashboard </Link>
      </div>
      <div className="checkout-container">
        <div className="items-container">
          <div className="checkout-heading">
            Shopping Cart <FontAwesomeIcon icon={faShoppingCart} />
          </div>
          <hr className="horizontal-line"></hr>
          <div className="row-header">
            <div className="cell-product">Product</div>
            <div className="cell-name">Name</div>
            <div className="cell-price">Price</div>
            <div className="cell-quantity">Quantity</div>
          </div>

          {items.length === 0 ? (
            <p>Your cart is currently empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.product._id} className="check-name">
                <img className="img-checkout" src={item.product.imageUrl} alt={item.product.name}
                onClick={() => handleImageClick(item.product._id)}
                style={{ cursor: 'pointer' }} />
                <div className="item-details">
                  <p className="checkout-name">{item.product.name}</p>
                  <p className="checkout-price">${item.product.price}</p>
                  <p className="checkout-quantity">{item.quantity}</p>
                </div>
              </div>
            ))
          )}
          <div className="cancel">
            <Link to="/Dashboard">
              <button className="cancel-btn">Back to Dashboard</button>
            </Link>
            <div>
              <button className="checkout-btn">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

