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
      if (!formData.phone_number?.startsWith('254')) {
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
    <div className="relative min-h-screen flex items-center justify-center bg-[#07120c] text-white px-4 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07120c] via-[#07120c]/90 to-[#07120c]/40" />
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-green-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-lime-300/10 blur-[120px] rounded-full" />
      <div className="relative z-10 w-full max-w-md sm:max-w-lg bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Farmart Buyer Portal
          </p>
        </div>
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-400/20 text-red-300 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleAuth} className="space-y-4">

          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {!isLogin && (
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {!isLogin && (
            <>
              <input
                type="password"
                name="re_password"
                placeholder="Confirm Password"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />

              <input
                name="phone_number"
                value={formData.phone_number}
                placeholder="Phone (2547...)"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />

              <input
                name="location"
                placeholder="Location"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </>
          )}

          <Button
            type="submit"
            loading={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-black hover:scale-[1.02] transition"
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-green-300 font-semibold hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="mt-5 w-full text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
};

export default BuyerAuthPage;