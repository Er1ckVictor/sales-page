import "./CartSidebar.css";
import { Link } from 'react-router-dom'
import { FiX, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'
import EmptyState from '../common/EmptyState'
import Button from '../common/Button'
import { formatPrice } from '../../utils/format'

export default function CartSidebar() {
  const { items, isOpen, closeCart, subtotal, discount, shipping, total } = useCart()
  if (!isOpen) return null

  return (
    <div className="overlay overlay-right" onClick={closeCart} role="presentation">
      <aside className="cart-sidebar" onClick={(e) => e.stopPropagation()} aria-label="Carrinho de compras">
        <div className="cart-sidebar-head">
          <h3>Seu carrinho ({items.length})</h3>
          <button className="icon-btn" aria-label="Fechar carrinho" onClick={closeCart}><FiX /></button>
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon={<FiShoppingBag />}
            title="Seu carrinho está vazio"
            description="Adicione produtos para vê-los aqui."
            action={<Button size="sm" onClick={closeCart}>Começar a comprar</Button>}
          />
        ) : (
          <>
            <div className="cart-sidebar-items">
              {items.map((item) => <CartItem key={item.key} item={item} compact />)}
            </div>
            <div className="cart-sidebar-summary">
              <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {discount > 0 && <div className="summary-row"><span>Desconto</span><span>-{formatPrice(discount)}</span></div>}
              <div className="summary-row"><span>Frete</span><span>{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span></div>
              <div className="summary-row summary-total"><span>Total</span><span>{formatPrice(total)}</span></div>
              <div className="cart-sidebar-actions">
                <Button variant="secondary" full onClick={closeCart}>Continuar comprando</Button>
                <Link to="/carrinho" onClick={closeCart} className="btn btn-ghost btn-full">Ver carrinho</Link>
                <Link to="/checkout" onClick={closeCart} className="btn btn-primary btn-full">Finalizar compra</Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
