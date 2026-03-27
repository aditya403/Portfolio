# Cinematic Portfolio Redesign — "Obsidian Neon"

## Overview

Complete redesign of Aditya Mishra's portfolio from the current "Midnight Emerald" theme to a cinematic, scroll-driven experience called "Obsidian Neon." Every section has dramatic entrance animations, scroll-synchronized content, and interactive elements. The brain animation video becomes a scroll-controlled centerpiece in the Skills section.

**Goal:** Within 5 seconds, a visitor should think: "This person is technically elite" AND "I need to hire this person."

**Design direction:** Cinematic Scroll Machine — Apple-product-page energy with terminal/hacker micro-interactions. Full-screen section transitions, scroll-synced video, dramatic counters, glitch effects.

---

## Color Palette: "Obsidian Neon"

| Token | Value | Usage |
|---|---|---|
| Background | `#0a0a0a` | Near-black base |
| Primary | `#00ff88` | Neon green — main accent |
| Secondary | `#00d4ff` | Electric cyan — secondary accent |
| Accent | `#ff3366` | Hot pink — emphasis/CTAs, sparingly |
| Warm | `#ffaa00` | Amber — stats, achievements |
| Text | `#e8e8e8` | Body text |
| Muted | `rgba(255,255,255,0.35)` | Secondary text |
| Glow | Matching accent + blur | All glow effects |

**Gradient text:** `linear-gradient(135deg, #00ff88, #00d4ff)`

**Key principle:** High contrast. Aggressive neon pops against near-black. Each section gets a dominant accent color so they feel distinct from each other.

---

## Typography

Unchanged from current:
- **Space Grotesk** — headings, display text
- **Inter** — body text
- **JetBrains Mono** — stats, code, terminal elements

---

## Sections

### 1. Hero — "Terminal Boot Sequence"

Full viewport. Page load plays like a computer booting up.

**Sequence:**
1. **Screen flicker** — 0.3s black screen with CRT flicker, then background fades in
2. **Terminal typing** — monospace prompt types out 3 lines at 40ms/char with blinking cursor:
   ```
   > initializing portfolio...
   > loading engineer: ADITYA MISHRA
   > status: READY
   ```
3. **Name explosion** — "ADITYA MISHRA" scales up from terminal text to massive display text (clamp 60px–120px). Terminal fades behind it
4. **Subtitle** — "Network Automation Engineer" with glitch/scramble effect
5. **Stats bar** — 3 stats (3+ Years, 3100+ Hours, 4 Systems) as odometer counters styled as "system readouts" — thin neon border, monospace font
6. **CTA buttons** — "View My Work" (neon green glow) + "Let's Talk" (outline), both with magnetic pull
7. **Scroll indicator** — animated chevron + "scroll to explore" that fades on first scroll

**Background:** Animated grid with occasional "pulse" lines traveling along grid paths — like data flowing through circuits.

**No photo in hero.** Terminal sequence IS the visual. Photo moves to About section.

---

### 2. About — "Data Card Grid"

Photo + bio + stats in a holographic data card bento grid.

**Photo card (2 columns):**
- Photo with horizontal scan-line overlay (sweeps down every 4s)
- Hover: scan-line speeds up, "SCANNING..." flashes at top
- Pulsing neon border
- Bio text beside photo

**Location card:**
- Animated dot on minimal dark map outline (India highlighted, neon pulse)
- "PUNE, INDIA" in large monospace
- "STATUS: OPEN TO REMOTE" with blinking green dot

**Stat cards (3):**
- Circular SVG progress ring that fills on scroll-enter
- Odometer number in center
- Ring colors: green (years), amber (hours), cyan (systems)
- Hover: ring pulses, number scales up

**Interests strip:**
- Pills with micro-icons
- Hover: neon flicker effect (opacity toggles 3x then settles)

**Entry:** Grid staggers in — each card delays 0.1s, entering from scale-down + fade.

---

### 3. Skills — "Brain Video Centerpiece"

The showstopper. Full viewport, scroll-driven.

**Layout:**
- Brain video centered, ~60% of viewport
- Section is ~300vh tall internally for scroll runway
- Content is `position: sticky` so brain stays centered while scrolling
- `useScroll` maps scroll progress to `video.currentTime` — user scrubs the brain animation by scrolling

**Skill overlays appear in phases:**
- 0–20% scroll: "Languages" (Groovy, Python, Shell, Java) — left side
- 20–40%: "Automation" skills — right side
- 40–60%: "Platforms" (ServiceNow, Resolve.io) — bottom
- 60–80%: "Dev Tools & Cloud" — top
- 80–100%: All skills visible, connected by faint animated lines

Each skill = glassmorphism pill, scales up on hover, shows contextual tooltip.

