import "./NotFound.css";
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center', paddingTop: 96, paddingBottom: 96 }}>
      <span className="eyebrow">Erro 404</span>
      <h1 className="mt-2">Página não encontrada</h1>
      <p className="text-muted mt-2 mb-6">O endereço que você tentou acessar não existe ou foi movido.</p>
      <div className="flex gap-3" style={{ justifyContent: 'center' }}>
        <Link to="/" className="btn btn-secondary">Voltar ao início</Link>
        <Link to="/produtos" className="btn btn-primary">Explorar produtos</Link>
      </div>
    </div>
  )
}
