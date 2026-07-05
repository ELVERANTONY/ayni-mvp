export default function DiscountProgress({ progress = 0, remainingKg = '0', savings = 0 }) {
  const atGoal = progress >= 100;
  const safeSavings = savings || 0;
  const potentialDiscount = (safeSavings * 2).toFixed(2);
  const displayProgress = Math.round(progress || 0);

  return (
    <div className="glass rounded-2xl p-3.5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider dark:text-slate-400 text-slate-500">
          Descuento Ayni — <span className="text-ayni-400">S/ {safeSavings.toFixed(2)}</span>
        </span>
        <span className="text-xs font-bold text-ayni-400">{displayProgress}%</span>
      </div>
      <div className="relative h-2.5 rounded-full overflow-hidden dark:bg-slate-800 bg-slate-200">
        <div className="absolute inset-0 rounded-full shimmer opacity-20 dark:opacity-10" />
        <div
          className="h-full rounded-full bg-gradient-to-r from-ayni-500 to-ayni-400 transition-all duration-700 ease-out"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      <p className="text-[11px] mt-2 font-medium dark:text-slate-500 text-slate-400">
        {atGoal
          ? '¡Felicidades! Descuento máximo alcanzado — revisa tu recibo de arbitrios.'
          : `Faltan ${remainingKg} kg (≈ S/ ${potentialDiscount}) para tu descuento del 15% en arbitrios.`
        }
      </p>
    </div>
  );
}
