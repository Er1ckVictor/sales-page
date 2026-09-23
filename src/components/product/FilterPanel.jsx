import "./FilterPanel.css";
import Checkbox from '../common/Checkbox'
import Button from '../common/Button'

const priceRanges = [
  { id: 'r1', label: 'Até R\$ 50', min: 0, max: 50 },
  { id: 'r2', label: 'R\$ 50 – R\$ 100', min: 50, max: 100 },
  { id: 'r3', label: 'R\$ 100 – R\$ 500', min: 100, max: 500 },
  { id: 'r4', label: 'Acima de R\$ 500', min: 500, max: Infinity },
]

export default function FilterPanel({ filters, setFilters, onClear }) {
  const toggleCategory = (cat) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(cat) ? f.categories.filter((c) => c !== cat) : [...f.categories, cat],
    }))
  }
  const setPriceRange = (range) => {
    setFilters((f) => ({ ...f, priceRange: f.priceRange?.id === range.id ? null : range }))
  }
  const setMinRating = (rating) => setFilters((f) => ({ ...f, minRating: f.minRating === rating ? null : rating }))

  return (
    <aside className="filter-panel" aria-label="Filtros de produtos">
      <div className="filter-group">
        <h4>Categoria</h4>
        <Checkbox label="Roupas" checked={filters.categories.includes('roupas')} onChange={() => toggleCategory('roupas')} />
        <Checkbox label="Eletrônicos" checked={filters.categories.includes('eletronicos')} onChange={() => toggleCategory('eletronicos')} />
      </div>

      <div className="filter-group">
        <h4>Preço</h4>
        {priceRanges.map((r) => (
          <Checkbox key={r.id} label={r.label} checked={filters.priceRange?.id === r.id} onChange={() => setPriceRange(r)} />
        ))}
      </div>

      <div className="filter-group">
        <h4>Avaliação</h4>
        {[5, 4, 3].map((star) => (
          <Checkbox
            key={star}
            label={star === 5 ? '5 estrelas' : `${star}+ estrelas`}
            checked={filters.minRating === star}
            onChange={() => setMinRating(star)}
          />
        ))}
      </div>

      <div className="filter-group">
        <h4>Promoção</h4>
        <Checkbox
          label="Somente ofertas"
          checked={filters.onlyOffers}
          onChange={() => setFilters((f) => ({ ...f, onlyOffers: !f.onlyOffers }))}
        />
      </div>

      <div className="filter-group">
        <h4>Disponibilidade</h4>
        <Checkbox
          label="Em estoque"
          checked={filters.inStockOnly}
          onChange={() => setFilters((f) => ({ ...f, inStockOnly: !f.inStockOnly }))}
        />
      </div>

      <Button variant="secondary" size="sm" full onClick={onClear}>Limpar filtros</Button>
    </aside>
  )
}

export const defaultFilters = { categories: [], priceRange: null, minRating: null, onlyOffers: false, inStockOnly: false }
