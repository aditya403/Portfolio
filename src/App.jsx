import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import LeetCode from './components/LeetCode';
import Contact from './components/Contact';
import Divider from './components/Divider';
import Footer from './components/Footer';
import CursorSpotlight from './components/CursorSpotlight';

export default function App() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="aurora"><span /></div>
      <div className="noise-overlay" aria-hidden="true" />
      <CursorSpotlight />
      <Navbar />
      <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Marquee />
        <About />
        <Divider label="experience" />
        <Experience />
        <Divider label="projects" />
        <Projects />
        <Divider label="leetcode" />
        <LeetCode />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
