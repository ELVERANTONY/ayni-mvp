import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession } from '@/store/authStore';
import { hasConsent } from '@/lib/privacy';
import PrivacyNotice from '@/components/privacy/PrivacyNotice';
import CitizenView from '@/components/citizen/CitizenView';

export default function CitizenPortal() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [consented, setConsented] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getSession('citizen').then((s) => {
      if (!s || s.role !== 'citizen') {
        navigate('/login');
      } else {
        setAuthorized(true);
        hasConsent().then(setConsented).finally(() => setChecking(false));
      }
    });
  }, [navigate]);

  if (checking) return null;
  if (!authorized) return null;

  if (!consented) {
    return (
      <div className="min-h-screen dark:bg-surface-dark bg-slate-50 flex items-center justify-center p-4">
        <PrivacyNotice onAccept={() => setConsented(true)} onDecline={() => navigate('/select')} />
      </div>
    );
  }

  return <CitizenView />;
}
