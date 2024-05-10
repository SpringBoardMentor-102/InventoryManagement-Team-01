import React, { useState, useEffect } from 'react';
import { fetchData } from "../../utilities/apputils";


function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [userId, setUserId] = useState('6632693cb22fe2179329a4ba');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        async function fetchTransactions() {
            //         try {

            //             const response = await fetch(`${BACKEND_URL}/getTransaction/?userId=${userId}`);
            //             console.log(response);
            //             if (!response.ok) {
            //                 throw new Error('Failed to fetch transactions');
            //             }
            //             const data = await response.json();
            //             setTransactions(data.transactions);
            //         } catch (error) {
            //             console.error('Error fetching transactions:', error);
            //         }
            //     }


            //     fetchTransactions();
            // }, [userId]);

            //Other method to fetch data 
            try {
                const response = await fetchData('/transaction/getTransaction/?userId=${userId}');
                console.log(response);
                // if (response !== null) {
                    setTransactions(response.data.transaction);
                    setLoading(false);
                // } else {
                //     setError("UnAuthorized");
                //     setLoading(false);
                // }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchTransactions();
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
