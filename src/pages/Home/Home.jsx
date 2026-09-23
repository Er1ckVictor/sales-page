import "./Home.css";
import { Link } from 'react-router-dom'
import { FiArrowRight, FiShield, FiTruck, FiHeadphones, FiRefreshCw, FiCreditCard } from 'react-icons/fi'
import { categories } from '../../data/categories'
import { getBestSellers, getOffers, getByCategory } from '../../data/products'
import CategoryCard from '../../components/product/CategoryCard'
import ProductGrid from '../../components/product/ProductGrid'
import RelatedProducts from '../../components/product/RelatedProducts'
import Accordion from '../../components/common/Accordion'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { getProductById } from '../../data/products'

const faqItems = [
  { question: 'Como faço uma compra?', answer: 'Escolha o produto, selecione a variação desejada e clique em "Adicionar ao carrinho" ou "Comprar agora". Depois é só seguir para o checkout.' },
  { question: 'Quais são as formas de pagamento?', answer: 'Cartão de crédito, PIX e boleto bancário, todos exibidos na etapa de pagamento do checkout.' },
  { question: 'Como acompanho meu pedido?', answer: 'Acesse "Meus pedidos" no seu perfil para ver o status e a linha do tempo de entrega.' },
  { question: 'Como funciona a troca?', answer: 'Você tem até 30 dias corridos após o recebimento para solicitar troca ou devolução, sem custo adicional.' },
  { question: 'Qual o prazo de entrega?', answer: 'O prazo varia por CEP e é calculado na página do produto e no carrinho antes da finalização da compra.' },
]

const benefits = [
  { icon: <FiShield />, title: 'Compra segura', desc: 'Ambiente protegido do início ao fim.' },
  { icon: <FiCreditCard />, title: 'Pagamento seguro', desc: 'Diversas formas, sem burocracia.' },
  { icon: <FiTruck />, title: 'Envio rápido', desc: 'Despacho em até 24h úteis.' },
  { icon: <FiHeadphones />, title: 'Suporte dedicado', desc: 'Time pronto para ajudar.' },
  { icon: <FiRefreshCw />, title: 'Troca facilitada', desc: 'Até 30 dias para trocar.' },
]

export default function Home() {
  const [recentIds] = useLocalStorage('nova:recently-viewed', [])
  const recentProducts = recentIds.map(getProductById).filter(Boolean)

  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Nova coleção + eletrônicos essenciais</span>
            <h1>Produtos que combinam com seu estilo.</h1>
            <p className="hero-sub">Roupas atemporais e eletrônicos pensados para o seu dia a dia, com curadoria cuidadosa e preço justo.</p>
            <div className="hero-ctas">
              <Link to="/produtos" className="btn btn-primary">Comprar agora</Link>
              <Link to="/ofertas" className="btn btn-secondary">Ver ofertas <FiArrowRight /></Link>
            </div>
          </div>
          <div className="hero-media">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80" alt="Produtos em destaque da coleção" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><h2>Categorias</h2><p>Explore por onde quiser começar.</p></div>
          </div>
          <div className="category-grid">
            {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><h2>Mais vendidos</h2><p>Os preferidos de quem já comprou com a gente.</p></div>
            <Link to="/produtos?ordenar=bestsellers" className="btn btn-ghost btn-sm">Ver mais <FiArrowRight /></Link>
          </div>
          <ProductGrid products={getBestSellers(8)} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><h2>Ofertas</h2><p>Descontos por tempo limitado.</p></div>
            <Link to="/ofertas" className="btn btn-ghost btn-sm">Ver todas <FiArrowRight /></Link>
          </div>
          <ProductGrid products={getOffers(8)} />
        </div>
      </section>

      <section className="section">
        <div className="container promo-banner">
          <div>
            <span className="eyebrow">Até 40% OFF</span>
            <h2>Ofertas da semana em eletrônicos selecionados.</h2>
          </div>
          <Link to="/ofertas" className="btn btn-primary">Aproveitar</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><h2>Roupas</h2><p>Peças versáteis para compor o dia a dia.</p></div>
            <Link to="/categoria/roupas" className="btn btn-ghost btn-sm">Ver mais roupas <FiArrowRight /></Link>
          </div>
          <ProductGrid products={getByCategory('roupas').slice(0, 4)} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><h2>Eletrônicos</h2><p>Tecnologia para o seu dia a dia.</p></div>
            <Link to="/categoria/eletronicos" className="btn btn-ghost btn-sm">Ver mais eletrônicos <FiArrowRight /></Link>
          </div>
          <ProductGrid products={getByCategory('eletronicos').slice(0, 4)} />
        </div>
      </section>

      {recentProducts.length > 0 && (
        <section className="section">
          <div className="container">
            <RelatedProducts title="Vistos recentemente" products={recentProducts} />
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="benefits-grid">
            {benefits.map((b) => (
              <div key={b.title} className="benefit-item">
                <span className="benefit-icon">{b.icon}</span>
                <div>
                  <strong>{b.title}</strong>
                  <p className="text-sm text-muted">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container faq-layout">
          <div>
            <h2>Perguntas frequentes</h2>
            <p className="text-muted mt-2">Tudo o que você precisa saber antes de comprar.</p>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>
    </div>
  )
}
