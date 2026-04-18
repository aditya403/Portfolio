import { useEffect, useRef, useState } from 'react';

export default function LazyOnView({ children, rootMargin = '400px', minHeight = 0, placeholderStyle }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { rootMargin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible, rootMargin]);

  if (visible) return children;
  return <div ref={ref} style={{ minHeight, ...placeholderStyle }} aria-hidden="true" />;
}
