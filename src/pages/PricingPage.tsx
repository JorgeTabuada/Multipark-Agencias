import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { DollarSign, CheckCircle } from 'lucide-react';

const PricingPage = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(cityName || 'lisboa');

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

  // Preços específicos por cidade baseados nas imagens
  const cityPrices = {
    lisboa: {
      airpark: {
        valetPark: '15€',
        parqueDescoberto: '8€',
        parqueCoberto: '9€',
        parqueIndoor: '10€',
        carregamentoEletrico: '30€',
        lavagemCompleta: '30€',
        valetFlex: '5€'
      },
      redpark: {
        valetPark: '15€',
        parqueDescoberto: '7€',
        parqueCoberto: '8€',
        parqueIndoor: '10€',
        carregamentoEletrico: '30€',
        lavagemCompleta: '30€',
        valetFlex: '5€'
      },
      skypark: {
        valetPark: '10€',
        parqueDescoberto: '5€',
        parqueCoberto: '7€',
        parqueIndoor: '10€',
        carregamentoEletrico: '30€',
        lavagemCompleta: '30€',
        valetFlex: '5€'
      }
    },
    porto: {
      airpark: {
        valetPark: '10€',
        parqueDescoberto: '6€',
        parqueCoberto: '8€',
        parqueIndoor: '10€',
        carregamentoEletrico: '30€',
        lavagemCompleta: '35€',
        valetFlex: '5€'
      },
      redpark: {
        valetPark: '10€',
        parqueDescoberto: '5€',
        parqueCoberto: '7€',
        parqueIndoor: '10€',
        carregamentoEletrico: '30€',
        lavagemCompleta: '35€',
        valetFlex: '5€'
      },
      skypark: {
        valetPark: '10€',
        parqueDescoberto: '5€',
        parqueCoberto: '7€',
        parqueIndoor: '10€',
        carregamentoEletrico: '30€',
        lavagemCompleta: '30€',
        valetFlex: '5€'
      }
    },
    faro: {
      airpark: {
        valetPark: '12€',
        parqueDescoberto: '6€',
        parqueCoberto: '9€',
        parqueIndoor: '10€',
        carregamentoEletrico: '30€',
        lavagemCompleta: '35€',
        valetFlex: '5€'
      },
      redpark: {
        valetPark: '10€',
        parqueDescoberto: '5€',
        parqueCoberto: '7€',
        parqueIndoor: '10€',
        carregamentoEletrico: '30€',
        lavagemCompleta: '35€',
        valetFlex: '5€'
      },
      skypark: {
        valetPark: '10€',
        parqueDescoberto: '5€',
        parqueCoberto: '7€',
        parqueIndoor: '10€',
        carregamentoEletrico: '30€',
        lavagemCompleta: '30€',
        valetFlex: '5€'
      }
    }
  };

  const pricingPlans = [
    {
      name: 'Airpark',
      color: 'from-blue-500 to-blue-600',
      logo: '/lovable-uploads/5b2012cb-8205-49b0-9d26-1432a5dc7a97.png',
      description: 'Estacionamento aeroportuário premium'
    },
    {
      name: 'Redpark',
      color: 'from-red-500 to-red-600',
      logo: '/lovable-uploads/4d541e8b-f168-4891-887c-0194fc8c578a.png',
      description: 'Soluções urbanas de estacionamento'
    },
    {
      name: 'Skypark',
      color: 'from-purple-500 to-purple-600',
      logo: '/lovable-uploads/19090a30-ee41-4534-99d4-ed488471f1f3.png',
      description: 'Estacionamento premium com serviços VIP'
    }
  ];

  const services = [
    { key: 'valetPark', name: '1-Valet Park:', icon: '🚗' },
    { key: 'parqueDescoberto', name: '2-Parque Descoberto:', icon: '🌤️' },
    { key: 'parqueCoberto', name: '3-Parque Coberto:', icon: '🏢' },
    { key: 'parqueIndoor', name: '4-Parque Indoor:', icon: '🏠' },
    { key: 'carregamentoEletrico', name: '5-Carregamento Elétrico:', icon: '⚡' },
    { key: 'lavagemCompleta', name: '6-Lavagem Completa:', icon: '🧽' },
    { key: 'valetFlex', name: '7-Valet Flex:', icon: '🔄' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <DollarSign size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Preçário Multipark
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Conheça os nossos preços competitivos por cidade
            </p>

            {/* Seletor de Cidade */}
            <div className="flex justify-center space-x-4 mb-8">
              {cities.map((city) => (
                <button
                  key={city.key}
                  onClick={() => setSelectedCity(city.key)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedCity === city.key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-blue-100 border border-gray-200'
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan) => {
              const planKey = plan.name.toLowerCase() as keyof typeof cityPrices.lisboa;
              const prices = cityPrices[selectedCity as keyof typeof cityPrices][planKey];
              
              return (
                <div key={plan.name} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className={`bg-gradient-to-r ${plan.color} p-6 text-white text-center`}>
                    <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                    <div className="w-full h-16 bg-white/20 rounded-lg flex items-center justify-center p-3 mb-2">
                      <img 
                        src={plan.logo} 
                        alt={`${plan.name} logo`} 
                        className="max-h-10 max-w-full object-contain filter brightness-0 invert"
                      />
                    </div>
                    <p className="text-sm opacity-90">{plan.description}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3">
                      {services.map((service) => (
                        <div key={service.key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <span className="text-gray-700 flex items-center">
                            <span className="mr-2">{service.icon}</span>
                            {service.name}
                          </span>
                          <span className="text-xl font-bold text-gray-800">
                            {prices[service.key as keyof typeof prices]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Descontos Especiais */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Descontos Especiais
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                <h4 className="font-bold text-green-800 text-lg mb-2">Até 5 Reservas</h4>
                <p className="text-green-700 font-semibold">10% de desconto</p>
              </div>
              <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                <h4 className="font-bold text-blue-800 text-lg mb-2">Até 11 Reservas</h4>
                <p className="text-blue-700 font-semibold">15% de desconto</p>
              </div>
              <div className="p-6 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg">
                <h4 className="font-bold text-purple-800 text-lg mb-2">Após 11 Reservas</h4>
                <p className="text-purple-700 font-semibold">20% de desconto</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;