import { useState, useEffect } from 'react';
import { ClipboardList, CheckCircle, XCircle, Trash2, Recycle, Leaf, Award, Search, AlertTriangle } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';
import adminService from '@/services/adminService';

function formatDateTime(ts) {
  const d = new Date(ts);
  const date = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  return `${date} ${time}`;
}

const SCENARIO_CONFIG = {
  approved: { label: 'Aprobado', color: 'text-emerald-400', icon: CheckCircle, bg: 'dark:bg-emerald-900/20 bg-emerald-50' },
  rejected: { label: 'Rechazado', color: 'text-red-400', icon: XCircle, bg: 'dark:bg-red-900/20 bg-red-50' },
  duplicate: { label: 'Duplicado', color: 'text-amber-400', icon: AlertTriangle, bg: 'dark:bg-amber-900/20 bg-amber-50' },
};

export default function AdminRequests() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    adminService.getWasteLogs().then(setLogs);
  }, []);

  const filtered = logs.filter((l) =>
    (l.wasteType || l.text || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleClear = async (id) => {
    await adminService.clearWasteLog(id);
    setLogs((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <GlassCard className="overflow-hidden">
      <div className="px-6 py-4 border-b dark:border-slate-800/50 border-slate-200/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold dark:text-white text-slate-900">Registro de Solicitudes</h3>
            <span className="text-xs dark:text-slate-500 text-slate-400">
              {logs.length} registros · Actividad de reciclaje en tiempo real
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
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Fecha/Hora</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Material</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Peso</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">CO₂ Evitado</th>
              <th className="text-center font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Estado</th>
              <th className="text-center font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12">
                  <ClipboardList className="w-8 h-8 mx-auto dark:text-slate-600 text-slate-300 mb-2" />
                  <p className="text-sm dark:text-slate-500 text-slate-400">No hay solicitudes registradas</p>
                </td>
              </tr>
            ) : (
              filtered.map((log, i) => {
                const scenario = SCENARIO_CONFIG[log.scenario] || SCENARIO_CONFIG.approved;
                const Icon = scenario.icon;

                return (
                  <tr
                    key={log.id || i}
                    className={`transition-colors duration-150
                      dark:border-slate-800/30 dark:hover:bg-slate-800/20
                      border-slate-100 hover:bg-slate-50
                      ${i < filtered.length - 1 ? 'border-b' : ''}`}
                  >
                    <td className="px-6 py-3.5">
                      <span className="text-xs font-mono dark:text-slate-400 text-slate-500">
                        {formatDateTime(log.timestamp)}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="font-semibold dark:text-slate-200 text-slate-800">
                        {log.wasteType || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Recycle className="w-3.5 h-3.5 dark:text-slate-500 text-slate-400" />
                        <span className="text-sm font-medium dark:text-slate-300 text-slate-700">
                          {log.kg ? `${log.kg} kg` : '—'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Leaf className="w-3.5 h-3.5 dark:text-slate-500 text-slate-400" />
                        <span className="text-sm font-medium dark:text-slate-300 text-slate-700">
                          {log.co2 ? `${log.co2} kg` : '—'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${scenario.bg} ${scenario.color}`}>
                        <Icon className="w-3 h-3" />
                        {scenario.label}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <button
                        onClick={() => handleClear(log.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                          transition-all duration-200 active:scale-95
                          dark:text-slate-500 dark:hover:bg-slate-800/50
                          text-slate-400 hover:bg-slate-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
