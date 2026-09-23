import "./CategoryCard.css";
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export default function CategoryCard({ category }) {
  return (
    <Link to={`/categoria/${category.slug}`} className="category-card">
      <div className="category-card-media">
        <img src={category.image} alt="" loading="lazy" />
      </div>
      <div className="category-card-body">
        <div>
          <h3>{category.name}</h3>
          <p>{category.description}</p>
          <span className="text-xs text-muted">{category.count} produtos</span>
        </div>
        <span className="category-card-cta">Explorar <FiArrowRight size={14} /></span>
      </div>
    </Link>
  )
}
