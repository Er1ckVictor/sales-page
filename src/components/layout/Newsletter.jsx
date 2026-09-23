import "./Newsletter.css";
import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) { setStatus('error'); return }
    setStatus('loading')
    setTimeout(() => setStatus('success'), 900)
  }

  return (
    <div className="newsletter">
      <div>
        <h3>Receba nossas novidades</h3>
        <p className="text-sm text-muted">Lançamentos e ofertas exclusivas direto no seu e-mail.</p>
      </div>
      {status === 'success' ? (
        <p className="newsletter-success">Inscrição confirmada — obrigado por se juntar a nós.</p>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Seu melhor e-mail"
            aria-label="Seu melhor e-mail"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
            error={status === 'error' ? 'Informe um e-mail válido.' : null}
          />
          <Button type="submit" loading={status === 'loading'}>Inscrever-se</Button>
        </form>
      )}
    </div>
  )
}
