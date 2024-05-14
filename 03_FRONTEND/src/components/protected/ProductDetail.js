import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import OrderSummary from "./OrderSummary";
import { fetchData } from "../../utilities/apputils";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const token = localStorage.getItem("token");

  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState(1);

  const capitalizeFirstLetter = (text = "abc") => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const setDecrease = () => {
    value > 1 ? setValue(value - 1) : setValue(1);
  };
  const setIncrease = () => {
    value < product.quantity ? setValue(value + 1) : setValue(product.quantity);
  };

  const addToCart = () => {
    value < product.quantity ? setValue(value + 1) : setValue(product.quantity);
  };
  const fetchProduct = async () => {
    try {
      const response = await fetchData("get", `product/GetProducts/${id}`);
      console.log(response);
      if (response !== null) {
        setProduct(response.data);
      } else {
        console.error("error", "UnAuthorized");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = (productData) => {
    // Add the selected product to the list of selected products
    console.log("Added to cart: ", productData);
    navigate("/checkout", { state: { products: [productData] } });
  };

  const handleRemoveFromCart = () => {
    // Remove the selected product from the list of selected products
    console.log("Removed from cart:", product);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <div id="product-container">
        <div className="back">
          <FontAwesomeIcon icon={faArrowLeft} />
          <Link to="/Dashboard">Back to Dashboard</Link>
        </div>
        <div className="product-images">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="product">
          <p className="product-name">{product.name}</p>
          <h3>Category: {capitalizeFirstLetter(product.category)}</h3>
          <h3>Price : ₹ {product.price}</h3>
          <h3>Quantity : {product.quantity}</h3>
          <h2>DESCRIPTION</h2>
          <p className="desc">{product.description}</p>
          <div className="buttons">
            <button onClick={() => handleAddToCart(product)} className="add">
              Add to Cart
            </button>
            <button onClick={handleRemoveFromCart} className="remove">
              Remove from Cart
            </button>
          </div>
          <div className="change-button">
            <button
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              className="minus"
            >
              -
            </button>
            <button className="value">{quantity}</button>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="plus"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
