import React, { useState, useEffect } from 'react';
import { fetchData } from "../../utilities/apputils";

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId"); 
        async function fetchTransactions() {
            try {
                const response = await fetchData("get", `transaction/getTransaction?${userId}`); 
                console.log(response);
                if (response.data.transaction) {
                    setTransactions(response.data.transaction); 
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
        return <div> loading...</div>;
    }
    if (error) {
        return <div>Error :{error}</div>;
    }

    return (
        <div>
            <h2>Transaction History</h2>
            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <ul>
                    {transactions.map(transaction => (
                        <li key={transaction._id}>
                            {/* Display transaction details */}
                            Transaction ID: {transaction._id}, Amount: {transaction.amount}, Date: {transaction.date}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TransactionHistory;
