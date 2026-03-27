import { useState } from 'react';
import './index.css';
import ParticleCursor from './components/ParticleCursor';
import ScrollProgress from './components/ScrollProgress';
import SpaceBackground from './components/SpaceBackground';
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
      <SpaceBackground />
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
