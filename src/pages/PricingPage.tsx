import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { EuroIcon, CheckCircle } from 'lucide-react';

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

  const cityDisplayName = selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  const airparkPrices = {
    lisboa: {
      valetPark: '15€',
      parqueDescoberto: '8€',
      parqueCoberto: '9€',
      parqueIndoor: '10€',
      carregamentoEletrico: '30€',
      lavagemCompleta: '30€',
      valetFlex: '5€'
    },
    porto: {
      valetPark: '10€',
      parqueDescoberto: '6€',
      parqueCoberto: '8€',
      parqueIndoor: '10€',
      carregamentoEletrico: '30€',
      lavagemCompleta: '35€',
      valetFlex: '5€'
    },
    faro: {
      valetPark: '12€',
      parqueDescoberto: '6€',
      parqueCoberto: '9€',
      parqueIndoor: '10€',
      carregamentoEletrico: '30€',
      lavagemCompleta: '35€',
      valetFlex: '5€'
    }
  };

  const redparkPrices = {
    lisboa: {
      valetPark: '15€',
      parqueDescoberto: '7€',
      parqueCoberto: '8€',
      parqueIndoor: '10€',
      carregamentoEletrico: '30€',
      lavagemCompleta: '30€',
      valetFlex: '5€'
    },
    porto: {
      valetPark: '10€',
      parqueDescoberto: '5€',
      parqueCoberto: '7€',
      parqueIndoor: '10€',
      carregamentoEletrico: '30€',
      lavagemCompleta: '35€',
      valetFlex: '5€'
    },
    faro: {
      valetPark: '10€',
      parqueDescoberto: '5€',
      parqueCoberto: '7€',
      parqueIndoor: '10€',
      carregamentoEletrico: '30€',
      lavagemCompleta: '35€',
      valetFlex: '5€'
    }
  };

  const skyparkPrices = {
    lisboa: {
      valetPark: '10€',
      parqueDescoberto: '5€',
      parqueCoberto: '7€',
      parqueIndoor: '10€',
      carregamentoEletrico: '30€',
      lavagemCompleta: '30€',
      valetFlex: '5€'
    },
    porto: {
      valetPark: '10€',
      parqueDescoberto: '5€',
      parqueCoberto: '7€',
      parqueIndoor: '10€',
      carregamentoEletrico: '30€',
      lavagemCompleta: '30€',
      valetFlex: '5€'
    },
    faro: {
      valetPark: '10€',
      parqueDescoberto: '5€',
      parqueCoberto: '7€',
      parqueIndoor: '10€',
      carregamentoEletrico: '30€',
      lavagemCompleta: '30€',
      valetFlex: '5€'
    }
  };

  const pricingPlans = [
    {
      name: 'Airpark',
      color: 'from-blue-500 to-blue-600',
      logo: '/lovable-uploads/5b2012cb-8205-49b0-9d26-1432a5dc7a97.png',
      prices: airparkPrices[selectedCity as keyof typeof airparkPrices],
      features: [
        '1-Valet Park',
        '2-Parque Descoberto',
        '3-Parque Coberto',
        '4-Parque Indoor',
        '5-Carregamento Elétrico',
        '6-Lavagem Completa',
        '7-Valet Flex'
      ]
    },
    {
      name: 'Redpark',
      color: 'from-red-500 to-red-600',
      logo: '/lovable-uploads/4d541e8b-f168-4891-887c-0194fc8c578a.png',
      prices: redparkPrices[selectedCity as keyof typeof redparkPrices],
      features: [
        '1-Valet Park',
        '2-Parque Descoberto',
        '3-Parque Coberto',
        '4-Parque Indoor',
        '5-Carregamento Elétrico',
        '6-Lavagem Completa',
        '7-Valet Flex'
      ]
    },
    {
      name: 'Skypark',
      color: 'from-purple-500 to-purple-600',
      logo: '/lovable-uploads/19090a30-ee41-4534-99d4-ed488471f1f3.png',
      prices: skyparkPrices[selectedCity as keyof typeof skyparkPrices],
      features: [
        '1-Valet Park',
        '2-Parque Descoberto',
        '3-Parque Coberto',
        '4-Parque Indoor',
        '5-Carregamento Elétrico',
        '6-Lavagem Completa',
        '7-Valet Flex'
      ]
    }
  ];

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    navigate(`/pricing/${city}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <EuroIcon size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Preçário - {cityDisplayName}
            </h2>
            <p className="text-xl text-gray-600">
              Conheça os nossos preços competitivos
            </p>
            
            <div className="flex justify-center mt-6 space-x-4">
              <button 
                onClick={() => handleCityChange('lisboa')}
                className={`px-4 py-2 rounded-lg ${selectedCity === 'lisboa' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Lisboa
              </button>
              <button 
                onClick={() => handleCityChange('porto')}
                className={`px-4 py-2 rounded-lg ${selectedCity === 'porto' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Porto
              </button>
              <button 
                onClick={() => handleCityChange('faro')}
                className={`px-4 py-2 rounded-lg ${selectedCity === 'faro' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Faro
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className={`bg-gradient-to-r ${plan.color} p-6 text-white text-center`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="w-full h-12 bg-white/20 rounded-lg flex items-center justify-center p-2">
                    <img 
                      src={plan.logo} 
                      alt={`${plan.name} logo`} 
                      className="h-8 max-w-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{plan.features[0]}:</span>
                      <span className="text-xl font-bold text-gray-800">{plan.prices.valetPark}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{plan.features[1]}:</span>
                      <span className="text-xl font-bold text-gray-800">{plan.prices.parqueDescoberto}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{plan.features[2]}:</span>
                      <span className="text-xl font-bold text-gray-800">{plan.prices.parqueCoberto}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{plan.features[3]}:</span>
                      <span className="text-xl font-bold text-gray-800">{plan.prices.parqueIndoor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{plan.features[4]}:</span>
                      <span className="text-xl font-bold text-gray-800">{plan.prices.carregamentoEletrico}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{plan.features[5]}:</span>
                      <span className="text-xl font-bold text-gray-800">{plan.prices.lavagemCompleta}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{plan.features[6]}:</span>
                      <span className="text-xl font-bold text-gray-800">{plan.prices.valetFlex}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Descontos Especiais
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                <h4 className="font-bold text-green-800">Até 5 Reservas</h4>
                <p className="text-green-700">10% de desconto</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                <h4 className="font-bold text-blue-800">Até 11 Reservas</h4>
                <p className="text-blue-700">15% de desconto</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg">
                <h4 className="font-bold text-purple-800">Após 11 Reservas</h4>
                <p className="text-purple-700">20% de desconto</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
