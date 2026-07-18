import { useState, useEffect, useCallback } from 'react';
import { ClipboardList, CheckCircle, XCircle, Search, UserPlus, Filter } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';
import adminService from '@/services/adminService';

function formatDateTime(ts) {
  const d = new Date(ts);
  const date = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  return `${date} ${time}`;
}

export default function AdminRegistrations() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const loadRequests = useCallback(async () => {
    const latest = await adminService.getRegistrationRequests();
    setRequests(latest);
  }, []);

  useEffect(() => {
    loadRequests();
    const interval = window.setInterval(loadRequests, 1500);
    return () => window.clearInterval(interval);
  }, [loadRequests]);

  const filtered = requests.filter((r) => {
    const document = r.document || r.dni || '';
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || document.includes(search);
    const matchFilter = filter === 'all' || r.status === filter;
    return matchSearch && matchFilter;
  });

  const handleApprove = async (id) => {
    await adminService.approveRegistrationRequest(id);
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: 'approved' } : r));
  };

  const handleReject = async (id) => {
    await adminService.rejectRegistrationRequest(id);
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: 'rejected' } : r));
  };

  return (
    <GlassCard className="overflow-hidden">
      <div className="px-6 py-4 border-b dark:border-slate-800/50 border-slate-200/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold dark:text-white text-slate-900">Inscripciones al Programa</h3>
            <span className="text-xs dark:text-slate-500 text-slate-400">
              {requests.filter(r => r.status === 'pending').length} pendientes de revisión
            </span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-medium
                dark:bg-slate-800 dark:text-white dark:border dark:border-slate-700/30
                bg-slate-100 text-slate-800 border border-slate-200/50
                focus:outline-none focus:ring-2 focus:ring-ayni-500/30"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendientes</option>
              <option value="approved">Aprobados</option>
              <option value="rejected">Rechazados</option>
            </select>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 dark:text-slate-600 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o DNI..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl text-xs
                  dark:bg-slate-800 dark:text-white dark:border dark:border-slate-700/30
                  bg-slate-100 text-slate-800 border border-slate-200/50
                  placeholder:dark:text-slate-500 placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-ayni-500/30 w-56"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="dark:bg-slate-800/40 bg-slate-100/60 dark:text-slate-400 text-slate-500">
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Solicitante</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">DNI</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Canal de contacto</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Fecha</th>
              <th className="text-center font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Estado</th>
              <th className="text-center font-semibold text-[11px] uppercase tracking-wider px-6 py-3.5">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12">
                  <ClipboardList className="w-8 h-8 mx-auto dark:text-slate-600 text-slate-300 mb-2" />
                  <p className="text-sm dark:text-slate-500 text-slate-400">No hay solicitudes que coincidan</p>
                </td>
              </tr>
            ) : (
              filtered.map((req, i) => (
                <tr
                  key={req.id}
                  className={`transition-colors duration-150
                    dark:border-slate-800/30 dark:hover:bg-slate-800/20
                    border-slate-100 hover:bg-slate-50
                    ${i < filtered.length - 1 ? 'border-b' : ''}`}
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full dark:bg-ayni-900/30 bg-ayni-50 flex items-center justify-center">
                        <UserPlus className="w-4 h-4 dark:text-ayni-400 text-ayni-600" />
                      </div>
                        <span className="font-semibold dark:text-slate-200 text-slate-800">{req.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-xs font-mono dark:text-slate-400 text-slate-500">{req.document || req.dni || '—'}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-xs dark:text-slate-400 text-slate-500">{req.phone || req.email || '—'}</span>
                  </td>
                  <td className="px-6 py-3.5">
                        <span className="text-xs font-mono dark:text-slate-400 text-slate-500">{formatDateTime(req.timestamp || req.date)}</span>
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    {req.status === 'approved' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Aprobado
                      </span>
                    ) : req.status === 'rejected' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400">
                        <XCircle className="w-3.5 h-3.5" />
                        Rechazado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        Pendiente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    {req.status === 'pending' ? (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                            transition-all duration-200 active:scale-95
                            dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/30
                            bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Aprobar
                        </button>
                        <button
                          onClick={() => handleReject(req.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                            transition-all duration-200 active:scale-95
                            dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30
                            bg-red-50 text-red-700 hover:bg-red-100"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Rechazar
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs dark:text-slate-500 text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
