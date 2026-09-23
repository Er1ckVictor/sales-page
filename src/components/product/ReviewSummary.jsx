import "./ReviewSummary.css";
import Rating from '../common/Rating'

export default function ReviewSummary({ summary }) {
  return (
    <div className="review-summary">
      <div className="review-summary-score">
        <span className="review-summary-number">{summary.rating.toFixed(1)}</span>
        <Rating value={summary.rating} showCount={false} />
        <span className="text-xs text-muted">{summary.count} avaliações</span>
      </div>
      <div className="review-summary-bars">
        {summary.distribution.map((d) => (
          <div key={d.star} className="review-bar-row">
            <span>{d.star} ★</span>
            <div className="review-bar-track"><div className="review-bar-fill" style={{ width: `${d.percent}%` }} /></div>
            <span className="text-xs text-muted">{d.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
