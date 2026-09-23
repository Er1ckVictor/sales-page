# CSS architecture

Each JSX file in `src/` has a colocated CSS file with the same name.

Examples:
- `components/layout/Header.jsx` + `components/layout/Header.css`
- `components/product/ProductCard.jsx` + `components/product/ProductCard.css`
- `pages/Home/Home.jsx` + `pages/Home/Home.css`

`src/styles/global.css` contains only global reset/accessibility/scrollbar/motion rules.
`src/styles/variables.css` contains design tokens.
The previous monolithic `components.css` file was removed.
