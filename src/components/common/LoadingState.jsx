import "./LoadingState.css";
export default function LoadingState({ count = 8 }) {
  return (
    <div className="grid-products" aria-busy="true" aria-label="Carregando produtos">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="product-skeleton">
          <div className="skeleton" style={{ aspectRatio: '1/1', width: '100%' }} />
          <div className="skeleton" style={{ height: 12, width: '70%', marginTop: 10 }} />
          <div className="skeleton" style={{ height: 12, width: '40%', marginTop: 8 }} />
          <div className="skeleton" style={{ height: 16, width: '50%', marginTop: 10 }} />
        </div>
      ))}
    </div>
  )
}
