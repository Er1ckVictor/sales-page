import "./Accordion.css";
import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <div className="accordion">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx
        return (
          <div className="accordion-item" key={idx}>
            <button
              className="accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <span>{item.question}</span>
              <FiChevronDown className={`accordion-icon ${isOpen ? 'is-open' : ''}`} />
            </button>
            {isOpen && <div className="accordion-panel">{item.answer}</div>}
          </div>
        )
      })}
    </div>
  )
}
