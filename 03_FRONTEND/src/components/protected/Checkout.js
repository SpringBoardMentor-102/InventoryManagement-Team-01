import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Checkout = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setItems(cart);
    };
    fetchCartItems();
  }, []);

  return (
    <>
      <Link to="/Dashboard" className="back-to-dashboard-btn">
      <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
      </Link>

      <div className="checkout-container">
        <div className="items-container">
          <div className="checkout-heading">
            <span>Shopping Cart</span> <FontAwesomeIcon icon={faShoppingCart} />
          </div>
          <hr className="horizontal-line" />
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
                <img className="img-checkout" src={item.product.imageUrl} alt={item.product.name} />
                <div className="checkout-name">{item.product.name}</div>
                <div className="checkout-price">${item.product.price}</div>
                <div className="checkout-quantity">{item.quantity}</div>
              </div>
            ))
          )}
          <button className="checkout-btn">Checkout</button>
        </div>
        <div className="total-container">
          <h2>Total</h2>
          {/* Add your total calculation and display here */}
        </div>
      </div>
    </>
  );
};

export default Checkout;
