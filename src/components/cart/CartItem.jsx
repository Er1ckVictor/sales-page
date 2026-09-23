import "./CartItem.css";
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { formatPrice } from '../../utils/format'
import { useCart } from '../../context/CartContext'

export default function CartItem({ item, compact = false }) {
  const { updateQty, removeItem } = useCart()
  const variantLabel = Object.values(item.variant || {}).filter(Boolean).join(' · ')

  return (
    <div className={`cart-item ${compact ? 'cart-item-compact' : ''}`}>
      <img src={item.image} alt={item.name} className="cart-item-img" />
      <div className="cart-item-info">
        <span className="cart-item-name">{item.name}</span>
        {variantLabel && <span className="text-xs text-muted">{variantLabel}</span>}
        <span className="cart-item-price">{formatPrice(item.price)}</span>
        <div className="cart-item-qty">
          <button aria-label="Diminuir quantidade" onClick={() => updateQty(item.key, item.qty - 1)} disabled={item.qty <= 1}><FiMinus /></button>
          <span>{item.qty}</span>
          <button aria-label="Aumentar quantidade" onClick={() => updateQty(item.key, item.qty + 1)}><FiPlus /></button>
        </div>
      </div>
      <button className="icon-btn cart-item-remove" aria-label={`Remover ${item.name} do carrinho`} onClick={() => removeItem(item.key)}>
        <FiTrash2 />
      </button>
    </div>
  )
}
