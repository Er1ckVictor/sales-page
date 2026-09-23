import "./ProfileLayout.css";
import { NavLink, Outlet } from 'react-router-dom'
import { FiUser, FiPackage, FiHeart, FiMapPin, FiSettings } from 'react-icons/fi'
import { useUser } from '../../context/UserContext'

const links = [
  { to: '/perfil', label: 'Meu perfil', icon: <FiUser />, end: true },
  { to: '/perfil/pedidos', label: 'Meus pedidos', icon: <FiPackage /> },
  { to: '/favoritos', label: 'Favoritos', icon: <FiHeart /> },
  { to: '/perfil/enderecos', label: 'Endereços', icon: <FiMapPin /> },
  { to: '/perfil/configuracoes', label: 'Configurações', icon: <FiSettings /> },
]

export default function ProfileLayout() {
  const { user } = useUser()
  return (
    <div className="section container" style={{ paddingTop: 32 }}>
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-sidebar-head">
            <img src={user.avatar} alt="" className="profile-avatar" />
            <div>
              <strong>{user.name}</strong>
              <p className="text-xs text-muted">{user.email}</p>
            </div>
          </div>
          <nav className="profile-nav">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `profile-nav-link ${isActive ? 'is-active' : ''}`}>
                {l.icon}{l.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="profile-content"><Outlet /></div>
      </div>
    </div>
  )
}
