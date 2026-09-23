import "./Header.css";
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiHeart, FiShoppingBag } from 'react-icons/fi'
import SearchBar from './SearchBar'
import UserMenu from './UserMenu'
import MobileMenu from './MobileMenu'
import './Header.css'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

const navLinks = [
  { to: '/', label: 'Início', end: true },
  { to: '/categoria/roupas', label: 'Roupas' },
  { to: '/categoria/eletronicos', label: 'Eletrônicos' },
  { to: '/ofertas', label: 'Ofertas' },
  { to: '/produtos', label: 'Mais vendidos' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count, openCart } = useCart()
  const { ids } = useWishlist()

  return (
    <header className="site-header">
      <div className="container header-top">
        <button className="icon-btn header-menu-btn" aria-label="Abrir menu" onClick={() => setMobileOpen(true)}>
          <FiMenu />
        </button>

        <Link to="/" className="logo">NOVA</Link>

        <div className="header-search-desktop"><SearchBar /></div>

        <div className="header-actions">
          <div className="header-user-desktop"><UserMenu /></div>
          <Link to="/favoritos" className="icon-btn header-icon-link" aria-label={`Favoritos (${ids.length})`}>
            <FiHeart />
            {ids.length > 0 && <span className="header-badge">{ids.length}</span>}
          </Link>
          <button className="icon-btn header-icon-link" aria-label={`Carrinho (${count} itens)`} onClick={openCart}>
            <FiShoppingBag />
            {count > 0 && <span className="header-badge">{count}</span>}
          </button>
        </div>
      </div>

      <div className="header-search-mobile container"><SearchBar /></div>

      <nav className="header-nav container" aria-label="Categorias principais">
        {navLinks.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `header-nav-link ${isActive ? 'is-active' : ''}`}>
            {l.label}
          </NavLink>
        ))}
      </nav>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  )
}
