# NOVA — Interface de E-commerce (Frontend)

Interface completa de loja virtual construída em **React + Vite + JavaScript (ES6+) + React Router + React Icons**, sem backend — apenas dados mockados e estado local/Context para simular todas as interações (carrinho, favoritos, login, checkout, pedidos).

## Rodando o projeto

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (geralmente http://localhost:5173).

## Build de produção

```bash
npm run build
npm run preview
```

## O que é só interface (mockado)

Login/cadastro, pagamento, frete, cupom, avaliações e pedidos são **100% visuais** — nenhum dado é enviado a um servidor. O carrinho e os favoritos usam `localStorage` apenas para persistir a sessão no navegador.

## Estrutura

```
src/
├── components/   # common, layout, product, cart, user, checkout, feedback
├── pages/        # uma pasta por rota
├── data/         # mocks: products, categories, reviews, users
├── context/      # CartContext, WishlistContext, ToastContext, UserContext
├── hooks/        # useLocalStorage
├── utils/        # formatação de preço, texto, etc.
└── styles/       # variáveis globais e reset
```

## Próximo passo (fora deste escopo)

Trocar `src/data/*` por chamadas a uma API real, mantendo os componentes de UI intactos — eles não conhecem a origem dos dados.


## Visual theme
The store uses a dark black-first visual system with white primary details and a restrained electric-blue accent for interactive states, links, badges and focus indicators.
