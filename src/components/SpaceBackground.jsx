import React, { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Star layers for 3D parallax depth
    const starCount = 180;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.2, // speed and size factor
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.3,
      alphaSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      hue: Math.random() > 0.7 ? 190 : Math.random() > 0.4 ? 260 : 210 // cyan, purple, cold blue
    }));

    // Draw loop
    const render = () => {
      ctx.fillStyle = '#02040a';
      ctx.fillRect(0, 0, width, height);

      // Subtle radial nebula gradients in corners
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 20, width * 0.2, height * 0.3, width * 0.5);
      grad1.addColorStop(0, 'rgba(14, 40, 75, 0.25)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 40, width * 0.8, height * 0.7, width * 0.5);
      grad2.addColorStop(0, 'rgba(88, 28, 135, 0.15)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        // Twinkle
        star.alpha += star.alphaSpeed;
        if (star.alpha <= 0.2 || star.alpha >= 0.9) {
          star.alphaSpeed = -star.alphaSpeed;
        }

        // Slow drift
        star.y -= star.z * 0.18;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * star.z, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 85%, 75%, ${star.alpha})`;
        ctx.shadowBlur = star.radius * 4;
        ctx.shadowColor = `hsla(${star.hue}, 100%, 70%, 0.8)`;
        ctx.fill();
      }

      // Reset shadow blur
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90"
      style={{ display: 'block' }}
    />
  );
}
