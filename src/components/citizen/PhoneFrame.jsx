export default function PhoneFrame({ children }) {
  return (
    <div className="phone-frame">
      <div className="phone-notch">
        <div className="w-2 h-2 rounded-full bg-slate-700 border border-slate-600" />
      </div>
      <div className="phone-screen">
        {/* WhatsApp-style green header */}
        <div className="px-4 pt-8 pb-3 bg-emerald-600 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500/80 flex items-center justify-center text-white font-bold text-sm shadow-inner">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-[13px] leading-tight">AYNI Bot</p>
            <p className="text-emerald-200 text-[10px] leading-tight flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
              cuenta AYNI vinculada
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
