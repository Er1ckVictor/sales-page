import "./ProductDetails.css";
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiTruck, FiHeart } from 'react-icons/fi'
import Breadcrumb from '../../components/common/Breadcrumb'
import ProductGallery from '../../components/product/ProductGallery'
import Rating from '../../components/common/Rating'
import Price from '../../components/common/Price'
import Button from '../../components/common/Button'
import WishlistButton from '../../components/common/WishlistButton'
import ReviewSummary from '../../components/product/ReviewSummary'
import ReviewCard from '../../components/product/ReviewCard'
import RelatedProducts from '../../components/product/RelatedProducts'
import Modal from '../../components/common/Modal'
import { getProductById, getRelatedProducts } from '../../data/products'
import { reviewsByProduct, defaultReviewSummary } from '../../data/reviews'
import { useCart } from '../../context/CartContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { getProductById as byId } from '../../data/products'

const categoryLabel = { roupas: 'Roupas', eletronicos: 'Eletrônicos' }
const tabs = ['Descrição', 'Especificações', 'Características', 'Entrega']

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { addItem } = useCart()

  const [variant, setVariant] = useState({})
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState(0)
  const [cep, setCep] = useState('')
  const [shippingResult, setShippingResult] = useState(null)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [recentIds, setRecentIds] = useLocalStorage('nova:recently-viewed', [])

  useEffect(() => {
    if (!product) return
    window.scrollTo(0, 0)
    setRecentIds((prev) => [product.id, ...prev.filter((pid) => pid !== product.id)].slice(0, 8))
    setVariant({})
    setQty(1)
    setShippingResult(null)
    setActiveTab(0)
  }, [id])

  if (!product) {
    return (
      <div className="section container" style={{ textAlign: 'center', paddingTop: 80 }}>
        <h2>Produto não encontrado</h2>
        <Button className="mt-4" onClick={() => navigate('/produtos')}>Explorar produtos</Button>
      </div>
    )
  }

  const outOfStock = product.stock === 0
  const related = getRelatedProducts(product)
  const reviews = reviewsByProduct[product.id] || []
  const summary = defaultReviewSummary(product.rating, product.reviewCount)
  const recentProducts = recentIds.filter((pid) => pid !== product.id).map(byId).filter(Boolean)

  const calculateShipping = (e) => {
    e.preventDefault()
    if (cep.replace(/\D/g, '').length < 8) { setShippingResult({ error: true }); return }
    setShippingResult({ carrier: 'NOVA Log Express', days: '3 a 5 dias úteis', price: product.price >= 300 ? 'Grátis' : 'R$ 19,90' })
  }

  return (
    <div className="section" style={{ paddingTop: 32 }}>
      <div className="container">
        <Breadcrumb items={[
          { label: 'Início', to: '/' },
          { label: categoryLabel[product.category], to: `/categoria/${product.category}` },
          { label: product.name },
        ]} />

        <div className="pdp-layout">
          <ProductGallery images={product.images} name={product.name} />

          <div className="pdp-info">
            <span className="product-card-category">{categoryLabel[product.category]}</span>
            <h1>{product.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Rating value={product.rating} count={product.reviewCount} />
              <span className="text-xs text-muted">SKU {product.sku}</span>
            </div>
            <div className="mt-4"><Price price={product.price} oldPrice={product.oldPrice} installments={product.installments} size="lg" /></div>
            <p className="text-sm mt-1" style={{ color: outOfStock ? 'var(--color-error)' : 'var(--color-success)' }}>
              {outOfStock ? 'Produto esgotado' : `Em estoque — ${product.stock} unidades disponíveis`}
            </p>

            {Object.entries(product.variations).map(([group, options]) => (
              <div key={group} className="mt-4">
                <span className="text-sm" style={{ fontWeight: 600 }}>{group}</span>
                <div className="flex gap-2 mt-2" style={{ flexWrap: 'wrap' }}>
                  {options.map((opt) => (
                    <button
                      key={opt}
                      className="tag"
                      aria-pressed={variant[group] === opt}
                      onClick={() => setVariant((v) => ({ ...v, [group]: opt }))}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="pdp-purchase mt-5">
              <div className="qty-stepper">
                <button aria-label="Diminuir quantidade" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
                <span>{qty}</span>
                <button aria-label="Aumentar quantidade" onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
              <Button variant="secondary" disabled={outOfStock} onClick={() => addItem(product, variant, qty)}>Adicionar ao carrinho</Button>
              <Button disabled={outOfStock} onClick={() => { addItem(product, variant, qty); navigate('/checkout') }}>Comprar agora</Button>
              <WishlistButton productId={product.id} className="pdp-wishlist-btn" />
            </div>

            <form className="shipping-box mt-6" onSubmit={calculateShipping}>
              <span className="text-sm" style={{ fontWeight: 600 }}><FiTruck /> Calcule o frete</span>
              <div className="flex gap-2 mt-2">
                <input className="input" placeholder="Digite seu CEP" value={cep} onChange={(e) => setCep(e.target.value)} maxLength={9} />
                <Button type="submit" variant="secondary">Calcular</Button>
              </div>
              {shippingResult?.error && <p className="field-error mt-2">CEP inválido. Verifique e tente novamente.</p>}
              {shippingResult && !shippingResult.error && (
                <p className="text-sm mt-2">{shippingResult.carrier} · {shippingResult.days} · <strong>{shippingResult.price}</strong></p>
              )}
            </form>
          </div>
        </div>

        <div className="pdp-tabs mt-7">
          <div className="pdp-tabs-nav" role="tablist">
            {tabs.map((t, idx) => (
              <button key={t} role="tab" aria-selected={activeTab === idx} className={`pdp-tab ${activeTab === idx ? 'is-active' : ''}`} onClick={() => setActiveTab(idx)}>
                {t}
              </button>
            ))}
          </div>
          <div className="pdp-tab-panel">
            {activeTab === 0 && <p>{product.description}</p>}
            {activeTab === 1 && (
              <dl className="specs-list">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            )}
            {activeTab === 2 && <p>Peça selecionada com curadoria NOVA por qualidade de material, acabamento e durabilidade no uso diário.</p>}
            {activeTab === 3 && <p>Envio em até 24h úteis após a confirmação do pagamento. Prazo de entrega calculado por CEP na etapa de frete acima.</p>}
          </div>
        </div>

        <div className="mt-7">
          <div className="section-head">
            <h2>Avaliações</h2>
            <Button variant="secondary" size="sm" onClick={() => setReviewModalOpen(true)}>Avaliar produto</Button>
          </div>
          <ReviewSummary summary={summary} />
          {reviews.length === 0 ? (
            <p className="text-muted mt-4">Ainda não há comentários para este produto.</p>
          ) : (
            <div className="mt-4">{reviews.map((r) => <ReviewCard key={r.id} review={r} />)}</div>
          )}
        </div>

        <div className="mt-7"><RelatedProducts title="Você também pode gostar" products={related} /></div>
        {recentProducts.length > 0 && <div className="mt-7"><RelatedProducts title="Vistos recentemente" products={recentProducts} /></div>}
      </div>

      {reviewModalOpen && (
        <Modal title="Avaliar produto" onClose={() => setReviewModalOpen(false)} footer={
          <>
            <Button variant="ghost" onClick={() => setReviewModalOpen(false)}>Cancelar</Button>
            <Button onClick={() => setReviewModalOpen(false)}>Enviar avaliação</Button>
          </>
        }>
          <div className="field mb-3">
            <label>Sua nota</label>
            <div className="flex gap-1"><Rating value={5} showCount={false} size={22} /></div>
          </div>
          <div className="field">
            <label htmlFor="review-comment">Comentário</label>
            <textarea id="review-comment" className="input" rows={4} placeholder="Conte como foi sua experiência com o produto" />
          </div>
        </Modal>
      )}
    </div>
  )
}
