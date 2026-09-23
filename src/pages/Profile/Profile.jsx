import "./Profile.css";
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { useUser } from '../../context/UserContext'

export default function Profile() {
  const { user } = useUser()
  return (
    <div className="card" style={{ padding: 28 }}>
      <h2 className="mb-1">Meu perfil</h2>
      <p className="text-muted mb-5">Seus dados pessoais.</p>
      <div className="form-grid">
        <Input label="Nome completo" defaultValue={user.name} />
        <Input label="E-mail" type="email" defaultValue={user.email} />
        <Input label="Telefone" defaultValue={user.phone} />
      </div>
      <Button className="mt-5">Salvar alterações</Button>
    </div>
  )
}
