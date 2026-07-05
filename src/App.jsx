import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Landing from '@/views/Landing';
import Login from '@/views/Login';
import CitizenPortal from '@/views/CitizenPortal';
import AdminDashboard from '@/views/AdminDashboard';
import { seedDatabase } from '@/data/seedData';

function AppShell({ children }) {
  return (
    <ThemeProvider>
      <Header />
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen dark:bg-surface-dark bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ayni-400 to-ayni-600 animate-pulse-subtle flex items-center justify-center">
          <svg className="w-6 h-6 text-white" viewBox="0 0 32 32" fill="none">
            <path d="M16 6L20 12L16 10L12 12L16 6Z" fill="currentColor" opacity="0.9"/>
            <path d="M16 26L12 20L16 22L20 20L16 26Z" fill="currentColor" opacity="0.9"/>
            <path d="M6 16L12 12L10 16L12 20L6 16Z" fill="currentColor" opacity="0.9"/>
            <path d="M26 16L20 20L22 16L20 12L26 16Z" fill="currentColor" opacity="0.9"/>
            <circle cx="16" cy="16" r="3" fill="currentColor"/>
          </svg>
        </div>
        <span className="text-sm font-medium dark:text-slate-400 text-slate-500 animate-pulse-subtle">Cargando AYNI…</span>
      </div>
    </div>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    seedDatabase()
      .catch((err) => console.error('[AYNI] DB seed error:', err))
      .finally(() => setReady(true));
    const timeout = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (!ready) return <LoadingScreen />;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/citizen"
          element={
            <AppShell>
              <CitizenPortal />
            </AppShell>
          }
        />
        <Route
          path="/admin"
          element={
            <AppShell>
              <AdminDashboard />
            </AppShell>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
