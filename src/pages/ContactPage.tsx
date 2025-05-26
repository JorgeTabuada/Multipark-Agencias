
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
      phone: '+351 21 123 4567',
      email: 'lisboa@multipark.pt',
      address: 'Av. da Liberdade, 123, Lisboa',
      color: 'from-blue-500 to-blue-600'
    },
    {
      city: 'Porto',
      phone: '+351 22 123 4567',
      email: 'porto@multipark.pt',
      address: 'Rua de Santa Catarina, 456, Porto',
      color: 'from-green-500 to-green-600'
    },
    {
      city: 'Faro',
      phone: '+351 28 123 4567',
      email: 'faro@multipark.pt',
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
              <div key={contact.city} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 overflow-hidden">
                <div className={`bg-gradient-to-r ${contact.color} p-6 text-white`}>
                  <h3 className="text-2xl font-bold text-center">{contact.city}</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-blue-600" />
                    <span className="text-gray-700">{contact.phone}</span>
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
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Clock size={24} className="text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-800">Horários de Funcionamento</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Segunda a Sexta:</span>
                  <span className="font-medium">08:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sábado:</span>
                  <span className="font-medium">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Domingo:</span>
                  <span className="font-medium">10:00 - 16:00</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Suporte 24/7</h3>
              <p className="text-gray-600 mb-4">
                Para emergências ou questões urgentes, contacte a nossa linha de apoio 24 horas:
              </p>
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg text-center">
                <Phone size={24} className="mx-auto mb-2" />
                <span className="text-xl font-bold">+351 800 123 456</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
