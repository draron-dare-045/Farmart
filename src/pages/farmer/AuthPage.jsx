import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';

const FarmerAuthPage = ({ onNavigate }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ phone_number: '254' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
      if (formData.password !== formData.re_password) {
        setError("Passwords do not match.");
        return;
      }
      if (!formData.phone_number || !formData.phone_number.startsWith('254')) {
        setError("Phone number must start with 254.");
        return;
      }
    }

    setLoading(true);
    try {
      if (isLogin) {
        const userType = await login(formData.username, formData.password);
        if (userType !== 'FARMER') throw new Error("Access denied. This portal is for farmers only.");
        onNavigate('/seller/dashboard'); 
      } else {
        await register({ ...formData, user_type: 'FARMER' });
        alert("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.data ? JSON.stringify(err.data) : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-green-700">Farmart Seller Central</h1>
          <p className="text-gray-600 mt-2">{isLogin ? 'Login to continue' : 'Create your seller account'}</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {!isLogin && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {!isLogin && (
            <>
              <input
                type="password"
                name="re_password"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                placeholder="Phone Number (e.g., 2547...)"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-semibold transition-all duration-200 ${
              loading
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300'
            }`}
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="text-sm text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-green-600 font-semibold hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>

        <div className="text-center mt-4">
        <button
          onClick={() => onNavigate('/seller')}
          className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md text-gray-600 hover:text-green-700 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-150 ease-in-out"
>
           ← Back to Main Site
             </button>

        </div>
      </div>
    </div>
  );
};

export default FarmerAuthPage;