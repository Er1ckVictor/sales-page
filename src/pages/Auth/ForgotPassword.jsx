import "./ForgotPassword.css";
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function ForgotPassword() {
  const [stage, setStage] = useState(1) // 1 email, 2 código, 3 nova senha, 4 confirmação
  const [loading, setLoading] = useState(false)

  const advance = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setStage((s) => s + 1) }, 600)
  }

  return (
    <div className="auth-page container">
      <div className="auth-card card">
        {stage === 1 && (
          <form onSubmit={advance} className="flex-col gap-4">
            <h1>Esqueci minha senha</h1>
            <p className="text-muted mt-1 mb-3">Enviaremos um código de verificação para o seu e-mail.</p>
            <Input label="E-mail" type="email" placeholder="voce@email.com" required />
            <Button type="submit" full loading={loading}>Enviar recuperação</Button>
          </form>
        )}
        {stage === 2 && (
          <form onSubmit={advance} className="flex-col gap-4">
            <h1>Verifique seu e-mail</h1>
            <p className="text-muted mt-1 mb-3">Digite o código de 6 dígitos que enviamos.</p>
            <Input label="Código de verificação" placeholder="000000" maxLength={6} required />
            <Button type="submit" full loading={loading}>Confirmar código</Button>
          </form>
        )}
        {stage === 3 && (
          <form onSubmit={advance} className="flex-col gap-4">
            <h1>Nova senha</h1>
            <Input label="Nova senha" type="password" required />
            <Input label="Confirmar nova senha" type="password" required />
            <Button type="submit" full loading={loading}>Salvar nova senha</Button>
          </form>
        )}
        {stage === 4 && (
          <div style={{ textAlign: 'center' }}>
            <h1>Senha redefinida</h1>
            <p className="text-muted mt-2 mb-5">Sua senha foi atualizada com sucesso.</p>
            <Link to="/login" className="btn btn-primary btn-full">Ir para o login</Link>
          </div>
        )}
      </div>
    </div>
  )
}
