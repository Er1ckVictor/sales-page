import "./UserMenu.css";
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi'
import { useUser } from '../../context/UserContext'

export default function UserMenu() {
  const { isAuthenticated, user, logout } = useUser()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/login" className="btn btn-ghost btn-sm">Entrar</Link>
        <Link to="/cadastro" className="btn btn-secondary btn-sm">Criar conta</Link>
      </div>
    )
  }

  return (
    <div className="user-menu" ref={ref}>
      <button className="user-menu-trigger" onClick={() => setOpen((o) => !o)} aria-haspopup="true" aria-expanded={open}>
        <img src={user.avatar} alt="" className="user-avatar" />
        <span className="user-name-desktop">{user.name.split(' ')[0]}</span>
      </button>
      {open && (
        <div className="user-menu-dropdown" role="menu">
          <div className="user-menu-head">
            <strong>{user.name}</strong>
            <span className="text-xs text-muted">{user.email}</span>
          </div>
          <Link to="/perfil" role="menuitem" onClick={() => setOpen(false)}><FiUser /> Perfil</Link>
          <Link to="/perfil/pedidos" role="menuitem" onClick={() => setOpen(false)}><FiPackage /> Meus pedidos</Link>
          <Link to="/favoritos" role="menuitem" onClick={() => setOpen(false)}><FiHeart /> Favoritos</Link>
          <Link to="/perfil/configuracoes" role="menuitem" onClick={() => setOpen(false)}><FiSettings /> Configurações</Link>
          <button role="menuitem" onClick={() => { logout(); setOpen(false) }}><FiLogOut /> Sair</button>
        </div>
      )}
    </div>
  )
}
