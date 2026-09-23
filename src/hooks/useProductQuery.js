import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products as allProducts } from '../data/products'
import { defaultFilters } from '../components/product/FilterPanel'

const PAGE_SIZE = 8

export function useProductQuery({ baseCategory } = {}) {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('busca') || ''
  const [filters, setFilters] = useState(defaultFilters)
  const [sort, setSort] = useState(searchParams.get('ordenar') || 'relevance')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let list = [...allProducts]
    if (baseCategory) list = list.filter((p) => p.category === baseCategory)
    if (searchTerm) list = list.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    if (filters.categories.length) list = list.filter((p) => filters.categories.includes(p.category))
    if (filters.priceRange) list = list.filter((p) => p.price >= filters.priceRange.min && p.price < filters.priceRange.max)
    if (filters.minRating) list = list.filter((p) => p.rating >= filters.minRating)
    if (filters.onlyOffers) list = list.filter((p) => p.oldPrice)
    if (filters.inStockOnly) list = list.filter((p) => p.stock > 0)

    switch (sort) {
      case 'bestsellers': list = list.filter((p) => p.bestSeller).concat(list.filter((p) => !p.bestSeller)); break
      case 'newest': list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break
      default: break
    }
    return list
  }, [baseCategory, searchTerm, filters, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const clearFilters = () => { setFilters(defaultFilters); setPage(1) }

  return {
    searchTerm, filters, setFilters: (fn) => { setFilters(fn); setPage(1) }, sort,
    setSort: (v) => { setSort(v); setPage(1) },
    page, setPage, totalPages, results: pageItems, totalCount: filtered.length, clearFilters,
  }
}
