import React, { useState, useEffect } from "react";
import { fetchData } from "../../utilities/apputils";
import ProductList from "./ProductList";
import Sidebar from "./Sidebar";

const Reports = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchData();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="dash-container">
    <div >
      <Sidebar />
    </div>
    <div className="report-page">
      <h1>Product Report</h1>
      
    </div>
    </div>
  );
};

export default Reports;
