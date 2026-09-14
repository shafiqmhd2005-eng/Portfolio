import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hover on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.interactive-target') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    // Lerp loop
    const animate = () => {
      const ease = 0.22;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      setPos({
        x: currentPos.current.x,
        y: currentPos.current.y
      });

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Targeting Reticle */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out flex items-center justify-center rounded-full border ${
          isHovered
            ? 'w-12 h-12 border-cyan-400 bg-cyan-500/10 shadow-neon-cyan'
            : isClicking
            ? 'w-6 h-6 border-violet-400 bg-violet-500/20'
            : 'w-8 h-8 border-cyan-400/40'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      >
        {/* Reticle tick marks */}
        <span className={`absolute top-0 w-1 h-1 bg-cyan-400 -translate-y-1/2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-30'}`} />
        <span className={`absolute bottom-0 w-1 h-1 bg-cyan-400 translate-y-1/2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-30'}`} />
        <span className={`absolute left-0 w-1 h-1 bg-cyan-400 -translate-x-1/2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-30'}`} />
        <span className={`absolute right-0 w-1 h-1 bg-cyan-400 translate-x-1/2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-30'}`} />

        {/* Small label on lock */}
        {isHovered && (
          <span className="absolute -top-4 text-[8px] font-mono tracking-widest text-cyan-300 font-bold bg-space-900/80 px-1 rounded">
            LOCKED
          </span>
        )}
      </div>

      {/* Center pinpoint */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ${
          isHovered ? 'w-1.5 h-1.5 bg-cyan-300 shadow-[0_0_8px_#00e5ff]' : 'w-1 h-1 bg-cyan-400'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
    </div>
  );
}
