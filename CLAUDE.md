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

<!-- VERCEL BEST PRACTICES START -->
## Best practices for developing on Vercel

These defaults are optimized for AI coding agents (and humans) working on apps that deploy to Vercel.

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons), use Blob or marketplace integrations for preserving state
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't start new projects on Vercel KV/Postgres (both discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly)
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips
- Tune Fluid Compute knobs (e.g., `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs)
- Use Runtime Cache for fast **regional** caching + tag invalidation (don't treat it as global KV)
- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET
- Use Vercel Blob for uploads/media; Use Edge Config for small, globally-read config
- If Enable Deployment Protection is enabled, use a bypass secret to directly access them
- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing, set AI_GATEWAY_API_KEY, using a model string (e.g. 'anthropic/claude-sonnet-4.6'), Gateway is already default in AI SDK
  needed. Always curl https://ai-gateway.vercel.sh/v1/models first; never trust model IDs from memory
- For durable agent loops or untrusted code: use Workflow (pause/resume/state) + Sandbox; use Vercel MCP for secure infra access
<!-- VERCEL BEST PRACTICES END -->
