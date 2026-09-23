import "./CheckoutSteps.css";
const steps = ['Identificação', 'Entrega', 'Pagamento', 'Revisão']

export default function CheckoutSteps({ current }) {
  return (
    <ol className="checkout-steps" aria-label="Etapas do checkout">
      {steps.map((label, idx) => {
        const stepNumber = idx + 1
        const state = stepNumber < current ? 'done' : stepNumber === current ? 'active' : 'pending'
        return (
          <li key={label} className={`checkout-step checkout-step-${state}`}>
            <span className="checkout-step-dot">{stepNumber}</span>
            <span className="checkout-step-label">{label}</span>
          </li>
        )
      })}
    </ol>
  )
}
