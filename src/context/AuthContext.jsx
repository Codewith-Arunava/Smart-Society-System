import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

// Mock users for demo
const MOCK_USERS = [
  {
    id: 'USR-001',
    name: 'Rajesh Kumar',
    email: 'admin@smartsociety.com',
    role: 'admin',
    apartment: null,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin&backgroundColor=b6e3f4',
    phone: '+91 98765 43210',
    designation: 'Society Manager',
  },
  {
    id: 'USR-002',
    name: 'Priya Sharma',
    email: 'resident@smartsociety.com',
    role: 'resident',
    apartment: 'A-201',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=resident&backgroundColor=c0aede',
    phone: '+91 87654 32109',
    designation: null,
  },
  {
    id: 'USR-003',
    name: 'Ramesh Singh',
    email: 'security@smartsociety.com',
    role: 'security',
    apartment: null,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=security&backgroundColor=d1d4f9',
    phone: '+91 76543 21098',
    designation: 'Security Guard',
  },
]

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ss_user')
      return saved ? JSON.parse(saved) : MOCK_USERS[0] // default: admin for demo
    } catch {
      return MOCK_USERS[0]
    }
  })
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Always true for demo

  const login = useCallback((email, _password) => {
    const user = MOCK_USERS.find(u => u.email === email) || MOCK_USERS[0]
    setCurrentUser(user)
    setIsAuthenticated(true)
    localStorage.setItem('ss_user', JSON.stringify(user))
    localStorage.setItem('ss_token', 'mock-jwt-token-' + Date.now())
    return user
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('ss_user')
    localStorage.removeItem('ss_token')
  }, [])

  const switchRole = useCallback((role) => {
    const user = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0]
    setCurrentUser(user)
    localStorage.setItem('ss_user', JSON.stringify(user))
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout, switchRole, mockUsers: MOCK_USERS }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
