import { useState } from 'react';
import { Shield, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { grantConsent, PRIVACY_NOTICE } from '@/lib/privacy';

export default function PrivacyNotice({ onAccept, onDecline }) {
  const [expanded, setExpanded] = useState(false);
  const [accepting, setAccepting] = useState(false);

  const handleAccept = async () => {
    setAccepting(true);
    await grantConsent();
    onAccept();
  };

  return (
    <div className="w-full max-w-lg glass rounded-3xl p-8 animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ayni-400 to-ayni-600 flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Shield className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-xl font-bold dark:text-white text-slate-900">Aviso de Privacidad</h1>
        <p className="text-sm mt-1 dark:text-slate-400 text-slate-500">
          {PRIVACY_NOTICE.ley}
        </p>
      </div>

      <div className="space-y-4 text-sm dark:text-slate-300 text-slate-700 leading-relaxed">
        <p>{PRIVACY_NOTICE.finalidad}</p>

        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm font-semibold dark:text-ayni-400 text-ayni-600 hover:underline"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {expanded ? 'Ocultar detalles' : 'Ver detalles completos'}
          </button>

          {expanded && (
            <div className="mt-3 space-y-4 animate-slide-up">
              <div>
                <h4 className="font-semibold dark:text-slate-200 text-slate-800 mb-1.5">Datos recolectados</h4>
                <ul className="space-y-1">
                  {PRIVACY_NOTICE.datosRecolectados.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ayni-400 mt-1.5 flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold dark:text-slate-200 text-slate-800 mb-1.5">Tus derechos</h4>
                <ul className="space-y-1">
                  {PRIVACY_NOTICE.derechos.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ayni-400 mt-1.5 flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="dark:text-slate-400 text-slate-500 text-xs">{PRIVACY_NOTICE.alcance}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={onDecline}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold
            dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-700/60
            bg-slate-100 text-slate-600 hover:bg-slate-200
            transition-all duration-200 active:scale-[0.98]"
        >
          <XCircle className="w-4 h-4" />
          Rechazar
        </button>
        <button
          onClick={handleAccept}
          disabled={accepting}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold
            bg-ayni-500 text-white shadow-lg shadow-ayni-500/20
            hover:bg-ayni-600 active:scale-[0.98] transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {accepting ? (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <CheckCircle className="w-4 h-4" />
          )}
          {accepting ? 'Guardando...' : 'Aceptar'}
        </button>
      </div>
    </div>
  );
}
