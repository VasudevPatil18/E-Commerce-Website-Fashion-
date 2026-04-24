import { useState } from 'react';

export default function ProductModal({ item, onClose, onAddToCart, onToggleWishlist, isWishlisted }) {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  if (!item) return null;

  const images = item.images?.length ? item.images : [item.thumbnail];
  const stars = '★'.repeat(Math.round(item.rating)) + '☆'.repeat(5 - Math.round(item.rating));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-inner">
          <div className="modal-images">
            <img src={images[activeImg]} alt={item.title} className="modal-main-img" />
            <div className="modal-thumbs">
              {images.map((img, i) => (
                <img key={i} src={img} alt="" className={`thumb ${i === activeImg ? 'active' : ''}`} onClick={() => setActiveImg(i)} />
              ))}
            </div>
          </div>
          <div className="modal-info">
            <span className="brand">{item.brand || 'Essentials'}</span>
            <h2>{item.title}</h2>
            <div className="rating-row">
              <span className="stars">{stars}</span>
              <span className="rating-num">({item.rating}) · {item.stock} in stock</span>
            </div>
            <p className="modal-desc">{item.description}</p>
            <div className="modal-price-row">
              <span className="price">${item.price}</span>
              {item.discountPercentage > 0 && (
                <span className="discount-badge">-{Math.round(item.discountPercentage)}% OFF</span>
              )}
            </div>
            <div className="modal-actions">
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button className="add-to-cart-btn" onClick={() => { onAddToCart(item, qty); onClose(); }}>
                Add to Cart
              </button>
              <button
                className={`wishlist-modal-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(item)}
              >
                {isWishlisted ? '♥' : '♡'}
              </button>
            </div>
            <div className="modal-tags">
              {item.tags?.map(tag => <span key={tag} className="pill">{tag}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
