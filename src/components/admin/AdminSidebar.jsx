import { LayoutDashboard, Users, ClipboardList, LogOut, BarChart3, Image, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TABS = [
  { id: 'dashboard', label: 'Métricas Reales', icon: BarChart3 },
  { id: 'contributors', label: 'Contribuyentes', icon: Users },
  { id: 'requests', label: 'Solicitudes', icon: Image },
  { id: 'registrations', label: 'Inscripciones', icon: ClipboardList },
  { id: 'settings', label: 'Configuración', icon: Settings },
];

export default function AdminSidebar({ activeTab, onTabChange, adminName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col dark:bg-slate-900 bg-slate-50 border-r dark:border-slate-800/50 border-slate-200/50">
      <div className="px-5 py-6 border-b dark:border-slate-800/50 border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ayni-400 to-ayni-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <span className="text-sm font-bold dark:text-white text-slate-900">AYNI</span>
            <span className="text-[10px] block dark:text-slate-500 text-slate-400">Municipalidad</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'dark:bg-ayni-500/15 dark:text-ayni-400 dark:border dark:border-ayni-600/20 bg-ayni-50 text-ayni-700 border border-ayni-200/50'
                  : 'dark:text-slate-400 dark:hover:bg-slate-800/50 text-slate-600 hover:bg-slate-100'
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t dark:border-slate-800/50 border-slate-200/50">
        {adminName && (
          <div className="mb-2 px-3 py-2 text-xs dark:text-slate-400 text-slate-500 truncate text-center font-medium">
            Conectado como: {adminName}
          </div>
        )}
      </div>
    </aside>
  );
}
