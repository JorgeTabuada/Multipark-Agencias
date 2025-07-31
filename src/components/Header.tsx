
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Settings, Shield, ChevronDown, ArrowLeft, Home } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  showLogoutButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showBackButton = true, showLogoutButton = true }) => {
  const { logout, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const goToDashboard = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                onClick={handleBack}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            )}
            
            <div className="flex items-center space-x-3 cursor-pointer" onClick={goToDashboard}>
              <div className="h-12 flex items-center">
                <img 
                  src="/lovable-uploads/8526bed4-aa2e-43bb-b530-31569f85f461.png" 
                  alt="Multipark Logo" 
                  className="h-10 hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">Multipark</h1>
                <p className="text-sm text-gray-600">Portal de Agências</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Quick Dashboard Button */}
            <Button
              onClick={goToDashboard}
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Button>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium">
                        {getUserInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900 max-w-32 truncate">
                        {user.name}
                      </p>
                      <div className="flex items-center gap-1">
                        {isAdmin ? (
                          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                            <Shield className="w-3 h-3 mr-1" />
                            Admin
                          </Badge>
                        ) : (
                          <p className="text-xs text-gray-500">Agência</p>
                        )}
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem asChild>
                    <Link to={isAdmin ? "/admin" : "/dashboard"} className="flex items-center">
                      <Home className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  {!isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Perfil da Conta
                      </Link>
                    </DropdownMenuItem>
                  )}

                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        Painel Admin
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  
                  {showLogoutButton && (
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Terminar Sessão
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
