import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recycle, ArrowRight, Scan, Globe, Zap, Shield, TrendingUp, Leaf, FileText, CheckCircle, X, Sparkles } from 'lucide-react';
import db from '@/services/db';
import ChatSimulator from '@/components/landing/ChatSimulator';
import FallingLeaves from '@/components/landing/FallingLeaves';

const AGENTS = [
  { icon: Scan, name: 'Agente Clasificador', desc: 'Identifica y clasifica cada residuo en tiempo real usando visión IA de alta precisión.', color: 'from-blue-500 to-indigo-500', delay: '0s' },
  { icon: Globe, name: 'Agente de Impacto', desc: 'Calcula el impacto ambiental exacto: CO₂ evitado, metano mitigado y agua ahorrada.', color: 'from-amber-500 to-orange-500', delay: '0.1s' },
  { icon: Zap, name: 'Agente Ayni', desc: 'Verifica transacciones y acredita instantáneamente tickets y descuentos municipales.', color: 'from-emerald-500 to-teal-500', delay: '0.2s' },
];

const IMPACT = [
  { icon: TrendingUp, value: '12,847+', label: 'Ciudadanos activos' },
  { icon: Recycle, value: '342.8', label: 'Toneladas recuperadas' },
  { icon: Leaf, value: '156.2', label: 'Ton CO₂ eq evitadas' },
  { icon: Shield, value: 'S/ 89.4K', label: 'Ahorro municipal' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', document: '', phone: '' });

  // Forzar modo claro siempre en la Landing
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.registrationRequests.add({
        ...formData,
        status: 'pending',
        timestamp: Date.now(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error al registrar', error);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans text-slate-900 selection:bg-ayni-200 selection:text-ayni-900 overflow-x-hidden">
      {/* Patrón de puntos sutil para textura premium */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <FallingLeaves />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative z-10">

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center p-1 rounded-2xl bg-gradient-to-br from-ayni-400 to-emerald-600 shadow-lg shadow-ayni-500/30 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Recycle className="w-6 h-6 text-white drop-shadow-md" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-5">
            Recicla con{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              inteligencia
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium mb-8">
            AYNI es un ecosistema autónomo de reciclaje impulsado por tres agentes de IA que
            clasifican, miden tu impacto y te recompensan con descuentos reales en tus arbitrios.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowRegister(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 w-full sm:w-auto rounded-xl text-sm font-bold
                bg-white text-slate-700 border border-slate-200 shadow-sm
                hover:border-slate-300 hover:bg-slate-50
                active:scale-[0.98] transition-all duration-200"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              Inscribirse al programa
            </button>
            <button
              onClick={() => navigate('/login')}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 w-full sm:w-auto rounded-xl text-sm font-bold
                bg-ayni-500 text-white shadow-lg shadow-ayni-500/25
                hover:bg-ayni-600 hover:shadow-xl hover:shadow-ayni-500/30 hover:-translate-y-0.5
                active:scale-[0.98] transition-all duration-200 overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
              Acceder al Sistema
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Agents Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 justify-center mb-8">
            <span className="h-px w-10 bg-slate-200" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Cadena de Agentes Autónomos
            </span>
            <span className="h-px w-10 bg-slate-200" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
            {AGENTS.map((agent) => (
              <div key={agent.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${agent.color} opacity-5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4 shadow-md text-white group-hover:scale-110 transition-transform duration-300`}>
                  <agent.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{agent.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Section - Elegante y claro */}
        <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden text-slate-900 mb-20 border border-slate-100">
          <div className="absolute top-0 right-0 w-64 h-64 bg-ayni-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
          
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Métricas del distrito ecológico</h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {IMPACT.map((m) => (
              <div key={m.label} className="text-center">
                <m.icon className="w-5 h-5 mx-auto mb-3 text-ayni-500 opacity-90" />
                <div className="text-2xl lg:text-3xl font-black mb-1 text-slate-900 tracking-tight">{m.value}</div>
                <div className="text-xs text-slate-500 font-medium">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Simulator Section - Optimizado para visibilidad */}
        <div className="mb-12">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Pruébalo ahora mismo
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Interactúa con nuestro bot oficial por WhatsApp, envía fotos de residuos simulados y mira cómo nuestra IA los clasifica al instante.
            </p>
          </div>
          
          {/* Contenedor del simulador ajustado para no cortar el teléfono */}
          <div className="flex justify-center">
            <div className="bg-white p-2 sm:p-4 rounded-[2rem] shadow-xl border border-slate-200">
              <ChatSimulator />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 border-t border-slate-200 pt-8 pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Recycle className="w-4 h-4 text-ayni-500" />
            <span className="font-bold text-slate-900 text-sm">AYNI v1.0</span>
          </div>
          <p className="text-xs text-slate-500">
            Hackathon QuipuSoft 2026 · Transformando ciudades a través del ecosistema
          </p>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative animate-slide-up border border-slate-100">
            <button
              onClick={() => { setShowRegister(false); setIsSubmitted(false); }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner border border-emerald-100">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">¡Solicitud enviada!</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  La municipalidad revisará tu perfil. Recibirás tus credenciales directamente en tu WhatsApp.
                </p>
                <button
                  onClick={() => { setShowRegister(false); setIsSubmitted(false); }}
                  className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors w-full"
                >
                  Entendido, gracias
                </button>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <div className="w-10 h-10 bg-ayni-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-ayni-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">Únete a AYNI</h3>
                  <p className="text-sm text-slate-500 mt-1">Inicia tu camino hacia un distrito más limpio.</p>
                </div>
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nombre completo</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-ayni-500 focus:bg-white transition-colors"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">DNI</label>
                    <input
                      type="text"
                      required
                      value={formData.document}
                      onChange={e => setFormData({...formData, document: e.target.value})}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-ayni-500 focus:bg-white transition-colors"
                      placeholder="Número de documento"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Celular (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-ayni-500 focus:bg-white transition-colors"
                      placeholder="+51 987 654 321"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-ayni-500 text-white rounded-xl font-bold text-sm hover:bg-ayni-600 transition-colors mt-2 shadow-md shadow-ayni-500/20 active:scale-[0.98]"
                  >
                    Enviar solicitud
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
