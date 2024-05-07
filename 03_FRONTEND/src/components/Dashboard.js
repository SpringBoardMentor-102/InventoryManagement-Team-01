import ProductList from "./ProductList";
import Sidebar from "./Sidebar";
import Search from "./Search";
import React, { useEffect, useState } from "react";
import fetchData from "../utilities/validators/apputils";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchData("product/getAllProducts");
        setProducts(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="dash-container">
      <Sidebar />
      <main>
        <Search />
        <div>{/* <ProductList /> */}</div>
      </main>
    </div>
  );
};

export default Dashboard;
