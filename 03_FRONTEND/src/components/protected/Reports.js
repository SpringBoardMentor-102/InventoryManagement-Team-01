import React, { useState, useEffect } from "react";
import { fetchData } from "../../utilities/apputils";
import Sidebar from "./Sidebar";


const Reports = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchData('get', 'product/getAllProducts');
        // Ensure response.data.products is an array before setting it to products
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error('Error: response.data.products is not an array', response.data);
          setProducts([]); 
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); 
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="dash-container"  style={{ padding: '20px', border: '1px solid black' }}>
    <div >
      <Sidebar />
    </div>
    <div className="report-page" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <h1>Product Report</h1>
      <table border="5">
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '10px' }}>Item Name</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Availability</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Quantity Left</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '10px' }}>{item.name}</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
                {item.quantity > 0 ? '✔️' : '❌'}
              </td>
              <td style={{ border: '1px solid black', padding: '10px' }}>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
    </div>
  );
};

export default Reports;
