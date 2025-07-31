
import React, { useState } from 'react';
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
  Edit
} from 'lucide-react';
import Header from '../components/Header';

const AdminDashboard = () => {
  const { user, isAdmin, getPendingUsers, approveUser, rejectUser, getAllUsers, updateUserStatus, updateUserLinks, resetUserPassword } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');
  const [linkFormData, setLinkFormData] = useState({
    lisbon: { airpark: '', redpark: '', skypark: '' },
    porto: { airpark: '', redpark: '', skypark: '' },
    faro: { airpark: '', redpark: '', skypark: '' }
  });

  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const pendingUsers = getPendingUsers();
  const allUsers = getAllUsers();

  const handleApproveUser = async (userId: string) => {
    setLoading(true);
    try {
      // Create default links based on user name
      const defaultLinks = {
        lisbon: {
          airpark: `https://airpark.pt/agencias/${userId}/lisbon`,
          redpark: `https://redpark.pt/agencias/${userId}/lisbon`,
          skypark: `https://skypark.pt/agencias/${userId}/lisbon`
        },
        porto: {
          airpark: `https://airpark.pt/agencias/${userId}/porto`,
          redpark: `https://redpark.pt/agencias/${userId}/porto`,
          skypark: `https://skypark.pt/agencias/${userId}/porto`
        },
        faro: {
          airpark: `https://airpark.pt/agencias/${userId}/faro`,
          redpark: `https://redpark.pt/agencias/${userId}/faro`,
          skypark: `https://skypark.pt/agencias/${userId}/faro`
        }
      };

      const success = await approveUser(userId, defaultLinks);
      if (success) {
        toast.success('Utilizador aprovado com sucesso!');
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
                  Novos pedidos de agências aguardando aprovação
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
                                onClick={() => handleApproveUser(pendingUser.id)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                disabled={loading}
                              >
                                <UserCheck className="w-4 h-4 mr-1" />
                                Aprovar
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
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Gerir Links - {user.name}</DialogTitle>
                                  <DialogDescription>
                                    Configure os links de acesso para cada cidade e marca
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  {['lisbon', 'porto', 'faro'].map((city) => (
                                    <div key={city} className="space-y-3">
                                      <h4 className="font-medium capitalize text-lg">{city === 'lisbon' ? 'Lisboa' : city === 'porto' ? 'Porto' : 'Faro'}</h4>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {['airpark', 'redpark', 'skypark'].map((brand) => (
                                          <div key={brand} className="space-y-1">
                                            <Label className="text-sm capitalize">{brand}</Label>
                                            <Input
                                              placeholder={`Link ${brand} ${city}`}
                                              value={linkFormData[city as keyof typeof linkFormData][brand as keyof typeof linkFormData[typeof city]]}
                                              onChange={(e) => setLinkFormData(prev => ({
                                                ...prev,
                                                [city]: {
                                                  ...prev[city as keyof typeof prev],
                                                  [brand]: e.target.value
                                                }
                                              }))}
                                            />
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
                                    <Edit className="w-4 h-4 mr-2" />
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
      </main>
    </div>
  );
};

export default AdminDashboard;
