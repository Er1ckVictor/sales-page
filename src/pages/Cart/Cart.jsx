import "./Cart.css";
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import Breadcrumb from '../../components/common/Breadcrumb'
import CartItem from '../../components/cart/CartItem'
import EmptyState from '../../components/common/EmptyState'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/format'

export default function Cart() {
  const { items, subtotal, discount, shipping, total, coupon, applyCoupon, clearCoupon } = useCart()
  const [couponInput, setCouponInput] = useState('')
  const [couponStatus, setCouponStatus] = useState('idle')
  const navigate = useNavigate()

  const handleApply = (e) => {
    e.preventDefault()
    setCouponStatus('loading')
    setTimeout(() => {
      const ok = applyCoupon(couponInput)
      setCouponStatus(ok ? 'success' : 'error')
    }, 500)
  }

  return (
    <div className="section" style={{ paddingTop: 32 }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Início', to: '/' }, { label: 'Carrinho' }]} />
        <h1 className="mb-5">Meu carrinho</h1>

        {items.length === 0 ? (
          <EmptyState
            icon={<FiShoppingBag />}
            title="Seu carrinho está vazio"
            description="Adicione produtos para continuar sua compra."
            action={<Link to="/produtos" className="btn btn-primary btn-sm">Começar a comprar</Link>}
          />
        ) : (
          <div className="cart-page-layout">
            <div className="cart-page-items">
              {items.map((item) => <CartItem key={item.key} item={item} />)}
              <Link to="/produtos" className="btn btn-ghost btn-sm mt-3">Continuar comprando</Link>
            </div>

            <div className="cart-summary-card card">
              <h3 className="mb-3">Resumo da compra</h3>

              <form onSubmit={handleApply} className="mb-4">
                <label htmlFor="coupon" className="text-sm" style={{ fontWeight: 600 }}>Cupom de desconto</label>
                <div className="flex gap-2 mt-2">
                  <input id="coupon" className="input" placeholder="Digite seu cupom" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} />
                  <Button type="submit" variant="secondary" loading={couponStatus === 'loading'}>Aplicar</Button>
                </div>
                {coupon && <p className="text-sm mt-2" style={{ color: 'var(--color-success)' }}>Cupom {coupon.code} aplicado ({coupon.percent}% off). <button type="button" onClick={() => { clearCoupon(); setCouponInput(''); setCouponStatus('idle') }} className="text-xs" style={{ textDecoration: 'underline', background: 'none', border: 'none' }}>remover</button></p>}
                {!coupon && couponStatus === 'error' && <p className="field-error mt-2">Cupom inválido ou expirado.</p>}
                <p className="field-hint mt-2">Experimente o cupom NOVA10.</p>
              </form>

              <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {discount > 0 && <div className="summary-row"><span>Desconto</span><span>-{formatPrice(discount)}</span></div>}
              <div className="summary-row"><span>Frete</span><span>{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span></div>
              <div className="summary-row summary-total"><span>Total</span><span>{formatPrice(total)}</span></div>

              <Button full className="mt-4" onClick={() => navigate('/checkout')}>Finalizar compra</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
