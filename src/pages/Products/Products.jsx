import "./Products.css";
import { useState } from 'react'
import { FiSliders } from 'react-icons/fi'
import Breadcrumb from '../../components/common/Breadcrumb'
import FilterPanel from '../../components/product/FilterPanel'
import SortSelect from '../../components/product/SortSelect'
import ProductGrid from '../../components/product/ProductGrid'
import Pagination from '../../components/common/Pagination'
import LoadingState from '../../components/common/LoadingState'
import EmptyState from '../../components/common/EmptyState'
import Button from '../../components/common/Button'
import { useProductQuery } from '../../hooks/useProductQuery'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

export default function Products() {
  const [searchParams] = useSearchParams()
  const query = useProductQuery({})
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [query.filters, query.sort, query.page, query.searchTerm])

  const term = searchParams.get('busca')

  return (
    <div className="section" style={{ paddingTop: 32 }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Início', to: '/' }, { label: 'Produtos' }]} />
        <h1 className="mb-2">{term ? `Resultados para "${term}"` : 'Todos os produtos'}</h1>
        <p className="text-muted mb-5">{query.totalCount} produtos encontrados</p>

        <div className="products-toolbar">
          <Button variant="secondary" size="sm" className="filter-toggle-btn" onClick={() => setDrawerOpen(true)}>
            <FiSliders /> Filtros
          </Button>
          <SortSelect value={query.sort} onChange={query.setSort} />
        </div>

        <div className="products-layout">
          <div className={drawerOpen ? 'filter-panel is-open filter-panel-mobile' : ''} style={{ display: 'contents' }}>
            <div className="filter-panel-desktop">
              <FilterPanel filters={query.filters} setFilters={query.setFilters} onClear={query.clearFilters} />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            {loading ? (
              <LoadingState count={8} />
            ) : query.results.length === 0 ? (
              <EmptyState
                title="Não encontramos produtos para sua busca."
                description="Tente ajustar os filtros ou pesquisar por outro termo."
                action={<Button variant="secondary" size="sm" onClick={query.clearFilters}>Limpar filtros</Button>}
              />
            ) : (
              <>
                <ProductGrid products={query.results} />
                <Pagination page={query.page} totalPages={query.totalPages} onChange={query.setPage} />
              </>
            )}
          </div>
        </div>

        {drawerOpen && (
          <div className="overlay overlay-left" onClick={() => setDrawerOpen(false)}>
            <div className="drawer" onClick={(e) => e.stopPropagation()} style={{ padding: 20 }}>
              <FilterPanel filters={query.filters} setFilters={query.setFilters} onClear={() => { query.clearFilters(); setDrawerOpen(false) }} />
              <Button full className="mt-4" onClick={() => setDrawerOpen(false)}>Ver resultados</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
