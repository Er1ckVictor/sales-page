import "./Category.css";
import { useParams, Link } from 'react-router-dom'
import Breadcrumb from '../../components/common/Breadcrumb'
import ProductGrid from '../../components/product/ProductGrid'
import EmptyState from '../../components/common/EmptyState'
import { getByCategory } from '../../data/products'
import { categories } from '../../data/categories'

const labels = { roupas: 'Roupas', eletronicos: 'Eletrônicos' }

export default function Category() {
  const { categoria } = useParams()
  const label = labels[categoria] || categories.find((c) => c.slug === categoria)?.name || 'Categoria'
  const items = getByCategory(categoria)

  return (
    <div className="section" style={{ paddingTop: 32 }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Início', to: '/' }, { label } ]} />
        <h1 className="mb-2">{label}</h1>
        <p className="text-muted mb-5">{items.length} produtos nesta categoria</p>
        {items.length === 0 ? (
          <EmptyState title="Ainda não há produtos aqui" description="Novidades chegam em breve nesta categoria." action={<Link to="/produtos" className="btn btn-secondary btn-sm">Ver todos os produtos</Link>} />
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </div>
  )
}
