import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      const res = await axios.post('https://banking-system-75v4.onrender.com/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      if (res.data.user.role === 'customer') {
        navigate('/transactions');
      } else {
        navigate('/accounts');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed');
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="max-w-md mx-auto mt-[100px]">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {loading && (
        <p className="text-center text-blue-600 mt-4 font-medium">Please wait...</p>
      )}

      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-500">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default Login;
