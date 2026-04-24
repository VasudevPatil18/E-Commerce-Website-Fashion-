import { useState } from 'react';

export default function Navbar({ cartCount, wishlistCount, darkMode, toggleDark, onCartOpen, onWishlistOpen, searchQuery, setSearchQuery }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo">AURELIUS <span>MEN</span></div>

        <div className={`search-bar ${menuOpen ? 'open' : ''}`}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>}
        </div>

        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleDark} title="Toggle dark mode">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="icon-btn" onClick={onWishlistOpen} title="Wishlist">
            ♡ <span className="badge">{wishlistCount}</span>
          </button>
          <button className="icon-btn cart-btn" onClick={onCartOpen} title="Cart">
            🛒 <span className="badge">{cartCount}</span>
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </div>
    </nav>
  );
}
