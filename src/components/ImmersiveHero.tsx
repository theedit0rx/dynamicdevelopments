import {lazy, Suspense, useState, useRef} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import {ArrowUpRight, ArrowDown, Pause, Play, Move3D, Layers3, RotateCcw} from 'lucide-react';
import WorkstationFallback from './WorkstationFallback';
const Scene = lazy(()=>import('./StudioScene'));
export const SIGNALS=['#c8ff32','#50e3e1','#a991ff'];
export default function ImmersiveHero({moving,onMotion,mode,onMode}:{moving:boolean;onMotion:()=>void;mode:number;onMode:(n:number)=>void}){
 const [exploded,setExploded]=useState(false),[reset,setReset]=useState(0);
 const heroRef=useRef<HTMLElement>(null);
 const {scrollYProgress}=useScroll({target:heroRef,offset:['start start','end start']});
 const copyY=useTransform(scrollYProgress,[0,1],[0,-95]);
 const copyFade=useTransform(scrollYProgress,[0,.7,1],[1,1,.3]);
 const sceneY=useTransform(scrollYProgress,[0,1],[0,-58]);
 const sceneScale=useTransform(scrollYProgress,[0,1],[1,.9]);
 return <section ref={heroRef} id="home" className="hero-studio wrap flagship-hero">
  <motion.div className="hero-copy" style={moving?{y:copyY,opacity:copyFade}:undefined}>
   <p className="availability"><i/>INDEPENDENT DIGITAL STUDIO · INDIA</p>
   <motion.h1 initial={moving?{opacity:0,y:38,filter:"blur(8px)"}:false} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:1,delay:.1,ease:[.22,1,.36,1]}}>Your next<br/>big thing.<br/><span>In full<br className="small-break"/> dimension.</span></motion.h1>
   <motion.p className="hero-desc" initial={moving?{opacity:0,y:20}:false} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.36}}>A little unexpected. Impossible to ignore.<br/>We design and build websites, digital products<br className="desktop-break"/> and AI experiences that feel alive.</motion.p>
   <motion.div className="hero-actions" initial={moving?{opacity:0,y:16}:false} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.53}}><a href="#contact" className="action primary">Let’s build your next <ArrowUpRight size={19}/></a><a href="#work" className="text-link">See the work <ArrowDown size={17}/></a></motion.div>
   <motion.div className="hero-proof" initial={moving?{opacity:0,y:12}:false} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.68}}><div><strong>₹10k<span>+</span></strong><small>WEBSITES STARTING FROM</small></div><div><strong>Design<span> × </span>code</strong><small>ONE CONNECTED STUDIO</small></div></motion.div>
  </motion.div>
  <motion.div className="hero-canvas-parallax" style={moving?{y:sceneY,scale:sceneScale}:undefined}>
  <motion.div className="hero-experiment workstation" initial={moving?{opacity:0}:false} animate={{opacity:1}} transition={{duration:1.15,delay:.3}}>
   <div className="workstation-grid" aria-hidden="true"/>
   <div className="workstation-word" aria-hidden="true">CREATE.</div>
   <div className="experiment-top"><span><i/> THE DYNAMIC ENGINE</span><span>01 — INTERACTIVE</span></div>
   <div className="workstation-coordinate coord-left" aria-hidden="true">IDEA → INTERFACE → IMPACT</div>
   <Suspense fallback={<WorkstationFallback color={SIGNALS[mode]} exploded={exploded} moving={moving}/>}><Scene key={reset} color={SIGNALS[mode]} moving={moving} exploded={exploded}/></Suspense>
   <div className="workstation-caption"><span className="micro-orbit" aria-hidden="true"/><div><strong>{exploded?'Great work. Layer by layer.':'Built to come alive.'}</strong><span>{exploded?'DESIGN / ENGINEERING / EXPERIENCE':'YOUR BRAND. AT THE CENTER.'}</span></div></div>
   <div className="workstation-toolbar">
    <button className="assembly-toggle" aria-pressed={exploded} onClick={()=>setExploded(v=>!v)}><Layers3 size={16}/>{exploded?'Assemble':'Explore layers'}</button>
    <div className="scene-controls">{['Lime','Cyan','Violet'].map((label,i)=><button key={label} style={{'--swatch':SIGNALS[i]} as React.CSSProperties} aria-label={label+' scene color'} aria-pressed={mode===i} onClick={()=>onMode(i)}/>)}<span className="control-divider"/><button className="motion-toggle" aria-label={moving?'Pause motion':'Play motion'} onClick={onMotion}>{moving?<Pause size={16}/>:<Play size={16}/>}</button><button className="motion-toggle" aria-label="Reset camera" onClick={()=>setReset(v=>v+1)}><RotateCcw size={16}/></button></div>
   </div>
   <p className="workstation-hint"><Move3D size={13}/> Drag to rotate · Make it yours</p>
  </motion.div>
  </motion.div>
  <div className="hero-bottom-line"><span>CREATIVE THINKING. SERIOUS ENGINEERING.</span><a href="#lab">Enter the experience lab <ArrowUpRight size={14}/></a><span>SCROLL TO DISCOVER ↓</span></div>
 </section>;
}
