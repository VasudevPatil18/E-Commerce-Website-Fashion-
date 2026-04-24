export default function WishlistDrawer({ wishlist, onClose, onRemove, onAddToCart }) {
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>Wishlist ({wishlist.length})</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {wishlist.length === 0 ? (
          <div className="drawer-empty">
            <span>♡</span>
            <p>Your wishlist is empty</p>
          </div>
        ) : (
          <div className="drawer-items">
            {wishlist.map(item => (
              <div key={item.id} className="drawer-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="drawer-item-info">
                  <p className="drawer-item-title">{item.title}</p>
                  <p className="drawer-item-price">${item.price}</p>
                  <button className="move-to-cart-btn" onClick={() => { onAddToCart(item); onRemove(item.id); }}>
                    Move to Cart
                  </button>
                </div>
                <button className="remove-btn" onClick={() => onRemove(item.id)}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
