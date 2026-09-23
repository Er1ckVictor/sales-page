import "./Input.css";
export default function Input({ label, id, error, hint, className = '', ...rest }) {
  const inputId = id || rest.name
  return (
    <div className="field">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input id={inputId} className={`input ${error ? 'input-error' : ''} ${className}`} aria-invalid={!!error} {...rest} />
      {error && <span className="field-error">{error}</span>}
      {!error && hint && <span className="field-hint">{hint}</span>}
    </div>
  )
}
