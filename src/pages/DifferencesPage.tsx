import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { Info, Star, Shield, Car, Wifi, Coffee } from 'lucide-react';

const DifferencesPage = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const { isAuthenticated } = useAuth();
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

  const services = [
    {
      name: 'Airpark',
      color: 'from-blue-500 to-blue-600',
      logo: '/lovable-uploads/5b2012cb-8205-49b0-9d26-1432a5dc7a97.png',
      rating: 4.8,
      description: 'Serviço premium com cobertura total',
      features: [
        { icon: Shield, text: 'Estacionamento coberto', available: true },
        { icon: Car, text: 'Shuttle gratuito 24/7', available: true },
        { icon: Star, text: 'Segurança máxima', available: true },
        { icon: Wifi, text: 'WiFi gratuito', available: true },
        { icon: Coffee, text: 'Área de espera', available: true },
        { icon: Car, text: 'Serviço valet', available: false }
      ]
    },
    {
      name: 'Redpark',
      color: 'from-red-500 to-red-600',
      logo: '/lovable-uploads/4d541e8b-f168-4891-887c-0194fc8c578a.png',
      rating: 4.5,
      description: 'Opção económica e eficiente',
      features: [
        { icon: Shield, text: 'Estacionamento ao ar livre', available: true },
        { icon: Car, text: 'Shuttle de 15 em 15 min', available: true },
        { icon: Star, text: 'Vigilância por câmaras', available: true },
        { icon: Wifi, text: 'WiFi básico', available: true },
        { icon: Coffee, text: 'Área de espera', available: false },
        { icon: Car, text: 'Serviço valet', available: false }
      ]
    },
    {
      name: 'Skypark',
      color: 'from-purple-500 to-purple-600',
      logo: '/lovable-uploads/19090a30-ee41-4534-99d4-ed488471f1f3.png',
      rating: 5.0,
      description: 'Experiência VIP completa',
      features: [
        { icon: Shield, text: 'Estacionamento premium', available: true },
        { icon: Car, text: 'Shuttle exclusivo', available: true },
        { icon: Star, text: 'Segurança máxima', available: true },
        { icon: Wifi, text: 'WiFi de alta velocidade', available: true },
        { icon: Coffee, text: 'Lounge VIP', available: true },
        { icon: Car, text: 'Serviço valet incluído', available: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Info size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Diferenças - {cityDisplayName}
            </h2>
            <p className="text-xl text-gray-600">
              Compare os nossos serviços e escolha o melhor para si
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.name} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                    <div className="w-full h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 p-2">
                      <img 
                        src={service.logo} 
                        alt={`${service.name} logo`} 
                        className="max-h-8 max-w-full object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < Math.floor(service.rating) ? 'fill-current' : 'opacity-30'} 
                        />
                      ))}
                      <span className="ml-2 text-sm">{service.rating}</span>
                    </div>
                  </div>
                  <p className="text-center text-blue-100">{service.description}</p>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Características:</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          feature.available 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <feature.icon size={16} />
                        </div>
                        <span className={`text-sm ${
                          feature.available ? 'text-gray-700' : 'text-gray-400 line-through'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Resumo Comparativo
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Característica</th>
                    <th className="text-center py-3 px-4 font-semibold text-blue-600">Airpark</th>
                    <th className="text-center py-3 px-4 font-semibold text-red-600">Redpark</th>
                    <th className="text-center py-3 px-4 font-semibold text-purple-600">Skypark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-gray-700">Preço por dia</td>
                    <td className="text-center py-3 px-4">15.00€</td>
                    <td className="text-center py-3 px-4">12.00€</td>
                    <td className="text-center py-3 px-4">18.00€</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-gray-700">Cobertura</td>
                    <td className="text-center py-3 px-4 text-green-600">✓</td>
                    <td className="text-center py-3 px-4 text-red-600">✗</td>
                    <td className="text-center py-3 px-4 text-green-600">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-gray-700">Serviço Valet</td>
                    <td className="text-center py-3 px-4 text-red-600">✗</td>
                    <td className="text-center py-3 px-4 text-red-600">✗</td>
                    <td className="text-center py-3 px-4 text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700">Avaliação</td>
                    <td className="text-center py-3 px-4">4.8⭐</td>
                    <td className="text-center py-3 px-4">4.5⭐</td>
                    <td className="text-center py-3 px-4">5.0⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DifferencesPage;
