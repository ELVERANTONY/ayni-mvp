import AnimatedCounter from '@/components/common/AnimatedCounter';

export default function WalletMetric({ icon: Icon, label, value, decimals = 1, prefix = '', suffix = '', color = 'emerald' }) {
  const colorMap = {
    emerald: 'dark:text-ayni-400 text-ayni-600',
    amber: 'dark:text-amber-400 text-amber-600',
    sky: 'dark:text-sky-400 text-sky-600',
  };

  return (
    <div className="glass rounded-2xl p-3 text-center glass-hover">
      <Icon className={`w-4 h-4 mx-auto mb-1.5 ${colorMap[color]}`} />
      <AnimatedCounter
        value={value}
        decimals={decimals}
        prefix={prefix}
        suffix={suffix}
        className="text-xl font-bold tracking-tight dark:text-white text-slate-900"
      />
      <div className="text-[10px] font-medium mt-0.5 dark:text-slate-500 text-slate-400">{label}</div>
    </div>
  );
}
