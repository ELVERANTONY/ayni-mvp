import { CheckCircle, Download, PenLine, Shield } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';

const LEVEL_STYLES = {
  Constante: 'dark:bg-ayni-900/30 dark:text-ayni-400 bg-ayni-50 text-ayni-700',
  Moderado: 'dark:bg-amber-900/30 dark:text-amber-400 bg-amber-50 text-amber-700',
  Nuevo: 'dark:bg-slate-800 dark:text-slate-400 bg-slate-100 text-slate-500',
};

export default function ContributorsTable({ contributors, onExport, onApplyDiscount, exporting }) {
  return (
    <GlassCard className="overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b dark:border-slate-800/50 border-slate-200/50">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-base font-bold dark:text-white text-slate-900">Conciliación Tributaria</h3>
            <span className="text-xs dark:text-slate-500 text-slate-400">
              Descuentos en Arbitrios · {contributors.length} contribuyentes
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full
            dark:bg-slate-800 dark:text-slate-500 bg-slate-100 text-slate-400">
            <Shield className="w-3 h-3" />
            Datos anonimizados
          </span>
        </div>
        <button
          onClick={onExport}
          disabled={exporting}
          className="btn-ghost dark:border-ayni-700/30 dark:text-ayni-400 dark:hover:bg-ayni-900/20 border-ayni-200 text-ayni-700 hover:bg-ayni-50 border"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Exportar CSV</span>
          {exporting && (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="dark:bg-slate-800/40 bg-slate-100/60 dark:text-slate-400 text-slate-500">
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Contribuyente</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Código Predial</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Participación</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Descuento</th>
              <th className="text-center font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Firmar</th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((c, i) => (
              <tr
                key={c.id || i}
                className={`transition-colors duration-150
                  dark:border-slate-800/30 dark:hover:bg-slate-800/20
                  border-slate-100 hover:bg-slate-50
                  ${i < contributors.length - 1 ? 'border-b' : ''}`}
              >
                <td className="px-6 py-3.5">
                  <span className="font-semibold dark:text-slate-200 text-slate-800">{c.name}</span>
                </td>
                <td className="px-6 py-3.5">
                  <span className="text-xs font-mono dark:text-slate-500 text-slate-400">{c.code}</span>
                </td>
                <td className="px-6 py-3.5">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${LEVEL_STYLES[c.level] || LEVEL_STYLES.Nuevo}`}>
                    {c.level === 'Constante' && <CheckCircle className="w-3 h-3" />}
                    {c.level}
                  </span>
                </td>
                <td className="px-6 py-3.5">
                  <span className="text-sm font-bold text-ayni-400">{c.discount}%</span>
                </td>
                <td className="px-6 py-3.5 text-center">
                  {c.signed ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ayni-400">
                      <CheckCircle className="w-4 h-4" />
                      Aplicado
                    </span>
                  ) : (
                    <button
                      onClick={() => onApplyDiscount?.(c.id)}
                      disabled={c.discount === 0}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                        transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed
                        dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white
                        bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                    >
                      <PenLine className="w-3.5 h-3.5" />
                      Firmar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
