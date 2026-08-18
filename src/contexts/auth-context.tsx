import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

const STORAGE_KEY = 'pms-finance-user'

export const ROLES = {
  ADMIN: 'Admin',
  CASHIER: 'Cashier',
  ACCOUNTANT: 'Accountant',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export interface AuthUser {
  email: string
  role: Role
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (user: AuthUser) => void
  logout: () => void
  hasRole: (...roles: Role[]) => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.email && parsed?.role) {
      const role = parsed.role as string
      const normalized = role.charAt(0).toUpperCase() + role.slice(1)
      return { email: parsed.email, role: normalized as Role }
    }
    return null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUser(readStoredUser())
    setIsLoading(false)
  }, [])

  const login = (authUser: AuthUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser))
    setUser(authUser)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const hasRole = (...roles: Role[]) => {
    if (!user) return false
    return roles.includes(user.role)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
