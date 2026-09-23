import "./WishlistContext.css";
import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useToast } from './ToastContext'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorage('nova:wishlist', [])
  const { showToast } = useToast()

  const toggle = (productId) => {
    setIds((prev) => {
      if (prev.includes(productId)) {
        showToast('Produto removido dos favoritos.', 'info')
        return prev.filter((id) => id !== productId)
      }
      showToast('Produto salvo nos favoritos.', 'info')
      return [...prev, productId]
    })
  }

  const isFavorite = (productId) => ids.includes(productId)

  return (
    <WishlistContext.Provider value={{ ids, toggle, isFavorite }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
