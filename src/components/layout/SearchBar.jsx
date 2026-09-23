import "./SearchBar.css";
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiX } from 'react-icons/fi'
import { products } from '../../data/products'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export default function SearchBar({ onNavigate }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [recent, setRecent] = useLocalStorage('nova:recent-searches', [])
  const navigate = useNavigate()
  const boxRef = useRef(null)

  const suggestions = query.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : []

  useEffect(() => {
    const handler = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setFocused(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const runSearch = (term) => {
    const value = term.trim()
    if (!value) return
    setRecent((prev) => [value, ...prev.filter((r) => r !== value)].slice(0, 5))
    setFocused(false)
    onNavigate?.()
    navigate(`/produtos?busca=${encodeURIComponent(value)}`)
  }

  return (
    <div className="searchbar" ref={boxRef}>
      <FiSearch className="searchbar-icon" aria-hidden />
      <input
        type="search"
        className="searchbar-input"
        placeholder="Buscar produtos, marcas e categorias"
        aria-label="Buscar produtos"
        value={query}
        onFocus={() => setFocused(true)}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && runSearch(query)}
      />
      {query && (
        <button aria-label="Limpar busca" className="searchbar-clear" onClick={() => setQuery('')}>
          <FiX />
        </button>
      )}

      {focused && (query.length > 0 || recent.length > 0) && (
        <div className="searchbar-panel">
          {query.length > 0 && (
            suggestions.length > 0 ? (
              <ul>
                {suggestions.map((p) => (
                  <li key={p.id}>
                    <button onClick={() => { onNavigate?.(); navigate(`/produto/${p.id}`) }}>
                      <img src={p.images[0]} alt="" />
                      <span>{p.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="searchbar-empty">Nenhum resultado para "{query}".</p>
            )
          )}
          {query.length === 0 && recent.length > 0 && (
            <div>
              <span className="searchbar-panel-label">Pesquisas recentes</span>
              <ul>
                {recent.map((term) => (
                  <li key={term}>
                    <button onClick={() => runSearch(term)}>{term}</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
