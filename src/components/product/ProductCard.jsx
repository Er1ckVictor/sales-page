import "./ProductCard.css";
import { Link } from 'react-router-dom'
import Rating from '../common/Rating'
import Price from '../common/Price'
import WishlistButton from '../common/WishlistButton'
import Button from '../common/Button'
import { useCart } from '../../context/CartContext'
import { truncate } from '../../utils/format'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const outOfStock = product.stock === 0

  const handleAdd = (e) => {
    e.preventDefault()
    if (outOfStock) return
    addItem(product, {}, 1)
  }

  return (
    <Link to={`/produto/${product.id}`} className="product-card">
      <div className="product-card-media">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        <div className="product-card-badges">
          {product.bestSeller && <span className="badge badge-dark">Mais vendido</span>}
          {product.isNew && <span className="badge badge-new">Novo</span>}
          {outOfStock && <span className="badge badge-muted">Esgotado</span>}
        </div>
        <WishlistButton productId={product.id} className="product-card-wishlist" />
      </div>
      <div className="product-card-body">
        <span className="product-card-category">{product.category === 'roupas' ? 'Roupas' : 'Eletrônicos'}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-desc">{truncate(product.shortDescription, 64)}</p>
        <Rating value={product.rating} count={product.reviewCount} />
        <Price price={product.price} oldPrice={product.oldPrice} installments={product.installments} />
        <div className="product-card-actions">
          <Button size="sm" variant="primary" full disabled={outOfStock} onClick={handleAdd}>
            {outOfStock ? 'Indisponível' : 'Comprar'}
          </Button>
        </div>
      </div>
    </Link>
  )
}
