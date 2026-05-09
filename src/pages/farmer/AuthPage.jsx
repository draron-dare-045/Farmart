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
        const userType = await login(formData.username, formData.password);
        if (userType !== 'FARMER') throw new Error('Farmers only portal.');
        onNavigate('/seller/dashboard');
      } else {
        await register({ ...formData, user_type: 'FARMER' });
        setIsLogin(true);
        alert('Account created! Please login.');
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
    <div className="relative min-h-screen overflow-hidden bg-[#050b08] text-white flex items-center justify-center px-4">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#050b08] via-[#050b08]/80 to-transparent" />

      {/* GLOWS */}
      <div className="absolute top-[-120px] left-[-120px] w-[380px] h-[380px] bg-emerald-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[380px] h-[380px] bg-lime-300/10 blur-[120px] rounded-full" />

      {/* CARD */}
      <div className="relative w-full max-w-md">

        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">

          {/* HEADER */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 mb-4">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-emerald-300">
                Seller Portal
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black">
              Farm<span className="text-emerald-400">art</span> Sellers
            </h1>

            <p className="text-gray-400 text-sm mt-2">
              {isLogin ? 'Welcome back farmer 👨‍🌾' : 'Create your farm account'}
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-400/20 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleAuth} className="space-y-3">

            <input
              name="username"
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            {!isLogin && (
              <input
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            )}

            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            {!isLogin && (
              <>
                <input
                  name="re_password"
                  type="password"
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />

                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="2547XXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />

                <input
                  name="location"
                  onChange={handleChange}
                  placeholder="Farm Location"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold transition bg-gradient-to-r from-emerald-400 to-lime-300 text-black hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? 'Processing...' : isLogin ? 'Login to Dashboard →' : 'Create Account →'}
            </button>

          </form>

          {/* SWITCH */}
          <p className="text-center mt-5 text-sm text-gray-400">
            {isLogin ? "New farmer?" : "Already registered?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-300 hover:underline"
            >
              {isLogin ? 'Create account' : 'Login'}
            </button>
          </p>

          {/* BACK */}
          <button
            onClick={() => onNavigate('/seller')}
            className="w-full mt-6 text-sm text-gray-400 hover:text-white transition"
          >
            ← Back to Seller Landing
          </button>

        </div>
      </div>
    </div>
  );
};

export default FarmerAuthPage;