# Cinematic Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio from a "Midnight Emerald" theme into a cinematic "Obsidian Neon" scroll-driven experience with terminal boot hero, scroll-synced brain video, and dramatic section transitions.

**Architecture:** Full rewrite of every section component against a new color palette (#0a0a0a bg, #00ff88 primary, #00d4ff secondary, #ff3366 accent). New utility components (CircuitGrid, ParticleCursor, GlitchText, ScrollVideo, TerminalBoot) replace old ones. Brain animation video is scroll-synced via `useMotionValueEvent`. All animations use `useMotionValue`/`useSpring` for zero re-renders.

**Tech Stack:** React 19, Vite 8, Tailwind v4, Framer Motion, Canvas 2D, HTML5 Video API

**Spec:** `docs/superpowers/specs/2026-03-26-cinematic-portfolio-redesign.md`

---

### Task 1: Recolor index.css to Obsidian Neon palette

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace all emerald/cyan/amber colors with Obsidian Neon palette**

Replace every color token in `src/index.css`:
- `#030712` → `#0a0a0a` (background)
- `#10b981` → `#00ff88` (primary neon green)
- `#34d399` → `#00ff88` (primary light → same neon green)
- `#06b6d4` → `#00d4ff` (secondary cyan)
- `#0ea5e9` → `#00d4ff` (secondary → same cyan)
- `#f59e0b` → `#ffaa00` (warm amber)
- `#f1f5f9` → `#e8e8e8` (text)
- `#a7f3d0` → `#00ff88` (pill color)
- `#6ee7b7` → `#00ff88` (tech-tag color)
- `rgba(16,185,129,*)` → `rgba(0,255,136,*)` (all glow/border emerald refs)
- `rgba(241,245,249,*)` → `rgba(232,232,232,*)` (text refs)

Update `.g-text` gradient: `linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #ff3366 100%)`

Update `.stat-num` gradient: `linear-gradient(135deg, #00ff88, #00d4ff)`

Update `.btn-primary` gradient: `linear-gradient(135deg, #00ff88, #00d4ff)`

Update scrollbar thumb: `linear-gradient(#00ff88, #00d4ff)`

Update `.hero-grid` to use `rgba(0,255,136,0.04)`

Add new keyframe for neon skeleton:
```css
@keyframes neonPulse {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.12; }
}
.skeleton {
  background: rgba(0,255,136,0.04);
  animation: neonPulse 1.5s ease-in-out infinite;
  border-radius: 8px;
}
```

Add CRT flicker keyframe:
```css
@keyframes crtFlicker {
  0% { opacity: 0; }
  5% { opacity: 0.8; }
  10% { opacity: 0.2; }
  15% { opacity: 0.9; }
  20% { opacity: 0; }
  100% { opacity: 0; }
}
```

Add breathing glow keyframe:
```css
@keyframes breatheGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(0,255,136,0.3); }
  50% { box-shadow: 0 0 40px rgba(0,255,136,0.6), 0 0 80px rgba(0,255,136,0.2); }
}
```

Add scanline keyframe:
```css
@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
```

Add electric surge keyframe:
```css
@keyframes electricSurge {
  0% { clip-path: inset(0 100% 0 0); opacity: 1; }
  100% { clip-path: inset(0 0 0 0); opacity: 0; }
}
```

- [ ] **Step 2: Update portfolio.js skill colors**

In `src/data/portfolio.js`, update skill category colors:
```js
export const skills = [
  { category: 'Languages', color: '#00ff88', items: [...] },
  { category: 'Automation', color: '#00d4ff', items: [...] },
  { category: 'Platforms', color: '#ffaa00', items: [...] },
  { category: 'Dev Tools', color: '#ff3366', items: [...] },
  { category: 'Cloud & Containers', color: '#00d4ff', items: [...] },
  { category: 'Other', color: '#00ff88', items: [...] },
];
```

- [ ] **Step 3: Build test**

Run: `npx vite build`
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/data/portfolio.js
git commit -m "style: recolor entire palette to Obsidian Neon theme"
```

---

### Task 2: Create GlitchText component

**Files:**
- Create: `src/components/GlitchText.jsx`
- Delete: `src/components/TextScramble.jsx`

- [ ] **Step 1: Create GlitchText.jsx**

```jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEF';

export default function GlitchText({
  text,
  trigger = 'inView',
  speed = 30,
  className = '',
  style = {},
  as: Tag = 'span',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-100px', once: true });
  const [display, setDisplay] = useState('');
  const hasRun = useRef(false);

  const scramble = useCallback(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    let iteration = 0;
    const len = text.length;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('')
      );
      iteration += 1 / 2;
      if (iteration >= len) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    if (trigger === 'inView' && inView) scramble();
    else if (trigger === true) scramble();
  }, [inView, trigger, scramble]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ fontFamily: "'JetBrains Mono', monospace", ...style }}
    >
      {display || (trigger === 'inView' ? '\u00A0'.repeat(text.length) : text)}
    </Tag>
  );
}
```

- [ ] **Step 2: Delete TextScramble.jsx**

```bash
rm src/components/TextScramble.jsx
```

- [ ] **Step 3: Build test**

Run: `npx vite build`
Expected: Build may fail if TextScramble is imported elsewhere — will fix in section rewrites.

- [ ] **Step 4: Commit**

```bash
git add src/components/GlitchText.jsx
git commit -m "feat: add GlitchText component replacing TextScramble"
```

---

### Task 3: Create ParticleCursor component

**Files:**
- Create: `src/components/ParticleCursor.jsx`
- Delete: `src/components/Cursor.jsx`

- [ ] **Step 1: Create ParticleCursor.jsx**

```jsx
import { useEffect, useRef, useState } from 'react';

const POOL_SIZE = 8;
const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

