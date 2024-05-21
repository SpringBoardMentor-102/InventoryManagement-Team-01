import React, { useState } from "react";
// import { useForm } from 'react-hook-form';
import axios from "axios";
import { fetchData } from "../../utilities/apputils";
import AdminSidebar from "./AdminSidebar";
import {
  validateCategoryId,
  validateDescription,
  validateImageUrl,
  validateName,
  validatePrice,
  validateQuantity,
  validateStatus,
} from "../../utilities/validators";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const ManageProduct = () => {
  // const { register, handleSubmit, reset } = useForm();
  const [productName, setProductName] = useState("");
  const [ProductNameError, setProductNameError] = useState("");
  // const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [productDescriptionError, setProductDescriptionError] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPriceError, setProductPriceError] = useState("");

  const [productQuantity, setProductQuantity] = useState("");
  const [productQuantityError, setProductQuantityError] = useState("");

  const [productCategory, setProductCategory] = useState("");
  const [productCategoryError, setProductCategoryError] = useState("");

  const [prodcutStatus, setProdcutStatus] = useState("");
  const [prodcutStatusError, setProdcutStatusError] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImageError, setProductImageError] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  /** This is a helper function to clear all the errors on the UI screen
   */
  const clearErrors = () => {
    setProductNameError("");
    setProductDescriptionError("");
    setProductPriceError("");
    setProductQuantityError("");
    setProductCategoryError("");
    setProdcutStatusError("");
    setProductImageError("");
    setErrorMessage("");
  };

  /** Helper function to validate the input sent by the user
   *
   * @returns {Boolean} true if validation is success, false otherwise
   */
  const validateForm = () => {
    let isValid = true;

    // Clear previous error messages
    clearErrors();

    let result = null;

    // validating the  name
    result = validateName(productName);
    if (result !== null) {
      isValid = false;
      setProductNameError(result.message);
    }

    // validating the description
    result = validateDescription(productDescription);
    if (result !== null) {
      isValid = false;
      setProductDescriptionError(result.message);
    }

    // validating the price
    result = validatePrice(productPrice);
    if (result !== null) {
      isValid = false;
      setProductPriceError(result.message);
    }

    // validating quantity
    result = validateQuantity(productQuantity);
    if (result !== null) {
      isValid = false;
      setProductQuantityError(result.message);
    }

    // validating the  category id
    result = validateCategoryId(productCategory);
    if (result !== null) {
      isValid = false;
      setProductCategoryError(result.message);
    }

    return isValid;
  };

  /** Event handler for doing the user submit click
   * @param {*} event
   */
  const createProduct = async (event) => {
    // do not propagate the event
    event.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      console.log("form validation fails.");
      return;
    }

    console.log("making a call..");
    // validation was successful, attempting to make a call to the backend

    try {
      const response = await fetchData("post", `product/createProduct`, {
        name: productName,
        description: productDescription,
        price: productPrice,
        quantity: productQuantity,
        categoryId: productCategory,
        imageUrl: productImage,
        status: prodcutStatus,
      });
      console.log(response);
      alert("Product added Succesfully");
    } catch (error) {
      let response = error.response;
      console.log(response?.status);
      if (response) {
        if (response?.status === 422) {
          // 422 when validation failure happens,
          console.error("Validation failure: ", response.data.errors);
          setErrorMessage("Validation failure: ", response.data.errors);
        } else if (response?.status === 403) {
          // 403 when product alreday exist
          console.error("Product already exists", response.data.errors);
          setErrorMessage("Product  already exists", response.data.errors);
        } else if (response?.status === 400) {
          // 404 when a generic error message happened
          console.error("Error", response.data.errors);
          setErrorMessage("Errors", response.data.errors);
        } else if (response?.status === 500) {
          // 500 when unknown error occurs
          console.error("Internal Server Error", response.data.errors);
          setErrorMessage("Internal Server Error", response.data.errors);
        } else {
          // UNKOWN CASE
          console.error("CRAZY STUFF", response.data.errors);
          setErrorMessage("CRAZY STUFF", response.data.errors);
        }
      } else {
        console.log("Backend not working");
        setErrorMessage("Internal Server Error");
      }
    }

    // await axios
    //   .post(`${BACKEND_URL}/product/createProduct`, {
    //     name: productName,
    //     description: productDescription,
    //     price: productPrice,
    //     quantity: productQuantity,
    //     categoryId: productCategory,
    //     imageUrl: productImage,
    //     status: prodcutStatus,
    //   })
    //   .then((response) => {
    //     // registration successfuly
    //     console.log(response);
    //     alert("Product added Succesfully");
    //     //navigate("/dashboard");
    //   })
    //   .catch((error) => {
    //     let response = error.response;
    //     console.log(response?.status);
    //     if (response) {
    //       if (response?.status === 422) {
    //         // 422 when validation failure happens,
    //         console.error("Validation failure: ", response.data.error);
    //         setErrorMessage("Validation failure: ", response.data.error);
    //       } else if (response?.status === 404) {
    //         // 404 when product alreday exist
    //         console.error("Product already exists", response.data.errors);
    //         setErrorMessage("Product  already exists", response.data.errors);
    //       } else if (response?.status === 404) {
    //         // 404 when a generic error message happened
    //         console.error("Error", response.data.errors);
    //         setErrorMessage("Errors", response.data.errors);
    //       } else if (response?.status === 500) {
    //         // 500 when unknown error occurs
    //         console.error("Internal Server Error", response.data.errors);
    //         setErrorMessage("Internal Server Error", response.data.errors);
    //       } else {
    //         // UNKOWN CASE
    //         console.error("CRAZY STUFF", response.data.errors);
    //         setErrorMessage("CRAZY STUFF", response.data.errors);
    //       }
    //     } else {
    //       console.log("Backend not working");
    //       setErrorMessage("Internal Server Error");
    //     }
    //   });
  };

  // const onSubmit = async (data) => {
  //   //     const formData = new FormData();
  //   //     formData.append('name', data.name);
  //   //     formData.append('description', data.description);
  //   //     formData.append('price', data.price);
  //   //     formData.append('quantity', data.quantity);
  //   //     formData.append('status', data.status);
  //   //     formData.append('category_id', data.categoryId);
  //   //     formData.append('imageUrl', data.imageUrl);
  //   // console.log(formData,  "formadata");
  //   // console.log("---------------",data, typeof data);

  //   try {
  //     const response = await fetchData("post", `product/createProduct`, {
  //       name: data.name,
  //       description: data.description,
  //       price: data.price,
  //       quantity: data.quantity,
  //       status: data.status,
  //       categoryId: data.categoryId,
  //       imageUrl: data.imageUrl,
  //     });
  //     console.log("on new product form", response);
  //   } catch (error) {
  //     console.error("There was an error adding the product!", error);
  //   }
  // };

  // const handleImageChange = (e) => {
  //   setProductImage(e.target.files[0]);
  // };

  return (
    <>
      {/* <AdminSidebar /> */}
      <div className="dash-container">
        <div style={{ margin: "50px" }}>
          <h2>Manage Product</h2>
          <div id="errorMessage" className="error_sign_up">
            {errorMessage}
          </div>
          <form onSubmit={createProduct}>
            <div style={{ margin: "4px" }}>
              <label>Name:</label>
              <input
                style={{ width: "64vw" }}
                type="text"
                // {...register("name")}
                value={productName}
                placeholder="Product Name"
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div id="ProductNameError" className="error_sign_up">
              {ProductNameError}
            </div>
            <div style={{ margin: "4px" }}>
              <label>Description:</label>
              <textarea
                style={{ width: "65vw", height: "10vh", marginBottom: "10px" }}
                // {...register("description")}
                value={productDescription}
                placeholder="Product Description"
                onChange={(e) => setProductDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div id="productDescriptionError" className="error_sign_up">
              {productDescriptionError}
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ margin: "4px" }}>
                <label>Price:</label>
                <input
                  style={{ height: "20px" }}
                  type="number"
                  // {...register("price")}
                  value={productPrice}
                  placeholder="Product Price"
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                />
              </div>
              <div id="productPriceError" className="error_sign_up">
                {productPriceError}
              </div>
              <div style={{ margin: "4px" }}>
                <label>Quantity:</label>
                <input
                  style={{ height: "20px" }}
                  type="number"
                  // {...register("quantity")}
                  value={productQuantity}
                  placeholder="Product Quantity"
                  onChange={(e) => setProductQuantity(e.target.value)}
                  required
                />
              </div>
            </div>
            <div id="productQuantityError" className="error_sign_up">
              {productQuantityError}
            </div>
            <div style={{ margin: "4px" }}>
              <label>Status:</label>
              <select
                style={{ width: "64vw" }}
                // {...register("status")}
                onChange={(e) => setProdcutStatus(e.target.value)}
              >
                <option value="available">Available</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
            <div id="prodcutStatusError" className="error_sign_up">
              {prodcutStatusError}
            </div>
            <div style={{ margin: "4px" }}>
              <label>Category ID:</label>
              <input
                style={{ width: "64vw" }}
                type="text"
                // {...register("categoryId")}
                value={productCategory}
                placeholder="Product Category"
                onChange={(e) => setProductCategory(e.target.value)}
                required
              />
            </div>
            <div id="productCategoryError" className="error_sign_up">
              {productCategoryError}
            </div>
            <div style={{ margin: "4px" }}>
              <label>Product Image:</label>
              <input
                style={{ width: "64vw" }}
                type="text"
                // {...register("imageUrl")}
                value={productImage}
                placeholder="Product Image URL"
                onChange={(e) => setProductImage(e.target.value)}
                required
              />
            </div>
            <div id="productImageError" className="error_sign_up">
              {productImageError}
            </div>
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageProduct;
