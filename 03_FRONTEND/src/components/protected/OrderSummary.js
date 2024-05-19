import React from "react";
import { useLocation } from "react-router-dom";

const OrderSummary = () => {
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts || [];

  console.log("Selected products are :", selectedProducts);
  // Calculate total quantity and total price
  const totalQuantity = selectedProducts?.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = selectedProducts?.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="items">
        { selectedProducts?.map((item, index) => (
          <div key={index} className="item">
            <img src={item.imageUrl} alt={item.name} className="product-image" />
            <div className="product-details">
              <p className="product-name">{item.product.name}</p>
              <p className="product-price">Price: ₹{item.product.price}</p>
              <p className="product-quantity">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
