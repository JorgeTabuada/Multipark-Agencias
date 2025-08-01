import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
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

  const contacts = [
    {
      city: 'Lisboa',
      phone: '965 041 858 (opção 1)',
      email: 'info@multipark.pt',
      address: 'Av. da Liberdade, 123, Lisboa',
      color: 'from-blue-500 to-blue-600'
    },
    {
      city: 'Porto', 
      phone: '965 041 858 (opção 1)',
      email: 'info@multipark.pt',
      address: 'Rua de Santa Catarina, 456, Porto',
      color: 'from-green-500 to-green-600'
    },
    {
      city: 'Faro',
      phone: '965 041 858 (opção 1)', 
      email: 'info@multipark.pt',
      address: 'Rua de São Pedro, 789, Faro',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Contacto
            </h2>
            <p className="text-xl text-gray-600">
              Entre em contacto com a nossa equipa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contacts.map((contact) => (
              <div key={contact.city} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className={`bg-gradient-to-r ${contact.color} p-6 text-white`}>
                  <h3 className="text-2xl font-bold text-center">{contact.city}</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-blue-600" />
                    <span className="text-gray-700 font-medium">{contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail size={20} className="text-blue-600" />
                    <span className="text-gray-700">{contact.email}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin size={20} className="text-blue-600 mt-1" />
                    <span className="text-gray-700">{contact.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Clock size={24} className="text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-800">Horários de Funcionamento</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Segunda a Sexta:</span>
                  <span className="font-bold text-lg text-green-600">08:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Sábado:</span>
                  <span className="font-bold text-lg text-blue-600">10:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">Domingo:</span>
                  <span className="font-bold text-lg text-blue-600">10:00 - 22:00</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Horário alargado:</strong> Funcionamos até às 22h para sua conveniência!
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contacto Principal</h3>
              <p className="text-gray-600 mb-6">
                Para todas as questões, reservas ou esclarecimentos, contacte-nos através do nosso número principal:
              </p>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg text-center mb-6">
                <Phone size={32} className="mx-auto mb-3" />
                <div>
                  <span className="text-2xl font-bold block">965 041 858</span>
                  <span className="text-sm opacity-90">(opção 1)</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Mail size={20} className="text-blue-600" />
                  <span className="text-gray-700 font-medium">info@multipark.pt</span>
                </div>
                <p className="text-sm text-gray-500">
                  Também pode contactar-nos por email
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;