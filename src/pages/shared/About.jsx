import React from 'react';

const About = ({ onNavigate }) => {
  const creators = [
    {
      name: 'Elvis Kariuki',
      role: 'Lead Developer & Frontend Developer',
      image: '/images/Elvis.jpeg',
      github: 'https://github.com/elvis24-tech',
    },
    {
      name: 'Aron Onkware',
      role: 'Group Leader & Backend Developer',
      image: '/images/onkware.jpeg',
      github: 'https://github.com/draron-dare-045',
    },
    {
      name: 'Dwayne Njenga',
      role: 'Backend Developer & Figma Designer',
      image: '/images/Dwayne.jpeg',
      github: 'https://github.com/Duane-Njenga',
    },
    {
      name: 'Reyhanna Intisaar',
      role: 'UI/UX Designer',
      image: '/images/Reyhanna.jpeg',
      github: 'https://github.com/reysar25',
    },
    {
      name: 'Claire Kimani',
      role: 'Product & Marketing Lead',
      image: '/images/claire.jpeg',
      github: 'https://github.com/clairekimani123',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050b08] text-white px-4 py-14 flex justify-center">
      <div className="max-w-6xl w-full space-y-16">

        {/* TEAM SECTION */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-black">
            Meet the <span className="text-emerald-400">Team</span>
          </h1>

          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            The people building Farmart — combining engineering, design, and innovation
            to transform livestock trade in Africa through technology.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {creators.map((creator, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition"
              >
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="w-20 h-20 mx-auto rounded-full object-cover border border-emerald-400/30"
                />

                <h3 className="mt-4 font-bold text-lg">{creator.name}</h3>

                <p className="text-xs text-gray-400 mt-1">
                  {creator.role}
                </p>

                <a
                  href={creator.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-emerald-300 hover:text-emerald-400 mt-3 inline-block"
                >
                  GitHub →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT + VISION CONTENT */}
        <div className="space-y-10">

          {/* ABOUT */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-3 text-emerald-300">
              About Farmart
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed">
              Farmart is a modern, digital livestock marketplace designed to transform how farmers
              and buyers interact. Traditionally, livestock trade has relied heavily on middlemen,
              leading to unfair pricing, lack of transparency, and limited access to wider markets.
            </p>

            <p className="text-gray-300 text-sm leading-relaxed mt-3">
              Farmart removes these barriers by connecting farmers directly to buyers through a
              secure, user-friendly platform. Farmers can list animals, manage inventory, track
              orders, and receive payments efficiently, while buyers gain access to verified,
              healthy livestock at fair and transparent prices.
            </p>

            <p className="text-gray-300 text-sm leading-relaxed mt-3">
              Our platform also promotes trust through verification systems, order tracking,
              and streamlined communication between sellers and buyers. We aim to digitize
              agriculture and empower rural communities with modern tools that improve income
              and market access.
            </p>
          </div>

          {/* VISION */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-emerald-400 mb-3">
              Our Vision
            </h2>

            <p className="text-gray-400 text-sm max-w-3xl mx-auto leading-relaxed">
              We envision a future where agriculture is fully digitized, transparent, and globally connected.
              A future where every farmer regardless of location  has equal access to markets, fair pricing,
              and realtime trading opportunities.
            </p>

            <p className="text-gray-400 text-sm max-w-3xl mx-auto mt-4 leading-relaxed">
              Farmart aims to become the leading livestock ecosystem in Africa, empowering farmers with
              data-driven tools, secure digital payments, and seamless logistics. We believe technology
              can eliminate inefficiencies in agriculture and unlock economic growth for millions of rural households.
            </p>

            <p className="text-gray-400 text-sm max-w-3xl mx-auto mt-4 leading-relaxed">
              Beyond trade, our vision is to build a trusted agricultural network where transparency,
              sustainability, and innovation define every transaction.
            </p>
          </div>

        </div>

        {/* BACK */}
        <div className="text-center pt-6">
          <button
            onClick={() => onNavigate('/')}
            className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition"
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default About;