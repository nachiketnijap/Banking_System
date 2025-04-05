import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionPopup from './TransactionPopup';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [popupType, setPopupType] = useState(null);
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem('token');

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('https://banking-system-75v4.onrender.com/api/transactions', {
        headers: { Authorization: token },
      });
      setTransactions(res.data.transactions);
      const calculatedBalance = res.data.transactions.reduce((acc, t) => {
        return t.type === 'deposit' ? acc + Number(t.amount) : acc - Number(t.amount);
      }, 0);
      setBalance(calculatedBalance);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handlePopup = (type) => {
    setPopupType(type);
  };

  const closePopup = () => {
    setPopupType(null);
    fetchTransactions();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <div className="mb-4">
        <button onClick={() => handlePopup('deposit')} className="bg-green-500 text-white p-2 rounded mr-2">
          Deposit
        </button>
        <button onClick={() => handlePopup('withdraw')} className="bg-red-500 text-white p-2 rounded">
          Withdraw
        </button>
      </div>
      {popupType && <TransactionPopup type={popupType} balance={balance} onClose={closePopup} />}
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
  );
}

export default Transactions;
