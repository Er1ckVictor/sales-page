import "./CartContext.css";
import { createContext, useContext, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useToast } from './ToastContext'

const CartContext = createContext(null)

const lineKey = (productId, variant) => `${productId}::${JSON.stringify(variant)}`

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('nova:cart', [])
  const [isOpen, setIsOpen] = useState(false)
  const [coupon, setCoupon] = useState(null)
  const { showToast } = useToast()

  const addItem = (product, variant = {}, qty = 1) => {
    const key = lineKey(product.id, variant)
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          image: product.images[0],
          price: product.price,
          variant,
          qty,
        },
      ]
    })
    showToast('Produto adicionado ao carrinho.', 'success')
    setIsOpen(true)
  }

  const updateQty = (key, qty) => {
    if (qty < 1) return
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty } : i)))
  }

  const removeItem = (key) => {
    setItems((prev) => prev.filter((i) => i.key !== key))
    showToast('Produto removido do carrinho.', 'info')
  }

  const applyCoupon = (code) => {
    const normalized = code.trim().toUpperCase()
    if (normalized === 'NOVA10') {
      setCoupon({ code: normalized, percent: 10 })
      showToast('Cupom aplicado com sucesso.', 'success')
      return true
    }
    setCoupon(null)
    showToast('Cupom inválido ou expirado.', 'error')
    return false
  }

  const clearCoupon = () => setCoupon(null)
  const clearCart = () => {
    setItems([])
    setCoupon(null)
  }

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])
  const discount = coupon ? Math.round(subtotal * (coupon.percent / 100) * 100) / 100 : 0
  const shipping = items.length === 0 ? 0 : subtotal >= 300 ? 0 : 24.9
  const total = Math.max(subtotal - discount + shipping, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  const value = {
    items, count, subtotal, discount, shipping, total, coupon,
    isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
    addItem, updateQty, removeItem, applyCoupon, clearCoupon, clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
