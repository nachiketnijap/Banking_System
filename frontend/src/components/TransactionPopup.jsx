import React, { useState } from 'react';
import axios from 'axios';

function TransactionPopup({ type, balance, onClose }) {
  const [amount, setAmount] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'withdraw' && Number(amount) > balance) {
        alert('Insufficient Funds');
        return;
      }
      await axios.post(
        `http://localhost:5000/api/transactions/${type}`,
        { amount },
        { headers: { Authorization: token } }
      );
      onClose();
    } catch (error) {
      console.error(error);
      alert('Transaction failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg font-bold mb-2">{type === 'deposit' ? 'Deposit' : 'Withdraw'}</h2>
        <p className="mb-2">Available Balance: {balance}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            className="border p-2 mb-2 w-full"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 p-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              {type}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionPopup;
