import "./Rating.css";
import { FiStar } from 'react-icons/fi'

export default function Rating({ value, count, size = 14, showCount = true }) {
  return (
    <div className="rating" aria-label={`Avaliação ${value} de 5 estrelas`}>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((n) => (
          <FiStar
            key={n}
            size={size}
            style={{
              fill: n <= Math.round(value) ? 'currentColor' : 'none',
              color: 'var(--color-black)',
            }}
          />
        ))}
      </div>
      <span className="rating-value">{value.toFixed(1)}</span>
      {showCount && count != null && <span className="rating-count">({count})</span>}
    </div>
  )
}
