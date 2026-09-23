import "./Login.css";
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Input from '../../components/common/Input'
import Checkbox from '../../components/common/Checkbox'
import Button from '../../components/common/Button'
import { useUser } from '../../context/UserContext'
import { useToast } from '../../context/ToastContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const { login } = useUser()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@') || password.length < 4) {
      setError('Verifique seu e-mail e senha antes de continuar.')
      return
    }
    setError('')
    setStatus('loading')
    setTimeout(() => {
      login()
      showToast('Login realizado com sucesso.', 'success')
      navigate('/perfil')
    }, 700)
  }

  return (
    <div className="auth-page container">
      <div className="auth-card card">
        <h1>Entrar</h1>
        <p className="text-muted mt-2 mb-5">Acesse sua conta para ver pedidos e favoritos.</p>
        <form onSubmit={handleSubmit} className="flex-col gap-4">
          <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" error={error} />
          <div className="field">
            <label htmlFor="password">Senha</label>
            <div className="password-field">
              <input id="password" className="input" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Sua senha" />
              <button type="button" className="icon-btn" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShowPassword((s) => !s)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Checkbox label="Lembrar-me" checked={remember} onChange={() => setRemember((r) => !r)} />
            <Link to="/recuperar-senha" className="text-sm">Esqueci minha senha</Link>
          </div>
          <Button type="submit" full loading={status === 'loading'}>Entrar</Button>
        </form>
        <p className="text-sm text-muted mt-5" style={{ textAlign: 'center' }}>
          Não tem conta? <Link to="/cadastro" style={{ fontWeight: 600, color: 'var(--color-text)' }}>Criar conta</Link>
        </p>
      </div>
    </div>
  )
}
