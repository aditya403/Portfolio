import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let visible = true;

    const STAR_COUNT = 350;
    const stars = [];
    const shootingStars = [];
    let shootTimer = 0;

    // Distant planets — subtle, tiny, realistic
    const planets = [
      { x: 0.08, y: 0.20, r: 4, color: [100, 180, 255], hasRing: true },
      { x: 0.90, y: 0.14, r: 3, color: [255, 200, 140] },
      { x: 0.78, y: 0.72, r: 6, color: [200, 140, 180], hasRing: true },
      { x: 0.14, y: 0.80, r: 2.5, color: [140, 255, 200] },
      { x: 0.55, y: 0.08, r: 3.5, color: [255, 160, 100] },
    ];

    // Gravitational lensing / black holes — just distortion halos
    const blackHoles = [
      { x: 0.45, y: 0.38, r: 16 },
      { x: 0.88, y: 0.55, r: 10 },
    ];

    // Nebula clouds
    const nebulae = [
      { x: 0.22, y: 0.30, r: 200, color: [0, 255, 136], opacity: 0.012 },
      { x: 0.80, y: 0.20, r: 180, color: [0, 212, 255], opacity: 0.010 },
      { x: 0.50, y: 0.85, r: 220, color: [255, 51, 102], opacity: 0.008 },
      { x: 0.10, y: 0.65, r: 140, color: [255, 170, 0], opacity: 0.008 },
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.4 + 0.2,
          alpha: Math.random() * 0.5 + 0.15,
          speed: Math.random() * 1.2 + 0.3,
          phase: Math.random() * Math.PI * 2,
          depth: Math.random(),
          color: Math.random() > 0.9
            ? (Math.random() > 0.5 ? '180,255,200' : '160,220,255')
            : '255,255,255',
        });
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(canvas);

    let time = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      if (!visible) return;
      time += 0.016;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Slow global drift
      const driftX = Math.sin(time * 0.015) * 6;
      const driftY = Math.cos(time * 0.012) * 4;

      // Nebulae — very subtle color clouds
      for (const n of nebulae) {
        const nx = n.x * canvas.width + driftX * 0.3;
        const ny = n.y * canvas.height + driftY * 0.3;
        const breathe = 1 + Math.sin(time * 0.15 + n.x * 8) * 0.08;
        const rad = n.r * breathe;
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, rad);
        const [r, g, b] = n.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},${n.opacity * 1.3})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${n.opacity * 0.6})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(nx - rad, ny - rad, rad * 2, rad * 2);
      }

      // Stars with parallax drift + twinkle
      for (const s of stars) {
        const parallax = 0.2 + s.depth * 0.8;
        const sx = s.x + driftX * parallax;
        const sy = s.y + driftY * parallax;
        const twinkle = 0.4 + 0.6 * Math.sin(time * s.speed + s.phase);
        const a = s.alpha * twinkle;

        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${a})`;
        ctx.fill();

        // Subtle halo on brighter stars
        if (s.size > 1.0 && a > 0.3) {
          ctx.beginPath();
          ctx.arc(sx, sy, s.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color},${a * 0.04})`;
          ctx.fill();
        }
      }

      // Distant planets — tiny spheres with subtle shading
      for (const p of planets) {
        const px = p.x * canvas.width + driftX * 0.25;
        const py = p.y * canvas.height + driftY * 0.25;
        const [r, g, b] = p.color;

        // Planet body — tiny lit sphere
        const grad = ctx.createRadialGradient(
          px - p.r * 0.3, py - p.r * 0.3, p.r * 0.1,
          px + p.r * 0.2, py + p.r * 0.2, p.r
        );
        grad.addColorStop(0, `rgba(${Math.min(255, r + 40)},${Math.min(255, g + 40)},${Math.min(255, b + 40)},0.7)`);
        grad.addColorStop(0.7, `rgba(${r},${g},${b},0.5)`);
        grad.addColorStop(1, `rgba(${r >> 1},${g >> 1},${b >> 1},0.3)`);
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Faint atmosphere
        const atm = ctx.createRadialGradient(px, py, p.r, px, py, p.r * 2.5);
        atm.addColorStop(0, `rgba(${r},${g},${b},0.08)`);
        atm.addColorStop(1, 'transparent');
        ctx.fillStyle = atm;
        ctx.beginPath();
        ctx.arc(px, py, p.r * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Ring — thin ellipse
        if (p.hasRing) {
          ctx.save();
          ctx.translate(px, py);
          ctx.scale(1, 0.3);
          ctx.strokeStyle = `rgba(${r},${g},${b},0.15)`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 2.2, p.r * 2.2, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // Black holes — dark voids with faint accretion glow
      for (const bh of blackHoles) {
        const bx = bh.x * canvas.width + driftX * 0.15;
        const by = bh.y * canvas.height + driftY * 0.15;
        const pulse = 1 + Math.sin(time * 0.4) * 0.05;
        const r = bh.r * pulse;

        // Accretion glow — very faint warm ring
        ctx.save();
        ctx.translate(bx, by);
        ctx.scale(1, 0.3);
        ctx.rotate(time * 0.05);
        for (let ring = 0; ring < 3; ring++) {
          const rr = r * (1.5 + ring * 0.4);
          const opacity = 0.025 - ring * 0.006;
          const grad = ctx.createRadialGradient(0, 0, rr * 0.6, 0, 0, rr);
          grad.addColorStop(0, 'transparent');
          grad.addColorStop(0.6, `rgba(255,180,80,${opacity})`);
          grad.addColorStop(0.8, `rgba(255,120,40,${opacity * 0.5})`);
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.fillRect(-rr, -rr, rr * 2, rr * 2);
        }
        ctx.restore();

        // Dark center
        const dark = ctx.createRadialGradient(bx, by, 0, bx, by, r * 0.8);
        dark.addColorStop(0, 'rgba(0,0,0,0.9)');
        dark.addColorStop(0.6, 'rgba(0,0,0,0.5)');
        dark.addColorStop(1, 'transparent');
        ctx.fillStyle = dark;
        ctx.beginPath();
        ctx.arc(bx, by, r * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Photon ring — hairline bright edge
        ctx.strokeStyle = `rgba(255,200,120,${0.06 + Math.sin(time * 1.5) * 0.02})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.arc(bx, by, r * 0.85, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Shooting stars
      shootTimer += 0.016;
      if (shootTimer > 6 + Math.random() * 10) {
        shootTimer = 0;
        shootingStars.push({
          x: Math.random() * canvas.width * 0.7,
          y: Math.random() * canvas.height * 0.3,
          vx: 4 + Math.random() * 2,
          vy: 1.5 + Math.random() * 1,
          life: 1,
          len: 60 + Math.random() * 50,
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx; ss.y += ss.vy; ss.life -= 0.015;
        if (ss.life <= 0) { shootingStars.splice(i, 1); continue; }
        const grad = ctx.createLinearGradient(
          ss.x - ss.vx * ss.len * 0.25, ss.y - ss.vy * ss.len * 0.25, ss.x, ss.y
        );
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, `rgba(255,255,255,${ss.life * 0.35})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(ss.x - ss.vx * ss.len * 0.25, ss.y - ss.vy * ss.len * 0.25);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();
      }
    };

    resize();
    window.addEventListener('resize', resize);
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
