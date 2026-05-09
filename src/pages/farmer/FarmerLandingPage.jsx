import React from 'react';
import Button from '../../components/common/Button';

const FarmerLandingPage = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050b08] text-white">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#050b08] via-[#050b08]/80 to-transparent" />

      {/* FLOATING GLOWS */}
      <div className="absolute top-[-120px] left-[-120px] w-[380px] h-[380px] bg-emerald-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-150px] right-[-120px] w-[420px] h-[420px] bg-lime-300/10 blur-[130px] rounded-full" />

      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-5 sm:px-10 py-6">

        <div className="flex items-center gap-3">
          <img
            src="/images/image.jpg.jpg"
            alt="Farmart"
            className="w-12 h-12 rounded-2xl border border-emerald-400/30 object-cover"
          />

          <div>
            <h1 className="text-xl font-black tracking-tight">
              FARM<span className="text-emerald-400">SELLER</span>
            </h1>
            <p className="text-[10px] text-gray-400 tracking-[0.25em] uppercase">
              farmer control center
            </p>
          </div>
        </div>

        <div className="hidden md:flex gap-6 text-sm text-gray-300">
          <button onClick={() => onNavigate('/seller/dashboard')} className="hover:text-emerald-400">
            Dashboard
          </button>
          <button onClick={() => onNavigate('/shop')} className="hover:text-emerald-400">
            Marketplace
          </button>
        </div>

      </nav>

      {/* HERO */}
      <section className="relative z-10 min-h-[85vh] flex items-center px-5 sm:px-10">

        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>

            {/* ✅ BACK TO HOME BUTTON (ADDED HERE) */}
            <div className="mb-6">
              <button
                onClick={() => onNavigate('/')}
                className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-emerald-300 font-semibold hover:bg-white/20 transition flex items-center gap-2"
              >
                ← Back to Home
              </button>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-emerald-300">
                Seller Control Platform
              </span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-black leading-tight">
              Sell Your Livestock
              <br />
              <span className="text-transparent bg-gradient-to-r from-emerald-300 to-lime-300 bg-clip-text">
                Without Middlemen
              </span>
            </h1>

            <p className="mt-5 text-gray-300 text-sm sm:text-base max-w-xl">
              Manage your livestock listings, receive orders, and grow your farming business directly from buyers across the region.
            </p>

            {/* ACTION BUTTONS */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3">

              <Button
                onClick={() => onNavigate('/seller/dashboard')}
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-lime-300 text-black font-bold"
              >
                Open Dashboard →
              </Button>

              <Button
                onClick={() => onNavigate('/seller/auth')}
                className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white"
              >
                Login / Register
              </Button>

            </div>

            {/* SMALL FEATURES */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-xl">📦</div>
                <h3 className="font-bold mt-2">Sell Fast</h3>
                <p className="text-xs text-gray-400 mt-1">Instant listings</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-xl">💰</div>
                <h3 className="font-bold mt-2">Direct Income</h3>
                <p className="text-xs text-gray-400 mt-1">No middlemen</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-xl">📊</div>
                <h3 className="font-bold mt-2">Track Sales</h3>
                <p className="text-xs text-gray-400 mt-1">Real-time updates</p>
              </div>

            </div>

          </div>

          {/* RIGHT VISUAL CARD */}
          <div className="relative hidden lg:flex justify-center">

            <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />

            <div className="relative w-[420px] h-[560px] rounded-[30px] overflow-hidden border border-white/10">

              <img
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2070&auto=format&fit=crop"
                alt="Farmer"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 w-full p-6 bg-black/50 backdrop-blur-2xl border-t border-white/10">

                <h2 className="text-2xl font-black">
                  Your Farm.
                  <br />
                  Your Business.
                </h2>

                <p className="text-gray-300 text-sm mt-2">
                  Take full control of your livestock sales in one place.
                </p>

              </div>
            </div>

          </div>

        </div>

      </section>
    </div>
  );
};

export default FarmerLandingPage;