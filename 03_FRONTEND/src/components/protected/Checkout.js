import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "../../utilities/apputils";

const Checkout = () => {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const fetchCartItems = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setItems(cart);
      calculateTotal(cart);
    };
    fetchCartItems();
  }, []);

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotalAmount(total);
  };
  
  const handleCheckout =async () => {
    if (items.length === 0) {
      alert("Your Cart is empty. Please add products!!! ");
      return;
    }
    const userId = JSON.parse(localStorage.getItem("user")).id;

    console.log(userId)
    const cart= localStorage.getItem("cart")
    console.log(cart);
    const confirmation = window.confirm("Are you sure you want to checkout?");
    if (confirmation) {
      // Navigate to the order summary page with the selected products
      try {
        await fetchData("post", "checkout/addcheckout",{
          user_id: userId,
          cart: cart 
        })
        navigate('/order-summary', { state: { selectedProducts: items } });
      } catch (error) {
        console.log(error);
      }

    // Clear cart data after successful checkout (or handle errors gracefully)
    try {
      localStorage.removeItem("cart");
      setItems([]); // Update state for immediate UI reflection
    } catch (error) {
      console.error("Error clearing cart:", error);
      // Implement error handling (e.g., display an error message)
    }
  }
  };

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
                <img className="img-checkout" src={item.product.imageUrl} alt={item.product.name} />
                <div className="checkout-name">{item.product.name}</div>
                <div className="checkout-price">${item.product.price}</div>
                <div className="checkout-quantity">{item.quantity}</div>
              </div>
            ))
          )}
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