export default function ParticleCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const particles = useRef([]);
  const particleIdx = useRef(0);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!canHover) return;

    // Create particle pool
    const pool = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed; top: 0; left: 0; z-index: 99998;
        width: 3px; height: 3px; border-radius: 50%;
        background: #00ff88; pointer-events: none;
        opacity: 0; transition: opacity 0.3s;
      `;
      document.body.appendChild(el);
      pool.push(el);
    }
    particles.current = pool;

    let lastX = -100, lastY = -100;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      // Spawn particle if moved enough
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 12) {
        const p = pool[particleIdx.current % POOL_SIZE];
        p.style.left = `${e.clientX - 1.5}px`;
        p.style.top = `${e.clientY - 1.5}px`;
        p.style.opacity = '0.6';
        setTimeout(() => { p.style.opacity = '0'; }, 50);
        particleIdx.current++;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      requestAnimationFrame(animate);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    const interactables = document.querySelectorAll('a,button,[role="button"],input,textarea,[draggable]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
      pool.forEach(el => el.remove());
    };
  }, []);

  if (!canHover) return null;

  const ringSize = hovered ? 56 : clicked ? 12 : 40;

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          width: ringSize, height: ringSize,
          border: `1.5px solid ${hovered ? 'rgba(255,51,102,0.8)' : 'rgba(0,255,136,0.4)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'width 0.25s, height 0.25s, border-color 0.25s',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          width: clicked ? 4 : 8, height: clicked ? 4 : 8,
          background: hovered ? '#ff3366' : '#00ff88',
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'background 0.2s, width 0.15s, height 0.15s',
          boxShadow: `0 0 ${hovered ? 14 : 8}px ${hovered ? '#ff3366' : '#00ff88'}`,
        }}
      />
    </>
  );
}
```

- [ ] **Step 2: Delete Cursor.jsx**

```bash
rm src/components/Cursor.jsx
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ParticleCursor.jsx
git commit -m "feat: add ParticleCursor with neon trail, replace old Cursor"
```

---

### Task 4: Create CircuitGrid background

**Files:**
- Create: `src/components/CircuitGrid.jsx`
- Delete: `src/components/StarCanvas.jsx`

- [ ] **Step 1: Create CircuitGrid.jsx**

```jsx
import { useEffect, useRef } from 'react';

export default function CircuitGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let frame = 0;
    const pulses = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const GRID = 60;
    const PULSE_COLOR = 'rgba(0,255,136,';

    const spawnPulse = () => {
      const horizontal = Math.random() > 0.5;
      if (horizontal) {
        const row = Math.floor(Math.random() * (canvas.height / GRID)) * GRID;
        pulses.push({
          x: 0, y: row,
          dx: 3 + Math.random() * 2, dy: 0,
          life: 1, horizontal: true,
        });
      } else {
        const col = Math.floor(Math.random() * (canvas.width / GRID)) * GRID;
        pulses.push({
          x: col, y: 0,
          dx: 0, dy: 3 + Math.random() * 2,
          life: 1, horizontal: false,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Grid lines
      ctx.strokeStyle = 'rgba(0,255,136,0.03)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += GRID) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += GRID) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Grid intersections — small dots
      ctx.fillStyle = 'rgba(0,255,136,0.06)';
      for (let x = 0; x < canvas.width; x += GRID) {
        for (let y = 0; y < canvas.height; y += GRID) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Data pulses
      pulses.forEach(p => {
        const len = 80;
        const grad = p.horizontal
          ? ctx.createLinearGradient(p.x - len, p.y, p.x, p.y)
          : ctx.createLinearGradient(p.x, p.y - len, p.x, p.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, `${PULSE_COLOR}${0.06 * p.life})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (p.horizontal) {
          ctx.moveTo(p.x - len, p.y);
          ctx.lineTo(p.x, p.y);
        } else {
          ctx.moveTo(p.x, p.y - len);
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `${PULSE_COLOR}${0.15 * p.life})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x > canvas.width + 100 || p.y > canvas.height + 100) {
          p.life = 0;
        }
      });

      // Remove dead pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        if (pulses[i].life <= 0) pulses.splice(i, 1);
      }

      // Spawn new pulse every ~180 frames (~3s at 60fps)
      if (frame % 180 === 0) spawnPulse();

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    spawnPulse();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  );
}
```

- [ ] **Step 2: Delete StarCanvas.jsx**

```bash
rm src/components/StarCanvas.jsx
```

- [ ] **Step 3: Commit**

```bash
git add src/components/CircuitGrid.jsx
git commit -m "feat: add CircuitGrid background with data pulses, replace StarCanvas"
```

---

### Task 5: Create TerminalBoot component

**Files:**
- Create: `src/components/TerminalBoot.jsx`

- [ ] **Step 1: Create TerminalBoot.jsx**

```jsx
import { useState, useEffect, useRef } from 'react';

const LINES = [
  '> initializing portfolio...',
  '> loading engineer: ADITYA MISHRA',
  '> status: READY',
];
const CHAR_SPEED = 40;

export default function TerminalBoot({ onComplete }) {
  const [phase, setPhase] = useState('flicker'); // flicker → typing → done
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // CRT flicker
  useEffect(() => {
    if (phase !== 'flicker') return;
    const t = setTimeout(() => setPhase('typing'), 600);
    return () => clearTimeout(t);
  }, [phase]);

  // Typing
  useEffect(() => {
    if (phase !== 'typing') return;
    if (lineIdx >= LINES.length) {
      setPhase('done');
      setTimeout(() => onComplete?.(), 400);
      return;
    }

    const line = LINES[lineIdx];
    if (charIdx <= line.length) {
      const t = setTimeout(() => {
        setCurrentLine(line.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, CHAR_SPEED);
      return () => clearTimeout(t);
    } else {
      setLines(prev => [...prev, line]);
      setCurrentLine('');
      setLineIdx(l => l + 1);
      setCharIdx(0);
    }
  }, [phase, lineIdx, charIdx, onComplete]);

  // Blink cursor
  useEffect(() => {
    const i = setInterval(() => setShowCursor(c => !c), 500);
    return () => clearInterval(i);
  }, []);

  if (phase === 'flicker') {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: '#0a0a0a',
        animation: 'crtFlicker 0.6s ease forwards',
      }} />
    );
  }

  if (phase === 'done') return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(14px, 2vw, 18px)',
        color: '#00ff88',
        maxWidth: 600,
        padding: 32,
      }}>
        {lines.map((l, i) => (
          <div key={i} style={{ marginBottom: 8, opacity: 0.6 }}>{l}</div>
        ))}
        <div>
          {currentLine}
          <span style={{
            opacity: showCursor ? 1 : 0,
            transition: 'opacity 0.1s',
            color: '#00ff88',
          }}>_</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TerminalBoot.jsx
