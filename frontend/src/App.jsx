import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Transactions from './components/Transactions';
import BankerLogin from './components/BankerLogin';
import Accounts from './components/Accounts';
import Layout from './components/Layout';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Protected routes under the common layout */}
      <Route element={<Layout />}>
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/banker-login" element={<BankerLogin />} />
        <Route path="/accounts" element={<Accounts />} />
      </Route>
    </Routes>
  );
}

export default App;
