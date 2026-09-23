import "./Checkbox.css";
export default function Checkbox({ label, id, ...rest }) {
  const checkboxId = id || rest.name
  return (
    <label htmlFor={checkboxId} className="checkbox-row">
      <input type="checkbox" id={checkboxId} {...rest} />
      <span>{label}</span>
    </label>
  )
}
