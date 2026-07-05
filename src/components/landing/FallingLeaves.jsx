import { useEffect, useState } from 'react';

const LEAF_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 22C12 22 20 16 20 9C20 4.5 15.5 2 12 2C8.5 2 4 4.5 4 9C4 16 12 22 12 22Z" opacity="0.8" />
  </svg>
);

const LEAVES_COUNT = 15;

export default function FallingLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // Generar hojas con posiciones y tiempos aleatorios
    const newLeaves = Array.from({ length: LEAVES_COUNT }).map((_, i) => {
      const left = Math.random() * 100; // 0% a 100% width
      const animationDuration = 10 + Math.random() * 15; // 10s a 25s de caída
      const animationDelay = Math.random() * 10; // 0s a 10s de retraso inicial
      const size = 1 + Math.random() * 2; // 1rem a 3rem
      const colorClass = Math.random() > 0.5 ? 'text-ayni-300' : 'text-emerald-400';
      const isBlurred = Math.random() > 0.5;
      
      return {
        id: i,
        left: `${left}%`,
        animationDuration: `${animationDuration}s`,
        animationDelay: `${animationDelay}s`,
        width: `${size}rem`,
        height: `${size}rem`,
        colorClass,
        filter: isBlurred ? 'blur(2px)' : 'none',
        opacity: 0.3 + Math.random() * 0.5,
      };
    });
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className={`absolute -top-10 animate-leaf-fall ${leaf.colorClass}`}
          style={{
            left: leaf.left,
            width: leaf.width,
            height: leaf.height,
            animationDuration: leaf.animationDuration,
            animationDelay: leaf.animationDelay,
            filter: leaf.filter,
            opacity: leaf.opacity,
          }}
        >
          <div className="w-full h-full animate-leaf-sway" style={{ animationDuration: '3s', animationDelay: leaf.animationDelay }}>
            {LEAF_SVG}
          </div>
        </div>
      ))}
    </div>
  );
}
