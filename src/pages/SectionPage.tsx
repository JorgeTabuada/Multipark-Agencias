
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';

const SectionPage = () => {
  const { sectionName } = useParams<{ sectionName: string }>();

  const sectionDisplayName = sectionName ? 
    sectionName.charAt(0).toUpperCase() + sectionName.slice(1) : '';

  const cities = [
    { name: 'Lisboa', color: 'from-blue-500 to-blue-600', slug: 'lisbon' },
    { name: 'Porto', color: 'from-green-500 to-green-600', slug: 'porto' },
    { name: 'Faro', color: 'from-orange-500 to-orange-600', slug: 'faro' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
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
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {sectionDisplayName}
          </h2>
          <p className="text-xl text-gray-600">
            Escolha a sua cidade para continuar
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link
                key={city.name}
                to={`/section/${sectionName}/city/${city.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-br ${city.color} p-8 text-white min-h-[200px] flex flex-col justify-center items-center`}>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                  <p className="text-center opacity-90">
                    Serviços de estacionamento
                  </p>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SectionPage;
