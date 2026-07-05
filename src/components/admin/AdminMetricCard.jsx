import GlassCard from '@/components/common/GlassCard';
import AnimatedCounter from '@/components/common/AnimatedCounter';

export default function AdminMetricCard({ icon: Icon, label, value, decimals = 1, suffix = '', prefix = '', trend = null }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider dark:text-slate-500 text-slate-400">
          {label}
        </span>
        <div className="w-9 h-9 rounded-xl dark:bg-slate-800 bg-slate-100 flex items-center justify-center">
          <Icon className="w-[18px] h-[18px] text-ayni-400" />
        </div>
      </div>
      <AnimatedCounter
        value={value}
        decimals={decimals}
        prefix={prefix}
        suffix={suffix}
        className="text-3xl font-bold tracking-tight dark:text-white text-slate-900"
      />
      {trend && (
        <div className="flex items-center gap-1 mt-1.5">
          <Icon className="w-3.5 h-3.5 text-ayni-400" />
          <span className="text-[11px] font-medium text-ayni-400">{trend}</span>
        </div>
      )}
    </GlassCard>
  );
}
