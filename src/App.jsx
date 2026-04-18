import { lazy, Suspense, useEffect, useState } from 'react';
import './index.css';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import LazyOnView from './components/LazyOnView';
const ParticleCursor = lazy(() => import('./components/ParticleCursor'));
const SpaceBackground = lazy(() => import('./components/SpaceBackground'));
const BrainSkills = lazy(() => import('./components/BrainSkills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const LeetCode = lazy(() => import('./components/LeetCode'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function useAfterPaint() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    const id = idle(() => setReady(true), { timeout: 1500 });
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);
  return ready;
}

export default function App() {
  const decorReady = useAfterPaint();

  return (
    <div style={{ background: '#0a0a0a', width: '100%', minHeight: '100vh', position: 'relative' }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {decorReady && (
        <Suspense fallback={null}>
          <ParticleCursor />
          <SpaceBackground />
        </Suspense>
      )}
      <ScrollProgress />
      <Navbar />

      <main id="main-content" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Suspense fallback={null}>
          <LazyOnView minHeight={600}><BrainSkills /></LazyOnView>
          <LazyOnView minHeight={500}><Experience /></LazyOnView>
          <LazyOnView minHeight={500}><Projects /></LazyOnView>
          <LazyOnView minHeight={500}><LeetCode /></LazyOnView>
          <LazyOnView minHeight={500}><Contact /></LazyOnView>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <LazyOnView minHeight={200}><Footer /></LazyOnView>
      </Suspense>
    </div>
  );
}
