
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, LogIn, UserPlus, KeyRound } from 'lucide-react';

const Login = () => {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      const success = await login(email, password);
      
      if (success) {
        toast.success('Login efetuado com sucesso!');
        // Navigation is handled by useEffect
      } else {
        toast.error('Email ou password incorretos');
      }
    } catch (error) {
      toast.error('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  // Quick login demo data
  const demoAccounts = [
    { type: 'Admin', email: 'Info@multipark.pt', password: 'Multipark$25' },
    { type: 'Agência', email: 'guimaraes1@bestravel.pt', password: 'Multipak*' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <LogIn className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Multipark Agências
            </CardTitle>
            <CardDescription className="text-gray-600">
              Aceda à sua conta para gerir reservas
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="o-seu-email@agencia.pt"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="A sua password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Esqueci-me da password
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? 'A fazer login...' : 'Entrar'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">ou</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link to="/signup" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 hover:border-green-300"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Registar Nova Agência
                </Button>
              </Link>

              <Link to="/forgot-password" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-300"
                >
                  <KeyRound className="w-4 h-4 mr-2" />
                  Esqueci-me da Password
                </Button>
              </Link>
            </div>

            {/* Demo accounts section - pode ser removido em produção */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Contas de Demonstração</h4>
              <div className="space-y-2">
                {demoAccounts.map((account, index) => (
                  <div key={index} className="text-xs text-gray-600 bg-white p-2 rounded border">
                    <div className="font-medium text-gray-800">{account.type}</div>
                    <div className="font-mono">{account.email}</div>
                    <div className="font-mono">{account.password}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Utilize estas credenciais para testar o sistema
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Não tem conta?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Registe a sua agência aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
