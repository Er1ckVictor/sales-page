import "./WishlistButton.css";
import { FiHeart } from 'react-icons/fi'
import { useWishlist } from '../../context/WishlistContext'

export default function WishlistButton({ productId, className = '' }) {
  const { isFavorite, toggle } = useWishlist()
  const active = isFavorite(productId)
  return (
    <button
      type="button"
      className={`icon-btn wishlist-btn ${active ? 'is-active' : ''} ${className}`}
      aria-pressed={active}
      aria-label={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(productId) }}
    >
      <FiHeart style={{ fill: active ? 'currentColor' : 'none' }} />
    </button>
  )
}
