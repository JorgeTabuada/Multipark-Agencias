
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  phone?: string;
  nif?: string;
  role: 'admin' | 'user';
  status: 'active' | 'pending' | 'inactive';
  observations?: string;
  links?: {
    lisbon: { airpark: string; redpark: string; skypark: string };
    porto: { airpark: string; redpark: string; skypark: string };
    faro: { airpark: string; redpark: string; skypark: string };
  };
}

interface PendingUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  nif: string;
  observations: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Omit<PendingUser, 'id' | 'createdAt'>) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  // Admin functions
  getPendingUsers: () => PendingUser[];
  approveUser: (userId: string, links: User['links']) => Promise<boolean>;
  rejectUser: (userId: string) => Promise<boolean>;
  getAllUsers: () => User[];
  updateUserStatus: (email: string, status: User['status']) => Promise<boolean>;
  updateUserLinks: (email: string, links: User['links']) => Promise<boolean>;
  resetUserPassword: (email: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Admin user
const adminUser: User = {
  name: "Administrador Multipark",
  email: "Info@multipark.pt",
  role: "admin",
  status: "active"
};

// Base de dados de utilizadores ativos
const validUsers: (User & { password: string })[] = [
  {
    name: "AzulViajante",
    email: "guimaraes1@bestravel.pt",
    password: "Multipak*",
    role: "user",
    status: "active",
    links: {
      lisbon: {
        airpark: "https://airpark.pt/agencias/azulviajante/lisbon",
        redpark: "https://redpark.pt/agencias/azulviajante/lisbon", 
        skypark: "https://skypark.pt/agencias/azulviajante/lisbon"
      },
      porto: {
        airpark: "https://airpark.pt/agencias/azulviajante/porto",
        redpark: "https://redpark.pt/agencias/azulviajante/porto",
        skypark: "https://skypark.pt/agencias/azulviajante/porto"
      },
      faro: {
        airpark: "https://airpark.pt/agencias/azulviajante/faro",
        redpark: "https://redpark.pt/agencias/azulviajante/faro",
        skypark: "https://skypark.pt/agencias/azulviajante/faro"
      }
    }
  },
  // ... resto dos utilizadores com mesmo formato
];

// Passwords para todos os utilizadores
const userPasswords: { [email: string]: string } = {
  "Info@multipark.pt": "Multipark$25",
  "guimaraes1@bestravel.pt": "Multipak*",
  "castelobranco@bestravel.pt": "Multipak*",
  "evora.mafalda@bestravel.pt": "Multipak*",
  "francisco@ddviagens.com": "Multipak*",
  "castelobranco@godiscover.pt": "Multipak*",
  "viseu@godiscover.pt": "Multipak*",
  "geral@gurudasviagens.pt": "Multipak*",
  "carolinasousa@iupytravel.pt": "Multipak*",
  "andre@lealtours.com": "Multipak*",
  "agencia@leguasecardeais.pt": "Multipak*",
  "marco.velez@leiriviagem.pt": "Multipak*",
  "geral@oesteviagens.pt": "Multipak*",
  "guia@qviagem.com": "Multipak*",
  "reservas@sterntravel.pt": "Multipak*",
  "daniel.tavares@truetraveller.pt": "Multipak*",
  "geral.viagensecia@gmail.com": "Multipak*",
  "viagensparasi@gmail.com": "Multipak*",
  "maia.gerencia@bestravel.pt": "Multipak*",
  "geral@laviagens.pt": "Multipak*",
  "87viagens@gmail.com": "Multipak*",
  "lidia@nztravel.com.pt": "Multipak*",
  "guimaraes@qviagem.com": "Multipak*",
  "marinhagrande@qviagem.com": "Multipak*"
};

// Estado dos utilizadores pendentes (em memória para demo)
let pendingUsers: PendingUser[] = [];

// Estado de utilizadores ativos (incluindo admin)
let allUsers: User[] = [
  adminUser,
  ...validUsers.map(({ password, ...user }) => user)
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check admin
    if (email === adminUser.email && userPasswords[email] === password) {
      setUser(adminUser);
      return true;
    }

    // Check regular users
    const storedPassword = userPasswords[email];
    if (storedPassword && storedPassword === password) {
      const userData = allUsers.find(u => u.email === email);
      if (userData && userData.status === 'active') {
        setUser(userData);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (userData: Omit<PendingUser, 'id' | 'createdAt'>): Promise<boolean> => {
    // Check if email already exists
    if (allUsers.some(u => u.email === userData.email) || 
        pendingUsers.some(u => u.email === userData.email)) {
      return false;
    }

    const newPendingUser: PendingUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    pendingUsers.push(newPendingUser);
    return true;
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    // In a real app, this would send an email
    const userExists = allUsers.some(u => u.email === email);
    return userExists;
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!user) return false;
    
    const storedPassword = userPasswords[user.email];
    if (storedPassword !== currentPassword) {
      return false;
    }

    userPasswords[user.email] = newPassword;
    return true;
  };

  // Admin functions
  const getPendingUsers = (): PendingUser[] => {
    return pendingUsers;
  };

  const approveUser = async (userId: string, links: User['links']): Promise<boolean> => {
    const pendingUserIndex = pendingUsers.findIndex(u => u.id === userId);
    if (pendingUserIndex === -1) return false;

    const pendingUser = pendingUsers[pendingUserIndex];
    
    // Create new active user
    const newUser: User = {
      name: pendingUser.name,
      email: pendingUser.email,
      phone: pendingUser.phone,
      nif: pendingUser.nif,
      role: 'user',
      status: 'active',
      observations: pendingUser.observations,
      links
    };

    allUsers.push(newUser);
    userPasswords[newUser.email] = 'Multipak*'; // Default password
    
    // Remove from pending
    pendingUsers.splice(pendingUserIndex, 1);
    return true;
  };

  const rejectUser = async (userId: string): Promise<boolean> => {
    const pendingUserIndex = pendingUsers.findIndex(u => u.id === userId);
    if (pendingUserIndex === -1) return false;

    pendingUsers.splice(pendingUserIndex, 1);
    return true;
  };

  const getAllUsers = (): User[] => {
    return allUsers.filter(u => u.role !== 'admin');
  };

  const updateUserStatus = async (email: string, status: User['status']): Promise<boolean> => {
    const userIndex = allUsers.findIndex(u => u.email === email);
    if (userIndex === -1) return false;

    allUsers[userIndex].status = status;
    return true;
  };

  const updateUserLinks = async (email: string, links: User['links']): Promise<boolean> => {
    const userIndex = allUsers.findIndex(u => u.email === email);
    if (userIndex === -1) return false;

    allUsers[userIndex].links = links;
    return true;
  };

  const resetUserPassword = async (email: string, newPassword: string): Promise<boolean> => {
    if (!allUsers.some(u => u.email === email)) return false;

    userPasswords[email] = newPassword;
    return true;
  };

  const value = {
    user,
    login,
    logout,
    signup,
    forgotPassword,
    changePassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    // Admin functions
    getPendingUsers,
    approveUser,
    rejectUser,
    getAllUsers,
    updateUserStatus,
    updateUserLinks,
    resetUserPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
