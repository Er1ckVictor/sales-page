import "./Favorites.css";
import { FiHeart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/common/Breadcrumb'
import ProductGrid from '../../components/product/ProductGrid'
import EmptyState from '../../components/common/EmptyState'
import { useWishlist } from '../../context/WishlistContext'
import { getProductById } from '../../data/products'

export default function Favorites() {
  const { ids } = useWishlist()
  const products = ids.map(getProductById).filter(Boolean)

  return (
    <div className="section" style={{ paddingTop: 32 }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Início', to: '/' }, { label: 'Favoritos' }]} />
        <h1 className="mb-5">Meus favoritos</h1>
        {products.length === 0 ? (
          <EmptyState
            icon={<FiHeart />}
            title="Você ainda não possui favoritos."
            description="Toque no coração de um produto para salvá-lo aqui."
            action={<Link to="/produtos" className="btn btn-primary btn-sm">Explorar produtos</Link>}
          />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  )
}
