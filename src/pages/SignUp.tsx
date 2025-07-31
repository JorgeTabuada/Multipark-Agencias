
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Building2, Mail, Phone, FileText, MessageSquare } from 'lucide-react';

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nif: '',
    observations: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.nif) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor, insira um email válido');
      setLoading(false);
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9+\s-()]{9,}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Por favor, insira um número de telefone válido');
      setLoading(false);
      return;
    }

    // NIF validation (basic - 9 digits)
    const nifRegex = /^[0-9]{9}$/;
    if (!nifRegex.test(formData.nif)) {
      toast.error('Por favor, insira um NIF válido (9 dígitos)');
      setLoading(false);
      return;
    }

    try {
      const success = await signup(formData);
      
      if (success) {
        toast.success('Pedido de registo enviado com sucesso! Aguarde aprovação do administrador.');
        navigate('/login');
      } else {
        toast.error('Este email já está registado ou existe um pedido pendente');
      }
    } catch (error) {
      toast.error('Erro ao enviar pedido de registo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Registo de Agência
            </CardTitle>
            <CardDescription className="text-gray-600">
              Preencha os dados para solicitar acesso ao sistema Multipark
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nome da Agência *
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nome da sua agência"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@agencia.pt"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Telefone *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+351 912 345 678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nif" className="text-sm font-medium text-gray-700">
                  NIF *
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="nif"
                    name="nif"
                    type="text"
                    placeholder="123456789"
                    value={formData.nif}
                    onChange={handleInputChange}
                    className="pl-10"
                    maxLength={9}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations" className="text-sm font-medium text-gray-700">
                  Observações
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Textarea
                    id="observations"
                    name="observations"
                    placeholder="Informações adicionais (opcional)"
                    value={formData.observations}
                    onChange={handleInputChange}
                    className="pl-10 min-h-[80px] resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? 'A enviar pedido...' : 'Enviar Pedido de Registo'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar ao Login
              </Link>
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>
                Após o envio, o seu pedido será analisado pelo administrador.
                Receberá uma confirmação por email quando a conta for aprovada.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
