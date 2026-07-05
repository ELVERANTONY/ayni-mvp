import { useState, useEffect } from 'react';
import { Settings, Save, RefreshCw, Database, Shield, CheckCircle, ToggleLeft } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';
import adminService from '@/services/adminService';

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [repQuota, setRepQuota] = useState(500);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toggles, setToggles] = useState({
    autoApprove: true,
    fraudDetection: true,
    emailNotifications: false,
    publicStats: true,
  });

  useEffect(() => {
    adminService.getSettings().then((s) => {
      setSettings(s);
      if (s.repQuota) setRepQuota(s.repQuota);
    });
  }, []);

  const handleSaveQuota = async () => {
    setSaving(true);
    await adminService.updateSetting('repQuota', repQuota);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetData = async () => {
    if (!confirm('¿Estás seguro de que deseas restablecer todos los datos del sistema? Esta acción no se puede deshacer.')) return;
    const dbs = ['wallet', 'messages', 'contributors', 'monthlyData', 'settings', 'wasteLog'];
    for (const table of dbs) {
      const db = (await import('@/services/db')).default;
      await db[table]?.clear();
    }
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl dark:bg-ayni-900/30 bg-ayni-50 flex items-center justify-center">
            <Settings className="w-5 h-5 dark:text-ayni-400 text-ayni-600" />
          </div>
          <div>
            <h3 className="text-base font-bold dark:text-white text-slate-900">Configuración del Sistema</h3>
            <span className="text-xs dark:text-slate-500 text-slate-400">Ajustes generales de la plataforma AYNI</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <h4 className="text-sm font-semibold dark:text-slate-300 text-slate-700 flex items-center gap-2">
              <Database className="w-4 h-4 dark:text-ayni-400 text-ayni-600" />
              Meta REP
            </h4>
            <div>
              <label className="text-xs font-medium dark:text-slate-400 text-slate-500 block mb-1.5">
                Cuota anual de reciclaje (toneladas)
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={repQuota}
                  onChange={(e) => setRepQuota(Number(e.target.value))}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium
                    dark:bg-slate-800 dark:text-white dark:border dark:border-slate-700/30
                    bg-slate-100 text-slate-800 border border-slate-200/50
                    focus:outline-none focus:ring-2 focus:ring-ayni-500/30"
                />
                <button
                  onClick={handleSaveQuota}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold
                    transition-all duration-200 active:scale-95 disabled:opacity-50
                    dark:bg-ayni-500/20 dark:text-ayni-400 dark:border dark:border-ayni-600/30
                    bg-ayni-50 text-ayni-700 border border-ayni-200/50
                    hover:dark:bg-ayni-500/30 hover:bg-ayni-100 flex items-center gap-2"
                >
                  {saving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : saved ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saving ? 'Guardando...' : saved ? 'Guardado' : 'Guardar'}
                </button>
              </div>
              <p className="text-[11px] dark:text-slate-500 text-slate-400 mt-1.5">
                Progreso actual: {settings.repAchieved || 0} ton / {repQuota} ton ({((settings.repAchieved || 0) / repQuota * 100).toFixed(1)}%)
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <h4 className="text-sm font-semibold dark:text-slate-300 text-slate-700 flex items-center gap-2">
              <Shield className="w-4 h-4 dark:text-ayni-400 text-ayni-600" />
              Estado del Sistema
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl dark:bg-slate-800/40 bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 dark:text-slate-500 text-slate-400" />
                  <span className="text-xs font-medium dark:text-slate-300 text-slate-600">Base de datos local</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full
                  dark:bg-emerald-900/20 dark:text-emerald-400 bg-emerald-50 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Conectado
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl dark:bg-slate-800/40 bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 dark:text-slate-500 text-slate-400" />
                  <span className="text-xs font-medium dark:text-slate-300 text-slate-600">Sincronización</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full
                  dark:bg-emerald-900/20 dark:text-emerald-400 bg-emerald-50 text-emerald-700">
                  Al día
                </span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h4 className="text-sm font-semibold dark:text-slate-300 text-slate-700 flex items-center gap-2 mb-4">
          <ToggleLeft className="w-4 h-4 dark:text-ayni-400 text-ayni-600" />
          Preferencias del Sistema
        </h4>
        <div className="space-y-3">
          {[
            { key: 'autoApprove', label: 'Aprobación automática de inscripciones', desc: 'Los nuevos ciudadanos se registran sin revisión manual' },
            { key: 'fraudDetection', label: 'Detección de fraudes activa', desc: 'Validación de duplicados y control de calidad de imágenes' },
            { key: 'emailNotifications', label: 'Notificaciones por correo', desc: 'Enviar alertas al administrador cuando hay nuevas inscripciones' },
            { key: 'publicStats', label: 'Estadísticas públicas', desc: 'Mostrar métricas de reciclaje en la landing page' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-xl dark:bg-slate-800/40 bg-slate-50">
              <div>
                <span className="text-sm font-medium dark:text-slate-200 text-slate-700">{item.label}</span>
                <p className="text-[11px] dark:text-slate-500 text-slate-400">{item.desc}</p>
              </div>
              <button
                onClick={() => setToggles((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                className={`relative w-11 h-6 rounded-full transition-all duration-300 flex items-center
                  ${toggles[item.key] ? 'dark:bg-ayni-500/40 bg-ayni-400' : 'dark:bg-slate-700 bg-slate-300'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 transform
                  ${toggles[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6 border-red-900/20 dark:border-red-900/20">
        <h4 className="text-sm font-semibold dark:text-red-400 text-red-700 flex items-center gap-2 mb-2">
          <Database className="w-4 h-4" />
          Zona de Peligro
        </h4>
        <p className="text-xs dark:text-slate-500 text-slate-400 mb-4">
          Estas acciones son destructivas y no se pueden deshacer. Ten cuidado.
        </p>
        <button
          onClick={handleResetData}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold
            transition-all duration-200 active:scale-95
            dark:bg-red-900/20 dark:text-red-400 dark:border dark:border-red-800/30
            bg-red-50 text-red-700 border border-red-200/50
            hover:dark:bg-red-900/30 hover:bg-red-100"
        >
          Restablecer todos los datos del sistema
        </button>
      </GlassCard>
    </div>
  );
}
