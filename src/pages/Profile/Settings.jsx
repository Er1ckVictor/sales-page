import "./Settings.css";
import Checkbox from '../../components/common/Checkbox'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { useUser } from '../../context/UserContext'

export default function Settings() {
  const { user } = useUser()
  return (
    <div className="flex-col gap-5">
      <div className="card" style={{ padding: 28 }}>
        <h2 className="mb-4">Dados pessoais</h2>
        <div className="form-grid">
          <Input label="E-mail" defaultValue={user.email} />
          <Input label="Telefone" defaultValue={user.phone} />
        </div>
      </div>
      <div className="card" style={{ padding: 28 }}>
        <h2 className="mb-4">Notificações</h2>
        <div className="flex-col gap-3">
          <Checkbox label="Novidades e promoções por e-mail" defaultChecked />
          <Checkbox label="Atualizações de status do pedido por SMS" defaultChecked />
          <Checkbox label="Pesquisas de satisfação" />
        </div>
      </div>
      <div className="card" style={{ padding: 28 }}>
        <h2 className="mb-4">Segurança</h2>
        <div className="form-grid">
          <Input label="Nova senha" type="password" placeholder="••••••••" />
          <Input label="Confirmar nova senha" type="password" placeholder="••••••••" />
        </div>
      </div>
      <Button style={{ alignSelf: 'flex-start' }}>Salvar configurações</Button>
    </div>
  )
}
