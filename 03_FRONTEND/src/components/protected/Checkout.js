import React, { useState } from "react";
import OrderSummary from "./OrderSummary";
import { useLocation } from "react-router-dom";

const Checkout = ({ selectedProducts }) => {

  const { state } = useLocation();
  const { products } = state; // Read values passed on state
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    // Decrease the quantity by 1 but ensure it does not go below 1
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleIncreaseQuantity = () => {
    // Increase the quantity by 1
    setQuantity(prev => prev + 1);
  };

  return (
    <div className="checkout-container">
      <OrderSummary selectedProducts={products} />
      <div className="change-button">
        <button onClick={handleDecreaseQuantity} className="minus">
          -
        </button>
        <button className="value">{quantity}</button>
        <button onClick={handleIncreaseQuantity} className="plus">
          +
        </button>
      </div>
    </div>
  );
};

export default Checkout;
