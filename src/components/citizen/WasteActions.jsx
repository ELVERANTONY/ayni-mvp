export default function WasteActions({ options, onOption, disabled, isSimulating }) {
  return (
    <div className="flex-shrink-0 px-3 py-2.5 border-t
      dark:bg-slate-900/95 dark:border-slate-800/50 bg-white/95 border-slate-200/50
      backdrop-blur-xl">
      {options && options.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 justify-center">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onOption?.(opt.id)}
              disabled={disabled}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium
                transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:border dark:border-slate-700/30
                bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/50
                shadow-sm"
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : !isSimulating ? (
        <div className="flex justify-center">
          <span className="text-[10px] dark:text-slate-500 text-slate-400">Selecciona una opción en el chat</span>
        </div>
      ) : null}
    </div>
  );
}
