import { useCallback } from 'react'
import { create } from 'zustand'

interface AuthState {
  userId: string | null
  orgId: string | null
  token: string | null
  login: (token: string, userId: string, orgId: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  orgId: null,
  token: null,
  login: (token, userId, orgId) => set({ token, userId, orgId }),
  logout: () => set({ token: null, userId: null, orgId: null }),
}))

export function useAuth() {
  const store = useAuthStore()
  const isAuthenticated = !!store.token
  const requireAuth = useCallback(() => {
    if (!store.token) throw new Error('Not authenticated')
  }, [store.token])
  return { ...store, isAuthenticated, requireAuth }
}
