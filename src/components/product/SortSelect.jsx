import "./SortSelect.css";
import Select from '../common/Select'

const options = [
  { value: 'relevance', label: 'Mais relevantes' },
  { value: 'bestsellers', label: 'Mais vendidos' },
  { value: 'newest', label: 'Mais recentes' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'rating', label: 'Melhor avaliação' },
]

export default function SortSelect({ value, onChange }) {
  return (
    <Select
      aria-label="Ordenar produtos"
      options={options}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="sort-select"
    />
  )
}
