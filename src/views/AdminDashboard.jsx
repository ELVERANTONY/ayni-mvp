import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, anonimizar } from '@/store/authStore';
import { useAdmin } from '@/hooks/useAdmin';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminView from '@/components/admin/AdminView';
import AdminContributors from '@/components/admin/AdminContributors';
import AdminRequests from '@/components/admin/AdminRequests';
import AdminRegistrations from '@/components/admin/AdminRegistrations';
import AdminSettings from '@/components/admin/AdminSettings';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const { settings, contributors, monthlyData, exportCSV, applyDiscount, loading } = useAdmin();

  useEffect(() => {
    getSession().then((s) => {
      if (!s || s.role !== 'admin') {
        navigate('/login');
      } else {
        setAdminName(s.name);
        setAuthorized(true);
      }
    });
  }, [navigate]);

  if (!authorized) return null;

  const anonymizedContributors = contributors.map((c) => ({
    ...c,
    name: anonimizar ? anonimizar(c.name) : c.name,
  }));

  return (
    <div className="flex">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        adminName={adminName}
      />

      <main className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <AdminView
            settings={settings}
            contributors={anonymizedContributors}
            monthlyData={monthlyData}
            exportCSV={exportCSV}
            applyDiscount={applyDiscount}
            adminName={adminName}
            loading={loading}
          />
        )}
        {activeTab === 'contributors' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight dark:text-white text-slate-900">Gestión de Contribuyentes</h1>
              <p className="text-sm mt-1 dark:text-slate-500 text-slate-400">
                Administra los contribuyentes del distrito
              </p>
            </div>
            <AdminContributors contributors={contributors} />
          </div>
        )}
        {activeTab === 'requests' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight dark:text-white text-slate-900">Solicitudes de Reciclaje</h1>
              <p className="text-sm mt-1 dark:text-slate-500 text-slate-400">
                Monitoreo de actividad de reciclaje en tiempo real
              </p>
            </div>
            <AdminRequests />
          </div>
        )}
        {activeTab === 'registrations' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight dark:text-white text-slate-900">Inscripciones al Programa</h1>
              <p className="text-sm mt-1 dark:text-slate-500 text-slate-400">
                Aprobación de nuevos ciudadanos en la plataforma AYNI
              </p>
            </div>
            <AdminRegistrations />
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight dark:text-white text-slate-900">Configuración del Sistema</h1>
              <p className="text-sm mt-1 dark:text-slate-500 text-slate-400">
                Ajustes y preferencias de la plataforma AYNI
              </p>
            </div>
            <AdminSettings />
          </div>
        )}

      </main>
    </div>
  );
}
