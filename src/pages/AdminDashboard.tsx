
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Settings, 
  Link as LinkIcon, 
  Key, 
  Mail, 
  Phone, 
  Building2,
  FileText,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  Edit,
  ExternalLink,
  Copy,
  Save,
  Loader2
} from 'lucide-react';
import Header from '../components/Header';

const AdminDashboard = () => {
  const { user, isAdmin, getPendingUsers, approveUser, rejectUser, getAllUsers, updateUserStatus, updateUserLinks, resetUserPassword } = useAuth();
  const navigate = useNavigate();
  
  // Estados originais
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedPendingUser, setSelectedPendingUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [approvalLinks, setApprovalLinks] = useState({
    lisbon: { airpark: '', redpark: '', skypark: '' },
    porto: { airpark: '', redpark: '', skypark: '' },
    faro: { airpark: '', redpark: '', skypark: '' }
  });
  const [linkFormData, setLinkFormData] = useState({
    lisbon: { airpark: '', redpark: '', skypark: '' },
    porto: { airpark: '', redpark: '', skypark: '' },
    faro: { airpark: '', redpark: '', skypark: '' }
  });

  // ✅ NOVOS ESTADOS PARA CORRIGIR O ERRO
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Verificação de admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  // ✅ CARREGAR DADOS DE FORMA ASSÍNCRONA
  const loadData = async () => {
    try {
      setDataLoading(true);
      
      const [pending, users] = await Promise.all([
        getPendingUsers(),
        getAllUsers()
      ]);
      
      setPendingUsers(pending || []);
      setAllUsers(users || []);
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setPendingUsers([]);
      setAllUsers([]);
      toast.error('Erro ao carregar dados do dashboard');
    } finally {
      setDataLoading(false);
    }
  };

  // Carregar dados na inicialização
  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin, getPendingUsers, getAllUsers]);

  if (!isAdmin) {
    return null;
  }

  // ✅ LOADING STATE
  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">A carregar dashboard administrativo...</p>
        </div>
      </div>
    );
  }

  const openApprovalDialog = (pendingUser: any) => {
    setSelectedPendingUser(pendingUser);
    // Reset links
    setApprovalLinks({
      lisbon: { airpark: '', redpark: '', skypark: '' },
      porto: { airpark: '', redpark: '', skypark: '' },
      faro: { airpark: '', redpark: '', skypark: '' }
    });
    setShowApprovalDialog(true);
  };

  const handleCreateLinks = (userId: string, userName: string) => {
    // Generate template links for easy copying
    const baseTemplate = "https://multipark.pt/book?city={city}&parkBrand={brand}&campaignId=";
    const agencySlug = userName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const templateLinks = {
      lisbon: {
        airpark: `${baseTemplate.replace('{city}', 'lisbon').replace('{brand}', 'airpark')}${agencySlug}_lisboa_airpark`,
        redpark: `${baseTemplate.replace('{city}', 'lisbon').replace('{brand}', 'redpark')}${agencySlug}_lisboa_redpark`,
        skypark: `${baseTemplate.replace('{city}', 'lisbon').replace('{brand}', 'skypark')}${agencySlug}_lisboa_skypark`
      },
      porto: {
        airpark: `${baseTemplate.replace('{city}', 'porto').replace('{brand}', 'airpark')}${agencySlug}_porto_airpark`,
        redpark: `${baseTemplate.replace('{city}', 'porto').replace('{brand}', 'redpark')}${agencySlug}_porto_redpark`,
        skypark: `${baseTemplate.replace('{city}', 'porto').replace('{brand}', 'skypark')}${agencySlug}_porto_skypark`
      },
      faro: {
        airpark: `${baseTemplate.replace('{city}', 'faro').replace('{brand}', 'airpark')}${agencySlug}_faro_airpark`,
        redpark: `${baseTemplate.replace('{city}', 'faro').replace('{brand}', 'redpark')}${agencySlug}_faro_redpark`,
        skypark: `${baseTemplate.replace('{city}', 'faro').replace('{brand}', 'skypark')}${agencySlug}_faro_skypark`
      }
    };

    setApprovalLinks(templateLinks);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copiado para clipboard!');
  };

  const handleApproveUser = async () => {
    if (!selectedPendingUser) return;

    // Validate that all links are filled
    let allLinksValid = true;
    Object.values(approvalLinks).forEach(city => {
      Object.values(city).forEach(link => {
        if (!link.trim()) {
          allLinksValid = false;
        }
      });
    });

    if (!allLinksValid) {
      toast.error('Por favor, preencha todos os 9 links antes de aprovar');
      return;
    }

    setLoading(true);
    try {
      const success = await approveUser(selectedPendingUser.id, approvalLinks);
      if (success) {
        toast.success('Utilizador aprovado com sucesso! Todos os links foram configurados.');
        setShowApprovalDialog(false);
        setSelectedPendingUser(null);
        // ✅ REFRESH DADOS
        await loadData();
      } else {
        toast.error('Erro ao aprovar utilizador');
      }
    } catch (error) {
      toast.error('Erro ao aprovar utilizador');
    } finally {
      setLoading(false);
    }
  };

  const handleRejectUser = async (userId: string) => {
    setLoading(true);
    try {
      const success = await rejectUser(userId);
      if (success) {
        toast.success('Utilizador rejeitado');
        // ✅ REFRESH DADOS
        await loadData();
      } else {
        toast.error('Erro ao rejeitar utilizador');
      }
    } catch (error) {
      toast.error('Erro ao rejeitar utilizador');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (email: string, currentStatus: string) => {
    setLoading(true);
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const success = await updateUserStatus(email, newStatus as any);
      if (success) {
        toast.success(`Utilizador ${newStatus === 'active' ? 'ativado' : 'desativado'}`);
        // ✅ REFRESH DADOS
        await loadData();
      } else {
        toast.error('Erro ao alterar status');
      }
    } catch (error) {
      toast.error('Erro ao alterar status');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (email: string) => {
    if (!newPassword) {
      toast.error('Insira a nova password');
      return;
    }

    setLoading(true);
    try {
      const success = await resetUserPassword(email, newPassword);
      if (success) {
        toast.success('Password alterada com sucesso!');
        setNewPassword('');
        setSelectedUser(null);
      } else {
        toast.error('Erro ao alterar password');
      }
    } catch (error) {
      toast.error('Erro ao alterar password');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLinks = async (email: string) => {
    setLoading(true);
    try {
      const success = await updateUserLinks(email, linkFormData);
      if (success) {
        toast.success('Links atualizados com sucesso!');
        setSelectedUser(null);
        // ✅ REFRESH DADOS
        await loadData();
      } else {
        toast.error('Erro ao atualizar links');
      }
    } catch (error) {
      toast.error('Erro ao atualizar links');
    } finally {
      setLoading(false);
    }
  };

  const openLinksDialog = (user: any) => {
    setSelectedUser(user);
    setLinkFormData(user.links || {
      lisbon: { airpark: '', redpark: '', skypark: '' },
      porto: { airpark: '', redpark: '', skypark: '' },
      faro: { airpark: '', redpark: '', skypark: '' }
    });
  };

  const cityNames = {
    lisbon: 'Lisboa',
    porto: 'Porto',
    faro: 'Faro'
  };

  const brandNames = {
    airpark: 'Airpark',
    redpark: 'Redpark',
    skypark: 'Skypark'
  };

  const brandColors = {
    airpark: 'bg-blue-500',
    redpark: 'bg-red-500',
    skypark: 'bg-purple-500'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
              <p className="text-gray-600">Gestão de utilizadores e sistema Multipark</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pedidos Pendentes ({pendingUsers.length})
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Utilizadores ({allUsers.length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Estatísticas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Pedidos de Registo Pendentes
                </CardTitle>
                <CardDescription>
                  Novos pedidos de agências aguardando aprovação. <strong>Importante:</strong> Tens que configurar os 9 links únicos (3 cidades × 3 marcas) para cada agência.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingUsers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Não há pedidos pendentes</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingUsers.map((pendingUser) => (
                      <Card key={pendingUser.id} className="border border-orange-200">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-blue-600" />
                                <h3 className="font-semibold text-lg">{pendingUser.name}</h3>
                                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                  Pendente
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-gray-400" />
                                  <span>{pendingUser.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  <span>{pendingUser.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-gray-400" />
                                  <span>NIF: {pendingUser.nif}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span>{new Date(pendingUser.createdAt).toLocaleDateString('pt-PT')}</span>
                                </div>
                              </div>
                              {pendingUser.observations && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-gray-700">
                                    <strong>Observações:</strong> {pendingUser.observations}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                onClick={() => openApprovalDialog(pendingUser)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                disabled={loading}
                              >
                                <UserCheck className="w-4 h-4 mr-1" />
                                Aprovar & Configurar Links
                              </Button>
                              <Button
                                onClick={() => handleRejectUser(pendingUser.id)}
                                size="sm"
                                variant="destructive"
                                disabled={loading}
                              >
                                <UserX className="w-4 h-4 mr-1" />
                                Rejeitar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Utilizadores Registados
                </CardTitle>
                <CardDescription>
                  Gestão de todas as agências registadas no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allUsers.map((user) => (
                    <Card key={user.email} className="border">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-blue-600" />
                              <h3 className="font-semibold text-lg">{user.name}</h3>
                              <Badge 
                                variant={user.status === 'active' ? 'default' : 'secondary'}
                                className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                              >
                                {user.status === 'active' ? (
                                  <><CheckCircle className="w-3 h-3 mr-1" /> Ativo</>
                                ) : (
                                  <><XCircle className="w-3 h-3 mr-1" /> Inativo</>
                                )}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span>{user.email}</span>
                              </div>
                              {user.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  <span>{user.phone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              onClick={() => handleToggleUserStatus(user.email, user.status)}
                              size="sm"
                              variant={user.status === 'active' ? 'destructive' : 'default'}
                              disabled={loading}
                            >
                              {user.status === 'active' ? (
                                <><XCircle className="w-4 h-4 mr-1" /> Desativar</>
                              ) : (
                                <><CheckCircle className="w-4 h-4 mr-1" /> Ativar</>
                              )}
                            </Button>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Key className="w-4 h-4 mr-1" />
                                  Password
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Alterar Password</DialogTitle>
                                  <DialogDescription>
                                    Definir nova password para {user.name}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="newPassword">Nova Password</Label>
                                    <Input
                                      id="newPassword"
                                      type="password"
                                      value={newPassword}
                                      onChange={(e) => setNewPassword(e.target.value)}
                                      placeholder="Nova password"
                                    />
                                  </div>
                                  <Button
                                    onClick={() => handleResetPassword(user.email)}
                                    className="w-full"
                                    disabled={loading}
                                  >
                                    Alterar Password
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => openLinksDialog(user)}
                                >
                                  <LinkIcon className="w-4 h-4 mr-1" />
                                  Links
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Gerir Links - {user.name}</DialogTitle>
                                  <DialogDescription>
                                    Configure os links de acesso únicos para cada cidade e marca desta agência
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  {Object.entries(cityNames).map(([cityKey, cityName]) => (
                                    <div key={cityKey} className="space-y-3">
                                      <h4 className="font-medium text-lg flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${cityKey === 'lisbon' ? 'bg-blue-500' : cityKey === 'porto' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                        {cityName}
                                      </h4>
                                      <div className="grid grid-cols-1 gap-4">
                                        {Object.entries(brandNames).map(([brandKey, brandName]) => (
                                          <div key={brandKey} className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                              <div className={`w-3 h-3 rounded-full ${brandColors[brandKey as keyof typeof brandColors]}`}></div>
                                              {brandName}
                                            </Label>
                                            <div className="flex gap-2">
                                              <Input
                                                placeholder={`Link ${brandName} ${cityName} - https://multipark.pt/book?city=${cityKey}&parkBrand=${brandKey}&campaignId=...`}
                                                value={linkFormData[cityKey as keyof typeof linkFormData][brandKey as keyof typeof linkFormData[typeof cityKey]]}
                                                onChange={(e) => setLinkFormData(prev => ({
                                                  ...prev,
                                                  [cityKey]: {
                                                    ...prev[cityKey as keyof typeof prev],
                                                    [brandKey]: e.target.value
                                                  }
                                                }))}
                                                className="flex-1"
                                              />
                                              {linkFormData[cityKey as keyof typeof linkFormData][brandKey as keyof typeof linkFormData[typeof cityKey]] && (
                                                <Button
                                                  type="button"
                                                  variant="outline"
                                                  size="sm"
                                                  onClick={() => window.open(linkFormData[cityKey as keyof typeof linkFormData][brandKey as keyof typeof linkFormData[typeof cityKey]], '_blank')}
                                                >
                                                  <ExternalLink className="w-4 h-4" />
                                                </Button>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      <Separator />
                                    </div>
                                  ))}
                                  <Button
                                    onClick={() => selectedUser && handleUpdateLinks(selectedUser.email)}
                                    className="w-full"
                                    disabled={loading}
                                  >
                                    <Save className="w-4 h-4 mr-2" />
                                    Atualizar Links
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Utilizadores</p>
                      <p className="text-2xl font-bold">{allUsers.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Utilizadores Ativos</p>
                      <p className="text-2xl font-bold">{allUsers.filter(u => u.status === 'active').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pedidos Pendentes</p>
                      <p className="text-2xl font-bold">{pendingUsers.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialog de Aprovação com Configuração de Links */}
        <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-green-600" />
                Aprovar Agência: {selectedPendingUser?.name}
              </DialogTitle>
              <DialogDescription>
                Configure os 9 links únicos desta agência (3 cidades × 3 marcas). Cada link deve ser criado no sistema de reservas e colado aqui.
              </DialogDescription>
            </DialogHeader>

            {selectedPendingUser && (
              <div className="space-y-6">
                {/* Informações da agência */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><strong>Nome:</strong> {selectedPendingUser.name}</div>
                      <div><strong>Email:</strong> {selectedPendingUser.email}</div>
                      <div><strong>Telefone:</strong> {selectedPendingUser.phone}</div>
                      <div><strong>NIF:</strong> {selectedPendingUser.nif}</div>
                    </div>
                    {selectedPendingUser.observations && (
                      <div className="mt-3">
                        <strong>Observações:</strong> {selectedPendingUser.observations}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Botão para gerar templates */}
                <div className="flex justify-center">
                  <Button
                    onClick={() => handleCreateLinks(selectedPendingUser.id, selectedPendingUser.name)}
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Gerar Templates de Links
                  </Button>
                </div>

                {/* Configuração de Links */}
                <div className="space-y-6">
                  {Object.entries(cityNames).map(([cityKey, cityName]) => (
                    <Card key={cityKey} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <h4 className="font-medium text-lg flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full ${cityKey === 'lisbon' ? 'bg-blue-500' : cityKey === 'porto' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                          {cityName}
                        </h4>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {Object.entries(brandNames).map(([brandKey, brandName]) => (
                          <div key={brandKey} className="space-y-2">
                            <Label className="text-sm font-medium flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${brandColors[brandKey as keyof typeof brandColors]}`}></div>
                              {brandName} - {cityName}
                              <Badge variant="outline" className="ml-2 text-xs">
                                Obrigatório
                              </Badge>
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                placeholder={`Cole aqui o link único para ${brandName} em ${cityName}`}
                                value={approvalLinks[cityKey as keyof typeof approvalLinks][brandKey as keyof typeof approvalLinks[typeof cityKey]]}
                                onChange={(e) => setApprovalLinks(prev => ({
                                  ...prev,
                                  [cityKey]: {
                                    ...prev[cityKey as keyof typeof prev],
                                    [brandKey]: e.target.value
                                  }
                                }))}
                                className="flex-1"
                              />
                              {approvalLinks[cityKey as keyof typeof approvalLinks][brandKey as keyof typeof approvalLinks[typeof cityKey]] && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(approvalLinks[cityKey as keyof typeof approvalLinks][brandKey as keyof typeof approvalLinks[typeof cityKey]])}
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Botões de ação */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleApproveUser}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    {loading ? 'A aprovar...' : 'Aprovar Agência com Links'}
                  </Button>
                  <Button
                    onClick={() => setShowApprovalDialog(false)}
                    variant="outline"
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <strong>Nota:</strong> Todos os 9 links devem ser preenchidos antes de aprovar a agência. 
                  Cada link deve ser único e conter as comissões específicas desta agência.
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminDashboard;
