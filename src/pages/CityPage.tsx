
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { DollarSign, Info, Phone, AlertCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const CityPage = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const cityDisplayName = cityName ? cityName.charAt(0).toUpperCase() + cityName.slice(1) : '';
  
  // Map city names to match the data structure
  const cityKey = cityName === 'lisbon' ? 'lisbon' : 
                 cityName === 'porto' ? 'porto' : 
                 cityName === 'faro' ? 'faro' : '';

  const handleParkingServiceClick = (brand: string) => {
    if (!user.links || !cityKey) {
      toast.error('Links de reserva não configurados. Contacte o administrador.');
      return;
    }

    const brandKey = brand.toLowerCase() as 'airpark' | 'redpark' | 'skypark';
    const link = user.links[cityKey as keyof typeof user.links]?.[brandKey];

    if (!link || link.trim() === '') {
      toast.error(`Link para ${brand} em ${cityDisplayName} não configurado. Contacte o administrador.`);
      return;
    }

    // Open the specific link for this agency/city/brand
    window.open(link, '_blank');
    toast.success(`A abrir ${brand} para ${cityDisplayName}...`);
  };

  const parkingServices = [
    { 
      name: 'Airpark', 
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      logo: '/lovable-uploads/5b2012cb-8205-49b0-9d26-1432a5dc7a97.png'
    },
    { 
      name: 'Redpark', 
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      logo: '/lovable-uploads/4d541e8b-f168-4891-887c-0194fc8c578a.png'
    },
    { 
      name: 'Skypark', 
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      logo: '/lovable-uploads/19090a30-ee41-4534-99d4-ed488471f1f3.png'
    }
  ];

  const infoServices = [
    { name: 'Preçário', path: 'pricing', color: 'from-green-500 to-green-600', icon: DollarSign },
    { name: 'Diferenças', path: 'differences', color: 'from-orange-500 to-orange-600', icon: Info },
    { name: 'Contacto', path: 'contact', color: 'from-gray-500 to-gray-600', icon: Phone }
  ];

  // Check if user has links configured for this city
  const hasLinksConfigured = user.links && cityKey && user.links[cityKey as keyof typeof user.links];
  const cityLinks = hasLinksConfigured ? user.links[cityKey as keyof typeof user.links] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {cityDisplayName}
          </h2>
          <p className="text-xl text-gray-600">
            Escolha o seu serviço de estacionamento
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Agência: <strong>{user.name}</strong>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Alert se não tiver links configurados */}
          {!hasLinksConfigured && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-amber-800">
                  <AlertCircle className="w-5 h-5" />
                  <p>
                    <strong>Atenção:</strong> Os links de reserva para {cityDisplayName} ainda não foram configurados. 
                    Contacte o administrador para ativar as reservas nesta cidade.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Primeira fila - Serviços de Estacionamento */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Serviços de Estacionamento
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {parkingServices.map((service) => {
                const brandKey = service.name.toLowerCase() as 'airpark' | 'redpark' | 'skypark';
                const hasLink = cityLinks && cityLinks[brandKey] && cityLinks[brandKey].trim() !== '';
                
                return (
                  <div
                    key={service.name}
                    onClick={() => handleParkingServiceClick(service.name)}
                    className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 transform cursor-pointer bg-white
                      ${hasLink 
                        ? `hover:shadow-2xl hover:-translate-y-2 ${service.hoverColor}` 
                        : 'opacity-60 cursor-not-allowed'
                      }
                    `}
                  >
                    <div className={`bg-gradient-to-br ${service.color} p-6 text-white min-h-[120px] flex flex-col justify-center items-center relative`}>
                      <h4 className="text-xl font-bold mb-2">{service.name}</h4>
                      
                      {hasLink ? (
                        <div className="flex items-center gap-1 text-sm opacity-80">
                          <ExternalLink className="w-3 h-3" />
                          <span>Clique para reservar</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-sm opacity-80">
                          <AlertCircle className="w-3 h-3" />
                          <span>Link não configurado</span>
                        </div>
                      )}
                      
                      {hasLink && (
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </div>
                    <div className="p-6 bg-white flex items-center justify-center min-h-[120px]">
                      <img 
                        src={service.logo} 
                        alt={`${service.name} logo`} 
                        className={`max-h-16 max-w-full object-contain transition-opacity duration-300 ${hasLink ? '' : 'opacity-50'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Informação sobre links */}
          {hasLinksConfigured && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center text-green-800">
                  <p className="text-sm">
                    ✅ <strong>Links configurados para {cityDisplayName}</strong> - Pode fazer reservas em todas as marcas disponíveis
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Segunda fila - Informações */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Informações
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {infoServices.map((service) => (
                <Link
                  key={service.name}
                  to={service.path === 'contact' ? '/contact' : `/${service.path}/${cityName}`}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`bg-gradient-to-br ${service.color} p-8 text-white min-h-[180px] flex flex-col justify-center items-center`}>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon size={32} />
                    </div>
                    <h4 className="text-xl font-bold">{service.name}</h4>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CityPage;
