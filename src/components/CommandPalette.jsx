import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, ArrowRight, Mail, Copy, FileText, Code2, User, Briefcase, FolderGit2, Trophy, Send, X } from 'lucide-react';
import { Github as GhIcon, Linkedin } from './SocialIcons';
import { animateScroll, scroller } from 'react-scroll';
import { personal } from '../data/portfolio';

function scrollTo(id) {
  if (id === 'top') { animateScroll.scrollToTop({ duration: 500, smooth: true }); return; }
  scroller.scrollTo(id, { duration: 500, smooth: true, offset: -70 });
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const items = useMemo(() => [
    { id: 'home',    label: 'Top of page',  hint: 'hero',       icon: User,       group: 'Navigate', run: () => scrollTo('top') },
    { id: 'about',   label: 'About',        hint: 'who I am',   icon: User,       group: 'Navigate', run: () => scrollTo('about') },
    { id: 'skills',  label: 'Skills',       hint: 'stack',      icon: Code2,      group: 'Navigate', run: () => scrollTo('skills') },
    { id: 'exp',     label: 'Experience',   hint: 'FIS',        icon: Briefcase,  group: 'Navigate', run: () => scrollTo('experience') },
    { id: 'proj',    label: 'Projects',     hint: 'GitHub',     icon: FolderGit2, group: 'Navigate', run: () => scrollTo('projects') },
    { id: 'lc',      label: 'LeetCode',     hint: 'stats',      icon: Trophy,     group: 'Navigate', run: () => scrollTo('leetcode') },
    { id: 'contact', label: 'Contact',      hint: "let's talk", icon: Send,       group: 'Navigate', run: () => scrollTo('contact') },

    { id: 'email-copy', label: 'Copy email',     hint: personal.email,            icon: Copy,     group: 'Actions',
      run: async () => { await navigator.clipboard.writeText(personal.email); setCopied(true); setTimeout(() => setCopied(false), 1400); } },
    { id: 'email-send', label: 'Send email',     hint: personal.email,            icon: Mail,     group: 'Actions',
      run: () => { window.location.href = `mailto:${personal.email}`; } },
    { id: 'resume-view', label: 'View resume',     hint: 'PDF',                    icon: FileText, group: 'Actions',
      run: () => { window.open('/aditya_mishra_resume.pdf', '_blank', 'noopener,noreferrer'); } },
    { id: 'resume-dl',   label: 'Download resume', hint: 'aditya_mishra_resume.pdf', icon: FileText, group: 'Actions',
      run: () => {
        const a = document.createElement('a');
        a.href = '/aditya_mishra_resume.pdf';
        a.download = 'aditya_mishra_resume.pdf';
        document.body.appendChild(a); a.click(); a.remove();
      } },

    { id: 'gh',  label: 'GitHub',     hint: '@aditya403',               icon: GhIcon,   group: 'Links', run: () => window.open(personal.github,   '_blank', 'noopener,noreferrer') },
    { id: 'li',  label: 'LinkedIn',   hint: 'adityamishra2710',         icon: Linkedin, group: 'Links', run: () => window.open(personal.linkedin, '_blank', 'noopener,noreferrer') },
    { id: 'lcp', label: 'LeetCode profile', hint: '@audacious_enemy',   icon: Trophy,   group: 'Links', run: () => window.open(personal.leetcode, '_blank', 'noopener,noreferrer') },
  ], []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter(it =>
      it.label.toLowerCase().includes(t) ||
      (it.hint || '').toLowerCase().includes(t) ||
      it.group.toLowerCase().includes(t)
    );
  }, [items, q]);

  useEffect(() => {
    const onKey = (e) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
        return;
      }
      if (!open) return;
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter')     { e.preventDefault(); const item = filtered[active]; if (item) { item.run(); if (item.id !== 'email-copy') setOpen(false); } }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, active]);

  useEffect(() => { setActive(0); }, [q]);
  useEffect(() => {
    if (!open) { setQ(''); setActive(0); return; }
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  // Group items for display while preserving filtered order
  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach((it, idx) => {
      groups[it.group] = groups[it.group] || [];
      groups[it.group].push({ ...it, _idx: idx });
    });
    return groups;
  }, [filtered]);

  if (!open) return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="cmdk-trigger"
      aria-label="Open command palette"
    >
      <Search size={13} />
      <span>Search</span>
      <kbd>⌘K</kbd>
    </button>
  );

  return (
    <div className="cmdk-backdrop" onClick={() => setOpen(false)}>
      <div className="cmdk-panel" role="dialog" aria-label="Command palette" onClick={e => e.stopPropagation()}>
        <div className="cmdk-header">
          <Search size={16} style={{ color: 'var(--fg-dim)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Type to search · navigate · run actions"
            className="cmdk-input"
          />
          <button onClick={() => setOpen(false)} className="cmdk-close" aria-label="Close"><X size={16} /></button>
        </div>

        <div ref={listRef} className="cmdk-list">
          {filtered.length === 0 && (
            <div className="cmdk-empty">No matches for "{q}"</div>
          )}

          {Object.entries(grouped).map(([group, list]) => (
            <div key={group} className="cmdk-group">
              <div className="cmdk-group-label">{group}</div>
              {list.map(it => {
                const Icon = it.icon;
                const isActive = it._idx === active;
                return (
                  <button
                    key={it.id}
                    type="button"
                    data-idx={it._idx}
                    onMouseEnter={() => setActive(it._idx)}
                    onClick={() => { it.run(); if (it.id !== 'email-copy') setOpen(false); }}
                    className={`cmdk-item${isActive ? ' is-active' : ''}`}
                  >
                    <Icon size={15} className="cmdk-item-icon" />
                    <span className="cmdk-item-label">{it.label}</span>
                    {it.hint && <span className="cmdk-item-hint">{it.id === 'email-copy' && copied ? 'Copied!' : it.hint}</span>}
                    <ArrowRight size={13} className="cmdk-item-arrow" />
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="cmdk-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
