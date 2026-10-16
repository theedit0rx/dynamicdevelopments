import {useEffect, useRef, type CSSProperties, type PointerEvent} from 'react';
import {AnimatePresence, motion, useReducedMotion, useSpring} from 'framer-motion';
import {ArrowUpRight, ArrowRight, Layers3, MoveUpRight, Sparkles} from 'lucide-react';
import {work} from './StudioData';
import '../overdrive.css';

type Project = typeof work[number];
const images:Record<string,string>={
 physics:'/physics-portfolio.jpg',
 vmart:'/vmart-portfolio.jpg',
 bit:'/bit-portfolio.jpg'
};
const accents:Record<string,string>={
 physics:'#c8ff32',
 vmart:'#e8b8ff',
 bit:'#7bd5ff'
};
const numerals=['01','02','03'];
const ease=[0.22,1,0.36,1] as const;
export default function ProjectPortal({moving,onOpen}:{moving:boolean;onOpen:(project:Project)=>void}){
 const [active,setActive]=useStateIndex();
 const viewport=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 const enabled=moving&&!reduced;
 const rx=useSpring(0,{stiffness:105,damping:25,mass:.5});
 const ry=useSpring(0,{stiffness:105,damping:25,mass:.5});
 const p=work[active];
 const accent=accents[p.id]||'#c8ff32';
 useEffect(()=>{rx.set(0);ry.set(0)},[active,moving,rx,ry]);
 const pointer=(e:PointerEvent<HTMLDivElement>)=>{
  if(!enabled||e.pointerType!=='mouse')return;
  const rect=viewport.current?.getBoundingClientRect();
  if(!rect)return;
  ry.set(((e.clientX-rect.left)/rect.width-.5)*12);
  rx.set((.5-(e.clientY-rect.top)/rect.height)*8);
 };
 const stop=()=>{rx.set(0);ry.set(0)};
 const style={'--portal-accent':accent} as CSSProperties;
 return <section id="work" className="project-portal wrap section" style={style} aria-labelledby="portal-title">
  <div className="portal-heading">
   <div><span className="portal-overline"><i/> 01 / REAL WORK. REAL WORLDS.</span><h2 id="portal-title">Proof, not<br/><em>promises.</em></h2></div>
   <p>Our work isn't a wall of static thumbnails. Select a project and step into the worlds we've actually built.</p>
  </div>
  <div className="portal-layout">
   <div className="portal-selector" role="group" aria-label="Select a featured project">
    {work.map((project,index)=><motion.button
      key={project.id}
      type="button"
      className={'portal-pick '+(index===active?'is-selected':'')}
      aria-pressed={index===active}
      onClick={()=>setActive(index)}
      whileHover={enabled?{x:5}:undefined}
      whileTap={enabled?{scale:.99}:undefined}
      transition={{duration:.24}}>
       <span className="portal-pick-top"><small>{numerals[index]} / {project.category.toUpperCase()}</small><ArrowUpRight size={17}/></span>
       <strong>{project.name}</strong>
       <span className="portal-pick-foot"><span>{project.tag}</span><span className="portal-pick-progress"><i/></span></span>
      </motion.button>)}
    <div className="portal-index-note"><Sparkles size={16}/><span>Every preview is based on an actual Dynamic Developments project.</span></div>
   </div>
   <div ref={viewport} className="portal-world" onPointerMove={pointer} onPointerLeave={stop} aria-live="off">
    <div className="portal-world-grid" aria-hidden="true"/>
    <div className="portal-world-glow" aria-hidden="true"/>
    <div className="portal-orbit portal-orbit-one" aria-hidden="true"/>
    <div className="portal-orbit portal-orbit-two" aria-hidden="true"/>
    <div className="portal-world-top"><span><i/> LIVE PROJECT EXPLORER</span><span>DD / {numerals[active]}</span></div>
    <div className="portal-ghost portal-ghost-back" aria-hidden="true"/>
    <div className="portal-ghost portal-ghost-front" aria-hidden="true"/>
    <motion.div className="portal-browser" style={{rotateX:enabled?rx:0,rotateY:enabled?ry:0}}>
     <div className="portal-browser-chrome">
      <span className="portal-dots" aria-hidden="true"><i/><i/><i/></span>
      <span className="portal-address">{new URL(p.url).hostname}</span>
      <Layers3 size={15} aria-hidden="true"/>
     </div>
     <div className="portal-browser-window">
      <AnimatePresence mode="wait" initial={false}>
       <motion.div key={p.id} className="portal-browser-image"
         initial={enabled?{opacity:0,scale:1.06,filter:'blur(9px)'}:{opacity:0}}
         animate={{opacity:1,scale:1,filter:'blur(0px)'}}
         exit={enabled?{opacity:0,scale:.96,filter:'blur(7px)'}:{opacity:0}}
         transition={{duration:enabled?.55:.12,ease}}>
         <img src={images[p.id]} alt={p.name+' website screenshot'} loading="lazy"/>
       </motion.div>
      </AnimatePresence>
      <div className="portal-window-shade" aria-hidden="true"/>
      <div className="portal-window-label"><span><i/> SELECTED BUILD</span><b>{numerals[active]} / 03</b></div>
     </div>
    </motion.div>
    <div className="portal-floating-chip portal-floating-chip-top"><MoveUpRight size={15}/><span>{p.category} / {p.tag}</span></div>
    <div className="portal-floating-chip portal-floating-chip-bottom"><span className="portal-live-dot"/>INTERACTIVE BY DESIGN</div>
    <div className="portal-world-bottom"><span>HOVER TO TILT · SELECT TO EXPLORE</span><span>↘ 0{active+1} / 03</span></div>
   </div>
  </div>
  <div className="portal-details">
   <div className="portal-details-copy">
    <span>FEATURED / {numerals[active]}</span>
    <AnimatePresence mode="wait" initial={false}>
     <motion.div key={p.id} initial={enabled?{y:12,opacity:0}:{opacity:0}} animate={{y:0,opacity:1}} exit={{y:-8,opacity:0}} transition={{duration:enabled?.35:.1}}>
      <h3>{p.name}</h3>
      <p>{p.description}</p>
      <div className="portal-highlights">{p.highlights.map(tag=><span key={tag}><i/>{tag}</span>)}</div>
     </motion.div>
    </AnimatePresence>
   </div>
   <div className="portal-details-actions">
    <button type="button" className="portal-more" onClick={()=>onOpen(p)}>Project details <ArrowRight size={17}/></button>
    <a className="portal-visit" href={p.url} target="_blank" rel="noopener noreferrer">Visit live website <ArrowUpRight size={19}/></a>
   </div>
  </div>
  <p className="portal-honesty">Live links open the actual deployments. Any concept/demo limitations are explained in each project's details.</p>
 </section>;
}
import {useState} from 'react';
function useStateIndex(){return useState(0)}
