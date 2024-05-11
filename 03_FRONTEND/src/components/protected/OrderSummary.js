import React from "react";

const OrderSummary = ({ selectedProducts }) => {

  console.log("print the data ====================",selectedProducts );
  // Calculate total quantity and total price
  const totalQuantity = selectedProducts?.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = selectedProducts?.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="items">
        { selectedProducts?.map((item, index) => (
          <div key={index} className="item">
            <img src={item.imageUrl} alt={item.name} className="product-image" />
            <div className="product-details">
              <p className="product-name">{item.name}</p>
              <p className="product-price">Price: ₹{item.price}</p>
              <p className="product-quantity">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Price: ₹{totalPrice}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
