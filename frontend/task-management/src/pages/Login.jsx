import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { login as loginAPI } from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI(username, password);
      dispatch(loginSuccess(response.data));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || 'An error occurred during login'));
    }
  };

  const getErrorMessage = (error) => {
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'message' in error) return error.message;
    return 'An unknown error occurred';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-8">Login</h1>
        {error && <div className="text-red-500 text-center mb-4">{getErrorMessage(error)}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;