export default function Filters({ filters, setFilters, totalResults }) {
  return (
    <div className="filters-bar">
      <div className="filter-left">
        <span className="results-count">{totalResults} products</span>
      </div>
      <div className="filter-right">
        <select value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
          <option value="all">All Categories</option>
          <option value="mens-shirts">Shirts</option>
          <option value="mens-shoes">Shoes</option>
          <option value="mens-watches">Watches</option>
          <option value="sunglasses">Sunglasses</option>
          <option value="sports-accessories">Sports</option>
          <option value="skin-care">Skin Care</option>
        </select>

        <select value={filters.price} onChange={e => setFilters(f => ({ ...f, price: e.target.value }))}>
          <option value="all">All Prices</option>
          <option value="under50">Under $50</option>
          <option value="50to100">$50 – $100</option>
          <option value="over100">Over $100</option>
        </select>

        <select value={filters.rating} onChange={e => setFilters(f => ({ ...f, rating: e.target.value }))}>
          <option value="all">All Ratings</option>
          <option value="4">4★ & above</option>
          <option value="3">3★ & above</option>
        </select>

        <select value={filters.sort} onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Most Discounted</option>
        </select>
      </div>
    </div>
  );
}
