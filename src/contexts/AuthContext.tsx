
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
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

// Base de dados de utilizadores
const validUsers = [
  { name: "AzulViajante", email: "guimaraes1@bestravel.pt", password: "Multipak*" },
  { name: "Bestravel Castelo Branco", email: "castelobranco@bestravel.pt", password: "Multipak*" },
  { name: "Bestravel Évora", email: "evora.mafalda@bestravel.pt", password: "Multipak*" },
  { name: "Definir datas viagens e turismo", email: "francisco@ddviagens.com", password: "Multipak*" },
  { name: "Godiscover Castelo Branco", email: "castelobranco@godiscover.pt", password: "Multipak*" },
  { name: "Godiscover Viseu", email: "viseu@godiscover.pt", password: "Multipak*" },
  { name: "Guru Viagens", email: "geral@gurudasviagens.pt", password: "Multipak*" },
  { name: "Iupy Travel", email: "carolinasousa@iupytravel.pt", password: "Multipak*" },
  { name: "lealtours", email: "andre@lealtours.com", password: "Multipak*" },
  { name: "Léguas Cordeais", email: "agencia@leguasecardeais.pt", password: "Multipak*" },
  { name: "Leiriviagens", email: "marco.velez@leiriviagem.pt", password: "Multipak*" },
  { name: "Oeste Viagens", email: "geral@oesteviagens.pt", password: "Multipak*" },
  { name: "QVIAGEM", email: "guia@qviagem.com", password: "Multipak*" },
  { name: "SternTravel", email: "reservas@sterntravel.pt", password: "Multipak*" },
  { name: "Truetraveller", email: "daniel.tavares@truetraveller.pt", password: "Multipak*" },
  { name: "viagens & Cia", email: "geral.viagensecia@gmail.com", password: "Multipak*" },
  { name: "viagens para si", email: "viagensparasi@gmail.com", password: "Multipak*" },
  { name: "Bestravel Maia", email: "maia.gerencia@bestravel.pt", password: "Multipak*" },
  { name: "La Viagens, Lda", email: "geral@laviagens.pt", password: "Multipak*" },
  { name: "Mérito de Júpiter Lda", email: "87viagens@gmail.com", password: "Multipak*" },
  { name: "NZTravel", email: "lidia@nztravel.com.pt", password: "Multipak*" },
  { name: "QVIAGEM Guimarães", email: "guimaraes@qviagem.com", password: "Multipak*" },
  { name: "QVIAGEM Marinha Grande", email: "marinhagrande@qviagem.com", password: "Multipak*" }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    const validUser = validUsers.find(u => u.email === email && u.password === password);
    
    if (validUser) {
      setUser({
        name: validUser.name,
        email: validUser.email
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
