

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Checkout = () => {
  // replace it with actual product 
  const [items, setItems] = useState([
    { id: 1, name: 'Product 1', image: 'product1.jpg', quantity: 1, price: 10 },
    { id: 2, name: 'Product 2', image: 'product2.jpg', quantity: 3, price: 15 },
    { id: 2, name: 'Product 3', image: 'product2.jpg', quantity: 2, price: 15 },
    { id: 2, name: 'Product 4', image: 'product2.jpg', quantity: 1, price: 15 },

  ]);




  return (<>
    <div style={{ marginBottom: "13px" }}>
      <FontAwesomeIcon icon={faArrowLeft} />
      <Link to="/Dashboard">Back to Dashboard </Link>
    </div>
    <div className="checkout-container">

      <div className="items-container">
        <div className='checkout-heading'>Shopping Cart <FontAwesomeIcon icon={faShoppingCart} /></div>
        <hr className='horizontal-line'></hr>
        <div className='row-header'>
          <div className='cell-product'>Product</div>
          <div className='cell-name'>Name</div>
          <div className='cell-price'>Price</div>
          <div className='cell-quantity'>Quantity</div>
        </div>

        {items.map(item => (
          <div key={item.id} className="check-name">
            <img className='img-checkout' src={item.image} alt={item.name} />
            <div className="item-details">
              <p className='checkout-name'>{item.name}</p>
              <p className='checkout-price'>${item.price}</p>
              <p className='checkout-quantity'>{item.quantity}</p>
            </div>
          </div>
        ))}
        <div className='cancel'>
          <Link to="/Dashboard"><button className='cancel-btn'>Back to Dashboard</button> </Link>
        </div>
      </div>
    </div>
  </>
  );
};

export default Checkout;



























// import React, { useState } from "react";
// // import OrderSummary from "./OrderSummary";
// // import { useLocation } from "react-router-dom";

// const Checkout = ({ selectedProducts }) => {

//   const { state } = useLocation();
//   const { products } = state; // Read values passed on state
//   const [quantity, setQuantity] = useState(1);

//   const handleDecreaseQuantity = () => {
//     // Decrease the quantity by 1 but ensure it does not go below 1
//     setQuantity(prev => Math.max(prev - 1, 1));
//   };

//   const handleIncreaseQuantity = () => {
//     // Increase the quantity by 1
//     setQuantity(prev => prev + 1);
//   };

//   return (
//     <div className="checkout-container">
//       <OrderSummary selectedProducts={products} />
//       <div className="change-button">
//         <button onClick={handleDecreaseQuantity} className="minus">
//           -
//         </button>
//         <button className="value">{quantity}</button>
//         <button onClick={handleIncreaseQuantity} className="plus">
//           +
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