git commit -m "feat: add TerminalBoot component for hero boot sequence"
```

---

### Task 6: Create ScrollVideo and SkillOverlay components

**Files:**
- Create: `src/components/ScrollVideo.jsx`
- Create: `src/components/SkillOverlay.jsx`
- Delete: `src/components/SkillNetwork.jsx`

- [ ] **Step 1: Create ScrollVideo.jsx**

```jsx
import { useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export default function ScrollVideo({ src, sectionRef, style }) {
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const video = videoRef.current;
    if (video && video.duration) {
      video.currentTime = v * video.duration;
    }
  });

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      style={{
        width: '100%',
        maxWidth: 600,
        borderRadius: 16,
        filter: 'drop-shadow(0 0 40px rgba(0,255,136,0.3)) drop-shadow(0 0 80px rgba(0,255,136,0.1))',
        ...style,
      }}
    />
  );
}
```

- [ ] **Step 2: Create SkillOverlay.jsx**

```jsx
import { motion, useTransform } from 'framer-motion';
import { skills } from '../data/portfolio';

const POSITIONS = [
  { side: 'left', top: '20%' },   // Languages 0-20%
  { side: 'right', top: '30%' },  // Automation 20-40%
  { side: 'left', top: '65%' },   // Platforms 40-60%
  { side: 'right', top: '15%' },  // Dev Tools 60-80%
  { side: 'left', top: '45%' },   // Cloud 60-80%
  { side: 'right', top: '55%' },  // Other 80-100%
];

const PHASE_RANGES = [
  [0, 0.2],   // Languages
  [0.2, 0.4], // Automation
  [0.4, 0.6], // Platforms
  [0.6, 0.8], // Dev Tools
  [0.6, 0.8], // Cloud (same phase as Dev Tools)
  [0.8, 1.0], // Other
];

