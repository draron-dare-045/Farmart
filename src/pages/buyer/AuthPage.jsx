import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';

const BuyerAuthPage = ({ onNavigate }) => {
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
        setError('Passwords do not match.');
        return;
      }
      if (!formData.phone_number || !formData.phone_number.startsWith('254')) {
        setError('Phone number must start with 254.');
        return;
      }
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.username, formData.password);
        onNavigate('/shop');
      } else {
        await register({ ...formData, user_type: 'BUYER' });
        alert('Registration successful! Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.data ? JSON.stringify(err.data) : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full bg-white border border-green-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
          {isLogin ? 'Buyer Login' : 'Create Buyer Account'}
        </h2>

        <form onSubmit={handleAuth} className="space-y-4">
          {error && (
            <p className="text-red-600 text-sm bg-red-100 p-3 rounded-md border border-red-300">
              {error}
            </p>
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {!isLogin && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {!isLogin && (
            <>
              <input
                type="password"
                name="re_password"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                placeholder="Phone Number (e.g., 2547...)"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </>
          )}

          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>

        <p className="text-center mt-5 text-sm text-green-700">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-green-900 font-medium hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default BuyerAuthPage;
