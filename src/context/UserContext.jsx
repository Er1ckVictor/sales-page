import "./UserContext.css";
import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { mockUser } from '../data/users'

const UserContext = createContext(null)

// Autenticação simulada: apenas alterna um flag local, sem validação real.
export function UserProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('nova:auth', false)

  const login = () => setIsAuthenticated(true)
  const logout = () => setIsAuthenticated(false)

  return (
    <UserContext.Provider value={{ isAuthenticated, user: mockUser, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
