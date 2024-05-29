import React, { useState, useEffect } from "react";
import { fetchData } from "../../utilities/apputils";
import Sidebar from "./Sidebar";

// Define the Reports component
const Reports = () => {

  // Initialize the state variable 'products' as an empty array using useState
  const [products, setProducts] = useState([]);

  useEffect(() => {

    // Define an asynchronous function to fetch products data
    const fetchProducts = async () => {
      try {
        const response = await fetchData('get', 'product/getAllProducts');

        // Update the 'products' state with the fetched data
        setProducts(response.data.products);
        } catch (error) {
        console.error('Error fetching products:', error);

        // Set 'products' state to an empty array in case of an error
        setProducts([]);
      }
    };

    // Call the fetchProducts function when the component mounts
    fetchProducts();
  }, []);

  // Return the JSX to render the component
  return (

    <div className="dash-container">
      <Sidebar />
      <div className="report-page" >
        <h1>Product Report</h1>

         {/* Table to display product data*/}
        <table border="4">
          <thead>
            <tr>
              <th >Item Name</th>
              <th>Availability</th>
              <th>Quantity Left</th>
            </tr>
          </thead>
          <tbody>

            {/*Map over 'products' array to generate table rows*/}
            {products.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  {item.quantity > 0 ? '✔️' : '❌'} {/* Table cell for availability, showing a checkmark if quantity > 0, otherwise a cross */}
                </td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

// Export the Reports component as the default export
export default Reports;
