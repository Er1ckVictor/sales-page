import "./MobileMenu.css";
import { Link } from 'react-router-dom'
import { FiX, FiHome, FiGrid, FiZap, FiHeart, FiUser, FiPackage, FiTag } from 'react-icons/fi'
import { useUser } from '../../context/UserContext'

const links = [
  { to: '/', label: 'Início', icon: <FiHome /> },
  { to: '/produtos', label: 'Produtos', icon: <FiGrid /> },
  { to: '/categoria/roupas', label: 'Roupas', icon: <FiTag /> },
  { to: '/categoria/eletronicos', label: 'Eletrônicos', icon: <FiTag /> },
  { to: '/ofertas', label: 'Ofertas', icon: <FiZap /> },
  { to: '/favoritos', label: 'Favoritos', icon: <FiHeart /> },
]

export default function MobileMenu({ onClose }) {
  const { isAuthenticated } = useUser()
  return (
    <div className="overlay overlay-left" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <span className="logo">NOVA</span>
          <button className="icon-btn" aria-label="Fechar menu" onClick={onClose}><FiX /></button>
        </div>
        <nav className="drawer-nav">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={onClose}>{l.icon}{l.label}</Link>
          ))}
          <hr />
          {isAuthenticated ? (
            <>
              <Link to="/perfil" onClick={onClose}><FiUser /> Minha conta</Link>
              <Link to="/perfil/pedidos" onClick={onClose}><FiPackage /> Pedidos</Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={onClose}><FiUser /> Entrar</Link>
              <Link to="/cadastro" onClick={onClose}><FiUser /> Criar conta</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  )
}