**Video treatment:**
- CSS glow: `drop-shadow(0 0 40px rgba(0,255,136,0.3))` for holographic feel
- Radial gradient vignette frames it
- Vignette + glow can visually minimize watermark if present

**Section entry:** "SKILLS & TOOLS" glitch-scrambles, then brain video fades in with scale 0.8 → 1.0.

**Note on watermark/resolution:** Cannot be done programmatically. CSS overlay (vignette + glow) will minimize visual impact of small watermarks. User should obtain clean source file for best results.

---

### 4. Experience — "Scroll-Driven Timeline Reveal"

Timeline draws itself as you scroll.

**Timeline line:** Animates height 0 → 100% via `useScroll` + `useTransform`.

**Card entry animations:**
- Slide from left with rotation (3° → 0°) and scale (0.9 → 1.0)
- Timeline dot triggers a **neon ring explosion** (expanding ring that fades — sonar ping effect)
- Company badge glitch-scrambles into place
- Impact numbers are large (48px), neon green, odometer-animated

**Impact callout redesign:**
- Dark strip with circuit-board pattern background
- Large neon numbers
- Label: "ANNUAL IMPACT"
- Visually dominates the card — makes the hire argument undeniable

**Scroll progress accent:** Thin neon line on far left viewport edge tracks section scroll progress.

---

### 5. Projects — "Showcase Gallery with Dramatic Entrances"

**Card entry:**
- Brief "glitch frame" — card appears with `skewX(20deg)` + neon shift, snaps to normal
- 0.12s stagger between cards
- Numbered badge counter-animates 00 → final

**Card design:**
- Dark glass + neon accent stripe on top (different color per card)
- Hover: lifts -8px, accent stripe expands to full glow, diagonal card-shine sweep
- "VIEW" label slides in from right with arrow animation

**Section header:** "GITHUB PROJECTS" types out like terminal input, cursor blinks, then grid loads.

**Loading skeletons:** Neon pulse instead of gray shimmer — green glow fades in/out.

---

### 6. LeetCode — "Achievement Dashboard"

Gaming stats screen aesthetic.

**Stat cards:**
- Badge/shield-shaped icon area
- Massive neon number (36px+), odometer-animated
- Thin animated progress bar below number
- Hover: **electric surge** — bright line traces card border once

**Circular progress rings (enhanced):**
- Glow trail on the leading edge during fill animation
- After fill: subtle rotating bright dot along circumference
- Center: solved/total with solved in neon, total in muted

**Section header:** Trophy icon with gold shimmer on scroll-enter.

---

### 7. Contact — "Final CTA Takeover"

Full viewport, the climax.

**Entry:** Large radial gradient blooms from center (neon green → transparent) — atmosphere shift.

**Big text:**
- "LET'S BUILD" — muted white (0.15 opacity), massive (clamp 48px–100px)
- "SOMETHING" — glitch-scrambles in, neon green gradient
- "GREAT." — solid white, massive
- All 3 lines react to scroll velocity (skewX distortion)

**Email CTA:**
- Massive magnetic button (strength 0.4)
- Neon green glow that breathes (pulsing shadow, 2s cycle)
- Hover: glow 3x, slight scale up

**Social cards:**
- 4 tilt cards
- Hover: icon color floods card background briefly (0.3s wash), settles back

**No divider.** Gradient bloom IS the separator.

---

### 8. Footer — "Minimal Sign-off"

- `(c) 2026 Aditya Mishra . Built with React`
- Magnetic back-to-top button with neon ring
- Email link that glows on hover
- Nothing else.

---

## Global Elements

