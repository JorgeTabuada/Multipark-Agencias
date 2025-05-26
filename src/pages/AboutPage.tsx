
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { HelpCircle, CheckCircle } from 'lucide-react';

const AboutPage = () => {
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

  const faqs = [
    {
      question: "Como fazer uma reserva?",
      answer: "Selecione a cidade desejada, escolha o serviço de estacionamento e siga as instruções para completar a sua reserva."
    },
    {
      question: "Posso cancelar a minha reserva?",
      answer: "Sim, pode cancelar a sua reserva até 24 horas antes da data agendada sem custos adicionais."
    },
    {
      question: "Qual é a diferença entre os serviços?",
      answer: "Cada serviço oferece diferentes comodidades e preços. Consulte a página 'Diferenças' para mais detalhes."
    },
    {
      question: "Como contactar o suporte?",
      answer: "Pode contactar-nos através da página de contacto ou pelos telefones disponíveis em cada cidade."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Dúvidas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Encontre respostas para as suas questões mais comuns
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Ainda tem dúvidas?
              </h3>
              <p className="text-gray-600 mb-6">
                Nossa equipa está aqui para ajudar. Entre em contacto connosco para mais informações.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                Contactar Suporte
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
