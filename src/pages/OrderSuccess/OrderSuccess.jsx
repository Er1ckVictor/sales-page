import "./OrderSuccess.css";
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'
import Button from '../../components/common/Button'
import { formatPrice } from '../../utils/format'

export default function OrderSuccess() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('nova:last-order')
      if (raw) setOrder(JSON.parse(raw))
    } catch { /* ignore */ }
  }, [])

  return (
    <div className="section container" style={{ paddingTop: 48, maxWidth: 640, margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <FiCheckCircle size={52} style={{ color: 'var(--color-success)' }} />
        <h1 className="mt-4">Pedido realizado com sucesso</h1>
        {order && <p className="text-muted mt-2">Número do pedido: <strong>#{order.number}</strong></p>}
      </div>

      {order && (
        <div className="card mt-6" style={{ padding: 24 }}>
          {order.items.map((i) => (
            <div key={i.key} className="summary-row"><span>{i.qty}x {i.name}</span><span>{formatPrice(i.price * i.qty)}</span></div>
          ))}
          <div className="summary-row summary-total"><span>Total</span><span>{formatPrice(order.total)}</span></div>
          <p className="text-sm text-muted mt-4">Pagamento: {order.payment}</p>
          <p className="text-sm text-muted mt-1">Endereço de entrega: {order.address}</p>
        </div>
      )}

      <div className="flex gap-3 mt-6" style={{ justifyContent: 'center' }}>
        <Link to="/perfil/pedidos" className="btn btn-secondary">Acompanhar pedido</Link>
        <Link to="/produtos" className="btn btn-primary">Continuar comprando</Link>
      </div>
    </div>
  )
}
