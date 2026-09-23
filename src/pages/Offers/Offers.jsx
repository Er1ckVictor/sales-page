import "./Offers.css";
import Breadcrumb from '../../components/common/Breadcrumb'
import ProductGrid from '../../components/product/ProductGrid'
import { getOffers } from '../../data/products'

export default function Offers() {
  const items = getOffers(20)
  return (
    <div className="section" style={{ paddingTop: 32 }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Início', to: '/' }, { label: 'Ofertas' }]} />
        <div className="promo-banner mb-6">
          <div>
            <span className="eyebrow">Por tempo limitado</span>
            <h2>Até 40% OFF em roupas e eletrônicos selecionados.</h2>
          </div>
        </div>
        <h1 className="mb-2">Ofertas</h1>
        <p className="text-muted mb-5">{items.length} produtos em promoção</p>
        <ProductGrid products={items} />
      </div>
    </div>
  )
}