### Custom Cursor
- Neon green dot (8px) + trailing ring (40px)
- Interactive hover: ring → 56px, dot shifts to hot pink (#ff3366)
- Click: dot contracts to 4px (punch effect)
- **Particle trail:** 3-4 tiny dots fade out over 0.3s along movement path. Pool of 8 recycled CSS-animated divs.

### Scroll Progress Bar
- Fixed top, 2px
- Gradient: `#00ff88 → #00d4ff → #ff3366` — shifts as you scroll

### Background — Animated Circuit Grid
- Replaces star field entirely
- Subtle grid lines on #0a0a0a
- Occasional "data pulse" lines travel along grid paths (horizontal/vertical)
- Pulses: neon green, very dim (opacity 0.06), one every ~3s from random edges

### No Astronaut
Removed. The brain video and scroll animations replace it as the wow factor. The astronaut undercuts the "technically elite" impression.

### Navigation
- Frosted glass bar on scroll (background: rgba(10,10,10,0.8) + backdrop-filter blur)
- Magnetic links with sliding layoutId indicator
- "AM" logo badge with subtle neon border glow pulse
- Mobile: hamburger → full-screen overlay with staggered link animations

---

## Components to Create

| Component | Purpose |
|---|---|
| `TerminalBoot.jsx` | Hero boot sequence (typing + flicker) |
| `CircuitGrid.jsx` | Animated circuit grid background (replaces StarCanvas) |
| `ScrollVideo.jsx` | Scroll-synced video player for brain animation |
| `SkillOverlay.jsx` | Skill labels that appear at scroll thresholds around brain |
| `GlitchText.jsx` | Text with glitch/scramble animation (replaces TextScramble, more dramatic) |
| `SonarDot.jsx` | Expanding ring pulse for timeline dots |
| `NeonSkeleton.jsx` | Loading skeleton with neon pulse |
| `ParticleCursor.jsx` | Cursor with particle trail (replaces Cursor) |
| `ScanlinePhoto.jsx` | Photo with scan-line overlay effect |

## Components to Keep (Modified)

| Component | Changes |
|---|---|
| `useMagnetic.js` | Keep as-is |
| `TiltCard.jsx` | Keep as-is |
| `OdometerNumber.jsx` | Keep as-is |
| `ScrollVelocityText.jsx` | Keep as-is |
| `CursorSpotlight.jsx` | Recolor to new palette |
| `Navbar.jsx` | Recolor + neon logo pulse |
| `ScrollProgress.jsx` | New gradient |

## Components to Delete

| Component | Reason |
|---|---|
| `StarCanvas.jsx` | Replaced by CircuitGrid |
| `AstronautInteractive.jsx` | Removed from design |
| `SkillNetwork.jsx` | Replaced by ScrollVideo + SkillOverlay |
| `TextScramble.jsx` | Replaced by GlitchText (more dramatic) |
| `Cursor.jsx` | Replaced by ParticleCursor |

## Files to Modify

| File | Changes |
|---|---|
| `index.css` | Complete recolor to Obsidian Neon palette |
| `index.html` | No changes needed (fonts stay) |
| `portfolio.js` | Update skill category colors to new palette |
| `App.jsx` | Remove AstronautInteractive, swap StarCanvas → CircuitGrid, swap Cursor → ParticleCursor, background → #0a0a0a |
| `Hero.jsx` | Complete rewrite — terminal boot sequence |
| `About.jsx` | Rewrite — holographic data cards with scan-line photo |
| `BrainSkills.jsx` | Rewrite — scroll-synced video with skill overlays |
| `Experience.jsx` | Rewrite — sonar dots, glitch company names, large impact numbers |
| `Projects.jsx` | Rewrite — glitch entry, terminal-typed header |
| `LeetCode.jsx` | Rewrite — gaming dashboard, electric surge hover |
| `Contact.jsx` | Rewrite — gradient bloom, breathing CTA |
| `Footer.jsx` | Simplify + recolor |

---

## Video Integration

The brain animation video (`brain_animation_video.mp4`, 3.1MB) is placed in `public/` for direct access.

**Implementation:**
```jsx
const videoRef = useRef(null);
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

useMotionValueEvent(scrollYProgress, 'change', (v) => {
  if (videoRef.current) {
    videoRef.current.currentTime = v * videoRef.current.duration;
  }
});
```

The video is muted, has no controls, `playsInline`, `preload="auto"`. It does NOT autoplay — scroll position exclusively controls playback.

---

## Performance Considerations

- Circuit grid: Canvas 2D, paused when off-screen via IntersectionObserver
- Particle cursor: pool of 8 recycled DOM elements, no creation/destruction per frame
- Scroll-synced video: `useMotionValueEvent` avoids React re-renders
- Glitch effects: CSS-only where possible (keyframe animations), JS only for the text scramble
- All hover effects: `useMotionValue` (no re-renders)
- Touch devices: disable cursor effects, particle trail, magnetic pull via `matchMedia('(hover: hover)')`
- `prefers-reduced-motion`: disable all parallax, glitch, and auto-animations; keep simple fades

---

## Verification Checklist

1. `npm run build` — no errors
2. Colors: all neon green/cyan/pink/amber, zero emerald/purple remnants
3. Hero: terminal types, name explodes, stats roll in
4. Skills: brain video scrubs with scroll, skill labels appear in phases
5. Experience: timeline draws, sonar dots pulse, impact numbers dominate
6. Projects: glitch entry, terminal header types
7. LeetCode: rings fill with glow trail, electric surge on hover
8. Contact: gradient bloom, breathing CTA, scramble text
9. Cursor: particle trail follows movement
10. Mobile (375px): cursor effects disabled, skills section falls back to scroll-driven video without hover overlays
11. Performance: 60fps, no jank
