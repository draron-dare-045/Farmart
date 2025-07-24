import React from 'react';

const FarmerSidebar = ({ onNavigate, currentPath }) => {
  const handleNav = (e, path) => {
    e.preventDefault();
    onNavigate(path);
  };

  const navItem = (path) =>
    `block w-full text-left py-3 px-5 rounded-md text-sm font-medium transition-all duration-200 ${
      currentPath === path
        ? 'bg-green-700 text-white shadow font-semibold'
        : 'text-gray-700 hover:bg-green-100 hover:text-green-700'
    }`;

  return (
    <aside className="w-64 min-h-screen bg-green-50 border-r border-green-100 shadow-sm flex flex-col">
      <div className="py-6 px-5 border-b border-green-200 text-center">
        <a
          href="/seller"
          onClick={(e) => handleNav(e, '/seller')}
          className="flex items-center justify-center space-x-2"
        >
          <img
            src="/images/image.jpg.jpg"
            alt="Farmart Logo"
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="text-2xl font-bold tracking-tight text-green-700">
            Seller <span className="text-gray-800">Central</span>
          </span>
        </a>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          <li>
            <a
              href="/seller/dashboard"
              onClick={(e) => handleNav(e, '/seller/dashboard')}
              className={navItem('/seller/dashboard')}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/seller/listings"
              onClick={(e) => handleNav(e, '/seller/listings')}
              className={navItem('/seller/listings')}
            >
              Manage Listings
            </a>
          </li>
          <li>
            <a
              href="/seller/orders"
              onClick={(e) => handleNav(e, '/seller/orders')}
              className={navItem('/seller/orders')}
            >
              Manage Orders
            </a>
          </li>
          <li>
            <a
              href="/seller/contact"
              onClick={(e) => handleNav(e, '/seller/contact')}
              className={navItem('/seller/contact')}
            >
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
};
export default FarmerSidebar;