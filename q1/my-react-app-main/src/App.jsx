import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';

function App() {
  const api = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ category: 'all', price: 'all', rating: 'all', sort: 'default' });
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const CATEGORIES = ['mens-shirts', 'mens-shoes', 'mens-watches', 'sunglasses', 'sports-accessories', 'skin-care'];

  const fetchProducts = async (category = 'all') => {
    setStatus('loading');
    try {
      let combined = [];
      const targets = category === 'all' ? CATEGORIES : [category];
      const results = await Promise.all(targets.map(c => axios.get(`${api}/products/category/${c}`)));
      results.forEach(r => { combined = [...combined, ...r.data.products]; });
      setProducts(combined);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => { fetchProducts(filters.category); }, [filters.category]);
  useEffect(() => { document.body.classList.toggle('dark', darkMode); }, [darkMode]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }

    if (filters.price === 'under50') list = list.filter(p => p.price < 50);
    else if (filters.price === '50to100') list = list.filter(p => p.price >= 50 && p.price <= 100);
    else if (filters.price === 'over100') list = list.filter(p => p.price > 100);

    if (filters.rating !== 'all') list = list.filter(p => p.rating >= Number(filters.rating));

    if (filters.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (filters.sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (filters.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (filters.sort === 'discount') list.sort((a, b) => b.discountPercentage - a.discountPercentage);

    return list;
  }, [products, searchQuery, filters]);

  const addToCart = (item, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...item, qty }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const toggleWishlist = (item) => {
    setWishlist(prev =>
      prev.find(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, item]
    );
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        darkMode={darkMode}
        toggleDark={() => setDarkMode(d => !d)}
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <header className="hero">
        <div className="hero-content">
          <p className="hero-sub">New Season 2025</p>
          <h1>Essential Men's Wear</h1>
          <p className="hero-desc">Curated classics for the modern gentleman.</p>
          <button className="hero-cta" onClick={() => document.querySelector('.shop-floor').scrollIntoView({ behavior: 'smooth' })}>
            Shop Now
          </button>
        </div>
      </header>

      <main className="shop-floor">
        <Filters filters={filters} setFilters={setFilters} totalResults={filtered.length} />

        {status === 'loading' && (
          <div className="product-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="skeleton-item">
                <div className="skeleton-box shimmer"></div>
                <div className="skeleton-line shimmer short"></div>
                <div className="skeleton-line shimmer"></div>
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <h2>Connection Interrupted</h2>
            <p>We couldn't load the collection. Please check your network.</p>
            <button className="retry-btn" onClick={() => fetchProducts(filters.category)}>Retry</button>
          </div>
        )}

        {status === 'success' && filtered.length === 0 && (
          <div className="error-state">
            <span className="error-icon">🔍</span>
            <h2>No products found</h2>
            <p>Try adjusting your filters or search query.</p>
            <button className="retry-btn" onClick={() => { setSearchQuery(''); setFilters({ category: 'all', price: 'all', rating: 'all', sort: 'default' }); }}>
              Clear Filters
            </button>
          </div>
        )}

        {status === 'success' && filtered.length > 0 && (
          <div className="product-grid">
            {filtered.map(item => (
              <ProductCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={!!wishlist.find(w => w.id === item.id)}
                onOpenDetail={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">AURELIUS <span>MEN</span></div>
          <p>© 2025 Aurelius Men's Boutique · London · New York · Dubai</p>
        </div>
      </footer>

      {selectedProduct && (
        <ProductModal
          item={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          isWishlisted={!!wishlist.find(w => w.id === selectedProduct.id)}
        />
      )}

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
        />
      )}

      {wishlistOpen && (
        <WishlistDrawer
          wishlist={wishlist}
          onClose={() => setWishlistOpen(false)}
          onRemove={id => setWishlist(prev => prev.filter(i => i.id !== id))}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
}

export default App;
