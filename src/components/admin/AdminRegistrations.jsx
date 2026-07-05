import { useState, useEffect } from 'react';
import adminService from '@/services/adminService';
import { Check, X, Clock, UserPlus } from 'lucide-react';

export default function AdminRegistrations() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('DB Timeout')), 1000)
      );
      const data = await Promise.race([adminService.getRegistrationRequests(), timeoutPromise]);
      setRequests(data || []);
    } catch (err) {
      console.warn('Error loading registration requests:', err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    await adminService.approveRegistrationRequest(id);
    await loadRequests();
  };

  const handleReject = async (id) => {
    await adminService.rejectRegistrationRequest(id);
    await loadRequests();
  };

  if (loading) {
    return <div className="text-center py-12 text-slate-500">Cargando solicitudes...</div>;
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-sm">
        <UserPlus className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No hay solicitudes pendientes</h3>
        <p className="text-slate-500 dark:text-slate-400">Las nuevas inscripciones desde la web aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ciudadano</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">DNI / Celular</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {new Date(req.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{req.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900 dark:text-slate-300">DNI: {req.document}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{req.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {req.status === 'pending' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
                      <Clock className="w-3.5 h-3.5" /> Pendiente
                    </span>
                  )}
                  {req.status === 'approved' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                      <Check className="w-3.5 h-3.5" /> Aprobado
                    </span>
                  )}
                  {req.status === 'rejected' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50">
                      <X className="w-3.5 h-3.5" /> Rechazado
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {req.status === 'pending' && (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleReject(req.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                        title="Rechazar"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                        title="Aprobar y Enviar Accesos por WhatsApp"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
