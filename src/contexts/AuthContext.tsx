
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

// Utilizadores iniciais pré-definidos
const initialUsers: User[] = [
  {
    name: "AzulViajante",
    email: "guimaraes1@bestravel.pt",
    role: "user",
    status: "active",
    links: {
      lisbon: {
        airpark: "https://multipark.pt/book?city=lisbon&parkBrand=airpark&campaignId=azulviajante_lisbon_airpark",
        redpark: "https://multipark.pt/book?city=lisbon&parkBrand=redpark&campaignId=azulviajante_lisbon_redpark", 
        skypark: "https://multipark.pt/book?city=lisbon&parkBrand=skypark&campaignId=azulviajante_lisbon_skypark"
      },
      porto: {
        airpark: "https://multipark.pt/book?city=porto&parkBrand=airpark&campaignId=azulviajante_porto_airpark",
        redpark: "https://multipark.pt/book?city=porto&parkBrand=redpark&campaignId=azulviajante_porto_redpark",
        skypark: "https://multipark.pt/book?city=porto&parkBrand=skypark&campaignId=azulviajante_porto_skypark"
      },
      faro: {
        airpark: "https://multipark.pt/book?city=faro&parkBrand=airpark&campaignId=azulviajante_faro_airpark",
        redpark: "https://multipark.pt/book?city=faro&parkBrand=redpark&campaignId=azulviajante_faro_redpark",
        skypark: "https://multipark.pt/book?city=faro&parkBrand=skypark&campaignId=azulviajante_faro_skypark"
      }
    }
  },
  {
    name: "Bestravel Castelo Branco",
    email: "castelobranco@bestravel.pt",
    role: "user",
    status: "active",
    links: {
      lisbon: {
        airpark: "",
        redpark: "",
        skypark: ""
      },
      porto: {
        airpark: "",
        redpark: "",
        skypark: ""
      },
      faro: {
        airpark: "",
        redpark: "",
        skypark: ""
      }
    }
  }
];

// Keys para localStorage
const STORAGE_KEYS = {
  USERS: 'multipark_users',
  PENDING_USERS: 'multipark_pending_users',
  PASSWORDS: 'multipark_passwords'
};

// Função para carregar dados do localStorage
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Erro ao carregar ${key}:`, error);
    return defaultValue;
  }
}

// Função para guardar dados no localStorage
function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Erro ao guardar ${key}:`, error);
  }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Estados persistentes
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const stored = loadFromStorage(STORAGE_KEYS.USERS, [adminUser, ...initialUsers]);
    return stored;
  });
  
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>(() => {
    return loadFromStorage(STORAGE_KEYS.PENDING_USERS, []);
  });
  
  const [userPasswords, setUserPasswords] = useState<{ [email: string]: string }>(() => {
    const defaultPasswords = {
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
    return loadFromStorage(STORAGE_KEYS.PASSWORDS, defaultPasswords);
  });

  // Guardar dados quando houver alterações
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.USERS, allUsers);
  }, [allUsers]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PENDING_USERS, pendingUsers);
  }, [pendingUsers]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PASSWORDS, userPasswords);
  }, [userPasswords]);

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

    setPendingUsers(prev => [...prev, newPendingUser]);
    return true;
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    const userExists = allUsers.some(u => u.email === email);
    return userExists;
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!user) return false;
    
    const storedPassword = userPasswords[user.email];
    if (storedPassword !== currentPassword) {
      return false;
    }

    setUserPasswords(prev => ({
      ...prev,
      [user.email]: newPassword
    }));
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

    setAllUsers(prev => [...prev, newUser]);
    setUserPasswords(prev => ({
      ...prev,
      [newUser.email]: 'Multipak*' // Default password
    }));
    
    // Remove from pending
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    return true;
  };

  const rejectUser = async (userId: string): Promise<boolean> => {
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    return true;
  };

  const getAllUsers = (): User[] => {
    return allUsers.filter(u => u.role !== 'admin');
  };

  const updateUserStatus = async (email: string, status: User['status']): Promise<boolean> => {
    setAllUsers(prev => prev.map(u => 
      u.email === email ? { ...u, status } : u
    ));
    return true;
  };

  const updateUserLinks = async (email: string, links: User['links']): Promise<boolean> => {
    setAllUsers(prev => prev.map(u => 
      u.email === email ? { ...u, links } : u
    ));
    return true;
  };

  const resetUserPassword = async (email: string, newPassword: string): Promise<boolean> => {
    if (!allUsers.some(u => u.email === email)) return false;

    setUserPasswords(prev => ({
      ...prev,
      [email]: newPassword
    }));
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
