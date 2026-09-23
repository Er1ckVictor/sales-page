import "./App.css";
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastProvider } from './context/ToastContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { UserProvider } from './context/UserContext'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CartSidebar from './components/cart/CartSidebar'

import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Category from './pages/Category/Category'
import Offers from './pages/Offers/Offers'
import Favorites from './pages/Favorites/Favorites'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ProfileLayout from './pages/Profile/ProfileLayout'
import Profile from './pages/Profile/Profile'
import Orders from './pages/Orders/Orders'
import OrderDetails from './pages/Orders/OrderDetails'
import Addresses from './pages/Profile/Addresses'
import Settings from './pages/Profile/Settings'
import NotFound from './pages/NotFound/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <UserProvider>
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <ScrollToTop />
            <div className="app-shell">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/produtos" element={<Products />} />
                  <Route path="/produto/:id" element={<ProductDetails />} />
                  <Route path="/categoria/:categoria" element={<Category />} />
                  <Route path="/ofertas" element={<Offers />} />
                  <Route path="/favoritos" element={<Favorites />} />
                  <Route path="/carrinho" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/pedido/sucesso" element={<OrderSuccess />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/cadastro" element={<Register />} />
                  <Route path="/recuperar-senha" element={<ForgotPassword />} />
                  <Route path="/perfil" element={<ProfileLayout />}>
                    <Route index element={<Profile />} />
                    <Route path="pedidos" element={<Orders />} />
                    <Route path="pedidos/:id" element={<OrderDetails />} />
                    <Route path="enderecos" element={<Addresses />} />
                    <Route path="configuracoes" element={<Settings />} />
                  </Route>
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <CartSidebar />
            </div>
          </CartProvider>
        </WishlistProvider>
      </ToastProvider>
    </UserProvider>
  )
}
