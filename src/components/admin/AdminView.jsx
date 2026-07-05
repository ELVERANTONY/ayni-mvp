import { useState, useCallback } from 'react';
import MetricsGrid from './MetricsGrid';
import SegregationChart from './SegregationChart';
import RepCompliance from './RepCompliance';
import ContributorsTable from './ContributorsTable';
import Toast from '@/components/common/Toast';

export default function AdminView({ settings, contributors, monthlyData, exportCSV, applyDiscount, adminName, loading }) {
  const [exporting, setExporting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleExport = useCallback(async () => {
    if (exporting) return;
    setExporting(true);
    await new Promise((r) => setTimeout(r, 1000));
    exportCSV();
    setExporting(false);
    setToast('Reporte exportado al sistema municipal (SIAF) correctamente.');
  }, [exporting, exportCSV]);

  const handleApplyDiscount = useCallback(async (id) => {
    await applyDiscount(id);
    setToast('Descuento firmado y aplicado. Datos protegidos según Ley N° 29733.');
  }, [applyDiscount]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin w-5 h-5 text-ayni-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm dark:text-slate-400 text-slate-500">Cargando panel...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toast message={toast} onClose={() => setToast(null)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight dark:text-white text-slate-900">Panel de Monitoreo</h1>
            <p className="text-sm mt-1 dark:text-slate-500 text-slate-400">
              AYNI · Municipalidad Distrital{' '}
              <span className="text-ayni-400">●</span>{' '}
              <span className="text-xs">{(settings.citizens || 0).toLocaleString()} ciudadanos activos</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium px-2.5 py-1 rounded-full dark:bg-ayni-900/30 dark:text-ayni-400 dark:border dark:border-ayni-700/30 bg-ayni-50 text-ayni-700 border border-ayni-200">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-ayni-400 mr-1.5 animate-pulse" />
              Sincronizado
            </span>
            {adminName && (
              <span className="text-[11px] font-medium dark:text-slate-500 text-slate-400">{adminName}</span>
            )}
          </div>
        </div>

        <MetricsGrid settings={settings} />

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <SegregationChart data={monthlyData || []} />
          <RepCompliance
            repAchieved={settings.repAchieved || 0}
            repQuota={settings.repQuota || 500}
          />
        </div>

        <ContributorsTable
          contributors={contributors}
          onExport={handleExport}
          onApplyDiscount={handleApplyDiscount}
          exporting={exporting}
        />

        <div className="flex items-center justify-between mt-8 pb-4">
          <span className="text-xs dark:text-slate-600 text-slate-400">
            AYNI v0.1 · Datos anonimizados · Ley N° 29733
          </span>
          <span className="text-xs font-medium dark:text-slate-600 text-slate-400">
            Certificado por <span className="text-ayni-400">IA</span>
          </span>
        </div>
      </div>
    </>
  );
}
