import "./Footer.css";
import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi'
import Newsletter from './Newsletter'

const columns = [
  { title: 'Loja', links: [['Início', '/'], ['Produtos', '/produtos'], ['Ofertas', '/ofertas'], ['Mais vendidos', '/produtos']] },
  { title: 'Categorias', links: [['Roupas', '/categoria/roupas'], ['Eletrônicos', '/categoria/eletronicos']] },
  { title: 'Atendimento', links: [['Contato', '/#faq'], ['FAQ', '/#faq'], ['Ajuda', '/#faq']] },
  { title: 'Institucional', links: [['Sobre nós', '/#'], ['Política de privacidade', '/#'], ['Termos de uso', '/#'], ['Política de troca', '/#']] },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <Newsletter />
      </div>
      <div className="container footer-columns">
        <div className="footer-brand">
          <span className="logo">NOVA</span>
          <p className="text-sm text-muted mt-2">Roupas e eletrônicos selecionados, com a mesma atenção ao detalhe em cada peça.</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="footer-col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map(([label, to]) => (
                <li key={label}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© 2026 NOVA Comércio de Produtos Ltda. Todos os direitos reservados.</span>
        <span>CNPJ 00.000.000/0001-00 · Interface para fins de demonstração</span>
      </div>
    </footer>
  )
}
