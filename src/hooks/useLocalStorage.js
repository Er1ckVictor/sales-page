import { useState, useEffect } from 'react'

// Persiste estado no localStorage apenas como conveniência de sessão do navegador.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage indisponível — segue apenas em memória
    }
  }, [key, value])

  return [value, setValue]
}
