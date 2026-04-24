export default function ProductCard({ item, onAddToCart, onToggleWishlist, isWishlisted, onOpenDetail }) {
  const stars = '★'.repeat(Math.round(item.rating)) + '☆'.repeat(5 - Math.round(item.rating));

  return (
    <div className="clothing-card" onClick={() => onOpenDetail(item)}>
      <div className="image-holder">
        <img src={item.thumbnail} alt={item.title} loading="lazy" />
        {item.discountPercentage > 15 && <span className="tag">Sale {Math.round(item.discountPercentage)}%</span>}
        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={e => { e.stopPropagation(); onToggleWishlist(item); }}
          title="Wishlist"
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
      </div>
      <div className="details">
        <span className="brand">{item.brand || 'Essentials'}</span>
        <h3>{item.title}</h3>
        <div className="rating-row">
          <span className="stars">{stars}</span>
          <span className="rating-num">({item.rating})</span>
        </div>
        <div className="price-row">
          <div className="prices">
            <span className="price">${item.price}</span>
            {item.discountPercentage > 0 && (
              <span className="original-price">
                ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <button
            className="add-icon"
            onClick={e => { e.stopPropagation(); onAddToCart(item); }}
            title="Add to cart"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
