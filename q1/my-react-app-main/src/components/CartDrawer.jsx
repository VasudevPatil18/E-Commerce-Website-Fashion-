export default function CartDrawer({ cart, onClose, onRemove, onUpdateQty }) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>Your Cart ({cart.length})</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="drawer-empty">
            <span>🛒</span>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {cart.map(item => (
                <div key={item.id} className="drawer-item">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="drawer-item-info">
                    <p className="drawer-item-title">{item.title}</p>
                    <p className="drawer-item-price">${item.price}</p>
                    <div className="qty-control small">
                      <button onClick={() => onUpdateQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => onRemove(item.id)}>✕</button>
                </div>
              ))}
            </div>
            <div className="drawer-footer">
              <div className="total-row">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
