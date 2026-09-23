import "./EmptyState.css";
export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="state-block">
      {icon && <div className="state-icon" aria-hidden>{icon}</div>}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  )
}
