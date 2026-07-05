export default function TypingIndicator() {
  return (
    <div className="flex justify-start items-center gap-2.5 animate-fade-in">
      <div className="w-7 h-7 rounded-full glass flex items-center justify-center flex-shrink-0">
        <span className="w-3.5 h-3.5 rounded-full bg-ayni-400/50" />
      </div>
      <div className="glass rounded-2xl px-4 py-3 dark:border-slate-700/30 border-slate-200/50">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[7px] h-[7px] rounded-full dark:bg-slate-400 bg-slate-500 animate-bounce-dot"
              style={{ animationDelay: `${-0.32 + i * 0.16}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