function SkillGroup({ category, items, color, position, scrollProgress, phaseRange }) {
  const opacity = useTransform(
    scrollProgress,
    [phaseRange[0] - 0.05, phaseRange[0], phaseRange[1], phaseRange[1] + 0.15],
    [0, 1, 1, phaseRange[1] >= 0.8 ? 1 : 0.3]
  );

  const x = useTransform(
    scrollProgress,
    [phaseRange[0] - 0.05, phaseRange[0]],
    [position.side === 'left' ? -40 : 40, 0]
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        [position.side]: '5%',
        top: position.top,
        opacity,
        x,
        maxWidth: 200,
      }}
    >
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: 3,
        textTransform: 'uppercase', color: color, marginBottom: 10,
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {category}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map(item => (
          <div
            key={item}
            style={{
              padding: '6px 14px',
              borderRadius: 50,
              fontSize: 12,
              fontWeight: 500,
              color: '#e8e8e8',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${color}33`,
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.borderColor = `${color}88`;
              e.currentTarget.style.background = `${color}18`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = `${color}33`;
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillOverlay({ scrollProgress }) {
  return (
    <>
      {skills.map((cat, i) => (
        <SkillGroup
          key={cat.category}
          category={cat.category}
          items={cat.items}
          color={cat.color}
          position={POSITIONS[i]}
          scrollProgress={scrollProgress}
          phaseRange={PHASE_RANGES[i]}
        />
      ))}
    </>
  );
}
```

- [ ] **Step 3: Delete SkillNetwork.jsx**

```bash
rm src/components/SkillNetwork.jsx
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ScrollVideo.jsx src/components/SkillOverlay.jsx
git commit -m "feat: add ScrollVideo and SkillOverlay for brain video skills section"
```

---

### Task 7: Create ScanlinePhoto component

**Files:**
- Create: `src/components/ScanlinePhoto.jsx`

- [ ] **Step 1: Create ScanlinePhoto.jsx**

```jsx
import { useState } from 'react';

export default function ScanlinePhoto({ src, alt, style }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 20,
        border: '1px solid rgba(0,255,136,0.2)',
        animation: 'breatheGlow 3s ease-in-out infinite',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
      />
      {/* Scanline */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 48%, rgba(0,255,136,0.08) 50%, transparent 52%)',
        backgroundSize: '100% 8px',
        pointerEvents: 'none',
        opacity: 0.5,
      }} />
      {/* Sweeping scan line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2,
        background: 'rgba(0,255,136,0.4)',
        boxShadow: '0 0 20px rgba(0,255,136,0.3)',
        animation: `scanline ${hovered ? '1.5s' : '4s'} linear infinite`,
        pointerEvents: 'none',
      }} />
      {/* SCANNING text on hover */}
      {hovered && (
        <div style={{
          position: 'absolute', top: 12, left: 12,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, fontWeight: 700, letterSpacing: 2,
          color: '#00ff88', textTransform: 'uppercase',
          animation: 'neonPulse 0.5s ease-in-out infinite',
        }}>
          SCANNING...
        </div>
      )}
      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.8) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ScanlinePhoto.jsx
git commit -m "feat: add ScanlinePhoto with scan-line overlay and hover effects"
```

---

### Task 8: Create SonarDot component

**Files:**
- Create: `src/components/SonarDot.jsx`

- [ ] **Step 1: Create SonarDot.jsx**

```jsx
import { motion } from 'framer-motion';

export default function SonarDot({ color = '#00ff88' }) {
  return (
    <div style={{ position: 'relative', width: 18, height: 18 }}>
      {/* Core dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          background: color,
          border: '3px solid #0a0a0a',
          boxShadow: `0 0 12px ${color}`,
        }}
      />
      {/* Sonar ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        whileInView={{ scale: 3, opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: `2px solid ${color}`,
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SonarDot.jsx
git commit -m "feat: add SonarDot with expanding ring pulse effect"
```

---

### Task 9: Update App.jsx — swap global components

**Files:**
- Modify: `src/App.jsx`
- Delete: `src/components/AstronautInteractive.jsx`

- [ ] **Step 1: Rewrite App.jsx**

```jsx
import { useState } from 'react';
import './index.css';
import ParticleCursor from './components/ParticleCursor';
import ScrollProgress from './components/ScrollProgress';
import CircuitGrid from './components/CircuitGrid';
import TerminalBoot from './components/TerminalBoot';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import BrainSkills from './components/BrainSkills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import LeetCode from './components/LeetCode';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div style={{ background: '#0a0a0a', width: '100%', minHeight: '100vh', position: 'relative' }}>
      {!booted && <TerminalBoot onComplete={() => setBooted(true)} />}

      <ParticleCursor />
      <ScrollProgress />
      <CircuitGrid />
      <Navbar />

      <main style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <Hero booted={booted} />
        <About />
        <BrainSkills />
        <Experience />
        <Projects />
        <LeetCode />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Update ScrollProgress.jsx**

Replace the gradient in `src/components/ScrollProgress.jsx`:
```jsx
background: 'linear-gradient(90deg, #00ff88, #00d4ff, #ff3366)',
```

- [ ] **Step 3: Recolor Navbar.jsx**

In `src/components/Navbar.jsx`, replace:
- `rgba(3,7,18,*)` → `rgba(10,10,10,*)`
- `rgba(16,185,129,*)` → `rgba(0,255,136,*)`
- `#10b981` → `#00ff88`
- `#06b6d4` → `#00d4ff`
- Logo `boxShadow` → `0 0 20px rgba(0,255,136,0.4)`

- [ ] **Step 4: Delete AstronautInteractive.jsx**

```bash
rm src/components/AstronautInteractive.jsx
```

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/components/ScrollProgress.jsx src/components/Navbar.jsx
git commit -m "feat: wire up new global components, remove astronaut"
```

---

### Task 10: Rewrite Hero.jsx — terminal boot + name explosion

**Files:**
- Modify: `src/components/Hero.jsx`

- [ ] **Step 1: Rewrite Hero.jsx**

```jsx
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, ArrowDown } from 'lucide-react';
import GlitchText from './GlitchText';
import OdometerNumber from './OdometerNumber';
import useMagnetic from '../hooks/useMagnetic';

function MagneticWrap({ children, strength = 0.3 }) {
  const { ref, x, y } = useMagnetic(strength);
  return <motion.div ref={ref} style={{ x, y, display: 'inline-block' }}>{children}</motion.div>;
}

export default function Hero({ booted }) {
  return (
    <section id="hero" style={{
      minHeight: '100vh', width: '100%', position: 'relative',
      display: 'flex', alignItems: 'center',
      padding: '80px 0 0', overflow: 'hidden',
    }}>
      <div className="hero-grid" />

      <div className="wrap" style={{ paddingTop: 60, paddingBottom: 80, width: '100%' }}>
        {/* Section marker */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={booted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>01 — Introduction</span>
          <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }}/>
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88' }}
          />
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>Open to work</span>
        </motion.div>

        {/* BIG name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={booted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 20 }}
        >
          <div className="display" style={{ fontSize: 'clamp(60px,10vw,120px)', letterSpacing: '-0.04em', lineHeight: 0.95, color: '#fff' }}>
            ADITYA
          </div>
          <div className="display g-text" style={{ fontSize: 'clamp(60px,10vw,120px)', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            MISHRA
          </div>
        </motion.div>

        {/* Role with glitch */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={booted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}
        >
          <div style={{ width: 40, height: 2, background: 'linear-gradient(90deg,#00ff88,#00d4ff)', borderRadius: 1, flexShrink: 0 }}/>
          <GlitchText
            text="NETWORK AUTOMATION ENGINEER"
            trigger={booted}
            speed={25}
            style={{ fontSize: 15, fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.5)' }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.9, maxWidth: 520, marginBottom: 40 }}
        >
          I build{' '}
          <span style={{ color: '#00ff88', fontWeight: 600 }}>high-impact automation</span> for
          enterprise networks — turning hours of manual ops into{' '}
          <span style={{ color: '#00d4ff', fontWeight: 600 }}>deterministic, zero-touch</span> pipelines.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}
        >
          <MagneticWrap strength={0.3}>
            <Link to="projects" smooth duration={500} offset={-70} className="btn-primary">
              <span>View my work <ArrowRight size={15}/></span>
            </Link>
          </MagneticWrap>
          <MagneticWrap strength={0.3}>
            <Link to="contact" smooth duration={500} offset={-70} className="btn-outline">
              Let's Talk
            </Link>
          </MagneticWrap>
        </motion.div>

        {/* Stats as system readouts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.0 }}
          style={{
            display: 'flex', gap: 20, flexWrap: 'wrap',
          }}
        >
          {[
            { num: '3', suffix: '+', label: 'YEARS' },
            { num: '3100', suffix: '+', label: 'HRS SAVED' },
            { num: '4', suffix: '', label: 'SYSTEMS' },
          ].map(({ num, suffix, label }) => (
            <div key={label} style={{
              padding: '16px 24px',
              border: '1px solid rgba(0,255,136,0.15)',
              borderRadius: 12,
              background: 'rgba(0,255,136,0.03)',
              minWidth: 120,
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 28, fontWeight: 700, color: '#00ff88',
                textShadow: '0 0 20px rgba(0,255,136,0.3)',
              }}>
                <OdometerNumber value={num} suffix={suffix} />
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={booted ? { opacity: 1 } : {}} transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
      >
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: 'rgba(0,255,136,0.3)', textTransform: 'uppercase' }}>scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={16} color="rgba(0,255,136,0.4)" />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: rewrite Hero with terminal boot + name explosion + system readout stats"
```

---

### Task 11: Rewrite About.jsx — holographic data cards

**Files:**
- Modify: `src/components/About.jsx`

- [ ] **Step 1: Rewrite About.jsx**

```jsx
import { motion } from 'framer-motion';
import { MapPin, Cpu, BookOpen, Atom } from 'lucide-react';
import { personal, interests } from '../data/portfolio';
import TiltCard from './TiltCard';
import OdometerNumber from './OdometerNumber';
import ScanlinePhoto from './ScanlinePhoto';

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 28, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

function StatRing({ value, suffix, label, color, max = 100 }) {
  const pct = (parseInt(value) / max) * 100;
  const r = 38;
  const circ = 2 * Math.PI * r;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width={90} height={90} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={45} cy={45} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={4} />
        <motion.circle
          cx={45} cy={45} r={r} fill="none" stroke={color} strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ - (circ * Math.min(pct, 100) / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div style={{ textAlign: 'center', marginTop: -62 }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: "'JetBrains Mono', monospace" }}>
          <OdometerNumber value={value} suffix={suffix} />
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 16 }}>{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" style={{ width: '100%', padding: '120px 0', position: 'relative' }}>
      <div className="wrap">
        <motion.div {...anim()}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>02 — About</span>
            <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }}/>
          </div>
          <h2 className="section-title">A little about myself</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: 16 }}>
          {/* Photo + Bio card */}
          <motion.div {...anim(0.05)} style={{ gridColumn: 'span 2' }}>
            <TiltCard maxTilt={8} className="card" style={{ padding: '32px', height: '100%' }}>
              <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <ScanlinePhoto
                  src="/aditya_image.jpeg"
                  alt="Aditya Mishra"
                  style={{ width: 180, height: 220, flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: 'rgba(255,255,255,0.2)', marginBottom: 14, textTransform: 'uppercase' }}>Background</div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: 14 }}>
                    {personal.summary}
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>
                    Beyond automation, I'm drawn to{' '}
                    <span style={{ color: '#00d4ff' }}>Quantum Physics</span> and{' '}
                    <span style={{ color: '#ffaa00' }}>mathematics</span> — the same love of elegant systems
                    that drives my engineering work.
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Location card */}
          <motion.div {...anim(0.1)}>
            <TiltCard maxTilt={8} className="card" style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <MapPin size={22} color="#00ff88" />
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>PUNE, INDIA</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 6px #00ff88' }}
                  />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: 'rgba(0,255,136,0.6)', fontFamily: "'JetBrains Mono', monospace" }}>OPEN TO REMOTE</span>
                </div>
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 4 }}>
                {['#00ff88','#00d4ff','#ff3366'].map((c, i) => (
                  <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: c, opacity: 0.3 + i * 0.2 }}/>
                ))}
              </div>
            </TiltCard>
          </motion.div>

          {/* Stats row */}
          {[
            { num: '3', suffix: '+', label: 'Years at FIS', icon: Cpu, color: '#00ff88', max: 10 },
            { num: '3100', suffix: '+', label: 'Hrs Saved / yr', icon: BookOpen, color: '#ffaa00', max: 5000 },
            { num: '4', suffix: '', label: 'Automation systems', icon: Atom, color: '#00d4ff', max: 10 },
          ].map(({ num, suffix, label, icon: Icon, color, max }, i) => (
            <motion.div key={label} {...anim(0.12 + i * 0.07)}>
              <TiltCard maxTilt={8} className="card" style={{ padding: '28px', textAlign: 'center' }}>
                <StatRing value={num} suffix={suffix} label={label} color={color} max={max} />
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Interests strip */}
        <motion.div {...anim(0.25)} className="card" style={{ marginTop: 16 }}>
          <div style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: 2, textTransform: 'uppercase', flexShrink: 0 }}>Interests</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {interests.map(item => (
                <motion.span
                  key={item}
                  className="pill"
                  style={{ fontSize: 12 }}
                  whileHover={{ scale: 1.05, opacity: [1, 0.4, 1, 0.4, 1] }}
                  transition={{ duration: 0.4 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.jsx
git commit -m "feat: rewrite About with ScanlinePhoto, stat rings, holographic cards"
```

---

### Task 12: Rewrite BrainSkills.jsx — scroll-synced video

**Files:**
- Modify: `src/components/BrainSkills.jsx`

- [ ] **Step 1: Rewrite BrainSkills.jsx**

```jsx
import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import GlitchText from './GlitchText';
import ScrollVideo from './ScrollVideo';
import SkillOverlay from './SkillOverlay';

export default function BrainSkills() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ width: '100%', height: '300vh', position: 'relative' }}
    >
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Section header */}
        <div style={{ position: 'absolute', top: 40, left: 0, right: 0, zIndex: 2 }}>
          <div className="wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>03 — Skills</span>
              <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }}/>
            </div>
            <h2 className="section-title">
              <GlitchText text="Skills & Tools" trigger="inView" speed={30} as="span" />
            </h2>
          </div>
        </div>

        {/* Vignette overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #0a0a0a 100%)',
        }} />

        {/* Brain video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 0 }}
        >
          <ScrollVideo
            src="/brain_animation_video.mp4"
            sectionRef={sectionRef}
          />
        </motion.div>

        {/* Skill overlays */}
        <SkillOverlay scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BrainSkills.jsx
