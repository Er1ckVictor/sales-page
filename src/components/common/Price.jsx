import "./Price.css";
import { formatPrice, discountPercent } from '../../utils/format'

export default function Price({ price, oldPrice, installments, size = 'md' }) {
  const percent = discountPercent(price, oldPrice)
  return (
    <div className={`price-block price-${size}`}>
      <div className="price-row">
        <span className="price-current">{formatPrice(price)}</span>
        {percent > 0 && <span className="badge badge-sale">-{percent}%</span>}
      </div>
      {oldPrice > price && <span className="price-old">{formatPrice(oldPrice)}</span>}
      {installments && <span className="price-installments">{installments}</span>}
    </div>
  )
}
