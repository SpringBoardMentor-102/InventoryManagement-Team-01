//external dependecies
import React, { useEffect, useState } from "react";
import { fetchData } from "../../utilities/apputils";
import { useNavigate } from "react-router-dom";
//internal dependecies
import {
  validateCategoryId,
  validateDescription,
  validateName,
  validatePrice,
  validateQuantity,
} from "../../utilities/validators";

const ManageProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [ProductNameError, setProductNameError] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productDescriptionError, setProductDescriptionError] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPriceError, setProductPriceError] = useState("");

  const [productQuantity, setProductQuantity] = useState("");
  const [productQuantityError, setProductQuantityError] = useState("");

  const [productCategory, setProductCategory] = useState("");
  const [productCategoryError, setProductCategoryError] = useState("");

  const [categories, setCategories] = useState([]);

  const [prodcutStatus, setProdcutStatus] = useState("available");
  const [prodcutStatusError, setProdcutStatusError] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImageError, setProductImageError] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const Fetchcategory = async () => {
    try {
      const category = await fetchData("get", "category/getallcategory");
      setCategories(category.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    Fetchcategory();
  }, []);

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
      navigate("/admindashboard");
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
  };

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
      <div className="manage-page">
        <div className="manage-container">
          <h2 className="manage-heading">MANAGE PRODUCT</h2>
          <div id="errorMessage" className="error_sign_up">
            {errorMessage}
          </div>
          <form className="form-container" onSubmit={createProduct}>
            <div className="manage-name">
              <label>Name:</label>
              <input
               className="manage-product"
                type="text"
                value={productName}
                placeholder="Product Name"
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div id="ProductNameError" className="error_sign_up">
              {ProductNameError}
            </div>
            <div>
              <label>Description:</label>
              <textarea
               className="manage-product"
                value={productDescription}
                placeholder="Product Description"
                onChange={(e) => setProductDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div id="productDescriptionError" className="error_sign_up">
              {productDescriptionError}
            </div>
            <div>
              <div>
                <label>Price:</label>
                <input
                 className="manage-product"
                  type="number"
                  min="0"
                  value={productPrice}
                  placeholder="Product Price"
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                />
              </div>
              <div id="productPriceError" className="error_sign_up">
                {productPriceError}
              </div>
              <div>
                <label>Quantity:</label>
                <input
                 className="manage-product"
                  type="number"
                  min="0"
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
            <div>
              <label>Status:</label>
              <select
              className="manage-product"
                onChange={(e) => setProdcutStatus(e.target.value)}
              >
                <option value="available"  className="manage-product">Available</option>
                <option value="out_of_stock"  className="manage-product">Out of Stock</option>
              </select>
            </div>
            <div id="prodcutStatusError" className="error_sign_up">
              {prodcutStatusError}
            </div>
            <div>
              <label>Category ID:</label>
              <select 
               className="manage-product"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div id="productCategoryError" className="error_sign_up">
              {productCategoryError}
            </div>
            <div className="manage-name">
              <label>Product Image:</label>
              <input
               className="manage-product"
                type="text"
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
