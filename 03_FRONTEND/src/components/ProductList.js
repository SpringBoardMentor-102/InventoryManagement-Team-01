import axios from 'axios';
import React,{useState,useEffect} from 'react';
const ProductList = () => {
 const [products,setProducts]=useState([]);
 const[loading,setLoading]=useState(true);
 const[error,setError]=useState(null);

 useEffect(()=>{
  const apiUrl='http://localhost:5000/api/product/getAllProducts';
  const fetchData=async()=>{
    try{
      const response=await axios.get(apiUrl);
      setProducts(response.data.products);
      setLoading(false);
    }catch(error){
   setError(error.message);
   setLoading(false);
    }
  };
  fetchData();
 }, []);
 if(loading){
  return <div> loading...</div>;
 }
 if(error){
  return <div>Error :{error}</div>;
 }
 

  return (

<div className='product-container'>
{products.map(item=>(
    <div className="item-container">
      <img className="item-image" src={item.imageUrl} alt="item image" />
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
  )
}

export default ProductList
