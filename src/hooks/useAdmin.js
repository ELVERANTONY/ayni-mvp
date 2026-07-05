import { useState, useEffect, useCallback } from 'react';
import adminService from '@/services/adminService';

export function useAdmin() {
  const [settings, setSettings] = useState({});
  const [contributors, setContributors] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminService.getSettings(),
      adminService.getContributors(),
      adminService.getMonthlyData(),
    ]).then(([s, c, m]) => {
      setSettings(s);
      setContributors(c);
      setMonthlyData(m);
      setLoading(false);
    });
  }, []);

  const refresh = useCallback(async () => {
    const [s, c, m] = await Promise.all([
      adminService.getSettings(),
      adminService.getContributors(),
      adminService.getMonthlyData(),
    ]);
    setSettings(s);
    setContributors(c);
    setMonthlyData(m);
  }, []);

  const exportCSV = useCallback(() => {
    const csv = adminService.generateCSV(contributors);
    adminService.downloadCSV(csv);
  }, [contributors]);

  const applyDiscount = useCallback(async (id) => {
    const updated = await adminService.applyDiscount(id);
    setContributors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, signed: true } : c))
    );
    return updated;
  }, []);

  return { settings, contributors, monthlyData, loading, refresh, exportCSV, applyDiscount };
}
