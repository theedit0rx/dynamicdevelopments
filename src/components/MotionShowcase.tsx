import { useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, MoveUpRight, MousePointer2, Waves, Sparkles, ScanLine } from 'lucide-react';
import './motion-showcase.css';

const experiences = [
  { number: '01', title: 'Orbital motion', label: 'ATMOSPHERE', sub: 'An interface with depth, not clutter.', icon: Waves },
  { number: '02', title: 'Kinetic type', label: 'STORYTELLING', sub: 'Every word enters with intention.', icon: Sparkles },
  { number: '03', title: 'Living light', label: 'INTERACTION', sub: 'An experience that responds to you.', icon: MousePointer2 }
];

export default function MotionShowcase({ moving }: { moving: boolean }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const motionEnabled = moving && !prefersReduced;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const updateLight = (event: PointerEvent<HTMLDivElement>) => {
    if (!motionEnabled || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--cursor-x', (100 * (event.clientX - rect.left) / rect.width).toFixed(2) + '%');
    event.currentTarget.style.setProperty('--cursor-y', (100 * (event.clientY - rect.top) / rect.height).toFixed(2) + '%');
  };
  return (
    <section id="motion" className={'motion-showcase' + (motionEnabled ? '' : ' motion-still')} ref={ref} aria-labelledby="motion-title">
      <div className="wrap motion-showcase-inner">
        <div className="motion-topline"><span><span className="motion-live-dot" /> THE DYNAMIC MOTION SYSTEM</span><span>DESIGNED TO MOVE · BUILT TO PERFORM / 2026</span></div>
        <div className="motion-intro">
          <div className="motion-title-area">
            <span className="motion-eyebrow">A NEW KIND OF DIGITAL EXPERIENCE / 001</span>
            <motion.h2 id="motion-title" initial={motionEnabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, amount: .3 }}>Good websites <em>work.</em><br />Great ones <span>move you.</span></motion.h2>
          </div>
          <div className="motion-intro-side"><span className="motion-star" aria-hidden="true">✳</span><p>We combine immersive storytelling, thoughtful interactions and technical precision — so your brand is more than another tab.</p><a href="#contact" className="motion-simple-link">Create your experience <ArrowUpRight size={18} /></a></div>
        </div>
        <div className="motion-demo-grid">
          <div className="motion-menu" aria-label="Choose an interactive design demonstration">
            {experiences.map(({ number, title, sub, icon: Icon }, i) => <button type="button" className={'motion-menu-item' + (active === i ? ' is-current' : '')} aria-pressed={active === i} aria-controls="motion-preview" onClick={() => setActive(i)} key={number}><span className="motion-menu-index">{number} /</span><span className="motion-menu-copy"><strong>{title}</strong><small>{sub}</small></span><Icon size={22} strokeWidth={1.4} /></button>)}
            <div className="motion-menu-foot"><ScanLine size={16} /><span>INTERACTIVE DESIGN, NOT JUST DECORATION</span></div>
          </div>
          <div id="motion-preview" className={'motion-stage scene-' + active} onPointerMove={updateLight} style={{ '--cursor-x': '50%', '--cursor-y': '50%' } as CSSProperties} aria-live="polite">
            <div className="motion-stage-top"><span><span className="motion-stage-pulse"/> LIVE EXPERIMENT 0{active + 1}</span><span>MOVE YOUR CURSOR / TAP TO EXPLORE <MoveUpRight size={12}/></span></div>
            <div className="motion-stage-grid" aria-hidden="true" />
            <motion.div className="motion-stage-content" style={motionEnabled ? { y: drift } : undefined} key={active} initial={motionEnabled ? { opacity: 0, scale: .96, y: 13 } : false} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .6, ease: [0.22, 1, 0.36, 1] }}>
              {active === 0 && <div className="motion-orbit-demo"><div className="motion-orbit-ring ring-a"/><div className="motion-orbit-ring ring-b"/><div className="motion-orbit-ring ring-c"/><div className="motion-orbit-core">D<span>↗</span></div><span className="motion-orbit-note note-a">DEPTH / 01</span><span className="motion-orbit-note note-b">SHAPE / 03</span></div>}
              {active === 1 && <div className="motion-type-demo"><span className="motion-type-small">A NEW DIMENSION OF DESIGN</span><strong>NOT<br/><i>ORDINARY.</i></strong><span className="motion-type-footer">EVERY PIXEL HAS A PURPOSE. <ArrowDownRight size={22}/></span></div>}
              {active === 2 && <div className="motion-light-demo"><span className="motion-light-halo"/><span className="motion-light-rays"/><span className="motion-light-inner">MAKE<br/>IT <em>FEEL</em><br/>ALIVE<span>✳</span></span></div>}
            </motion.div>
            <div className="motion-stage-bottom"><span>{experiences[active].label}</span><span>DESIGN / CODE / FEELING</span><span className="motion-pagination">0{active + 1} <i/> 03</span></div>
          </div>
        </div>
        <div className="motion-endline"><p>Inspired by the world's most expressive interfaces. Built with an obsession for clarity.</p><a href="#work">Explore real projects <ArrowUpRight size={17}/></a></div>
      </div>
    </section>
  );
}
