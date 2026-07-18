import { Bot, Scan, Globe, Zap, Camera, CheckCircle, XCircle, AlertTriangle, Recycle, Leaf, Award, DollarSign } from 'lucide-react';

const AGENT_CONFIG = {
  clasificador: { icon: Scan, label: 'Agente Clasificador', color: 'from-blue-500 to-blue-600', accent: 'text-blue-400' },
  impacto: { icon: Globe, label: 'Agente de Impacto', color: 'from-amber-500 to-orange-600', accent: 'text-amber-400' },
  ayni: { icon: Zap, label: 'Agente Ayni', color: 'from-ayni-500 to-ayni-600', accent: 'text-ayni-400' },
};

function formatTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function SystemMessage({ message }) {
  return (
    <div className="flex justify-center animate-fade-in">
      <span className="text-[9px] font-medium px-3 py-1 rounded-full dark:bg-slate-800/60 dark:text-slate-500 bg-slate-200/60 text-slate-400">
        {formatTime(message.timestamp)} — {message.text}
      </span>
    </div>
  );
}

function UserTextMessage({ message }) {
  return (
    <div className="flex justify-end animate-slide-left">
      <div className="max-w-[80%] rounded-2xl rounded-br-sm px-3.5 py-2.5 text-sm leading-relaxed shadow-sm break-words
        dark:bg-emerald-600/80 dark:text-white bg-emerald-500 text-white">
        <span className="whitespace-pre-line">{message.text}</span>
        <div className="text-[9px] opacity-60 mt-1 text-right">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  );
}

function UserPhotoMessage({ message }) {
  return (
    <div className="flex justify-end animate-slide-left">
      <div className="max-w-[75%] rounded-2xl rounded-br-sm overflow-hidden shadow-sm
        dark:bg-emerald-600/80 bg-emerald-500">
        <div className="px-3.5 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-white/80" />
            <span className="text-[10px] font-medium text-white/70 uppercase tracking-wider">Foto</span>
          </div>
        </div>
        <div className="mx-2.5 mb-1.5 rounded-xl overflow-hidden dark:bg-slate-800/60 bg-emerald-600/50 flex items-center justify-center py-6 border border-white/10">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl dark:bg-slate-700/60 bg-emerald-500/50 flex items-center justify-center mx-auto mb-1.5">
              <Camera className="w-6 h-6 text-white/60" />
            </div>
            <span className="text-[11px] font-medium text-white/70">{message.text}</span>
          </div>
        </div>
        <div className="px-3.5 pb-2.5 flex items-center justify-end gap-1.5">
          <span className="text-[9px] text-white/60">{formatTime(message.timestamp)}</span>
          <CheckCircle className="w-3 h-3 text-white/40" />
        </div>
      </div>
    </div>
  );
}

function BotTextMessage({ message }) {
  return (
    <div className="flex justify-start animate-slide-right">
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm leading-relaxed shadow-sm
        dark:bg-slate-800 dark:text-slate-100 bg-white text-slate-800
        dark:border dark:border-slate-700/30 border border-slate-200/50">
        <span className="whitespace-pre-line">{message.text}</span>
        <div className="text-[9px] dark:text-slate-500 text-slate-400 mt-1">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  );
}

function AgentMessage({ message }) {
  const agent = AGENT_CONFIG[message.role];
  if (!agent) return null;

  return (
    <div className="flex justify-start animate-slide-right">
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm leading-relaxed shadow-sm
        dark:bg-slate-800/80 dark:text-slate-100 bg-white/90 text-slate-800
        dark:border dark:border-slate-700/30 border border-slate-200/50">
        <div className="flex items-center gap-1.5 mb-1">
          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
            <agent.icon className="w-3 h-3 text-white" />
          </div>
          <span className={`text-[10px] font-semibold ${agent.accent}`}>{agent.label}</span>
        </div>
        <span>{message.text}</span>
        <div className="text-[9px] dark:text-slate-500 text-slate-400 mt-1">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  );
}

function ResultMessage({ message }) {
  const m = message.metadata;
  if (!m) return <BotTextMessage message={message} />;

  return (
    <div className="flex justify-start animate-slide-right">
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm overflow-hidden shadow-sm
        dark:bg-slate-800 dark:text-slate-100 bg-white text-slate-800
        dark:border dark:border-emerald-700/30 border border-emerald-200/50">
        <div className="px-3.5 pt-3 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-emerald-500">¡Reciclaje verificado!</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="dark:bg-slate-700/50 bg-emerald-50 rounded-xl p-2.5 text-center">
              <Recycle className="w-4 h-4 mx-auto mb-1 dark:text-emerald-400 text-emerald-600" />
              <span className="text-[10px] font-medium dark:text-slate-400 text-slate-500 block">Material</span>
              <span className="text-xs font-bold dark:text-white text-slate-900">{m.wasteType || '—'}</span>
            </div>
            <div className="dark:bg-slate-700/50 bg-emerald-50 rounded-xl p-2.5 text-center">
              <Leaf className="w-4 h-4 mx-auto mb-1 dark:text-emerald-400 text-emerald-600" />
              <span className="text-[10px] font-medium dark:text-slate-400 text-slate-500 block">CO₂ evitado</span>
              <span className="text-xs font-bold dark:text-white text-slate-900">{m.co2 ? `${m.co2} kg` : '—'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="dark:bg-slate-700/50 bg-amber-50 rounded-xl p-2.5 text-center">
              <Award className="w-4 h-4 mx-auto mb-1 dark:text-amber-400 text-amber-600" />
              <span className="text-[10px] font-medium dark:text-slate-400 text-slate-500 block">Tickets</span>
              <span className="text-xs font-bold dark:text-white text-slate-900">+1</span>
            </div>
            <div className="dark:bg-slate-700/50 bg-amber-50 rounded-xl p-2.5 text-center">
              <DollarSign className="w-4 h-4 mx-auto mb-1 dark:text-amber-400 text-amber-600" />
              <span className="text-[10px] font-medium dark:text-slate-400 text-slate-500 block">Ahorro estimado</span>
              <span className="text-xs font-bold dark:text-white text-slate-900">S/ {((m.kg || 0) * 0.5).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="px-3.5 pb-2.5 flex items-center justify-between">
          <span className="text-[9px] dark:text-slate-500 text-slate-400">{formatTime(message.timestamp)}</span>
          <span className="text-[9px] font-medium text-emerald-500">✓ Recibido</span>
        </div>
      </div>
    </div>
  );
}

export default function ChatMessage({ message }) {
  const { role, type, timestamp } = message;

  if (role === 'system') return <SystemMessage message={message} />;

  if (role === 'user') {
    if (type === 'image') return <UserPhotoMessage message={message} />;
    return <UserTextMessage message={message} />;
  }

  if (role === 'bot') {
    if (type === 'result') return <ResultMessage message={message} />;
    return <BotTextMessage message={message} />;
  }

  if (role === 'clasificador' || role === 'impacto' || role === 'ayni') {
    return <AgentMessage message={message} />;
  }

  return <BotTextMessage message={message} />;
}
