
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  showLogoutButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showBackButton = true, showLogoutButton = true }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
              >
                Voltar
              </button>
            )}
            <div className="flex items-center space-x-3">
              <div className="h-12 flex items-center">
                <img 
                  src="/lovable-uploads/8526bed4-aa2e-43bb-b530-31569f85f461.png" 
                  alt="Multipark Logo" 
                  className="h-10"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-gray-700 font-medium">
                Olá, {user.name}
              </span>
            )}
            {showLogoutButton && (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
