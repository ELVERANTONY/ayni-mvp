import { Trash2, Leaf, Award, DollarSign } from 'lucide-react';
import WalletMetric from './WalletMetric';
import DiscountProgress from './DiscountProgress';

export default function AyniWallet({ wallet, displayKg, displayCo2, displaySavings }) {
  const progressPercent = wallet.progress;
  const remainingKg = ((100 - progressPercent) / 10 * 0.5).toFixed(1);

  return (
    <div className="flex-shrink-0 px-5 pt-5 pb-4 dark:bg-gradient-to-b dark:from-ayni-900/20 dark:via-transparent dark:to-transparent bg-gradient-to-b from-ayni-50/50 via-transparent to-transparent">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] dark:text-ayni-400/70 text-ayni-600/70">
          Billetera Ayni
        </span>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full dark:bg-slate-800 dark:text-slate-400 bg-slate-200 text-slate-500">
          ID: AYNI-{String(wallet.id || 1).padStart(5, '0')}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <WalletMetric icon={Trash2} label="kg segregados" value={displayKg} decimals={1} color="emerald" />
        <WalletMetric icon={Leaf} label="kg CO₂ eq evitados" value={displayCo2} decimals={2} color="emerald" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <WalletMetric icon={Award} label="Tickets Ayni" value={wallet.tickets} decimals={0} color="amber" />
        <WalletMetric icon={DollarSign} label="Ahorro en arbitrios" value={displaySavings} decimals={2} prefix="S/ " color="emerald" />
      </div>

      <DiscountProgress progress={progressPercent} remainingKg={remainingKg} savings={wallet.savings} />
    </div>
  );
}
