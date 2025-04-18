import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      await axios.post('https://banking-system-75v4.onrender.com/api/auth/register', {
        username,
        email,
        password,
        role,
      });
      alert('Registration successful, please login.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="max-w-md mx-auto mt-[100px]">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Username:</label>
          <input
            type="text"
            className="w-full border p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label>Email:</label>
          <input
            type="email"
            className="w-full border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label>Password:</label>
          <input
            type="password"
            className="w-full border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-2"
          >
            <option value="customer">Customer</option>
            <option value="banker">Banker</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {loading && (
        <p className="text-center text-green-600 mt-4 font-medium">Please wait...</p>
      )}

      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default Register;
