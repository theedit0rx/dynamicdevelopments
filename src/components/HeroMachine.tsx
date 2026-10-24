import { useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Code2, Layers3, Sparkles, MousePointer2 } from 'lucide-react';
import Logo from './Logo';

/** The real Dynamic Developments pixel-laptop brand mark is deliberately the hero.
 * Interactive layered CSS perspective retains it crisply at every screen size.
 * The generic unbranded WebGL knot has been removed. */
export default function HeroMachine({ playing }: { playing: boolean }) {
  const pointerX = useMotionValue(0), pointerY = useMotionValue(0);
  const spring = { stiffness: 95, damping: 23, mass: .6 };
  const x = useSpring(pointerX, spring), y = useSpring(pointerY, spring);
  const rotateY = useTransform(x, [-1,1], [-12,12]);
  const rotateX = useTransform(y, [-1,1], [11,-11]);
  const move = useCallback((event:React.PointerEvent<HTMLDivElement>)=>{
    if(!playing || event.pointerType==='touch')return;
    const r=event.currentTarget.getBoundingClientRect();
    pointerX.set(Math.max(-1,Math.min(1,((event.clientX-r.left)/r.width-.5)*2)));
    pointerY.set(Math.max(-1,Math.min(1,((event.clientY-r.top)/r.height-.5)*2)));
  },[playing,pointerX,pointerY]);
  const leave = useCallback(()=>{pointerX.set(0);pointerY.set(0)},[pointerX,pointerY]);

  return <div className={'dd-art dd-brand-world'+(playing?' dd-world-moving':'')} onPointerMove={move} onPointerLeave={leave} aria-label="Interactive Dynamic Developments original blue laptop-and-pixels logo surrounded by floating design and technology elements">
    <div className="dd-art-grid" aria-hidden="true"/>
    <div className="dd-brand-halo" aria-hidden="true"/>
    <div className="dd-brand-ring dd-brand-ring-one" aria-hidden="true"/>
    <div className="dd-brand-ring dd-brand-ring-two" aria-hidden="true"/>
    <div className="dd-brand-star dd-brand-star-1" aria-hidden="true">✦</div>
    <div className="dd-brand-star dd-brand-star-2" aria-hidden="true">✧</div>
    <div className="dd-brand-star dd-brand-star-3" aria-hidden="true">+</div>
    <motion.div className="dd-brand-viewport" style={playing?{rotateX,rotateY}:undefined}>
      <div className="dd-brand-frame">
        <div className="dd-brand-toolbar"><div className="dd-brand-lights"><i/><i/><i/></div><span>dynamic.dev / create</span><ArrowUpRight size={15}/></div>
        <div className="dd-brand-core">
          <div className="dd-brand-svg"><Logo size={225} glow/></div>
          <div className="dd-brand-wordmark">DYNAMIC<small>DEVELOPMENTS</small></div>
          <div className="dd-brand-code" aria-hidden="true"><span>&lt;ideas&gt;</span><span> become real.</span><span>&lt;/ideas&gt;</span></div>
        </div>
        <div className="dd-brand-status"><span><i/> BUILD STATUS: IMAGINATION ONLINE</span><span>01 / ∞</span></div>
      </div>
    </motion.div>
    <div className="dd-brand-chip dd-brand-chip-a"><span><Layers3 size={16}/> DESIGN SYSTEM</span><strong>LAYERS / MOTION</strong><div className="dd-chip-lines"><b/><b/><b/></div></div>
    <div className="dd-brand-chip dd-brand-chip-b"><span><Code2 size={16}/> DEVELOPMENT</span><strong>CODE → EXPERIENCE</strong><div className="dd-chip-code">&lt;make /&gt;<br/>→ something amazing</div></div>
    <div className="dd-brand-chip dd-brand-chip-c"><Sparkles size={17}/><span>CREATIVE ENERGY</span><b>∞ POSSIBILITIES</b></div>
    <div className="dd-brand-chip dd-brand-chip-d"><span>INTERACTIVE</span><span className="dd-chip-wave">▂ ▄ ▆ ▄ ▇ ▃ ▆ ▂</span></div>
    <div className="dd-brand-interact"><MousePointer2 size={13}/> MOVE YOUR CURSOR</div>
    <span className="dd-art-tag">THE REAL DYNAMIC LOGO <i>↗</i></span>
  </div>;
}
