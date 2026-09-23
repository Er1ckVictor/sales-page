import "./ProductGallery.css";
import { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi'

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(false)

  const prev = () => setActive((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setActive((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="gallery">
      <div className={`gallery-main ${zoom ? 'is-zoomed' : ''}`} onClick={() => setZoom((z) => !z)}>
        <img src={images[active]} alt={`${name} — imagem ${active + 1}`} />
        <span className="gallery-zoom-hint"><FiZoomIn /> {zoom ? 'Reduzir' : 'Ampliar'}</span>
        {images.length > 1 && (
          <>
            <button className="gallery-nav gallery-nav-prev" aria-label="Imagem anterior" onClick={(e) => { e.stopPropagation(); prev() }}><FiChevronLeft /></button>
            <button className="gallery-nav gallery-nav-next" aria-label="Próxima imagem" onClick={(e) => { e.stopPropagation(); next() }}><FiChevronRight /></button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbs" role="tablist" aria-label="Miniaturas do produto">
          {images.map((img, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === active}
              className={`gallery-thumb ${idx === active ? 'is-active' : ''}`}
              onClick={() => setActive(idx)}
            >
              <img src={img} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