git commit -m "feat: rewrite BrainSkills with scroll-synced brain video and phased skill overlays"
```

---

### Task 13: Rewrite Experience.jsx — sonar dots + large impact numbers

**Files:**
- Modify: `src/components/Experience.jsx`

- [ ] **Step 1: Rewrite Experience.jsx**

```jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience } from '../data/portfolio';
import TiltCard from './TiltCard';
import GlitchText from './GlitchText';
import OdometerNumber from './OdometerNumber';
import SonarDot from './SonarDot';
import ScrollVelocityText from './ScrollVelocityText';

function TimelineLine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 20%'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} style={{
      position: 'absolute', left: 18, top: 8, bottom: 8, width: 2,
      background: 'rgba(0,255,136,0.06)', borderRadius: 1,
    }}>
      <motion.div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '100%', transformOrigin: 'top',
        background: 'linear-gradient(to bottom, #00ff88 0%, rgba(0,255,136,0.1) 100%)',
        borderRadius: 1, scaleY,
      }} />
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" style={{ width: '100%', padding: '120px 0' }}>
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>04 — Work History</span>
            <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }}/>
          </div>
          <h2 className="section-title">
            <ScrollVelocityText>Experience</ScrollVelocityText>
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <TimelineLine />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {experience.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30, rotate: 3, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                style={{ paddingLeft: 56, position: 'relative' }}
              >
                {/* Sonar dot */}
                <div style={{ position: 'absolute', left: 10, top: 32 }}>
                  <SonarDot color="#00ff88" />
                </div>

                <TiltCard maxTilt={6} className="card" style={{ padding: '32px 36px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 6 }}>
                    <div>
                      <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>{job.role}</h3>
                      <span style={{ fontSize: 13, fontWeight: 700, display: 'inline-block' }}>
                        <GlitchText text={job.company} trigger="inView" speed={40} style={{ color: '#00ff88' }} />
                      </span>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{
                        fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 50, padding: '4px 14px', marginBottom: 6, display: 'inline-block',
                      }}>{job.period}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{job.location}</div>
                    </div>
                  </div>

                  {/* Impact callout */}
                  {job.highlights.some(h => h.includes('hours')) && (
                    <div style={{
                      margin: '16px 0 20px', padding: '18px 24px', borderRadius: 12,
                      background: 'rgba(0,255,136,0.04)',
                      border: '1px solid rgba(0,255,136,0.1)',
                      backgroundImage: 'linear-gradient(rgba(0,255,136,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.02) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: 'rgba(0,255,136,0.4)', marginBottom: 10, textTransform: 'uppercase' }}>ANNUAL IMPACT</div>
                      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                        {job.highlights
                          .filter(h => /\d+\+?\s*(?:engineering\s*)?hours?/i.test(h))
                          .flatMap(h => h.match(/[\d,]+\+?\s*(?:engineering\s*)?hours?/gi) || [])
                          .slice(0, 3)
                          .map((metric, m) => (
                            <span key={m} style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 28, fontWeight: 900, color: '#00ff88',
                              textShadow: '0 0 20px rgba(0,255,136,0.3)',
                            }}>
                              {metric}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                    {job.highlights.map((pt, j) => (
                      <li key={j} style={{ display: 'flex', gap: 12, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                        <span style={{ color: '#00ff88', marginTop: 4, flexShrink: 0, fontWeight: 900 }}>›</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {job.techStack.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Experience.jsx
git commit -m "feat: rewrite Experience with sonar dots, glitch company names, large impact numbers"
```

---

### Task 14: Rewrite Projects.jsx — glitch entries + terminal header

**Files:**
- Modify: `src/components/Projects.jsx`

- [ ] **Step 1: Rewrite Projects.jsx**

```jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { personal } from '../data/portfolio';
import TiltCard from './TiltCard';
import GlitchText from './GlitchText';

const langColor = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
  Java: '#b07219', Groovy: '#4298b8', Shell: '#89e051',
  CSS: '#563d7c', HTML: '#e34c26', Go: '#00ADD8',
};

const accentColors = ['#00ff88', '#00d4ff', '#ffaa00', '#ff3366', '#00d4ff', '#00ff88'];

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${personal.githubUsername}/repos?sort=updated&per_page=6`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { setRepos(d.filter(r => !r.fork).slice(0, 6)); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <section id="projects" style={{ width: '100%', padding: '120px 0', position: 'relative' }}>
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>05 — Open Source</span>
            <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 56 }}>
            <h2 className="section-title">
              <GlitchText text="GitHub Projects" trigger="inView" speed={35} as="span" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }} />
            </h2>
            <a href={personal.github} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 50,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600, textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,136,0.4)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            >
              <GithubIcon size={14}/> View all <ArrowUpRight size={13}/>
            </a>
          </div>
        </motion.div>

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(0,255,136,0.06)' }}>
                <div style={{ height: 8, background: 'rgba(0,255,136,0.04)', animation: 'neonPulse 1.5s ease-in-out infinite' }}/>
                <div style={{ padding: 28 }}>
                  <div className="skeleton" style={{ height: 18, width: '55%', marginBottom: 16 }}/>
                  <div className="skeleton" style={{ height: 13, width: '90%', marginBottom: 8 }}/>
                  <div className="skeleton" style={{ height: 13, width: '70%' }}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="card" style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
            <p style={{ marginBottom: 16 }}>Could not load repositories.</p>
            <a href={personal.github} target="_blank" rel="noopener noreferrer"
              style={{ color: '#00ff88', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <GithubIcon size={16}/> View on GitHub
            </a>
          </div>
        )}

        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
            {repos.map((repo, i) => {
              const accent = accentColors[i % accentColors.length];
              return (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 40, skewX: 8 }}
                  whileInView={{ opacity: 1, y: 0, skewX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TiltCard maxTilt={10}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                      className="project-card card-shine"
                      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}
                    >
                      <div style={{ height: 8, width: '100%', background: accent }}/>
                      <div style={{ padding: '24px 26px 26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                              width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                              background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 12, fontWeight: 800, color: '#0a0a0a',
                            }}>
                              {String(i + 1).padStart(2, '0')}
                            </div>
                            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{repo.name}</span>
                          </div>
                          <ExternalLink size={14} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0, marginTop: 3 }}/>
                        </div>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, flex: 1, marginBottom: 20 }}>
                          {repo.description || 'A project on GitHub — click to explore.'}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
                            {repo.language && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <span style={{ width: 9, height: 9, borderRadius: '50%', background: langColor[repo.language] || '#94a3b8', display: 'inline-block' }}/>
                                {repo.language}
                              </span>
                            )}
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star size={12}/> {repo.stargazers_count}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><GitFork size={12}/> {repo.forks_count}</span>
                          </div>
                          <div className="card-reveal" style={{
                            fontSize: 11, fontWeight: 700, color: accent,
                            display: 'flex', alignItems: 'center', gap: 4, letterSpacing: 0.5,
                          }}>
                            VIEW <ArrowUpRight size={11}/>
                          </div>
                        </div>
                      </div>
                    </a>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects.jsx
git commit -m "feat: rewrite Projects with glitch entry, terminal header, neon skeletons"
```

---

### Task 15: Rewrite LeetCode.jsx — achievement dashboard

**Files:**
- Modify: `src/components/LeetCode.jsx`

- [ ] **Step 1: Rewrite LeetCode.jsx**

```jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Trophy, Target, CheckCircle } from 'lucide-react';
import { personal } from '../data/portfolio';
import TiltCard from './TiltCard';
import OdometerNumber from './OdometerNumber';

function GlowRing({ solved, total, color, label, size = 100 }) {
  const pct = total > 0 ? (solved / total) * 100 : 0;
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flex: 1 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={5} />
          <motion.circle
            cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ - (circ * pct / 100) }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: color, fontFamily: "'JetBrains Mono', monospace" }}>{solved}</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>/ {total}</span>
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{label}</div>
    </div>
  );
}

export default function LeetCode() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://leetcode-stats-api.herokuapp.com/${personal.leetcodeUsername}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { if (d.status === 'error') throw new Error(); setStats(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const StatCard = ({ label, value, Icon, color }) => (
    <TiltCard maxTilt={8} className="card" style={{
      padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 14,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${color}15`, border: `1px solid ${color}30`,
      }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <div style={{
          fontSize: 28, fontWeight: 900, color: '#fff',
          fontFamily: "'JetBrains Mono', monospace", marginBottom: 4,
        }}>
          {value != null ? (
            typeof value === 'string' && value.startsWith('#')
              ? <><span style={{ fontSize: 18, opacity: 0.5 }}>#</span><OdometerNumber value={value.replace(/[#,]/g, '')} /></>
              : typeof value === 'string' && value.endsWith('%')
                ? <OdometerNumber value={value.replace('%', '')} suffix="%" />
                : <OdometerNumber value={String(value)} />
          ) : '—'}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{label}</div>
      </div>
    </TiltCard>
  );

  return (
    <section id="leetcode" style={{ width: '100%', padding: '100px 0' }}>
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>06 — Problem Solving</span>
            <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }}/>
          </div>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            LeetCode Stats
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 0.5, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: 28 }}
            >
              <Trophy size={28} color="#ffaa00" style={{ filter: 'drop-shadow(0 0 8px rgba(255,170,0,0.4))' }} />
            </motion.span>
          </h2>
        </motion.div>

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 20 }}>
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 130, borderRadius: 20 }} />)}
          </div>
        )}

        {error && (
          <div className="card" style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
            <p style={{ marginBottom: 16 }}>Could not load LeetCode stats.</p>
            <a href={personal.leetcode} target="_blank" rel="noopener noreferrer"
              style={{ color: '#00ff88', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <Code2 size={16}/> View Profile
            </a>
          </div>
        )}

        {!loading && !error && stats && (
          <>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16, marginBottom: 24 }}>
              <StatCard label="Total Solved" value={stats.totalSolved} Icon={CheckCircle} color="#00ff88" />
              <StatCard label="Global Ranking" value={stats.ranking ? `#${stats.ranking.toLocaleString()}` : null} Icon={Trophy} color="#ffaa00" />
              <StatCard label="Acceptance Rate" value={stats.acceptanceRate ? `${stats.acceptanceRate}%` : null} Icon={Target} color="#00d4ff" />
              <StatCard label="Contribution Pts" value={stats.contributionPoints} Icon={Code2} color="#ff3366" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="card" style={{ padding: '28px 32px' }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>Difficulty Breakdown</p>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
                <GlowRing label="Easy" solved={stats.easySolved} total={stats.totalEasy} color="#22c55e" />
                <GlowRing label="Medium" solved={stats.mediumSolved} total={stats.totalMedium} color="#ffaa00" />
                <GlowRing label="Hard" solved={stats.hardSolved} total={stats.totalHard} color="#ff3366" />
              </div>
            </motion.div>
          </>
        )}

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: 'center', marginTop: 28 }}>
          <a href={personal.leetcode} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <Code2 size={16} /> View LeetCode Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LeetCode.jsx
