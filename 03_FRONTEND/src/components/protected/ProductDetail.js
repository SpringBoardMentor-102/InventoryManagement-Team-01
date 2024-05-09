import React, { useEffect,useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
  const {id} =  useParams();
  console.log(id);
  const [product,setProduct]=useState([]);
    const token =sessionStorage.getItem("token");
    useEffect(()=>{
axios.get(`http://localhost:5000/api/product/GetProducts/${id}`,{
    headers:{
        authorization: `Bearer ${token}`,
    }
})

.then(response=>{ 
    setProduct(response.data);
})
.catch(error=>{
    console.error('error',error);
});
},[id]);
if(!product) return <div>loading...</div>
  return (
<>
    <div id="product-container">
    <div className='back'><FontAwesomeIcon icon={faArrowLeft}/><Link to="/Dashboard">Back to Dashboard </Link></div>
  <div className="product-images">
    <img src={product.imageUrl}/>
  </div>
  
    <div className="product">
    <p className='product-name'>{product.name}</p>
    <h3>Price : ₹ {product.price}</h3>
    <h3>Quantity : {product.quantity}</h3>
    <h2>DESCRIPTION</h2>
    <p className="desc">{product.description}</p>
    <div className="buttons">
      <button className="add">Add to Cart</button>
    </div>
  </div>
</div></>
  )
}

export default ProductDetail