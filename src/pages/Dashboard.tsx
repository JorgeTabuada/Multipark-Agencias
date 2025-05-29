
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { MapPin, HelpCircle, Phone } from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const cities = [
    { name: 'Lisboa', color: 'from-blue-500 to-blue-600', slug: 'lisbon' },
    { name: 'Porto', color: 'from-green-500 to-green-600', slug: 'porto' },
    { name: 'Faro', color: 'from-orange-500 to-orange-600', slug: 'faro' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header showBackButton={false} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Bem-vindo, {user.name}!
          </h2>
          <p className="text-xl text-gray-600">
            Escolha a sua cidade para continuar
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {cities.map((city) => (
              <Link
                key={city.name}
                to={`/city/${city.slug}`}
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

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              to="/about"
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center group border border-blue-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <HelpCircle size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Dúvidas</h3>
              <p className="text-gray-600">
                Encontre respostas para as suas questões
              </p>
            </Link>

            <Link
              to="/contact"
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center group border border-blue-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Contacto</h3>
              <p className="text-gray-600">
                Entre em contacto connosco
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
