import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import BuyerLandingPage from './pages/buyer/BuyerLandingPage';
import FarmerLandingPage from './pages/farmer/FarmerLandingPage';
import ContactUs from './pages/shared/ContactUs';
import BuyerHomePage from './pages/buyer/HomePage';
import BuyerAuthPage from './pages/buyer/AuthPage';
import BuyerOrdersPage from './pages/buyer/OrdersPage';
import FarmerDashboardPage from './pages/farmer/DashboardPage';
import FarmerListingsPage from './pages/farmer/ListingsPage';
import FarmerOrdersPage from './pages/farmer/OrdersPage';
import FarmerAuthPage from './pages/farmer/AuthPage';
import NotFoundPage from './pages/shared/NotFoundPage';
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
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);


  const onNavigate = (newPath) => {
    window.history.pushState({}, '', newPath);
    setPath(newPath);
  };

  const renderPage = () => {
    if (loading) return <Spinner fullScreen />;
  
    if (path.startsWith('/seller')) {
      if (!isAuthenticated || user?.user_type !== 'FARMER') {
        
        if (path === '/seller') return <FarmerLandingPage onNavigate={onNavigate} />;
        return <FarmerAuthPage onNavigate={onNavigate} />;
      }

      return (
        <div className="flex h-screen bg-gray-100">
          <FarmerSidebar onNavigate={onNavigate} currentPath={path} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <FarmerNavbar onNavigate={onNavigate} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
              {path === '/seller/dashboard' && <FarmerDashboardPage />}
              {path === '/seller/listings' && <FarmerListingsPage />}
              {path === '/seller/orders' && <FarmerOrdersPage />}
              {path === '/seller/contact' && <ContactUs onNavigate={onNavigate} fromPortal="seller" />}
            </main>
          </div>
        </div>
      );
    }

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
        return isAuthenticated ? <BuyerOrdersPage onNavigate={onNavigate} /> : <BuyerAuthPage onNavigate={onNavigate} />;
      case '/contact':
        return <ContactUs onNavigate={onNavigate} fromPortal="buyer" />;
      case '/seller': 
        return <FarmerLandingPage onNavigate={onNavigate} />;
      default:
        return <NotFoundPage onNavigate={onNavigate} />;
    }
  };
  
  const showBuyerNavbar = !path.startsWith('/seller') && path !== '/';
  
  return (
    <div className="min-h-screen font-sans">
      {showBuyerNavbar && <BuyerNavbar onNavigate={onNavigate} onCartClick={() => setIsCartOpen(true)} />}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onNavigate={onNavigate} />
      {renderPage()}
    </div>
  );
}

export default App;