import React, { useState, useEffect } from "react";
import { fetchData } from "../../utilities/apputils";
import Sidebar from "./Sidebar";

const Reports = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchData('get', 'product/getAllProducts');
        setProducts(response.data.products);
        } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  /*function Reports() {
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
    }*/
  return (

    <div className="dash-container">
      {/*<div className="dash-container">*/}

      <Sidebar />

      <div className="report-page" >
        <h1>Product Report</h1>
        <table border="4">
          <thead>
            <tr>
              <th >Item Name</th>
              <th>Availability</th>
              <th>Quantity Left</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  {item.quantity > 0 ? '✔️' : '❌'}
                </td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*<div className="report-body">
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
                  </div>*/}
      </div>
    </div>

  );
};


export default Reports;
