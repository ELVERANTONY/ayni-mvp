import { Settings, Save, Bell, Shield, Database } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-8">
      <div className="max-w-3xl">
        <div className="space-y-8">
          
          {/* General Settings */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-ayni-500" />
              Configuración General
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nombre de la Municipalidad
                </label>
                <input 
                  type="text" 
                  defaultValue="Municipalidad Distrital"
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-ayni-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Meta Anual de Reciclaje (Toneladas)
                </label>
                <input 
                  type="number" 
                  defaultValue="500"
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-ayni-500"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Notificaciones */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-ayni-500" />
              Notificaciones del Sistema
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-ayni-600 rounded border-slate-300 focus:ring-ayni-500" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Recibir alertas de nuevas inscripciones</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-ayni-600 rounded border-slate-300 focus:ring-ayni-500" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Reportes semanales de impacto ambiental</span>
              </label>
            </div>
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Seguridad y Datos */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-ayni-500" />
              Gestión de Datos
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Manejo de la base de datos local y privacidad de los ciudadanos.
            </p>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Exportar Base de Datos (JSON)
              </button>
              <button className="px-4 py-2 bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 rounded-xl text-sm font-medium hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors">
                Restablecer Sistema
              </button>
            </div>
          </div>

          <div className="pt-6">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-ayni-500 text-white rounded-xl font-semibold hover:bg-ayni-600 transition-colors shadow-lg shadow-ayni-500/20">
              <Save className="w-5 h-5" />
              Guardar Cambios
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
