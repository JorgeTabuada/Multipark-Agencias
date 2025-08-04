import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import {
  loginUser,
  signupUser,
  changePassword,
  resetUserPassword,
  forgotPassword,
  getPendingUsers,
  approveUser,
  rejectUser,
  getAllUsers,
  updateUserStatus,
  updateUserLinks
} from '../lib/database'
import type { User, PendingUser } from '../types/database'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  signup: (userData: Omit<PendingUser, 'id' | 'createdAt'>) => Promise<boolean>
  forgotPassword: (email: string) => Promise<boolean>
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
  // Admin functions
  getPendingUsers: () => Promise<PendingUser[]>
  approveUser: (userId: string, links: User['links']) => Promise<boolean>
  rejectUser: (userId: string) => Promise<boolean>
  getAllUsers: () => Promise<User[]>
  updateUserStatus: (email: string, status: User['status']) => Promise<boolean>
  updateUserLinks: (email: string, links: User['links']) => Promise<boolean>
  resetUserPassword: (email: string, newPassword: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há sessão salva
    const savedUser = localStorage.getItem('multipark_current_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Erro ao carregar sessão:', error)
        localStorage.removeItem('multipark_current_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      const { data, error } = await loginUser(email, password)
      
      if (error || !data) {
        return false
      }

      setUser(data)
      // Salvar sessão no localStorage
      localStorage.setItem('multipark_current_user', JSON.stringify(data))
      return true
    } catch (error) {
      console.error('Erro no login:', error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('multipark_current_user')
  }

  const signup = async (userData: Omit<PendingUser, 'id' | 'createdAt'>): Promise<boolean> => {
    try {
      const { success } = await signupUser(userData)
      return success
    } catch (error) {
      console.error('Erro no registo:', error)
      return false
    }
  }

  const handleForgotPassword = async (email: string): Promise<boolean> => {
    try {
      return await forgotPassword(email)
    } catch (error) {
      console.error('Erro no forgot password:', error)
      return false
    }
  }

  const handleChangePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!user) return false
    
    try {
      const success = await changePassword(user.email, currentPassword, newPassword)
      if (success) {
        // Atualizar sessão local se necessário
        const updatedUser = { ...user }
        setUser(updatedUser)
        localStorage.setItem('multipark_current_user', JSON.stringify(updatedUser))
      }
      return success
    } catch (error) {
      console.error('Erro ao alterar password:', error)
      return false
    }
  }

  // Admin functions
  const handleGetPendingUsers = async (): Promise<PendingUser[]> => {
    try {
      return await getPendingUsers()
    } catch (error) {
      console.error('Erro ao buscar utilizadores pendentes:', error)
      return []
    }
  }

  const handleApproveUser = async (userId: string, links: User['links']): Promise<boolean> => {
    try {
      return await approveUser(userId, links)
    } catch (error) {
      console.error('Erro ao aprovar utilizador:', error)
      return false
    }
  }

  const handleRejectUser = async (userId: string): Promise<boolean> => {
    try {
      return await rejectUser(userId)
    } catch (error) {
      console.error('Erro ao rejeitar utilizador:', error)
      return false
    }
  }

  const handleGetAllUsers = async (): Promise<User[]> => {
    try {
      return await getAllUsers()
    } catch (error) {
      console.error('Erro ao buscar utilizadores:', error)
      return []
    }
  }

  const handleUpdateUserStatus = async (email: string, status: User['status']): Promise<boolean> => {
    try {
      const dbStatus = status as 'active' | 'inactive'
      return await updateUserStatus(email, dbStatus)
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      return false
    }
  }

  const handleUpdateUserLinks = async (email: string, links: User['links']): Promise<boolean> => {
    try {
      return await updateUserLinks(email, links)
    } catch (error) {
      console.error('Erro ao atualizar links:', error)
      return false
    }
  }

  const handleResetUserPassword = async (email: string, newPassword: string): Promise<boolean> => {
    try {
      return await resetUserPassword(email, newPassword)
    } catch (error) {
      console.error('Erro ao resetar password:', error)
      return false
    }
  }

  const value = {
    user,
    login,
    logout,
    signup,
    forgotPassword: handleForgotPassword,
    changePassword: handleChangePassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading,
    // Admin functions
    getPendingUsers: handleGetPendingUsers,
    approveUser: handleApproveUser,
    rejectUser: handleRejectUser,
    getAllUsers: handleGetAllUsers,
    updateUserStatus: handleUpdateUserStatus,
    updateUserLinks: handleUpdateUserLinks,
    resetUserPassword: handleResetUserPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
