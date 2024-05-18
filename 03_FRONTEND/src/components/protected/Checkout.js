import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Checkout = () => {
  const [items, setItems] = useState([]); // Use an empty array initially
  const navigate = useNavigate(); // for navigation

  useEffect(() => {
    const fetchCartItems = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setItems(cart);
    };
    fetchCartItems();
  }, []);

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

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
                <img
                  className="img-checkout"
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  onClick={() => handleImageClick(item.product._id)}
                />
                <p className="checkout-name">{item.product.name}</p>
                <p className="checkout-price">${item.product.price}</p>
                <p className="checkout-quantity">{item.quantity}</p>
              </div>
            ))
          )}
        </div>
        <div className="total-container">
          <h2>Total</h2>
          {/* Add your total calculation and display here */}
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
