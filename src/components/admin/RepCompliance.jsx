import { Shield, Truck } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';

export default function RepCompliance({ repAchieved, repQuota }) {
  const pct = repQuota > 0 ? (repAchieved / repQuota) * 100 : 0;
  const remaining = Math.max(0, repQuota - repAchieved);

  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider dark:text-slate-500 text-slate-400">
            Ley REP
          </span>
          <h3 className="text-lg font-bold mt-0.5 dark:text-white text-slate-900">Cumplimiento</h3>
        </div>
        <div className="w-9 h-9 rounded-xl dark:bg-slate-800 bg-slate-100 flex items-center justify-center">
          <Shield className="w-[18px] h-[18px] text-ayni-400" />
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="font-medium dark:text-slate-300 text-slate-700">Cuota MINAM</span>
            <span className="font-bold text-ayni-400">
              {repAchieved.toFixed(0)} / {repQuota} ton
            </span>
          </div>
          <div className="relative h-3 rounded-full overflow-hidden dark:bg-slate-800 bg-slate-200">
            <div
              className="progress-fill h-full rounded-full bg-gradient-to-r from-ayni-500 to-ayni-400 transition-all duration-700 ease-out"
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
          <span className="text-[11px] font-medium mt-1 block dark:text-slate-500 text-slate-400">
            {pct.toFixed(1)}% de la meta anual —
            {remaining > 0
              ? ` Restan ${remaining.toFixed(0)} ton`
              : ' Meta cumplida'
            }
          </span>
        </div>

        <div className="pt-3 border-t dark:border-slate-700/30 border-slate-200/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg dark:bg-ayni-900/30 bg-ayni-50 flex items-center justify-center">
              <Truck className="w-4 h-4 text-ayni-400" />
            </div>
            <div>
              <span className="text-sm font-semibold dark:text-slate-200 text-slate-800">Sistemas Colectivos</span>
              <span className="text-[11px] block dark:text-slate-500 text-slate-400">3 financiadores activos</span>
            </div>
          </div>
          <div className="flex gap-2">
            {['Envases', 'Papel', 'Metales'].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-1 rounded-lg dark:bg-slate-800 dark:text-slate-400 bg-slate-100 text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
