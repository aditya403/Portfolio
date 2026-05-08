import { useEffect, useRef } from 'react';

let observer = null;
const onceMap = new WeakSet();

function ensureObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer;
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
        onceMap.add(entry.target);
      }
    }
  }, { rootMargin: '-8% 0px -8% 0px', threshold: 0.01 });
  return observer;
}

export default function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (onceMap.has(el)) { el.classList.add('is-visible'); return; }
    const obs = ensureObserver();
    if (!obs) { el.classList.add('is-visible'); return; }
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  return ref;
}
