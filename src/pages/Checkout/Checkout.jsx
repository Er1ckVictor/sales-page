import "./Checkout.css";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCreditCard, FiSmartphone, FiFileText } from 'react-icons/fi'
import Breadcrumb from '../../components/common/Breadcrumb'
import CheckoutSteps from '../../components/checkout/CheckoutSteps'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/format'

const paymentOptions = [
  { id: 'card', label: 'Cartão de crédito', icon: <FiCreditCard /> },
  { id: 'pix', label: 'PIX', icon: <FiSmartphone /> },
  { id: 'boleto', label: 'Boleto', icon: <FiFileText /> },
]

export default function Checkout() {
  const { items, subtotal, discount, shipping, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [payment, setPayment] = useState('card')
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', cep: '', endereco: '', numero: '', complemento: '', cidade: '', estado: '' })

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const next = () => setStep((s) => Math.min(4, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))

  const finish = () => {
    const orderNumber = String(Math.floor(40000 + Math.random() * 9000))
    const snapshot = {
      number: orderNumber,
      items,
      total,
      payment: paymentOptions.find((p) => p.id === payment)?.label,
      address: `${form.endereco || 'Endereço informado'}, ${form.numero} — ${form.cidade}/${form.estado}`,
    }
    try { window.localStorage.setItem('nova:last-order', JSON.stringify(snapshot)) } catch { /* ignore */ }
    clearCart()
    navigate('/pedido/sucesso')
  }

  if (items.length === 0 && step < 4) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <h2>Seu carrinho está vazio</h2>
        <p className="text-muted mt-2">Adicione produtos antes de ir para o checkout.</p>
        <Button className="mt-4" onClick={() => navigate('/produtos')}>Explorar produtos</Button>
      </div>
    )
  }

  return (
    <div className="section" style={{ paddingTop: 32 }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Início', to: '/' }, { label: 'Carrinho', to: '/carrinho' }, { label: 'Checkout' }]} />
        <h1 className="mb-6">Finalizar compra</h1>
        <CheckoutSteps current={step} />

        <div className="checkout-layout">
          <div className="checkout-form">
            {step === 1 && (
              <div className="form-grid">
                <Input label="Nome completo" value={form.nome} onChange={update('nome')} placeholder="Seu nome" />
                <Input label="E-mail" type="email" value={form.email} onChange={update('email')} placeholder="voce@email.com" />
                <Input label="Telefone" value={form.telefone} onChange={update('telefone')} placeholder="(00) 00000-0000" />
              </div>
            )}

            {step === 2 && (
              <div className="form-grid">
                <Input label="CEP" value={form.cep} onChange={update('cep')} placeholder="00000-000" />
                <Input label="Endereço" value={form.endereco} onChange={update('endereco')} placeholder="Rua, avenida..." />
                <Input label="Número" value={form.numero} onChange={update('numero')} />
                <Input label="Complemento" value={form.complemento} onChange={update('complemento')} placeholder="Opcional" />
                <Input label="Cidade" value={form.cidade} onChange={update('cidade')} />
                <Input label="Estado" value={form.estado} onChange={update('estado')} placeholder="UF" />
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="payment-options">
                  {paymentOptions.map((opt) => (
                    <button key={opt.id} className={`payment-option ${payment === opt.id ? 'is-active' : ''}`} onClick={() => setPayment(opt.id)}>
                      {opt.icon}<span>{opt.label}</span>
                    </button>
                  ))}
                </div>
                {payment === 'card' && (
                  <div className="form-grid mt-4">
                    <Input label="Número do cartão" placeholder="0000 0000 0000 0000" />
                    <Input label="Nome impresso no cartão" placeholder="Como no cartão" />
                    <Input label="Validade" placeholder="MM/AA" />
                    <Input label="CVV" placeholder="123" />
                  </div>
                )}
                {payment === 'pix' && <p className="text-sm text-muted mt-4">Um QR Code PIX seria exibido aqui após confirmar o pedido (somente interface).</p>}
                {payment === 'boleto' && <p className="text-sm text-muted mt-4">O boleto seria gerado e enviado por e-mail após a confirmação (somente interface).</p>}
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="mb-3">Revise seu pedido</h3>
                {items.map((i) => (
                  <div key={i.key} className="summary-row"><span>{i.qty}x {i.name}</span><span>{formatPrice(i.price * i.qty)}</span></div>
                ))}
                <p className="text-sm text-muted mt-3">Entrega para: {form.endereco || 'endereço informado'}, {form.numero} — {form.cidade}/{form.estado}</p>
                <p className="text-sm text-muted mt-1">Pagamento: {paymentOptions.find((p) => p.id === payment)?.label}</p>
              </div>
            )}

            <div className="checkout-actions">
              {step > 1 && <Button variant="ghost" onClick={back}>Voltar</Button>}
              {step < 4 ? <Button onClick={next}>Continuar</Button> : <Button onClick={finish}>Confirmar pedido</Button>}
            </div>
          </div>

          <aside className="checkout-summary card">
            <h3 className="mb-3">Resumo</h3>
            <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="summary-row"><span>Desconto</span><span>-{formatPrice(discount)}</span></div>}
            <div className="summary-row"><span>Frete</span><span>{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span></div>
            <div className="summary-row summary-total"><span>Total</span><span>{formatPrice(total)}</span></div>
          </aside>
        </div>
      </div>
    </div>
  )
}