git commit -m "feat: rewrite LeetCode as achievement dashboard with glow rings and odometer stats"
```

---

### Task 16: Rewrite Contact.jsx — gradient bloom + breathing CTA

**Files:**
- Modify: `src/components/Contact.jsx`

- [ ] **Step 1: Rewrite Contact.jsx**

```jsx
import { motion } from 'framer-motion';
import { Mail, Code2, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personal } from '../data/portfolio';
import ScrollVelocityText from './ScrollVelocityText';
import GlitchText from './GlitchText';
import TiltCard from './TiltCard';
import useMagnetic from '../hooks/useMagnetic';

function MagneticWrap({ children, strength = 0.35 }) {
  const { ref, x, y } = useMagnetic(strength);
  return <motion.div ref={ref} style={{ x, y, display: 'inline-block' }}>{children}</motion.div>;
}

const links = [
  { label: 'Email', href: `mailto:${personal.email}`, Icon: Mail, color: '#00ff88', value: personal.email },
  { label: 'GitHub', href: personal.github, Icon: GithubIcon, color: '#e2e8f0', value: `@${personal.githubUsername}` },
  { label: 'LinkedIn', href: personal.linkedin, Icon: LinkedinIcon, color: '#0a66c2', value: 'adityamishra2710' },
  { label: 'LeetCode', href: personal.leetcode, Icon: Code2, color: '#ffaa00', value: `@${personal.leetcodeUsername}` },
];

