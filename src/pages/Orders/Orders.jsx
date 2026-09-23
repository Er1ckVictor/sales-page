import "./Orders.css";
import { Link } from 'react-router-dom'
import { FiPackage } from 'react-icons/fi'
import EmptyState from '../../components/common/EmptyState'
import { mockOrders } from '../../data/users'
import { formatPrice, formatDate } from '../../utils/format'

const statusVariant = {
  'Pedido realizado': 'badge-outline',
  'Pagamento aprovado': 'badge-outline',
  'Em preparação': 'badge-outline',
  'Enviado': 'badge-dark',
  'Entregue': 'badge-new',
  'Cancelado': 'badge-sale',
}

export default function Orders() {
  if (mockOrders.length === 0) {
    return <EmptyState icon={<FiPackage />} title="Nenhum pedido por aqui" description="Seus pedidos aparecerão nesta página." action={<Link to="/produtos" className="btn btn-primary btn-sm">Começar a comprar</Link>} />
  }

  return (
    <div className="card" style={{ padding: 28 }}>
      <h2 className="mb-1">Meus pedidos</h2>
      <p className="text-muted mb-5">Acompanhe o status das suas compras.</p>
      <div className="orders-list">
        {mockOrders.map((order) => (
          <Link to={`/perfil/pedidos/${order.id}`} key={order.id} className="order-row">
            <div>
              <strong>Pedido #{order.id}</strong>
              <p className="text-xs text-muted mt-1">{formatDate(order.date)} · {order.items.length} produto(s)</p>
            </div>
            <span className={`badge ${statusVariant[order.status]}`}>{order.status}</span>
            <strong>{formatPrice(order.total)}</strong>
          </Link>
        ))}
      </div>
    </div>
  )
}
