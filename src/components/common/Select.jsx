import "./Select.css";
export default function Select({ label, id, options, className = '', ...rest }) {
  const selectId = id || rest.name
  return (
    <div className="field">
      {label && <label htmlFor={selectId}>{label}</label>}
      <select id={selectId} className={`select ${className}`} {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
