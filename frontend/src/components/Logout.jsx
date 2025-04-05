import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the stored token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-gray-500 text-white p-2 rounded"
    >
      Logout
    </button>
  );
}

export default Logout;
