import { Recycle, Scan, Globe, Zap, ArrowRight, Shield, TrendingUp, Leaf } from 'lucide-react';

const AGENTS = [
  {
    icon: Scan,
    name: 'Agente Clasificador',
    desc: 'Identifica y clasifica cada residuo en tiempo real usando visión IA.',
    color: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/20',
    delay: '0s',
  },
  {
    icon: Globe,
    name: 'Agente de Impacto',
    desc: 'Calcula el impacto ambiental: CO₂ evitado, metano mitigado y equivalencias ecológicas.',
    color: 'from-amber-500 to-orange-600',
    shadow: 'shadow-amber-500/20',
    delay: '0.15s',
  },
  {
    icon: Zap,
    name: 'Agente Ayni',
    desc: 'Verifica la transacción, acredita tickets y descuentos en arbitrios municipales.',
    color: 'from-ayni-500 to-ayni-600',
    shadow: 'shadow-ayni-500/20',
    delay: '0.3s',
  },
];

const IMPACT_METRICS = [
  { icon: TrendingUp, value: '12,847+', label: 'Ciudadanos activos' },
  { icon: Recycle, value: '342.8', label: 'Toneladas recuperadas' },
  { icon: Leaf, value: '156.2', label: 'Ton CO₂ eq evitadas' },
  { icon: Shield, value: 'S/ 89.4K', label: 'Ahorro municipal' },
];

export default function LandingView({ onEnter }) {
  return (
    <div className="min-h-screen dark:bg-surface-dark bg-slate-50 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">

        {/* Hero */}
        <div className="text-center mb-16 lg:mb-24 animate-fade-in">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-ayni-400 to-ayni-600 shadow-glow-lg mb-6">
            <Recycle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight dark:text-white text-slate-900 mb-4 text-balance">
            Recicla con{' '}
            <span className="bg-gradient-to-r from-ayni-400 to-ayni-500 bg-clip-text text-transparent">inteligencia</span>
          </h1>
          <p className="text-lg sm:text-xl dark:text-slate-400 text-slate-500 max-w-2xl mx-auto leading-relaxed">
            AYNI es un ecosistema autónomo de reciclaje impulsado por tres agentes de IA que
            clasifican, miden impacto y recompensan tu compromiso ambiental con descuentos reales
            en tus arbitrios municipales.
          </p>
          <button
            onClick={onEnter}
            className="mt-8 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-semibold
              bg-ayni-500 text-white shadow-lg shadow-ayni-500/25
              hover:bg-ayni-600 hover:shadow-xl hover:shadow-ayni-500/30
              active:scale-[0.97] transition-all duration-300"
          >
            Ingresar a mi Billetera
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Agent Chain */}
        <div className="mb-16">
          <div className="flex items-center gap-3 justify-center mb-8">
            <span className="h-px flex-1 max-w-20 dark:bg-slate-800 bg-slate-200" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] dark:text-slate-500 text-slate-400">
              Cadena de Agentes Autónomos
            </span>
            <span className="h-px flex-1 max-w-20 dark:bg-slate-800 bg-slate-200" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {AGENTS.map((agent, i) => (
              <div
                key={agent.name}
                className="glass rounded-2xl p-6 card-hover"
                style={{ animationDelay: agent.delay }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4 shadow-lg ${agent.shadow}`}>
                  <agent.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold dark:text-white text-slate-900 mb-1.5">{agent.name}</h3>
                <p className="text-sm dark:text-slate-400 text-slate-500 leading-relaxed">{agent.desc}</p>
                {i < AGENTS.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-ayni-400">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            {['Residuo', 'Clasificador', 'Impacto', 'Ayni', 'Descuento'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full
                  dark:bg-slate-800 dark:text-slate-400 bg-slate-200 text-slate-500">
                  {i + 1}. {step}
                </span>
                {i < 4 && <span className="text-[10px] dark:text-slate-700 text-slate-300">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="glass rounded-3xl p-8 glow-border">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] dark:text-ayni-400 text-ayni-600">
              Impacto en tiempo real
            </span>
            <h2 className="text-2xl font-bold mt-1 dark:text-white text-slate-900">
              Métricas del distrito
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_METRICS.map((m) => (
              <div key={m.label} className="text-center">
                <m.icon className="w-5 h-5 mx-auto mb-2 dark:text-ayni-400 text-ayni-600" />
                <div className="text-2xl font-extrabold dark:text-white text-slate-900">{m.value}</div>
                <div className="text-xs mt-0.5 dark:text-slate-500 text-slate-400">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-xs dark:text-slate-600 text-slate-400">
            AYNI v0.1 · Hackathon QuipuSoft 2026 · Ecosistema de Reciclaje Autónomo
          </p>
        </div>
      </div>
    </div>
  );
}
