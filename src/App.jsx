import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';

// Buyer
import BuyerLandingPage from './pages/buyer/BuyerLandingPage';
import BuyerHomePage from './pages/buyer/HomePage';
import BuyerAuthPage from './pages/buyer/AuthPage';
import BuyerOrdersPage from './pages/buyer/OrdersPage';

// Farmer
import FarmerLandingPage from './pages/farmer/FarmerLandingPage';
import FarmerDashboardPage from './pages/farmer/DashboardPage';
import FarmerListingsPage from './pages/farmer/ListingsPage';
import FarmerOrdersPage from './pages/farmer/OrdersPage';
import FarmerAuthPage from './pages/farmer/AuthPage';

// Shared
import ContactUs from './pages/shared/ContactUs';
import About from './pages/shared/About';
import NotFoundPage from './pages/shared/NotFoundPage';

// Layout
import BuyerNavbar from './components/layout/BuyerNavbar';
import FarmerSidebar from './components/layout/FarmerSidebar';
import FarmerNavbar from './components/layout/FarmerNavbar';
import Spinner from './components/common/Spinner';
import Cart from './components/buyer/Cart';

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, user, loading } = useAuth();

  useEffect(() => {
    const handleRouteChange = () => setPath(window.location.pathname);

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const onNavigate = (newPath) => {
    window.history.pushState({}, '', newPath);
    setPath(newPath);
  };

  if (loading) {
    return <Spinner fullScreen />;
  }

  const isFarmerRoute = path.startsWith('/seller');

  const renderFarmerRoutes = () => {
    // not logged in farmer
    if (!isAuthenticated || user?.user_type !== 'FARMER') {
      if (path === '/seller') {
        return <FarmerLandingPage onNavigate={onNavigate} />;
      }
      return <FarmerAuthPage onNavigate={onNavigate} />;
    }

    return (
      <div className="flex h-screen bg-gray-100">
        <FarmerSidebar onNavigate={onNavigate} currentPath={path} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <FarmerNavbar onNavigate={onNavigate} />

          <main className="flex-1 overflow-auto bg-gray-200">
            {path === '/seller/dashboard' && <FarmerDashboardPage />}
            {path === '/seller/listings' && <FarmerListingsPage />}
            {path === '/seller/orders' && <FarmerOrdersPage />}
            {path === '/seller/contact' && (
              <ContactUs onNavigate={onNavigate} fromPortal="seller" />
            )}

            {![
              '/seller/dashboard',
              '/seller/listings',
              '/seller/orders',
              '/seller/contact',
            ].includes(path) && <NotFoundPage onNavigate={onNavigate} />}
          </main>
        </div>
      </div>
    );
  };

  const renderBuyerRoutes = () => {
    switch (path) {
      case '/':
        return <BuyerLandingPage onNavigate={onNavigate} />;

      case '/shop':
        return <BuyerHomePage onNavigate={onNavigate} />;

      case '/auth':
        if (isAuthenticated && user?.user_type === 'BUYER') {
          onNavigate('/shop');
          return null;
        }
        return <BuyerAuthPage onNavigate={onNavigate} />;

      case '/my-orders':
        return isAuthenticated ? (
          <BuyerOrdersPage onNavigate={onNavigate} />
        ) : (
          <BuyerAuthPage onNavigate={onNavigate} />
        );

      case '/contact':
        return <ContactUs onNavigate={onNavigate} fromPortal="buyer" />;

      case '/about':
        return <About onNavigate={onNavigate} />;

      default:
        return <NotFoundPage onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#050b08]">
      {/* Buyer Navbar only when not seller route */}
      {!isFarmerRoute && path !== '/' && (
        <BuyerNavbar
          onNavigate={onNavigate}
          onCartClick={() => setIsCartOpen(true)}
        />
      )}

      {/* Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onNavigate={onNavigate}
      />

      {/* Pages */}
      {isFarmerRoute ? renderFarmerRoutes() : renderBuyerRoutes()}
    </div>
  );
}

export default App;