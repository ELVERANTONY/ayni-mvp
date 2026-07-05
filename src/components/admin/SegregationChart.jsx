import { useTheme } from '@/context/ThemeContext';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import GlassCard from '@/components/common/GlassCard';

export default function SegregationChart({ data }) {
  const { darkMode } = useTheme();

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className={`px-4 py-3 rounded-xl border shadow-linear-lg text-xs
        ${darkMode ? 'bg-slate-900/90 border-slate-700/30 text-white' : 'bg-white/90 border-slate-200/50 text-slate-900'}`}
      >
        <p className="font-semibold mb-1.5">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{entry.name}:</span>
            <span className="font-semibold">{entry.value} ton</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <GlassCard className="p-5 lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider dark:text-slate-500 text-slate-400">
            Recuperación Mensual
          </span>
          <h3 className="text-lg font-bold mt-0.5 dark:text-white text-slate-900">Curva de Segregación</h3>
        </div>
        <div className="flex gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-ayni-400" />
            <span className="dark:text-slate-400 text-slate-500">Recuperado</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full dark:bg-slate-600 bg-slate-300" />
            <span className="dark:text-slate-400 text-slate-500">Meta MINAM</span>
          </span>
        </div>
      </div>

      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="recoveredGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? 'rgba(71,85,105,0.15)' : 'rgba(148,163,184,0.15)'}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: darkMode ? '#475569' : '#94A3B8', fontSize: 11, fontFamily: 'Inter' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: darkMode ? '#475569' : '#94A3B8', fontSize: 11, fontFamily: 'Inter' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: darkMode ? '#475569' : '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area
              type="monotone"
              dataKey="recovered"
              stroke="#10B981"
              strokeWidth={2.5}
              fill="url(#recoveredGrad)"
              dot={{ r: 4, fill: '#10B981', stroke: darkMode ? '#0F172A' : '#FFFFFF', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#10B981', stroke: darkMode ? '#0F172A' : '#FFFFFF', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke={darkMode ? '#475569' : '#94A3B8'}
              strokeWidth={2}
              strokeDasharray="6 4"
              fill="none"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
