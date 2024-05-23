import React, { useState, useEffect } from 'react';
import { fetchData } from "../../utilities/apputils";
import "../../index.css";
import Sidebar from "./Sidebar";

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        async function fetchTransactions() {
            try {
                const response = await fetchData("get", `transaction/getTransaction/${userId}`);
                if (response.data.transaction) {
                    // Sort transactions by date in descending order
                    const sortedTransactions = response.data.transaction.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setTransactions(sortedTransactions);
                    setLoading(false);
                } else {
                    setError("No transactions found.");
                    setLoading(false);
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        if (userId) {
            fetchTransactions();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div className="history-loading">Loading...</div>;
    }
    if (error) {
        return <div className="history-error">Error: {error}</div>;
    }

    return (
        <>
            <div className="history-body">
                <Sidebar/>
                <div className="history-container">
                    <h2 className="history-header">Transaction History</h2>
                    {transactions.length === 0 ? (
                        <p className="no-transactions">No transactions found.</p>
                    ) : (
                        <table className="transaction-table">
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction => (
                                    <tr key={transaction._id}>
                                        <td>{transaction._id}</td>
                                        <td>{transaction.category}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                        <td>{new Date(transaction.date).toLocaleTimeString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

        </>
    );
}

export default TransactionHistory;