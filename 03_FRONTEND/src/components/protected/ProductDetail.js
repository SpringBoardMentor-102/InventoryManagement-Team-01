import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "../../utilities/apputils";

const ProductDetail = () => {
  const { id } = useParams();
  console.log(id);

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
  const token = sessionStorage.getItem("token");
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
  if (!product) return <div>loading...</div>;
  return (
    <>
      {/* <Sidebar/> */}
      <div id="product-container">
        <div className="back">
          <FontAwesomeIcon icon={faArrowLeft} />
          <Link to="/Dashboard">Back to Dashboard </Link>
        </div>
        <div className="product-images">
          <img src={product.imageUrl} />
        </div>

        <div className="product">
          <p className="product-name">{product.name}</p>
          <h3>Category: {capitalizeFirstLetter(product.category)}</h3>
          <h3>Price : ₹ {product.price}</h3>
          <h3>Quantity : {product.quantity}</h3>
          <h2>DESCRIPTION</h2>
          <p className="desc">{product.description}</p>
          <div className="buttons">
            <Link>
              <button onClick={addToCart} className="add">
                Add to Cart
              </button>
            </Link>
          </div>
          <div className="change-button">
            <button onClick={setDecrease} className="minus">
              -
            </button>
            <button className="value">{value}</button>
            <button onClick={setIncrease} className="plus">
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
