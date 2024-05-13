

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
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
<div style={{marginBottom:"13px"}}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <Link to="/Dashboard">Back to Dashboard </Link>
        </div>
    <div className="checkout-container">
  
      <div className="items-container">
      <div className='checkout-heading'>Shopping Cart <FontAwesomeIcon icon={faShoppingCart}/></div>
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
           <FontAwesomeIcon icon={faTrash}/>
          </div>
        ))}
<div className='cancel'>
<button className='back-btn'>Back</button>
        <button className='cancel-btn'>Cancel order</button>
</div>
       
      </div>
      <div className='right-container'>

      <div className="total-container">
        <h2 className='order-heading'>Order Summery</h2>
        <p>Discount : </p>
        <p>Delivery : </p>
        <p>Tax : </p>
        <p>Total : </p>
      </div>
        <div className='payment'>
        <h2 className='order-heading'>Payment Method</h2>
        <div className='payment-img'>
          <img className='pi' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7wEa5uopKH5xGOx_oQ7C8v_VZ5Gx2cVoPHlEMX1ifDxSQgS9xClEJNMua4TbXumt2q58&usqp=CAU' alt='payment logo'/>
          <img className='pi' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png' alt='payment logo'/>
          <img className='pi' src='https://logowik.com/content/uploads/images/857_visa.jpg' alt='payment logo'/>
          <img className='pi' src='https://logos-world.net/wp-content/uploads/2020/08/Bitcoin-Logo.png' alt='payment logo'/>
        </div>
        <button className="checkout-btn">Checkout</button>

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
