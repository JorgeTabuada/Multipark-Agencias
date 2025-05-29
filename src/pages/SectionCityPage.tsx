
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getRedirectUrl } from '../utils/redirectUtils';

const SectionCityPage = () => {
  const { sectionName, cityName } = useParams<{ sectionName: string; cityName: string }>();

  const sectionDisplayName = sectionName ? 
    sectionName.charAt(0).toUpperCase() + sectionName.slice(1) : '';
  const cityDisplayName = cityName ? 
    cityName.charAt(0).toUpperCase() + cityName.slice(1) : '';

  // Para este novo site, vou usar um usuário padrão para os links
  const defaultUser = { name: 'user' };

  const handleParkingServiceClick = (brand: string) => {
    if (cityName) {
      const redirectUrl = getRedirectUrl(defaultUser.name, cityName, brand);
      window.open(redirectUrl, '_blank');
    }
  };

  const parkingServices = [
    { 
      name: 'Airpark', 
      color: 'from-blue-500 to-blue-600',
      logo: '/lovable-uploads/5b2012cb-8205-49b0-9d26-1432a5dc7a97.png'
    },
    { 
      name: 'Redpark', 
      color: 'from-red-500 to-red-600',
      logo: '/lovable-uploads/4d541e8b-f168-4891-887c-0194fc8c578a.png'
    },
    { 
      name: 'Skypark', 
      color: 'from-purple-500 to-purple-600',
      logo: '/lovable-uploads/19090a30-ee41-4534-99d4-ed488471f1f3.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to={`/section/${sectionName}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-2"
              >
                <ArrowLeft size={18} />
                <span>Voltar</span>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="h-12 flex items-center">
                  <img 
                    src="/lovable-uploads/8526bed4-aa2e-43bb-b530-31569f85f461.png" 
                    alt="Multipark Logo" 
                    className="h-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            {sectionDisplayName}
          </h2>
          <h3 className="text-2xl text-gray-600 mb-4">
            {cityDisplayName}
          </h3>
          <p className="text-xl text-gray-600">
            Escolha o seu serviço de estacionamento
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {parkingServices.map((service) => (
              <div
                key={service.name}
                onClick={() => handleParkingServiceClick(service.name)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-white"
              >
                <div className={`bg-gradient-to-br ${service.color} p-6 text-white min-h-[120px] flex flex-col justify-center items-center`}>
                  <h4 className="text-xl font-bold mb-4">{service.name}</h4>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 bg-white flex items-center justify-center min-h-[120px]">
                  <img 
                    src={service.logo} 
                    alt={`${service.name} logo`} 
                    className="max-h-16 max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SectionCityPage;
