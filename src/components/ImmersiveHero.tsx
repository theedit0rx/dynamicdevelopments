import {lazy, Suspense, useState} from 'react';
import {ArrowUpRight, ArrowDown, Pause, Play, Move3D, Layers3, RotateCcw} from 'lucide-react';
import WorkstationFallback from './WorkstationFallback';
const Scene = lazy(()=>import('./StudioScene'));
export const SIGNALS=['#c8ff32','#50e3e1','#a991ff'];
export default function ImmersiveHero({moving,onMotion,mode,onMode}:{moving:boolean;onMotion:()=>void;mode:number;onMode:(n:number)=>void}){
 const [exploded,setExploded]=useState(false),[reset,setReset]=useState(0);
 return <section id="home" className="hero-studio wrap flagship-hero">
  <div className="hero-copy">
   <p className="availability"><i/>INDEPENDENT DIGITAL STUDIO · INDIA</p>
   <h1>Your next<br/>big thing.<br/><span>In full<br className="small-break"/> dimension.</span></h1>
   <p className="hero-desc">A little unexpected. Impossible to ignore.<br/>We design and build websites, digital products<br className="desktop-break"/> and AI experiences that feel alive.</p>
   <div className="hero-actions"><a href="#contact" className="action primary">Let’s build your next <ArrowUpRight size={19}/></a><a href="#work" className="text-link">See the work <ArrowDown size={17}/></a></div>
   <div className="hero-proof"><div><strong>₹10k<span>+</span></strong><small>WEBSITES STARTING FROM</small></div><div><strong>Design<span> × </span>code</strong><small>ONE CONNECTED STUDIO</small></div></div>
  </div>
  <div className="hero-experiment workstation">
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
  </div>
  <div className="hero-bottom-line"><span>CREATIVE THINKING. SERIOUS ENGINEERING.</span><a href="#lab">Enter the experience lab <ArrowUpRight size={14}/></a><span>SCROLL TO DISCOVER ↓</span></div>
 </section>;
}
