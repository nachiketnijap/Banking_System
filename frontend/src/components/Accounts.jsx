import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionHistory from './TransactionHistory';

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem('token');

  const fetchAccounts = async () => {
    try {
      const res = await axios.get('https://banking-system-75v4.onrender.com/api/banker/accounts', {
        headers: { Authorization: token },
      });
      setAccounts(res.data.accounts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Customer Accounts</h2>
      <table className="min-w-full bg-white mb-4">
        <thead>
          <tr>
            <th className="py-2">User ID</th>
            <th className="py-2">Username</th>
            <th className="py-2">Email</th>
            <th className="py-2">Balance</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td className="border px-4 py-2">{account.id}</td>
              <td className="border px-4 py-2">{account.username}</td>
              <td className="border px-4 py-2">{account.email}</td>
              <td className="border px-4 py-2">{account.balance}</td>
              <td className="border px-4 py-2">
                <button onClick={() => setSelectedUser(account.id)} className="bg-blue-500 text-white p-2 rounded">
                  View Transactions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && <TransactionHistory userId={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
}

export default Accounts;
