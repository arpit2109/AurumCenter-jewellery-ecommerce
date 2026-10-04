import React, { useState, useEffect } from 'react';
import { ProductService } from './api';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AuthModal from './components/features/AuthModal';
import AddressManager from './components/features/AddressManager';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import { X, ShieldCheck } from 'lucide-react'; // Imports for the Cart Drawer logic inline below

const App = () => {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [filters, setFilters] = useState({ metal: [], type: [], maxPrice: 10000 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart');

  // Initial Data Fetch
  useEffect(() => {
    ProductService.getAll().then(res => setProducts(res.data.results || []));
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    if (checkoutStep === 'auth') setCheckoutStep('address');
    else setView('home');
  };

  const handleCheckoutStart = () => {
    setIsCartOpen(false);
    if (!user) setCheckoutStep('auth');
    else setCheckoutStep('address');
  };

  const renderView = () => {
    switch (view) {
      case 'home': return <HomePage onShopNow={() => setView('shop')} />;
      case 'shop': return <ShopPage products={products} filters={filters} setFilters={setFilters} onProductClick={(p) => { setActiveProduct(p); setView('product'); window.scrollTo(0, 0); }} />;
      case 'product': return activeProduct ? <ProductDetailPage product={activeProduct} onBack={() => setView('shop')} onAddToCart={(p) => setCart([...cart, p])} /> : null;
      case 'admin': return <AdminDashboard onClose={() => setView('home')} />;
      default: return <HomePage onShopNow={() => setView('shop')} />;
    }
  };

  return (
    <div className="font-sans text-stone-900 bg-white min-h-screen">
      {view !== 'admin' && (
        <Navbar
          cartCount={cart.length}
          onViewChange={setView}
          onCartClick={() => { setIsCartOpen(true); setCheckoutStep('cart'); }}
          user={user}
          onLoginClick={() => setCheckoutStep('auth')}
          onLogout={() => { setUser(null); setView('home'); setCart([]); }}
        />
      )}

      <main>{renderView()}</main>

      {view !== 'admin' && <Footer onViewChange={setView} user={user} onAdminAccess={() => setView('admin')} />}

      {/* --- Global Overlays --- */}

      {/* Auth Modal */}
      {checkoutStep === 'auth' && <AuthModal onLogin={handleLogin} onCancel={() => setCheckoutStep('cart')} />}

      {/* Address Manager */}
      {checkoutStep === 'address' && (
        <AddressManager
          onBack={() => setCheckoutStep('cart')}
          onSelect={() => {
            alert("Order Placed Successfully!");
            setCheckoutStep('cart');
            setCart([]);
            setView('home');
          }}
        />
      )}

      {/* Cart Drawer (Inline for state access) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-slide-in-right">
            <div className="flex justify-between items-center mb-6"><h2 className="font-serif text-2xl">Bag</h2><X onClick={() => setIsCartOpen(false)} className="cursor-pointer" /></div>
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <img src={item.images?.[0] || "https://via.placeholder.com/100"} className="w-16 h-16 object-cover bg-stone-100" />
                  <div><p className="font-serif">{item.title}</p><p>${item.price}</p></div>
                </div>
              ))}
              {cart.length === 0 && <p className="text-stone-400 text-center mt-10">Your bag is empty.</p>}
            </div>
            {cart.length > 0 && (
              <div className="pt-4 border-t">
                {!user && <p className="text-xs text-amber-600 mb-2 text-center">Guest Cart - Login required</p>}
                <button onClick={handleCheckoutStart} className="w-full bg-stone-900 text-white py-3 rounded-full font-bold uppercase text-xs flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Secure Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;