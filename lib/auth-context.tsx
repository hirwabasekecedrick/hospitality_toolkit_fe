"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import { api, ApiError } from "./api-client"

export type UserRole =
  | "SUPER_ADMIN"
  | "RHA_ADMIN"
  | "CORPORATE_ADMIN"
  | "CORPORATE_EMPLOYEE"
  | "HOTEL_OPERATOR"

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: UserRole
  isActive: boolean
  tenantId?: string
  department?: string
  createdAt: string
  tenant?: { id: string; name: string; slug: string } | null
  serviceProviderId?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshUser = useCallback(async () => {
    try {
      const u = await api.get<User>("/auth/me")
      setUser(u)
      setError(null)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false))
  }, [refreshUser])

  const login = useCallback(async (email: string, password: string) => {
    setError(null)
    setIsLoading(true)
    try {
      const result = await api.post<{ csrfToken: string; user: User }>("/auth/login", { email, password })
      setUser(result.user)
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : "Login failed"
      setError(msg)
      throw e
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout")
    } catch {
    } finally {
      setUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
