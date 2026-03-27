import { useEffect, useRef } from 'react';

export default function CircuitGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let frame = 0;
    const pulses = [];
    let visible = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStatic(); // redraw static grid on resize
    };

    const GRID = 60;
    const PULSE_COLOR = 'rgba(0,255,136,';

    // Pre-render the static grid to an offscreen canvas
    let staticCanvas = null;
    const drawStatic = () => {
      staticCanvas = document.createElement('canvas');
      staticCanvas.width = canvas.width;
      staticCanvas.height = canvas.height;
      const sctx = staticCanvas.getContext('2d');

      sctx.strokeStyle = 'rgba(0,255,136,0.025)';
      sctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += GRID) {
        sctx.beginPath(); sctx.moveTo(x, 0); sctx.lineTo(x, canvas.height); sctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += GRID) {
        sctx.beginPath(); sctx.moveTo(0, y); sctx.lineTo(canvas.width, y); sctx.stroke();
      }

      sctx.fillStyle = 'rgba(0,255,136,0.05)';
      for (let x = 0; x < canvas.width; x += GRID) {
        for (let y = 0; y < canvas.height; y += GRID) {
          sctx.beginPath(); sctx.arc(x, y, 1, 0, Math.PI * 2); sctx.fill();
        }
      }
    };

    const spawnPulse = () => {
      const horizontal = Math.random() > 0.5;
      if (horizontal) {
        const row = Math.floor(Math.random() * (canvas.height / GRID)) * GRID;
        pulses.push({ x: 0, y: row, dx: 3 + Math.random() * 2, dy: 0, life: 1 });
      } else {
        const col = Math.floor(Math.random() * (canvas.width / GRID)) * GRID;
        pulses.push({ x: col, y: 0, dx: 0, dy: 3 + Math.random() * 2, life: 1 });
      }
    };

    // Visibility observer — pause when off-screen
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(canvas);

    const draw = () => {
      frame++;
      animId = requestAnimationFrame(draw);

      if (!visible) return; // skip rendering when off-screen

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Blit pre-rendered static grid
      if (staticCanvas) ctx.drawImage(staticCanvas, 0, 0);

      // Data pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const len = 80;
        const isH = p.dy === 0;
        const grad = isH
          ? ctx.createLinearGradient(p.x - len, p.y, p.x, p.y)
          : ctx.createLinearGradient(p.x, p.y - len, p.x, p.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, `${PULSE_COLOR}${0.06 * p.life})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (isH) { ctx.moveTo(p.x - len, p.y); ctx.lineTo(p.x, p.y); }
        else { ctx.moveTo(p.x, p.y - len); ctx.lineTo(p.x, p.y); }
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `${PULSE_COLOR}${0.15 * p.life})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        if (p.x > canvas.width + 100 || p.y > canvas.height + 100) p.life = 0;
        if (p.life <= 0) pulses.splice(i, 1);
      }

      if (frame % 180 === 0) spawnPulse();
    };

    resize();
    window.addEventListener('resize', resize);
    spawnPulse();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
