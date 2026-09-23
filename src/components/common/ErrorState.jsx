import "./ErrorState.css";
import { FiAlertTriangle } from 'react-icons/fi'
import Button from './Button'

export default function ErrorState({ title = 'Algo deu errado', description = 'Não foi possível carregar os dados agora.', onRetry }) {
  return (
    <div className="state-block">
      <div className="state-icon" aria-hidden><FiAlertTriangle /></div>
      <h3>{title}</h3>
      <p>{description}</p>
      {onRetry && <Button variant="secondary" size="sm" onClick={onRetry}>Tentar novamente</Button>}
    </div>
  )
}
