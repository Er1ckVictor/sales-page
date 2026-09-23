import "./RelatedProducts.css";
import ProductCard from './ProductCard'

export default function RelatedProducts({ title, products }) {
  if (!products.length) return null
  return (
    <div className="section-head-sm">
      <h3 className="mb-4">{title}</h3>
      <div className="scroll-row">
        {products.map((p) => (
          <div key={p.id} style={{ width: 240 }}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}
