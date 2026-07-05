import { Scan, Globe, Zap, CheckCircle, Clock } from 'lucide-react';

const STEPS = [
  { key: 'clasificador', icon: Scan, label: 'Clasificador', color: 'blue' },
  { key: 'impacto', icon: Globe, label: 'Impacto', color: 'amber' },
  { key: 'ayni', icon: Zap, label: 'Ayni', color: 'emerald' },
];

const COLOR_MAP = {
  blue: { idle: 'dark:bg-slate-800 bg-slate-200', active: 'from-blue-500 to-blue-600', done: 'dark:bg-blue-900/40 bg-blue-100', textActive: 'text-blue-400', textDone: 'dark:text-blue-300 text-blue-700' },
  amber: { idle: 'dark:bg-slate-800 bg-slate-200', active: 'from-amber-500 to-orange-600', done: 'dark:bg-amber-900/40 bg-amber-100', textActive: 'text-amber-400', textDone: 'dark:text-amber-300 text-amber-700' },
  emerald: { idle: 'dark:bg-slate-800 bg-slate-200', active: 'from-ayni-500 to-ayni-600', done: 'dark:bg-ayni-900/40 bg-ayni-100', textActive: 'text-ayni-400', textDone: 'dark:text-ayni-300 text-ayni-700' },
};

export default function AgentChain({ activeStep, completedSteps }) {
  return (
    <div className="flex items-center justify-between px-5 py-2.5 border-b dark:border-slate-800/50 border-slate-200/50">
      <div className="flex items-center gap-1 w-full">
        {STEPS.map((step, i) => {
          const isActive = activeStep === step.key;
          const isDone = completedSteps.has(step.key);
          const colors = COLOR_MAP[step.color];
          const iconSize = isActive ? 'w-4 h-4' : 'w-3.5 h-3.5';

          return (
            <div key={step.key} className="flex items-center flex-1 gap-1.5">
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all duration-500
                ${isDone
                  ? `bg-gradient-to-r ${colors.done} ${colors.textDone}`
                  : isActive
                    ? `bg-gradient-to-r ${colors.active} text-white shadow-lg shadow-${step.color}-500/20`
                    : `dark:text-slate-600 text-slate-300`
                }`}
              >
                <div className={`rounded-full flex items-center justify-center transition-all duration-500
                  ${isActive ? 'bg-white/20 p-1' : ''}
                `}>
                  {isDone ? (
                    <CheckCircle className={`${iconSize} text-ayni-400`} />
                  ) : (
                    <step.icon className={`${iconSize}`} />
                  )}
                </div>
                <span className={`text-[10px] font-semibold whitespace-nowrap transition-all duration-300
                  ${isActive || isDone ? 'opacity-100' : 'opacity-40'}
                `}>
                  {step.label}
                </span>
              </div>
              {isActive && (
                <Clock className="w-3 h-3 text-ayni-400 animate-pulse-subtle flex-shrink-0" />
              )}
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-1 transition-all duration-500
                  ${isDone ? 'dark:bg-ayni-500/50 bg-ayni-300' : 'dark:bg-slate-700 bg-slate-300'}
                `} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
