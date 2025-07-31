import React from 'react';

const About = ({ onNavigate }) => {
  const creators = [
    {
      name: 'Elvis Kariuki',
      image: '/images/Elvis.jpeg',
      github: 'https://github.com/elvis24-tech',
    },
    {
      name: 'Aron Onkware',
      image: '/images/onkware.jpeg',
      github: 'https://github.com/draron-dare-045',
    },
    {
      name: 'Dwayne Njenga',
      image: '/images/Dwayne.jpeg',
      github: 'https://github.com/Duane-Njenga',
    },
    {
      name: 'Reyhanna Intisaar',
      image: '/images/Reyhanna.jpeg',
      github: 'https://github.com/reysar25',
    },
    {
      name: 'Claire Kimani',
      image: '/images/claire.jpeg',
      github: 'https://github.com/clairekimani123',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white px-4 py-12 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl p-10 md:p-16 space-y-12">
        <h1 className="text-5xl font-extrabold text-black text-center">About Farmart</h1>

        <section className="space-y-6">
          <p className="text-black text-lg leading-relaxed">
            <span className="font-semibold text-black">Farmart</span> is a pioneering digital livestock marketplace
            committed to transforming the agricultural industry. Our platform bridges the gap between farmers and buyers,
            fostering a trusted environment rooted in quality, integrity, and efficiency.
          </p>
          <p className="text-black text-lg leading-relaxed">
            We eliminate unnecessary middlemen, ensuring farmers receive fair value for their livestock while consumers
            access healthy animals at transparent prices. Built for everyone — from smallholder farmers to large-scale
            buyers — Farmart leverages technology to empower rural communities with easy-to-use tools for listing, selling,
            and managing livestock.
          </p>
        </section>

        <section className="space-y-6 border-t border-gray-300 pt-8">
          <h2 className="text-3xl font-bold text-black">Why Choose Farmart?</h2>
          <ul className="list-disc pl-6 text-black text-lg space-y-3">
            <li>Direct access to a reliable network of verified farmers and trusted buyers</li>
            <li>Secure transactions with built-in identity checks</li>
            <li>Inventory updates and smart dashboard for both farmers and buyers</li>
            <li>Commitment to ethical sourcing and animal welfare</li>
            <li>Promoting local agricultural communities through digital innovation</li>
          </ul>
        </section>

        <section className="space-y-6 border-t border-gray-300 pt-8">
          <h2 className="text-3xl font-bold text-black">Our Vision</h2>
          <p className="text-black text-lg leading-relaxed">
            We envision a future where livestock trade is smart, inclusive, and transparent — a future where farmers can thrive
            and buyers can trust every transaction. Farmart is more than a platform — it’s a movement shaping the future of
            agriculture through connectivity, fairness, and innovation.
          </p>
        </section>

        <section className="space-y-8 border-t border-gray-300 pt-10">
          <h2 className="text-3xl font-bold text-black text-center">Meet the Creators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {creators.map((creator, index) => (
              <div
                key={index}
                className="bg-green-50 hover:bg-green-100 rounded-xl shadow-md p-6 flex flex-col items-center text-center transition duration-300"
              >
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-200 mb-4"
                />
                <h3 className="text-lg font-semibold text-black">{creator.name}</h3>
                <p className="text-sm text-black">{creator.role}</p>
                <a
                  href={creator.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-black hover:text-green-800 text-sm font-medium flex items-center space-x-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.478 2 2 6.523 2 12.048c0 4.433 2.865 8.193 6.839 9.504.5.091.682-.217.682-.483 0-.238-.009-.868-.014-1.704-2.782.605-3.369-1.34-3.369-1.34-.454-1.158-1.109-1.467-1.109-1.467-.908-.62.069-.607.069-.607 1.004.071 1.532 1.033 1.532 1.033.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.637-1.338-2.22-.254-4.555-1.112-4.555-4.951 0-1.093.39-1.987 1.029-2.688-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025a9.536 9.536 0 012.5-.336c.848.004 1.703.114 2.5.336 1.91-1.295 2.75-1.025 2.75-1.025.545 1.376.202 2.393.1 2.646.64.701 1.028 1.595 1.028 2.688 0 3.848-2.338 4.694-4.566 4.943.36.31.682.921.682 1.856 0 1.34-.012 2.421-.012 2.751 0 .269.18.579.688.48C19.138 20.24 22 16.48 22 12.048 22 6.523 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center border-t border-gray-200 pt-6 text-sm text-black">
          Together, let’s grow a healthier, connected agricultural future.
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate('/')}
            className="mt-6 px-8 py-3 bg-green-700 hover:bg-green-800 text-white text-lg rounded-md shadow transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
