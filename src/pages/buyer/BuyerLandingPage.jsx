import React from 'react';
import Button from '../../components/common/Button';

const BuyerLandingPage = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07120c] text-white">
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
      <div className="absolute inset-0 bg-gradient-to-r from-[#07120c] via-[#07120c]/85 to-[#07120c]/40" />
      <div className="absolute top-[-120px] left-[-120px] w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] bg-green-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] bg-lime-300/10 rounded-full blur-[120px]" />
      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-6 lg:px-12 py-5">

        <div className="flex items-center gap-3">

          <img
            src="/images/image.jpg.jpg"
            alt="Farmart Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border border-green-400/30 shadow-lg"
          />

          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              FARM<span className="text-green-400">ART</span>
            </h1>

            <p className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-gray-400">
              trusted livestock marketplace
            </p>
          </div>

        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">

          <button onClick={() => onNavigate('/shop')} className="hover:text-green-400">
            Marketplace
          </button>

          <button onClick={() => onNavigate('/about')} className="hover:text-green-400">
            About
          </button>

          <button onClick={() => onNavigate('/seller')} className="hover:text-green-400">
            Farmers
          </button>

        </div>

      </nav>
      <section className="relative z-10 min-h-[88vh] flex items-center px-4 sm:px-6 lg:px-12 py-10">

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-400/20">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-green-300">
                Fresh • Trusted • Verified
              </span>
            </div>
            <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Buy Healthy
              <br />
              <span className="text-transparent bg-gradient-to-r from-green-300 to-lime-300 bg-clip-text">
                Livestock
              </span>
              <br />
              Directly From Farmers
            </h1>
            <p className="mt-5 text-sm sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
              Farmart connects you with verified farmers so you can buy quality livestock safely and easily.
            </p>
            <div className="flex justify-center lg:justify-start gap-6 mt-6 text-sm">
              <button
                onClick={() => onNavigate('/about')}
                className="text-green-300"
              >
                Learn More →
              </button>

              <button
                onClick={() => onNavigate('/seller')}
                className="text-white/70"
              >
                Become a Seller
              </button>
            </div>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">

              <Button
                onClick={() => onNavigate('/shop')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-bold"
              >
                Explore Marketplace →
              </Button>

              <Button
                onClick={() => onNavigate('/my-orders')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl border border-white/10 bg-white/5"
              >
                Login / Register
              </Button>

            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl">🐄</div>
                <h3 className="font-bold mt-2">Quality</h3>
                <p className="text-xs text-gray-400 mt-1">Healthy livestock</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl">🛡️</div>
                <h3 className="font-bold mt-2">Safe</h3>
                <p className="text-xs text-gray-400 mt-1">Verified sellers</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl">⚡</div>
                <h3 className="font-bold mt-2">Fast</h3>
                <p className="text-xs text-gray-400 mt-1">Quick access</p>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:flex justify-center items-center">

            <div className="absolute w-[550px] h-[550px] rounded-full bg-green-400/10 blur-[120px]" />

            <div className="relative w-[500px] h-[620px] rounded-[36px] overflow-hidden border border-white/10">

              <img
                src="/images/image.jpg.jpg"
                alt="Farmart"
                className="w-full h-full object-cover hover:scale-105 transition duration-[4000ms]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">

                <div className="rounded-[30px] bg-black/45 border border-white/10 backdrop-blur-3xl p-7">

                  <h2 className="text-4xl font-black leading-tight">
                    Modern Livestock
                    <br />
                    Marketplace
                  </h2>

                  <p className="mt-4 text-gray-300">
                    Buy directly from verified farmers with confidence and ease.
                  </p>

                  <div className="grid grid-cols-3 gap-4 mt-8">

                    <div className="text-center">
                      <h3 className="text-2xl font-black text-green-400">10K+</h3>
                      <p className="text-xs text-gray-400">Animals</p>
                    </div>

                    <div className="text-center">
                      <h3 className="text-2xl font-black text-lime-300">2K+</h3>
                      <p className="text-xs text-gray-400">Farmers</p>
                    </div>

                    <div className="text-center">
                      <h3 className="text-2xl font-black text-white">24/7</h3>
                      <p className="text-xs text-gray-400">Access</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyerLandingPage;