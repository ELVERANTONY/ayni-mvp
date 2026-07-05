import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function Toast({ message, onClose, duration = 3500 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-[100] animate-scale-in">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-linear-lg border
                      dark:bg-emerald-900/30 dark:border-emerald-700/30 dark:text-emerald-100
                      bg-emerald-50 border-emerald-200/60 text-emerald-800">
        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
