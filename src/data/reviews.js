export const reviewsByProduct = {
  p1: [
    { id: 'r1', author: 'Marina Alves', rating: 5, date: '2026-08-12', comment: 'Muito leve e realmente segura do vento. Recomendo o tamanho fiel à tabela.', variant: 'M · Preto' },
    { id: 'r2', author: 'Diego Souza', rating: 4, date: '2026-07-28', comment: 'Ótimo acabamento, só achei o capuz um pouco justo.', variant: 'G · Areia' },
  ],
  p9: [
    { id: 'r3', author: 'Rafael Lima', rating: 5, date: '2026-09-02', comment: 'Cancelamento de ruído impressionante para o preço. Uso todo dia no trabalho.', variant: 'Preto' },
    { id: 'r4', author: 'Camila Ortiz', rating: 4, date: '2026-08-15', comment: 'Confortável mesmo em usos longos, bateria dura bastante mesmo.', variant: 'Branco' },
    { id: 'r5', author: 'Pedro Teixeira', rating: 5, date: '2026-07-30', comment: 'Excelente custo-benefício, som equilibrado e graves presentes.', variant: 'Azul-noite' },
  ],
  p10: [
    { id: 'r6', author: 'Bianca Ferreira', rating: 4, date: '2026-08-20', comment: 'Bateria segura os 7 dias com uso moderado. GPS trava rápido.', variant: 'Preto · Padrão' },
  ],
}

export const defaultReviewSummary = (rating, count) => {
  const dist = [5, 4, 3, 2, 1].map((star) => {
    const weight = star === Math.round(rating) ? 0.5 : star > Math.round(rating) ? 0.08 : 0.12
    return { star, percent: Math.round(weight * 100) }
  })
  const total = dist.reduce((a, b) => a + b.percent, 0)
  return { rating, count, distribution: dist.map((d) => ({ ...d, percent: Math.round((d.percent / total) * 100) })) }
}
