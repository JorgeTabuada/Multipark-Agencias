
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { Car, DollarSign, Info, Phone } from 'lucide-react';
import { getRedirectUrl } from '../utils/redirectUtils';

const CityPage = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const cityDisplayName = cityName ? cityName.charAt(0).toUpperCase() + cityName.slice(1) : '';

  const handleParkingServiceClick = (brand: string) => {
    if (user && cityName) {
      const redirectUrl = getRedirectUrl(user.name, cityName, brand);
      window.open(redirectUrl, '_blank');
    }
  };

  const parkingServices = [
    { 
      name: 'Airpark', 
      color: 'from-blue-500 to-blue-600', 
      icon: Car,
      logo: '/lovable-uploads/5b2012cb-8205-49b0-9d26-1432a5dc7a97.png'
    },
    { 
      name: 'Redpark', 
      color: 'from-red-500 to-red-600', 
      icon: Car,
      logo: '/lovable-uploads/4d541e8b-f168-4891-887c-0194fc8c578a.png'
    },
    { 
      name: 'Skypark', 
      color: 'from-purple-500 to-purple-600', 
      icon: Car,
      logo: '/lovable-uploads/19090a30-ee41-4534-99d4-ed488471f1f3.png'
    }
  ];

  const infoServices = [
    { name: 'Preçário', path: 'pricing', color: 'from-green-500 to-green-600', icon: DollarSign },
    { name: 'Diferenças', path: 'differences', color: 'from-orange-500 to-orange-600', icon: Info },
    { name: 'Contacto', path: 'contact', color: 'from-gray-500 to-gray-600', icon: Phone }
  ];

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
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Primeira fila - Serviços de Estacionamento */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Serviços de Estacionamento
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {parkingServices.map((service) => (
                <div
                  key={service.name}
                  onClick={() => handleParkingServiceClick(service.name)}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                >
                  <div className={`bg-gradient-to-br ${service.color} p-8 text-white min-h-[180px] flex flex-col justify-center items-center`}>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon size={32} />
                    </div>
                    <h4 className="text-xl font-bold mb-2">{service.name}</h4>
                    <div className="w-full h-12 bg-white/20 rounded-lg flex items-center justify-center mb-2 p-2">
                      <img 
                        src={service.logo} 
                        alt={`${service.name} logo`} 
                        className="max-h-8 max-w-full object-contain"
                      />
                    </div>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
