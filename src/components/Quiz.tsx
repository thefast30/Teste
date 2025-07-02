import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowLeft, Clock, AlertTriangle, CheckCircle, XCircle, Zap, Shield, Target, Play } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  image: string;
  options: string[];
  emoji: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Com que frequência você falha na hora H?",
    image: "https://duramaxbrasil.site/1.jpeg",
    options: ["Nunca", "Às vezes", "Quase sempre", "Sempre"],
    emoji: "🔥"
  },
  {
    id: 2,
    text: "O que você costuma sentir depois que algo dá errado na cama?",
    image: "https://duramaxbrasil.site/2.jpeg",
    options: ["Vergonha", "Ansiedade", "Raiva de mim mesmo", "Indiferença"],
    emoji: "😔"
  },
  {
    id: 3,
    text: "Você sente que seu desempenho piorou com o passar dos anos?",
    image: "https://duramaxbrasil.site/3.jpeg",
    options: ["Sim, está cada vez pior", "Um pouco, mas ainda dá pra levar", "Não tenho certeza", "Não, continuo o mesmo de antes"],
    emoji: "😵‍💫"
  },
  {
    id: 4,
    text: "Você já tentou usar comprimidos ou outras soluções para resolver o problema?",
    image: "https://duramaxbrasil.site/4.jpeg",
    options: ["Sim, mas não funcionou como prometido", "Sim, funcionou no começo, mas perdeu o efeito", "Nunca tentei nada", "Uso frequentemente"],
    emoji: "💊"
  },
  {
    id: 5,
    text: "Se você tivesse acesso a uma solução segura, natural e com resultados duradouros, você estaria disposto a testar?",
    image: "https://duramaxbrasil.site/5.jpeg",
    options: ["Com certeza", "Talvez, dependendo do que for", "Não sei, estou desconfiado", "Não, não acredito mais em nada"],
    emoji: "🧠"
  }
];

const Quiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'loading'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [countdown, setCountdown] = useState(7);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Função para preservar UTMs e redirecionar
  const redirectToVitalForce = () => {
    const currentUrl = new URL(window.location.href);
    const utmParams = new URLSearchParams();
    
    // Captura todos os parâmetros UTM da URL atual
    currentUrl.searchParams.forEach((value, key) => {
      if (key.startsWith('utm_') || key.startsWith('fbclid') || key.startsWith('gclid') || key === 'click_id') {
        utmParams.append(key, value);
      }
    });
    
    // Constrói a URL de destino com os UTMs
    const targetUrl = `https://silver-dango-b91951.netlify.app${utmParams.toString() ? '?' + utmParams.toString() : ''}`;
    window.location.href = targetUrl;
  };

  useEffect(() => {
    if (currentStep === 'intro') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCurrentStep('quiz');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 'loading') {
      const timer = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            redirectToVitalForce();
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  const handleAnswer = (answer: string) => {
    setSelectedOption(answer);
    
    // Auto-advance após selecionar resposta
    setTimeout(() => {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption('');
      } else {
        setCurrentStep('loading');
      }
    }, 800);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption('');
      setAnswers(answers.slice(0, -1));
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 via-transparent to-yellow-100/30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center animate-fade-in relative z-10">
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-amber-200">
            <div className="mb-8">
              <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
                🚨 ATENÇÃO: INFORMAÇÃO CONFIDENCIAL
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-gray-800 mb-6 leading-tight drop-shadow-lg">
                <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent animate-pulse">9 em cada 10</span> homens <br />
                <span className="text-red-600">IGNORAM ISSO</span>…
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed font-semibold">
                e acabam <span className="text-red-500 font-bold">SOFRENDO CALADOS</span>
              </p>
              
              <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-2xl p-6 mb-6 shadow-2xl border-2 border-yellow-300 transform hover:scale-105 transition-transform">
                <p className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
                  Responda o quiz e volte a ser um <br />
                  <span className="text-2xl md:text-3xl bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">HOMEM DE VERDADE</span>
                </p>
              </div>
              
              <div className="bg-gray-800/80 rounded-2xl p-4 border border-amber-300">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-amber-500 animate-pulse" />
                  <span className="text-2xl font-bold text-amber-400">{countdown}</span>
                </div>
                <p className="text-gray-200 text-base font-medium">
                  Quiz iniciando automaticamente...
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div className="text-xl mb-1">🔒</div>
                <span>100% Confidencial</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl mb-1">⚡</div>
                <span>Resultados Rápidos</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl mb-1">🎯</div>
                <span>Solução Garantida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'quiz') {
    const question = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 via-transparent to-yellow-100/20"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto py-4 relative z-10">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-gray-300 rounded-full h-3 mb-3 shadow-inner border border-gray-400">
              <div 
                className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 h-3 rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-bold text-base">
                Pergunta {currentQuestion + 1} de {questions.length}
              </p>
              <div className="bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                <span className="text-amber-700 font-bold text-sm">{Math.round(progress)}% Completo</span>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-amber-200">
            <div className="text-center">
              {/* Question Image */}
              <div className="mb-6">
                <div className="relative inline-block">
                  <img
                    src={question.image}
                    alt={`Pergunta ${question.id}`}
                    className="w-full max-w-md mx-auto h-48 object-cover rounded-2xl shadow-2xl border-3 border-amber-300"
                  />
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full p-3 shadow-xl">
                    <span className="text-2xl">{question.emoji}</span>
                  </div>
                </div>
              </div>

              {/* Question Content */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-4 leading-tight">
                  {question.text}
                </h2>
                
                <div className="bg-amber-50 rounded-xl p-3 mb-4 border border-amber-200">
                  <p className="text-amber-700 font-bold text-base">
                    👆 Clique na sua resposta abaixo
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6 max-w-2xl mx-auto">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedOption !== ''}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-500 border-2 font-bold text-base relative overflow-hidden ${
                      selectedOption === option
                        ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 border-amber-400 text-white transform scale-[1.02] shadow-2xl'
                        : selectedOption === ''
                        ? 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 hover:border-amber-400 hover:shadow-xl hover:scale-[1.01] cursor-pointer'
                        : 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{option}</span>
                      {selectedOption === option && (
                        <div className="flex items-center gap-2">
                          <span className="text-xl">✓</span>
                          <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    {selectedOption === '' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </button>
                ))}
              </div>

              {currentQuestion > 0 && selectedOption === '' && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors font-bold text-base mx-auto"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar à pergunta anterior
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 via-transparent to-yellow-100/30"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-lg mx-auto w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border-2 border-amber-200 text-center">
          
          {/* Loading Animation */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>

          {/* Loading Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-800 mb-4 leading-tight">
              Analisando suas respostas...
            </h1>
            <p className="text-lg text-gray-600">
              Preparando sua solução personalizada
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="bg-gray-200 rounded-full h-4 mb-3 shadow-inner border border-gray-300">
              <div 
                className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 h-4 rounded-full transition-all duration-300 shadow-lg relative overflow-hidden"
                style={{ width: `${loadingProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            <p className="text-amber-600 font-bold text-lg">
              {Math.round(loadingProgress)}% Completo
            </p>
          </div>

          {/* Loading Messages */}
          <div className="space-y-3 text-gray-700">
            <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingProgress > 20 ? 'opacity-100' : 'opacity-50'}`}>
              <CheckCircle className={`w-5 h-5 ${loadingProgress > 20 ? 'text-green-500' : 'text-gray-400'}`} />
              <span>Identificando padrões comportamentais</span>
            </div>
            <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingProgress > 50 ? 'opacity-100' : 'opacity-50'}`}>
              <CheckCircle className={`w-5 h-5 ${loadingProgress > 50 ? 'text-green-500' : 'text-gray-400'}`} />
              <span>Calculando nível de urgência</span>
            </div>
            <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingProgress > 80 ? 'opacity-100' : 'opacity-50'}`}>
              <CheckCircle className={`w-5 h-5 ${loadingProgress > 80 ? 'text-green-500' : 'text-gray-400'}`} />
              <span>Preparando solução personalizada</span>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              Seus dados estão seguros e protegidos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
