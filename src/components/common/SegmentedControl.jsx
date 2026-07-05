export default function SegmentedControl({ options, value, onChange, className = '' }) {
  return (
    <div className={`inline-flex p-0.5 rounded-xl border gap-0.5
      dark:bg-slate-800/60 dark:border-slate-700/30
      bg-slate-100/60 border-slate-200/40 ${className}`}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`relative flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-sm font-medium
              transition-all duration-200
              ${active
                ? 'dark:bg-ayni-500 dark:text-white dark:shadow-lg dark:shadow-ayni-500/20 bg-white text-ayni-700 shadow-linear-sm'
                : 'dark:text-slate-400 dark:hover:text-slate-200 text-slate-500 hover:text-slate-700'
              }`}
          >
            {opt.icon && <opt.icon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{opt.label}</span>
            <span className="sm:hidden">{opt.shortLabel || opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
