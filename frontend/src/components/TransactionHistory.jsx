import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransactionHistory({ userId, onClose }) {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem('token');

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/banker/accounts/${userId}/transactions`, {
        headers: { Authorization: token },
      });
      setTransactions(res.data.transactions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [userId]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-3/4 max-h-screen overflow-auto">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>
        <button onClick={onClose} className="mb-4 bg-red-500 text-white p-2 rounded">
          Close
        </button>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Type</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="border px-4 py-2">{t.type}</td>
                <td className="border px-4 py-2">{t.amount}</td>
                <td className="border px-4 py-2">{new Date(t.transaction_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionHistory;
