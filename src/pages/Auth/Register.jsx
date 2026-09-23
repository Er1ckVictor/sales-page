import "./Register.css";
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/common/Input'
import Checkbox from '../../components/common/Checkbox'
import Button from '../../components/common/Button'
import { useUser } from '../../context/UserContext'
import { useToast } from '../../context/ToastContext'

const strengthLabel = (pwd) => {
  if (pwd.length === 0) return { label: '', percent: 0 }
  if (pwd.length < 6) return { label: 'Fraca', percent: 33 }
  if (pwd.length < 10) return { label: 'Média', percent: 66 }
  return { label: 'Forte', percent: 100 }
}

export default function Register() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', senha: '', confirmar: '' })
  const [terms, setTerms] = useState(false)
  const [status, setStatus] = useState('idle')
  const { login } = useUser()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const strength = strengthLabel(form.senha)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.senha !== form.confirmar || !terms) return
    setStatus('loading')
    setTimeout(() => {
      login()
      showToast('Conta criada com sucesso.', 'success')
      navigate('/perfil')
    }, 700)
  }

  return (
    <div className="auth-page container">
      <div className="auth-card card">
        <h1>Criar conta</h1>
        <p className="text-muted mt-2 mb-5">Leva menos de um minuto.</p>
        <form onSubmit={handleSubmit} className="flex-col gap-4">
          <Input label="Nome completo" value={form.nome} onChange={update('nome')} required />
          <Input label="E-mail" type="email" value={form.email} onChange={update('email')} required />
          <Input label="Telefone" value={form.telefone} onChange={update('telefone')} placeholder="(00) 00000-0000" />
          <Input label="Senha" type="password" value={form.senha} onChange={update('senha')} required />
          {form.senha && (
            <div>
              <div className="password-strength-track"><div className="password-strength-fill" style={{ width: `${strength.percent}%` }} /></div>
              <span className="text-xs text-muted">Força da senha: {strength.label}</span>
            </div>
          )}
          <Input
            label="Confirmar senha"
            type="password"
            value={form.confirmar}
            onChange={update('confirmar')}
            error={form.confirmar && form.confirmar !== form.senha ? 'As senhas não coincidem.' : null}
          />
          <Checkbox label="Li e aceito os Termos de uso e a Política de privacidade" checked={terms} onChange={() => setTerms((t) => !t)} />
          <Button type="submit" full loading={status === 'loading'} disabled={!terms}>Criar conta</Button>
        </form>
        <p className="text-sm text-muted mt-5" style={{ textAlign: 'center' }}>
          Já tem conta? <Link to="/login" style={{ fontWeight: 600, color: 'var(--color-text)' }}>Entrar</Link>
        </p>
      </div>
    </div>
  )
}
