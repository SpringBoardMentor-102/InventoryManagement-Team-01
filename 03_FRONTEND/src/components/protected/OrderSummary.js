import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../index.css";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProducts = location.state?.selectedProducts || [];

  const totalQuantity = selectedProducts.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = selectedProducts.reduce((total, item) => {
    const price = item.product.price || 0; // Ensure price is defined, defaulting to 0 if not
    return total + (price * item.quantity);
  }, 0);
  const gst = totalPrice * 0.18;
  const handlingCharge = 5;
  const deliveryCharge = 0;
  const finalAmount = totalPrice + gst + handlingCharge + deliveryCharge;

  const handlePlaceOrder = () => {
    // Here, you can navigate to any blank page or route
    navigate("/blank-page");
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <p>Billing Address: [User's Address]</p>
      <p>Date: {new Date().toLocaleDateString()}</p>
      <div className="items">
        {selectedProducts.map((item, index) => (
          <div key={index} className="item">
            <img src={item.product.imageUrl} alt={item.product.name} className="product-image" />
            <div className="product-details">
              <p className="product-name">{item.product.name}</p>
              <p className="product-price">Price: ₹{item.product.price ? item.product.price.toFixed(2) : 'N/A'}</p>
              <p className="product-quantity">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
        <p>GST (18%): ₹{gst.toFixed(2)}</p>
        <p>Handling Charge: ₹{handlingCharge.toFixed(2)}</p>
        <p>Delivery Charge: <span className="free">FREE</span></p>
        <p>Final Amount: ₹{finalAmount.toFixed(2)}</p>
      </div>
      <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
      <p className="invoice-note">
        As per Section 31 of CGST Act read with Rules, invoice is issued at the point of delivering the goods.
      </p>
    </div>
  );
};

export default OrderSummary;
