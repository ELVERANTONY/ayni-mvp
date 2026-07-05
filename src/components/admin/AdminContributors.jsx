import { useState } from 'react';
import { CheckCircle, XCircle, Shield, AlertTriangle, Search } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';
import adminService from '@/services/adminService';

const LEVEL_STYLES = {
  Constante: 'dark:bg-ayni-900/30 dark:text-ayni-400 bg-ayni-50 text-ayni-700',
  Moderado: 'dark:bg-amber-900/30 dark:text-amber-400 bg-amber-50 text-amber-700',
  Nuevo: 'dark:bg-slate-800 dark:text-slate-400 bg-slate-100 text-slate-500',
};

export default function AdminContributors({ contributors: initialContributors }) {
  const [contributors, setContributors] = useState(initialContributors);
  const [search, setSearch] = useState('');

  const filtered = contributors.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleBlock = async (id) => {
    const reason = prompt('Motivo del bloqueo:');
    if (!reason) return;
    await adminService.blockContributor(id, reason);
    setContributors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, blocked: true, blockReason: reason } : c))
    );
  };

  const handleUnblock = async (id) => {
    await adminService.unblockContributor(id);
    setContributors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, blocked: false, blockReason: '' } : c))
    );
  };

  return (
    <GlassCard className="overflow-hidden">
      <div className="px-6 py-4 border-b dark:border-slate-800/50 border-slate-200/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold dark:text-white text-slate-900">Contribuyentes</h3>
            <span className="text-xs dark:text-slate-500 text-slate-400">
              {contributors.length} registrados · {contributors.filter(c => !c.blocked).length} activos
            </span>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 dark:text-slate-600 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-xl text-xs
                dark:bg-slate-800 dark:text-white dark:border dark:border-slate-700/30
                bg-slate-100 text-slate-800 border border-slate-200/50
                placeholder:dark:text-slate-500 placeholder:text-slate-400
                focus:outline-none focus:ring-2 focus:ring-ayni-500/30 w-48"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="dark:bg-slate-800/40 bg-slate-100/60 dark:text-slate-400 text-slate-500">
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Contribuyente</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Código Predial</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Participación</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Estado</th>
              <th className="text-center font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr
                key={c.id || i}
                className={`transition-colors duration-150
                  dark:border-slate-800/30 dark:hover:bg-slate-800/20
                  border-slate-100 hover:bg-slate-50
                  ${i < filtered.length - 1 ? 'border-b' : ''}
                  ${c.blocked ? 'dark:bg-red-900/5 bg-red-50/30' : ''}`}
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2.5">
                    {c.blocked && <AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
                    <span className="font-semibold dark:text-slate-200 text-slate-800">{c.name}</span>
                  </div>
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
                  {c.blocked ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400">
                      <XCircle className="w-3.5 h-3.5" />
                      Bloqueado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Activo
                    </span>
                  )}
                </td>
                <td className="px-6 py-3.5 text-center">
                  {c.blocked ? (
                    <button
                      onClick={() => handleUnblock(c.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                        transition-all duration-200 active:scale-95
                        dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/30
                        bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Desbloquear
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlock(c.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                        transition-all duration-200 active:scale-95
                        dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30
                        bg-red-50 text-red-700 hover:bg-red-100"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Bloquear
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-8 h-8 mx-auto dark:text-slate-600 text-slate-300 mb-2" />
            <p className="text-sm dark:text-slate-500 text-slate-400">No se encontraron contribuyentes</p>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
