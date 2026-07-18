import { useEffect, useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import adminService from '@/services/adminService';
import AyniWallet from './AyniWallet';
import { User, Award, History, ArrowRight, Leaf, Shield, CheckCircle } from 'lucide-react';

export default function CitizenView() {
  const { wallet, displayKg, displayCo2, displaySavings } = useWallet();
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    adminService.getWasteLogs().then((logs) => {
      setRecentActivity(logs.slice(0, 5));
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-ayni-600 to-ayni-500 text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">¡Hola, Ciudadano! 👋</h1>
            <p className="text-ayni-100 text-lg max-w-xl">
              Gracias por ser parte del cambio. Tu compromiso con el reciclaje está haciendo de nuestra ciudad un lugar más limpio y sostenible.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="p-3 bg-white/20 rounded-xl">
              <Award className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <p className="text-ayni-100 text-sm font-medium">Nivel Actual</p>
              <p className="text-xl font-bold">Ciudadano Eco-Constante</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column: Profile & Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center shadow-inner">
                  <User className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Mi Perfil</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">ID: AYNI-{String(wallet.id || 1).padStart(5, '0')}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Estado</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" /> Activo
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Miembro desde</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Mayo 2026</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Reciclado</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{displayKg} kg</span>
                </div>
              </div>
            </div>

            {/* How it works info */}
            <div className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-ayni-500" />
                Descuento en Arbitrios
              </h4>
              <div className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Para obtener tu descuento municipal del <span className="font-bold text-ayni-600 dark:text-ayni-400">15%</span> anual, debes acumular kilogramos de reciclaje válidos a través de nuestro Bot de WhatsApp.
                </p>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Leaf className="w-4 h-4 text-emerald-500" />
                    <span>Tu progreso actual es del <strong>{wallet.progress}%</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Wallet & History */}
          <div className="lg:col-span-8 space-y-6">
            {/* Wallet Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mi Billetera Digital</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Monitorea tus tickets acumulados y el impacto ambiental generado.
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 p-2 sm:p-6 shadow-inner">
                <AyniWallet
                  wallet={wallet}
                  displayKg={displayKg}
                  displayCo2={displayCo2}
                  displaySavings={displaySavings}
                />
              </div>
            </div>

          </div>
          
        </div>

        {/* Full Width Bottom: Recent Activity */}
        <div className="mt-6 lg:mt-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-slate-400" />
              Actividad Reciente
            </h3>
            <button className="text-sm font-medium text-ayni-600 hover:text-ayni-700 dark:text-ayni-400 dark:hover:text-ayni-300 flex items-center gap-1 transition-colors">
              Ver todo <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {recentActivity.length === 0 ? (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl text-sm text-slate-500 dark:text-slate-400">
                Aún no tienes reportes aprobados. Envía tu primer residuo desde AYNI Bot.
              </div>
            ) : recentActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Reciclaje {item.wasteType || 'validado'} ({item.kg} kg)</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {new Date(item.timestamp).toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' })} · {item.co2} kg CO₂ eq evitado
                  </p>
                </div>
                <div className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-xl font-bold text-sm border border-amber-200 dark:border-amber-800/50">
                  +1 Ticket
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
