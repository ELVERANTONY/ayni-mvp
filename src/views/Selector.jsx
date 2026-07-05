import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Monitor, Recycle, LogOut } from 'lucide-react';
import { getSession, logout } from '@/store/authStore';

export default function Selector() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSession().then((s) => {
      if (!s) navigate('/login');
      else setSession(s);
    });
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSelect = (mode) => {
    navigate(mode === 'citizen' ? '/citizen' : '/admin');
  };

  if (!session) return null;

  return (
    <div className="min-h-screen dark:bg-surface-dark bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ayni-400 to-ayni-600 flex items-center justify-center mx-auto mb-4 shadow-glow-lg">
            <Recycle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold dark:text-white text-slate-900">Bienvenido, {session.name}</h1>
          <p className="text-sm mt-1 dark:text-slate-400 text-slate-500">Selecciona el modo de acceso</p>
        </div>

        <div className="grid gap-4">
          <button
            onClick={() => handleSelect('citizen')}
            className="glass rounded-2xl p-6 text-left hover:shadow-glow transition-all duration-300 active:scale-[0.98] group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ayni-400 to-ayni-600 flex items-center justify-center shadow-lg shadow-ayni-500/20 group-hover:scale-105 transition-transform">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold dark:text-white text-slate-900">Portal Ciudadano</h3>
                <p className="text-sm dark:text-slate-400 text-slate-500 mt-0.5">
                  Interactúa con los agentes de IA, recicla y acumula descuentos en tus arbitrios.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleSelect('admin')}
            className="glass rounded-2xl p-6 text-left hover:shadow-glow transition-all duration-300 active:scale-[0.98] group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Monitor className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold dark:text-white text-slate-900">Panel de Administración</h3>
                <p className="text-sm dark:text-slate-400 text-slate-500 mt-0.5">
                  Monitorea métricas, gestiona descuentos y visualiza el cumplimiento de la Ley REP.
                </p>
              </div>
            </div>
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center gap-2 mx-auto text-sm font-medium dark:text-slate-500 text-slate-400 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
