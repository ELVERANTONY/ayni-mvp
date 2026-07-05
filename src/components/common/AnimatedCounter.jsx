import { useRef, useEffect, useState } from 'react';

const DURATION = 800;

export default function AnimatedCounter({ value, decimals = 1, prefix = '', suffix = '', className = '' }) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef(null);
  const prevValue = useRef(value);

  useEffect(() => {
    const from = prevValue.current;
    const to = value;
    if (from === to) {
      setDisplay(to);
      return;
    }

    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const p = Math.min(elapsed / DURATION, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const current = from + (to - from) * ease;

      setDisplay(current);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(to);
        prevValue.current = to;
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  const formatted = decimals === 0
    ? Math.round(display).toLocaleString()
    : display.toFixed(decimals);

  return (
    <span className={`stat-value ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
