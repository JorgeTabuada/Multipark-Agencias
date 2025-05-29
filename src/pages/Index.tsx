
import { Link } from 'react-router-dom';
import { Building2, Star, Zap, TrendingUp, Megaphone, Calendar } from 'lucide-react';

const Index = () => {
  const sections = [
    { 
      name: 'Agregador', 
      color: 'from-blue-500 to-blue-600', 
      slug: 'agregador',
      icon: Building2,
      description: 'Serviços agregados de estacionamento'
    },
    { 
      name: 'Pro', 
      color: 'from-purple-500 to-purple-600', 
      slug: 'pro',
      icon: Star,
      description: 'Soluções profissionais'
    },
    { 
      name: 'Aventa', 
      color: 'from-green-500 to-green-600', 
      slug: 'aventa',
      icon: Zap,
      description: 'Serviços Aventa'
    },
    { 
      name: 'Proventa', 
      color: 'from-orange-500 to-orange-600', 
      slug: 'proventa',
      icon: TrendingUp,
      description: 'Soluções Proventa'
    },
    { 
      name: 'Campanha', 
      color: 'from-red-500 to-red-600', 
      slug: 'campanha',
      icon: Megaphone,
      description: 'Campanhas especiais'
    },
    { 
      name: 'Reserva', 
      color: 'from-indigo-500 to-indigo-600', 
      slug: 'reserva',
      icon: Calendar,
      description: 'Sistema de reservas'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
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
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Bem-vindo ao Multipark
          </h1>
          <p className="text-xl text-gray-600">
            Escolha a sua categoria de serviço
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Link
                key={section.name}
                to={`/section/${section.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-br ${section.color} p-8 text-white min-h-[240px] flex flex-col justify-center items-center`}>
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <section.icon size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{section.name}</h3>
                  <p className="text-center opacity-90 text-sm">
                    {section.description}
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

export default Index;
