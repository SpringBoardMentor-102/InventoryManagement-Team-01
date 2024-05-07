import axios from "axios";
import React, { useState, useEffect } from "react";
import fetchData from "../utilities/validators/apputils";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const token = sessionStorage.getItem("token");
    // console.log(token);
    // const apiUrl = "http://localhost:5000/api/product/getAllProducts";
    const fetchDatas = async () => {
      try {
        // const response = await axios.get(apiUrl, {
        //   headers: {
        //     token: token,
        //   },
        // });
        const response = await fetchData("product/getAllProducts");
        console.log(response);
        if (response !== null) {
          setProducts(response.data.products);
          setLoading(false);
        } else {
          setError("UnAuthorized");
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchDatas();
  }, []);
  if (loading) {
    return <div> loading...</div>;
  }
  if (error) {
    return <div>Error :{error}</div>;
  }

  return (
    <div className="product-container">
      {products.map((item) => (
        <div className="item-container" key={item._id}>
          <img
            className="item-image"
            src={item.imageUrl}
            alt="displayed item"
          />
          {/* <div className="rating">
        {item.rating.stars} ⭐ | {item.rating.count}
      </div> */}
          <div className="company-name">{item.name}</div>
          <div className="item-name">{item.description}</div>
          <div className="price">
            <span className="current-price">Rs {item.price}</span>
            {/* <span className="original-price">Rs {item.original_price}</span>
        <span className="discount">({item.discount_percentage}% OFF)</span> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
