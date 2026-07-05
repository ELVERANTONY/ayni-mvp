import { useState, useEffect, useCallback, useRef } from 'react';
import walletService from '@/services/walletService';

const EASE_DURATION = 900;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function useWallet() {
  const [wallet, setWallet] = useState({ kg: 0, co2: 0, tickets: 0, progress: 0, savings: 0 });
  const [displayKg, setDisplayKg] = useState(0);
  const [displayCo2, setDisplayCo2] = useState(0);
  const [displaySavings, setDisplaySavings] = useState(0);
  const [loading, setLoading] = useState(true);
  const rafRef = useRef(null);

  useEffect(() => {
    walletService.getWallet().then((w) => {
      setWallet(w);
      setDisplayKg(w.kg);
      setDisplayCo2(w.co2);
      setDisplaySavings(w.savings);
      setLoading(false);
    });
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const animateAll = useCallback((fromKg, toKg, fromCo2, toCo2, fromSavings, toSavings) => {
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const p = Math.min(elapsed / EASE_DURATION, 1);
      const e = easeOutCubic(p);

      setDisplayKg(fromKg + (toKg - fromKg) * e);
      setDisplayCo2(fromCo2 + (toCo2 - fromCo2) * e);
      setDisplaySavings(fromSavings + (toSavings - fromSavings) * e);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayKg(toKg);
        setDisplayCo2(toCo2);
        setDisplaySavings(toSavings);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const addWaste = useCallback(async (kgAdd, co2Add) => {
    const oldKg = wallet.kg;
    const oldCo2 = wallet.co2;
    const oldSavings = wallet.savings;

    const updated = await walletService.addWasteToWallet(kgAdd, co2Add);
    setWallet(updated);
    animateAll(oldKg, updated.kg, oldCo2, updated.co2, oldSavings, updated.savings);

    return updated;
  }, [wallet, animateAll]);

  return { wallet, displayKg, displayCo2, displaySavings, loading, addWaste };
}
