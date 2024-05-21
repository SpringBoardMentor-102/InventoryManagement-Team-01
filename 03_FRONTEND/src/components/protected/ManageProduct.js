import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { fetchData } from '../../utilities/apputils';
import AdminSidebar from './AdminSidebar';

const ManageProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [productImage, setProductImage] = useState(null);

  const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append('name', data.name);
//     formData.append('description', data.description);
//     formData.append('price', data.price);
//     formData.append('quantity', data.quantity);
//     formData.append('status', data.status);
//     formData.append('category_id', data.categoryId);
//     formData.append('imageUrl', data.imageUrl);
// console.log(formData,  "formadata");
// console.log("---------------",data, typeof data);


try {
    const response = await fetchData("post", `product/createProduct`,{name:data.name,description:data.description,price:data.price,
        quantity:data.quantity,status:data.status,categoryId:data.categoryId,imageUrl:data.imageUrl
     }); 
    console.log("on new product form",response);
}catch(error){
        
      console.error('There was an error adding the product!', error);
    };
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  return (
    <div className="dash-container">
        <AdminSidebar/>
    <div style={{margin:"50px"}}>

      <h2>Manage Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{margin:"4px"}}>
          <label>Name:</label>
          <input style={{width: "64vw"}} type="text" {...register('name')} required />
        </div>
        <div  style={{margin:"4px"}}>
          <label>Description:</label>
          <textarea style={{width: "65vw", height: "10vh",
    marginBottom: "10px"}} {...register('description')} required></textarea>
        </div > 
        <div style={{display:"flex"}}>
        <div style={{margin:"4px"}}>
          <label>Price:</label>
          <input style={{height:"20px"}} type="number" {...register('price')} required />
        </div>
        <div style={{margin:"4px"}}>
          <label>Quantity:</label>
          <input style={{height:"20px"}} type="number" {...register('quantity')} required />
        </div>
        </div>
        <div style={{margin:"4px"}}>
          <label>Status:</label>
          <input style={{width: "64vw"}} type="text" {...register('status')} required />
        </div>
        <div style={{margin:"4px"}}>
          <label>Category ID:</label>
          <input style={{width: "64vw"}}  type="text" {...register('categoryId')} required />
        </div>
        <div style={{margin:"4px"}}>
        <label>Product Image:</label>
          <input style={{width: "64vw"}} type="text" {...register('imageUrl')} required />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>

    </div>
  );
};

export default ManageProduct;
