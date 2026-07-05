import { Users, BarChart3, Leaf, DollarSign } from 'lucide-react';
import AdminMetricCard from './AdminMetricCard';

export default function MetricsGrid({ settings }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <AdminMetricCard
        icon={Users}
        label="Ciudadanos"
        value={settings.citizens || 0}
        decimals={0}
        trend="+12% este mes"
      />
      <AdminMetricCard
        icon={BarChart3}
        label="Recuperado"
        value={settings.tons || 0}
        decimals={1}
        suffix=" ton"
      />
      <AdminMetricCard
        icon={Leaf}
        label="CO₂ Evitado"
        value={settings.carbonFootprint || 0}
        decimals={1}
        suffix=" ton CO₂ eq"
      />
      <AdminMetricCard
        icon={DollarSign}
        label="Ahorro"
        value={settings.savings || 0}
        decimals={0}
        prefix="S/ "
        trend="En enterramiento sanitario"
      />
    </div>
  );
}