export default function Contact() {
  return (
    <section id="contact" style={{ width: '100%', minHeight: '100vh', padding: '120px 0 80px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* Gradient bloom */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          position: 'absolute', width: 800, height: 800,
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ position: 'relative', width: '100%' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'rgba(0,255,136,0.5)', textTransform: 'uppercase' }}>07 — Contact</span>
          <div style={{ width: 32, height: 1, background: 'rgba(0,255,136,0.2)' }}/>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 16 }}
        >
          <div className="contact-headline" style={{ color: 'rgba(255,255,255,0.12)' }}>
            <ScrollVelocityText>LET'S BUILD</ScrollVelocityText>
          </div>
          <div className="contact-headline g-text" style={{ letterSpacing: '-0.04em' }}>
            <GlitchText text="SOMETHING" trigger="inView" speed={50} as="span" style={{ fontFamily: "'Space Grotesk', sans-serif" }} />
          </div>
          <div className="contact-headline">
            <ScrollVelocityText>GREAT.</ScrollVelocityText>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{ fontSize: 16, color: 'rgba(255,255,255,0.35)', maxWidth: 520, lineHeight: 1.85, marginBottom: 48 }}
        >
          Have an exciting automation challenge, a collaboration idea, or just want to say hello?
        </motion.p>

        {/* Breathing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: 64 }}
        >
          <MagneticWrap strength={0.4}>
            <a href={`mailto:${personal.email}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                fontSize: 'clamp(14px,2vw,20px)', fontWeight: 700,
                color: '#0a0a0a', textDecoration: 'none',
                padding: '18px 36px', borderRadius: 50,
                background: '#00ff88',
                animation: 'breatheGlow 2s ease-in-out infinite',
                transition: 'transform 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Mail size={18} />
              {personal.email}
              <ArrowUpRight size={16} />
            </a>
          </MagneticWrap>
        </motion.div>

        {/* Social cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 14 }}>
          {links.map(({ label, href, Icon, color, value }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 * i }}>
              <TiltCard maxTilt={8}>
                <a href={href} target={label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer"
                  className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${color}12`, border: `1px solid ${color}25`,
                    transition: 'background 0.3s',
                  }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
                  </div>
                  <ArrowUpRight size={14} style={{ color: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "feat: rewrite Contact with gradient bloom, breathing CTA, scroll velocity text"
```

---

### Task 17: Rewrite Footer.jsx — minimal sign-off

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Rewrite Footer.jsx**

```jsx
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowUp } from 'lucide-react';
import { personal } from '../data/portfolio';
import useMagnetic from '../hooks/useMagnetic';

function MagneticTop() {
  const { ref, x, y } = useMagnetic(0.4);
  return (
    <motion.div ref={ref} style={{ x, y, display: 'inline-block' }}>
      <Link to="hero" smooth duration={700}
        style={{
          width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)',
          color: '#00ff88', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,136,0.25)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,136,0.3)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,255,136,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        <ArrowUp size={16} />
      </Link>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer style={{ width: '100%', padding: '40px 0 28px', borderTop: '1px solid rgba(0,255,136,0.06)' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} {personal.name} · Built with <span style={{ color: '#00ff88' }}>React</span>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href={`mailto:${personal.email}`}
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.target.style.color = '#00ff88'; e.target.style.textShadow = '0 0 10px rgba(0,255,136,0.4)'; }}
              onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.3)'; e.target.style.textShadow = 'none'; }}
            >{personal.email}</a>
            <MagneticTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: simplify Footer to minimal sign-off with neon accents"
```

---

### Task 18: Cleanup — delete unused files, update CursorSpotlight

**Files:**
- Modify: `src/components/CursorSpotlight.jsx`
- Delete: `src/components/TextScramble.jsx` (if not already)
- Delete: `src/components/Cursor.jsx` (if not already)
- Delete: `src/components/StarCanvas.jsx` (if not already)
- Delete: `src/components/AstronautInteractive.jsx` (if not already)
- Delete: `src/components/SkillNetwork.jsx` (if not already)
- Delete: `src/components/BrainSkills.jsx` mobile skill grid (handled in rewrite)

- [ ] **Step 1: Recolor CursorSpotlight.jsx**

Replace all `emerald` / `16,185,129` references with `0,255,136` in `src/components/CursorSpotlight.jsx`.

- [ ] **Step 2: Delete all unused files**

```bash
rm -f src/components/TextScramble.jsx src/components/Cursor.jsx src/components/StarCanvas.jsx src/components/AstronautInteractive.jsx src/components/SkillNetwork.jsx
```

- [ ] **Step 3: Final build test**

Run: `npx vite build`
Expected: 0 errors, bundle < 500KB

- [ ] **Step 4: Grep for old color remnants**

Search for any remaining `#10b981`, `#7c3aed`, `#a855f7`, `#06b6d4`, `#030712` in `src/`. Fix any found.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: cleanup old components, recolor CursorSpotlight, verify zero color remnants"
```

---

### Task 19: Final verification

- [ ] **Step 1: Run dev server**

Run: `npx vite`
Open in browser. Verify each section:

1. **Hero:** Terminal boot types 3 lines, name appears large, subtitle glitch-scrambles, stats roll in as system readouts, magnetic CTAs
2. **About:** Scanline photo with sweep effect, stat rings fill on scroll, location card has blinking dot, interest pills flicker on hover
3. **Skills:** Brain video scrubs with scroll, skill labels appear/disappear in 5 phases around the video
4. **Experience:** Timeline draws on scroll, sonar dots pulse, company names glitch in, impact numbers are 28px+ neon green
5. **Projects:** Cards enter with skew glitch, header glitch-types, neon accent stripes, card-shine on hover
6. **LeetCode:** Trophy shimmer, stat cards with odometer numbers, glow rings fill with drop-shadow
7. **Contact:** Gradient bloom on entry, "SOMETHING" glitch-scrambles, breathing CTA button, tilt social cards
8. **Footer:** Minimal — copyright, email, magnetic back-to-top
9. **Cursor:** Neon green dot + ring, particle trail, ring expands + turns pink on interactive hover
10. **Background:** Circuit grid with data pulses instead of stars
11. **Colors:** All neon green/cyan/pink/amber, zero emerald or purple

- [ ] **Step 2: Mobile test (375px)**

Verify: cursor effects disabled, skills video still scroll-synced, all layouts stack properly.

- [ ] **Step 3: Mark complete**
