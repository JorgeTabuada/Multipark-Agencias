import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { Info, Star, Shield, Car, Wifi, Coffee, CheckCircle, XCircle, Clock, MapPin } from 'lucide-react';

const DifferencesPage = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(cityName || 'faro');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const cities = [
    { key: 'lisboa', name: 'Lisboa' },
    { key: 'porto', name: 'Porto' },
    { key: 'faro', name: 'Faro' }
  ];

  const services = [
    {
      name: 'Airpark',
      color: 'from-blue-500 to-blue-600',
      logo: '/lovable-uploads/5b2012cb-8205-49b0-9d26-1432a5dc7a97.png',
      rating: 4.8,
      description: 'Serviço premium com proximidade ao aeroporto',
      distance: '2,5 km',
      details: {
        valetPartida: 'À sua espera nas partidas',
        valetChegada: 'Máximo 10 minutos',
        parqueDescoberto: 'Alcatrão',
        parqueCoberto: 'Acimentado',
        parqueIndoor: 'Acimentado'
      },
      features: [
        { icon: MapPin, text: 'Distância: 2,5 km do aeroporto', available: true },
        { icon: Clock, text: 'Valet partida: À sua espera', available: true },
        { icon: Clock, text: 'Valet chegada: Máx 10 min', available: true },
        { icon: Shield, text: 'Parque coberto: Acimentado', available: true },
        { icon: Car, text: 'Parque indoor: Acimentado', available: true },
        { icon: Star, text: 'Serviço premium', available: true }
      ]
    },
    {
      name: 'Redpark',
      color: 'from-red-500 to-red-600',
      logo: '/lovable-uploads/4d541e8b-f168-4891-887c-0194fc8c578a.png',
      rating: 4.6,
      description: 'Opção equilibrada com boa qualidade-preço',
      distance: '5 km',
      details: {
        valetPartida: 'A 10 minutos',
        valetChegada: 'Máximo 15 minutos',
        parqueDescoberto: 'Tuvena',
        parqueCoberto: 'Alcatroado',
        parqueIndoor: 'Acimentado'
      },
      features: [
        { icon: MapPin, text: 'Distância: 5 km do aeroporto', available: true },
        { icon: Clock, text: 'Valet partida: 10 minutos', available: true },
        { icon: Clock, text: 'Valet chegada: Máx 15 min', available: true },
        { icon: Shield, text: 'Parque coberto: Alcatroado', available: true },
        { icon: Car, text: 'Parque indoor: Acimentado', available: true },
        { icon: Star, text: 'Boa qualidade-preço', available: true }
      ]
    },
    {
      name: 'Skypark',
      color: 'from-purple-500 to-purple-600',
      logo: '/lovable-uploads/19090a30-ee41-4534-99d4-ed488471f1f3.png',
      rating: 4.3,
      description: 'Opção mais distante com infraestrutura variada',
      distance: '8 km',
      details: {
        valetPartida: '15 minutos',
        valetChegada: 'Máximo 20 minutos',
        parqueDescoberto: 'Tuvena',
        parqueCoberto: 'Tuvena',
        parqueIndoor: 'Alcatroado'
      },
      features: [
        { icon: MapPin, text: 'Distância: 8 km do aeroporto', available: true },
        { icon: Clock, text: 'Valet partida: 15 minutos', available: true },
        { icon: Clock, text: 'Valet chegada: Máx 20 min', available: true },
        { icon: Shield, text: 'Parque coberto: Tuvena', available: true },
        { icon: Car, text: 'Parque indoor: Alcatroado', available: true },
        { icon: Star, text: 'Infraestrutura variada', available: true }
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
              Diferenças - {cities.find(c => c.key === selectedCity)?.name || 'Faro'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Compare os nossos serviços e escolha o melhor para si
            </p>

            {/* Seletor de Cidade */}
            <div className="flex justify-center space-x-4 mb-8">
              {cities.map((city) => (
                <button
                  key={city.key}
                  onClick={() => setSelectedCity(city.key)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedCity === city.key
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-orange-100 border border-gray-200'
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {services.map((service) => (
              <div key={service.name} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                    <div className="w-full h-16 bg-white/20 rounded-lg flex items-center justify-center mb-3 p-3">
                      <img 
                        src={service.logo} 
                        alt={`${service.name} logo`} 
                        className="max-h-10 max-w-full object-contain filter brightness-0 invert"
                      />
                    </div>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {[...Array(4)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < Math.floor(service.rating) ? 'fill-current text-yellow-300' : 'text-yellow-300/30'} 
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold">{service.rating}</span>
                    </div>
                  </div>
                  <p className="text-center text-white/90 text-sm mb-2">{service.description}</p>
                  <div className="text-center">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                      {service.distance} do aeroporto
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Características:</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="text-blue-600">
                          <feature.icon size={16} />
                        </div>
                        <span className="text-sm text-gray-700">
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Resumo Comparativo Detalhado
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-800">Tópicos</th>
                    <th className="text-center py-4 px-4 font-semibold text-blue-600">Airpark</th>
                    <th className="text-center py-4 px-4 font-semibold text-red-600">Redpark</th>
                    <th className="text-center py-4 px-4 font-semibold text-purple-600">Skypark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-700 font-medium">
                      Valet Park Partida
                      <br />
                      <small className="text-gray-500">*ligar 10min antes</small>
                    </td>
                    <td className="text-center py-4 px-4 font-semibold text-green-600">À sua espera nas partidas</td>
                    <td className="text-center py-4 px-4 font-semibold">A 10 minutos</td>
                    <td className="text-center py-4 px-4 font-semibold">15 minutos</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-700 font-medium">
                      Valet Park Chegada
                      <br />
                      <small className="text-gray-500">*ligar com bagagem</small>
                    </td>
                    <td className="text-center py-4 px-4 font-semibold text-green-600">Máximo 10 minutos</td>
                    <td className="text-center py-4 px-4 font-semibold">Máximo 15 minutos</td>
                    <td className="text-center py-4 px-4 font-semibold">Máximo 20 minutos</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-700 font-medium">Parque Descoberto</td>
                    <td className="text-center py-4 px-4 font-semibold">Alcatrão</td>
                    <td className="text-center py-4 px-4 font-semibold">Tuvena</td>
                    <td className="text-center py-4 px-4 font-semibold">Tuvena</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-700 font-medium">Parque Coberto</td>
                    <td className="text-center py-4 px-4 font-semibold">Acimentado</td>
                    <td className="text-center py-4 px-4 font-semibold">Alcatroado</td>
                    <td className="text-center py-4 px-4 font-semibold">Tuvena</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-700 font-medium">Parque Indoor</td>
                    <td className="text-center py-4 px-4 font-semibold">Acimentado</td>
                    <td className="text-center py-4 px-4 font-semibold">Acimentado</td>
                    <td className="text-center py-4 px-4 font-semibold">Alcatroado</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-700 font-medium">
                      Distância do Parque
                      <br />
                      <small className="text-gray-500">*carros podem ser movimentados</small>
                    </td>
                    <td className="text-center py-4 px-4 font-semibold text-green-600">2,5 km</td>
                    <td className="text-center py-4 px-4 font-semibold">5 km</td>
                    <td className="text-center py-4 px-4 font-semibold">8 km</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-700 font-medium">Avaliação Clientes</td>
                    <td className="text-center py-4 px-4">
                      <span className="font-bold text-lg">4.8</span>
                      <span className="text-yellow-500 ml-1">⭐</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="font-bold text-lg">4.6</span>
                      <span className="text-yellow-500 ml-1">⭐</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="font-bold text-lg">4.3</span>
                      <span className="text-yellow-500 ml-1">⭐</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Na hora da chegada, os carros podem ser movimentados de um parque para outro para fins de arrumação.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DifferencesPage;