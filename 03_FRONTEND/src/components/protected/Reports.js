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

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const userId = localStorage.getItem("userId");
      async function fetchReports() {
          try {
              const response = await fetchData("get", `report/getReport/${userId}`);
              console.log(response);
              if (response.data.report) {
                  // Sort reports by date in descending order
                  const sortedReports = response.data.report.sort((a, b) => new Date(b.date) - new Date(a.date));
                  setReports(sortedReports);
                  setLoading(false);
              } else {
                  setError("No reports found.");
                  setLoading(false);
              }
          } catch (error) {
              setError(error.message);
              setLoading(false);
          }
      }

      if (userId) {
          fetchReports();
      } else {
          setLoading(false);
      }
  }, []);

  if (loading) {
      return <div className="report-loading">Loading...</div>;
  }
  if (error) {
      return <div className="report-error">Error: {error}</div>;
  }
  return (

    <div className="dash-container"  style={{ padding: '20px', border: '1px solid black' }}>
    <div className="dash-container">
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
      <div className="report-body">
                <div className="report-container">
                    <h2 className="report-header">Report Page</h2>
                    {reports.length === 0 ? (
                        <p className="no-reports">No reports found.</p>
                    ) : (
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Report ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map(report => (
                                    <tr key={report._id}>
                                        <td>{report._id}</td>
                                        <td>{report.title}</td>
                                        <td>{report.description}</td>
                                        <td>{new Date(report.date).toLocaleDateString()}</td>
                                        <td>{new Date(report.date).toLocaleTimeString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
    </div>
    </div>
    </div>
  );
                                }
};

export default Reports;
