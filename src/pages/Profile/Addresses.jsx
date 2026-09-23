import "./Addresses.css";
import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiCheckCircle } from 'react-icons/fi'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import { mockAddresses } from '../../data/users'

export default function Addresses() {
  const [addresses, setAddresses] = useState(mockAddresses)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const openNew = () => { setEditing({ id: null, label: '', street: '', complement: '', city: '', state: '', zip: '' }); setModalOpen(true) }
  const openEdit = (addr) => { setEditing(addr); setModalOpen(true) }
  const remove = (id) => setAddresses((prev) => prev.filter((a) => a.id !== id))
  const setDefault = (id) => setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })))

  const save = () => {
    if (editing.id) {
      setAddresses((prev) => prev.map((a) => (a.id === editing.id ? editing : a)))
    } else {
      setAddresses((prev) => [...prev, { ...editing, id: `a${Date.now()}` }])
    }
    setModalOpen(false)
  }

  return (
    <div className="card" style={{ padding: 28 }}>
      <div className="section-head" style={{ marginBottom: 20 }}>
        <div><h2>Endereços</h2><p className="text-muted">Gerencie onde seus pedidos serão entregues.</p></div>
        <Button size="sm" onClick={openNew}><FiPlus /> Adicionar endereço</Button>
      </div>

      <div className="address-list">
        {addresses.map((a) => (
          <div key={a.id} className="address-card">
            <div>
              <div className="flex items-center gap-2">
                <strong>{a.label}</strong>
                {a.isDefault && <span className="badge badge-muted">Principal</span>}
              </div>
              <p className="text-sm text-muted mt-1">{a.street}, {a.complement} — {a.city}/{a.state} · {a.zip}</p>
            </div>
            <div className="flex gap-2">
              {!a.isDefault && <button className="icon-btn" aria-label="Definir como principal" onClick={() => setDefault(a.id)}><FiCheckCircle /></button>}
              <button className="icon-btn" aria-label="Editar endereço" onClick={() => openEdit(a)}><FiEdit2 /></button>
              <button className="icon-btn" aria-label="Excluir endereço" onClick={() => remove(a.id)}><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <Modal title={editing.id ? 'Editar endereço' : 'Novo endereço'} onClose={() => setModalOpen(false)} footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={save}>Salvar endereço</Button>
          </>
        }>
          <div className="flex-col gap-3">
            <Input label="Identificação" value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })} placeholder="Casa, trabalho..." />
            <Input label="Endereço" value={editing.street} onChange={(e) => setEditing({ ...editing, street: e.target.value })} />
            <Input label="Complemento" value={editing.complement} onChange={(e) => setEditing({ ...editing, complement: e.target.value })} />
            <div className="form-grid">
              <Input label="Cidade" value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} />
              <Input label="Estado" value={editing.state} onChange={(e) => setEditing({ ...editing, state: e.target.value })} />
            </div>
            <Input label="CEP" value={editing.zip} onChange={(e) => setEditing({ ...editing, zip: e.target.value })} />
          </div>
        </Modal>
      )}
    </div>
  )
}
