# Portfolio Project — CLAUDE.md

## Project
React 19 + Vite 8 + Tailwind CSS v4 + Framer Motion personal portfolio for Aditya Mishra (Network Automation Engineer).

## Stack
- **Framework:** React 19, Vite 8
- **Styling:** Tailwind v4 (`@import "tailwindcss"` in index.css, `@tailwindcss/vite` plugin), inline styles
- **Animation:** Framer Motion (`motion`, `useScroll`, `useTransform`, `useSpring`, `useMotionValue`, `useVelocity`, `useInView`, `whileInView`, `layoutId`, `useMotionValueEvent`)
- **Icons:** lucide-react (custom SVG for GitHub/LinkedIn in SocialIcons.jsx)
- **Navigation:** react-scroll
- **Fonts:** Space Grotesk (headings) + Inter (body) + JetBrains Mono (code/stats) via Google Fonts in index.html
- **APIs:** GitHub REST API (projects), LeetCode stats API (leetcode-stats-api.herokuapp.com)

## Current Design: "Obsidian Neon"
- **Palette:** #0a0a0a bg, #00ff88 primary (neon green), #00d4ff secondary (cyan), #ff3366 accent (pink), #ffaa00 warm (amber)
- **Design spec:** `docs/superpowers/specs/2026-03-26-cinematic-portfolio-redesign.md`

## File Structure
- `src/App.jsx` — root, composes all sections
- `src/index.css` — global styles, utility classes (.card, .btn-primary, .pill, .g-text, etc.)
- `src/data/portfolio.js` — all personal data, skills, experience, education, skillConnections
- `src/hooks/useMagnetic.js` — magnetic cursor-pull effect hook
- `src/components/` — all section and utility components

## Key Patterns
- **No re-render animations:** Use `useMotionValue` + `useSpring` for cursor-driven effects (magnetic, tilt). Never use `useState` for per-frame updates.
- **Scroll animations:** `useScroll` + `useTransform` for scroll-driven effects. `useMotionValueEvent` for imperative scroll callbacks (e.g., video scrubbing).
- **Touch device safety:** Always check `matchMedia('(hover: hover)')` before enabling cursor/hover effects.
- **Off-screen pause:** Use `IntersectionObserver` to pause Canvas/RAF animations when not visible.
- **Canvas 2D** for backgrounds (not WebGL/Three.js — removed for bundle size).

## Commands
- `npx vite` — dev server
- `npx vite build` — production build (must pass with 0 errors)

## Rules
- Three.js (@react-three/fiber + drei + postprocessing) is used for the 3D brain visualization only
- Do NOT use `useState` for animation values that update per-frame
- Do NOT add the astronaut back — removed by design
- All colors must match the Obsidian Neon palette — no emerald (#10b981) or purple (#7c3aed) remnants
- Brain visualization: interactive 3D wireframe hologram with drag-to-rotate and region hover
