
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { DollarSign, CheckCircle } from 'lucide-react';

const PricingPage = () => {
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

  const pricingPlans = [
    {
      name: 'Airpark',
      color: 'from-blue-500 to-blue-600',
      prices: {
        hourly: '2.50€',
        daily: '15.00€',
        weekly: '80.00€',
        monthly: '300.00€'
      },
      features: [
        'Estacionamento coberto',
        'Segurança 24/7',
        'Shuttle gratuito',
        'Reserva online'
      ]
    },
    {
      name: 'Redpark',
      color: 'from-red-500 to-red-600',
      prices: {
        hourly: '2.00€',
        daily: '12.00€',
        weekly: '70.00€',
        monthly: '250.00€'
      },
      features: [
        'Estacionamento ao ar livre',
        'Vigilância por câmaras',
        'Shuttle de 15 em 15 min',
        'App móvel'
      ]
    },
    {
      name: 'Skypark',
      color: 'from-purple-500 to-purple-600',
      prices: {
        hourly: '3.00€',
        daily: '18.00€',
        weekly: '95.00€',
        monthly: '350.00€'
      },
      features: [
        'Estacionamento premium',
        'Serviço valet',
        'Lavagem do carro',
        'Lounge VIP'
      ]
    }
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
              Preçário - {cityDisplayName}
            </h2>
            <p className="text-xl text-gray-600">
              Conheça os nossos preços competitivos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className={`bg-gradient-to-r ${plan.color} p-6 text-white text-center`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="w-full h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm opacity-75">Logo aqui</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Por hora:</span>
                      <span className="text-xl font-bold text-gray-800">{plan.prices.hourly}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Por dia:</span>
                      <span className="text-xl font-bold text-gray-800">{plan.prices.daily}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Por semana:</span>
                      <span className="text-xl font-bold text-gray-800">{plan.prices.weekly}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Por mês:</span>
                      <span className="text-xl font-bold text-gray-800">{plan.prices.monthly}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Inclui:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle size={16} className="text-green-500" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
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
                <h4 className="font-bold text-green-800">Reserva Antecipada</h4>
                <p className="text-green-700">10% desconto para reservas com mais de 7 dias</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                <h4 className="font-bold text-blue-800">Cliente Frequente</h4>
                <p className="text-blue-700">15% desconto após 10 reservas</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg">
                <h4 className="font-bold text-purple-800">Longa Duração</h4>
                <p className="text-purple-700">20% desconto para estadas superiores a 30 dias</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
