# Aditya Mishra — Portfolio

A cinematic, interactive personal portfolio built with React 19, Vite 8, and Three.js. Designed with an **"Obsidian Neon"** theme featuring a deep-space background, holographic 3D brain visualization, and sci-fi UI elements.

## Live Features

- **Space Background** — Twinkling starfield with parallax drift, distant planets with rings, black holes with accretion disks, nebula clouds, and shooting stars
- **3D Holographic Brain** — Interactive brain model with custom GLSL shaders (hex grid pattern, data flow lines, gradient coloring), drag-to-rotate, and region-based skill highlighting
- **Floating Skill Labels** — Skill categories orbit the brain in 3D space, projected to screen coordinates in real-time
- **Terminal Boot Sequence** — Typing animation intro on page load
- **Particle Cursor** — Custom neon cursor with trailing particles and hover state morphing
- **Glitch Text** — Cipher-decode text animation on scroll
- **Tilt Cards** — 3D perspective tilt on hover with cursor-following shine
- **Odometer Numbers** — Slot-machine style digit roll-in for stats
- **Scroll Velocity Text** — Text skews and stretches based on scroll speed
- **Cursor Spotlight** — Radial gradient follows cursor within sections
- **Magnetic Elements** — Nav links and buttons pull toward cursor
- **GitHub Projects** — Live-fetched from GitHub API, auto-updates when you push new repos
- **LeetCode Stats** — Live-fetched problem-solving statistics

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Bundler | Vite 8 |
| Styling | Tailwind CSS v4 + inline styles |
| Animation | Framer Motion |
| 3D | Three.js via @react-three/fiber + drei |
| Fonts | Space Grotesk + Inter + JetBrains Mono |
| Icons | lucide-react + custom SVGs |
| APIs | GitHub REST API, LeetCode Stats API |

## Color Palette — "Obsidian Neon"

| Token | Hex | Usage |
|---|---|---|
| Background | `#0a0a0a` | Page background |
| Primary | `#00ff88` | Main accent (neon green) |
| Secondary | `#00d4ff` | Second accent (cyan) |
| Accent | `#ff3366` | Highlights (pink) |
| Warm | `#ffaa00` | Warm accent (amber) |
| Text | `#e8e8e8` | Body text |

## Project Structure

```
src/
  App.jsx                    # Root component
  main.jsx                   # Entry point with error boundary
  index.css                  # Global styles + Tailwind
  data/
    portfolio.js             # All personal data (edit this to update content)
  hooks/
    useMagnetic.js           # Magnetic cursor-pull effect
  components/
    SpaceBackground.jsx      # Stars, planets, black holes, nebulae
    BrainModel.jsx           # 3D holographic brain with GLSL shaders
    BrainSkills.jsx          # Skills section wrapper
    ParticleCursor.jsx       # Custom neon cursor
    Navbar.jsx               # Navigation with magnetic links
    Hero.jsx                 # Hero section with scramble text + stats
    About.jsx                # About section with tilt cards
    Experience.jsx           # Timeline with scroll-driven animations
    Projects.jsx             # GitHub repos (live API)
    LeetCode.jsx             # LeetCode stats (live API)
    Contact.jsx              # Contact section
    Footer.jsx               # Footer
    GlitchText.jsx           # Cipher-decode text effect
    TiltCard.jsx             # 3D perspective tilt on hover
    OdometerNumber.jsx       # Slot-machine number animation
    ScrollVelocityText.jsx   # Scroll-speed text distortion
    CursorSpotlight.jsx      # Radial gradient cursor follower
    ScrollProgress.jsx       # Scroll progress bar
    TerminalBoot.jsx         # Boot sequence animation
    SocialIcons.jsx          # GitHub/LinkedIn SVG icons
public/
    brain.glb                # 3D brain model (glTF binary)
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Updating Content

All personal data is in **`src/data/portfolio.js`**:

- `personal` — Name, title, links, bio, stats
- `skills` — Skill categories and items (displayed on the 3D brain)
- `experience` — Job history (displayed in timeline)
- `education` — Education entries
- `interests` — Interest tags

GitHub projects update automatically from the API when you push new public repos.

## Performance Optimizations

- **Code-split** Three.js (~940KB) into a separate chunk via `lazy()` import
- **Off-screen pause** for canvas animations via `IntersectionObserver`
- **Throttled raycasting** (every 4th frame) and particle updates (every 3rd frame)
- **Pre-rendered static grids** to offscreen canvas
- **Zero React re-renders** for cursor/spotlight — uses direct DOM manipulation
- **Event delegation** instead of MutationObserver for cursor hover detection
- **Touch-safe** — cursor effects disabled on touch devices via `matchMedia('(hover: hover)')`

## Brain Shader Details

The holographic brain uses three custom GLSL shader layers:

1. **Surface shader** — Fresnel rim glow, hex grid pattern, animated data flow lines, scanlines, and a blue-to-cyan-to-green gradient
2. **Wireframe shader** — Matching gradient with neural impulse animation
3. **Particle shader** — 400 neural firing points with gradient-matched colors and stochastic activation

---

Built by [Aditya Mishra](https://github.com/aditya403)
