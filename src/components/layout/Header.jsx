import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Recycle, Sun, Moon, LogOut, Shield, User } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getSession, logout } from '@/store/authStore';

export default function Header() {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const [session, setSession] = useState(null);
  const currentPath = location.pathname;
  const expectedRole = currentPath === '/admin' ? 'admin' : 'citizen';

  useEffect(() => {
    getSession(expectedRole).then(setSession);
  }, [expectedRole]);

  const role = session?.role;
  const isAdmin = role === 'admin';

  const handleLogout = async () => {
    await logout(expectedRole);
    window.location.hash = '/';
  };

  if (currentPath === '/' || currentPath === '/login') return null;

  return (
    <header className="sticky top-0 z-50 glass border-b dark:border-slate-800/50 border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-ayni-400 to-ayni-600 flex items-center justify-center shadow-lg shadow-ayni-500/20">
            <Recycle className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight dark:text-white text-slate-900">AYNI</span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1
            ${isAdmin
              ? 'dark:bg-blue-900/30 dark:text-blue-400 dark:border dark:border-blue-700/30 bg-blue-50 text-blue-700 border border-blue-200'
              : 'dark:bg-ayni-900/30 dark:text-ayni-400 dark:border dark:border-ayni-700/30 bg-ayni-50 text-ayni-700 border border-ayni-200'
            }`}>
            {isAdmin ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
            {isAdmin ? 'Administrador' : 'Ciudadano'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-90
              dark:bg-slate-800/60 dark:text-amber-400 dark:hover:bg-slate-700/60
              bg-white/80 text-slate-500 hover:bg-slate-100 border dark:border-slate-700/30 border-slate-200/50"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={handleLogout}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-90
              dark:bg-slate-800/60 dark:text-slate-500 dark:hover:bg-slate-700/60 dark:hover:text-red-400
              bg-white/80 text-slate-400 hover:bg-slate-100 hover:text-red-500 border dark:border-slate-700/30 border-slate-200/50"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
