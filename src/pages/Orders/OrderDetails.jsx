import "./OrderDetails.css";
import { useParams, Link } from 'react-router-dom'
import { orderStatuses, mockOrders } from '../../data/users'
import { formatPrice, formatDate } from '../../utils/format'
import Button from '../../components/common/Button'

export default function OrderDetails() {
  const { id } = useParams()
  const order = mockOrders.find((o) => o.id === id)

  if (!order) {
    return (
      <div className="card" style={{ padding: 28, textAlign: 'center' }}>
        <h2>Pedido não encontrado</h2>
        <Link to="/perfil/pedidos" className="btn btn-secondary btn-sm mt-4">Voltar para pedidos</Link>
      </div>
    )
  }

  const currentIndex = order.status === 'Cancelado' ? -1 : orderStatuses.indexOf(order.status)

  return (
    <div className="card" style={{ padding: 28 }}>
      <div className="section-head" style={{ marginBottom: 24 }}>
        <div>
          <h2>Pedido #{order.id}</h2>
          <p className="text-muted mt-1">Realizado em {formatDate(order.date)}</p>
        </div>
        <Link to="/perfil/pedidos" className="btn btn-ghost btn-sm">Voltar</Link>
      </div>

      {order.status === 'Cancelado' ? (
        <p className="badge badge-sale mb-6">Pedido cancelado</p>
      ) : (
        <ol className="order-timeline">
          {orderStatuses.map((status, idx) => (
            <li key={status} className={idx <= currentIndex ? 'is-done' : ''}>
              <span className="order-timeline-dot" />
              <span>{status}</span>
            </li>
          ))}
        </ol>
      )}

      <h3 className="mt-6 mb-3">Produtos</h3>
      {order.items.map((item, idx) => (
        <div key={idx} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-img" />
          <div className="cart-item-info">
            <span className="cart-item-name">{item.name}</span>
            <span className="text-xs text-muted">{item.variant} · Qtd. {item.qty}</span>
            <span className="cart-item-price">{formatPrice(item.price * item.qty)}</span>
          </div>
        </div>
      ))}

      <div className="mt-5">
        <div className="summary-row"><span>Endereço</span><span>{order.address.street}, {order.address.city}/{order.address.state}</span></div>
        <div className="summary-row"><span>Pagamento</span><span>{order.payment}</span></div>
        <div className="summary-row summary-total"><span>Total</span><span>{formatPrice(order.total)}</span></div>
      </div>

      <Button variant="secondary" className="mt-5">Acompanhar entrega</Button>
    </div>
  )
}
