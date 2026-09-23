// Usuário mockado usado para representar a sessão autenticada (sem backend real).
export const mockUser = {
  id: 'u1',
  name: 'Ana Carvalho',
  email: 'ana.carvalho@email.com',
  phone: '(11) 98888-4321',
  avatar: 'https://i.pravatar.cc/150?img=47',
}

export const mockAddresses = [
  {
    id: 'a1',
    label: 'Casa',
    street: 'Rua das Palmeiras, 245',
    complement: 'Apto 62',
    city: 'São Paulo',
    state: 'SP',
    zip: '04567-000',
    isDefault: true,
  },
  {
    id: 'a2',
    label: 'Trabalho',
    street: 'Av. Paulista, 1100',
    complement: 'Sala 1204',
    city: 'São Paulo',
    state: 'SP',
    zip: '01310-100',
    isDefault: false,
  },
]

export const orderStatuses = ['Pedido realizado', 'Pagamento aprovado', 'Em preparação', 'Enviado', 'Entregue']

export const mockOrders = [
  {
    id: '48213',
    date: '2026-09-10',
    status: 'Enviado',
    total: 739.8,
    payment: 'Cartão de crédito •••• 4521',
    address: mockAddresses[0],
    items: [
      { name: 'Fone Bluetooth ProSound', variant: 'Preto', qty: 1, price: 449.9, image: 'https://picsum.photos/seed/headphone1/200/200' },
      { name: 'Power Bank 20.000mAh', variant: 'Preto', qty: 1, price: 189.9, image: 'https://picsum.photos/seed/powerbank1/200/200' },
      { name: 'Carregador Turbo GaN 65W', variant: 'Preto', qty: 1, price: 99.9, image: 'https://picsum.photos/seed/charger1/200/200' },
    ],
  },
  {
    id: '47990',
    date: '2026-08-22',
    status: 'Entregue',
    total: 289.9,
    payment: 'PIX',
    address: mockAddresses[0],
    items: [{ name: 'Jaqueta Corta-Vento Essential', variant: 'M · Preto', qty: 1, price: 289.9, image: 'https://picsum.photos/seed/jacket1/200/200' }],
  },
  {
    id: '47601',
    date: '2026-07-30',
    status: 'Cancelado',
    total: 119.9,
    payment: 'Boleto',
    address: mockAddresses[1],
    items: [{ name: 'Bermuda Sarja Regular', variant: '40 · Bege', qty: 1, price: 119.9, image: 'https://picsum.photos/seed/shorts1/200/200' }],
  },
]
