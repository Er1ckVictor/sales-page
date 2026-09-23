import "./ReviewCard.css";
import Rating from '../common/Rating'
import { formatDate } from '../../utils/format'

export default function ReviewCard({ review }) {
  const initials = review.author.split(' ').map((n) => n[0]).slice(0, 2).join('')
  return (
    <div className="review-card">
      <div className="review-avatar" aria-hidden>{initials}</div>
      <div className="review-body">
        <div className="flex items-center justify-between gap-2">
          <strong>{review.author}</strong>
          <span className="text-xs text-muted">{formatDate(review.date)}</span>
        </div>
        <Rating value={review.rating} showCount={false} size={12} />
        <p className="review-comment">{review.comment}</p>
        {review.variant && <span className="text-xs text-muted">Variação: {review.variant}</span>}
      </div>
    </div>
  )
}
