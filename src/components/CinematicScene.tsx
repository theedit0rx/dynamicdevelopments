import { motion, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight, Check, CircleDot, MousePointer2, Layers3, Globe2, Smartphone, Sparkles } from 'lucide-react';
import Logo from './Logo';

type Direction='left'|'right'|'top'|'bottom';
function Fly({progress,moving,from,delay=0,className='',children}:{progress:MotionValue<number>,moving:boolean,from:Direction,delay?:number,className?:string,children:React.ReactNode}){
 // Scroll offsets are chapter-relative. Motion begins once chapter is pinned,
 // and reverses naturally when visitors scroll back up.
 const start=.32+delay,arrive=.46+delay,depart=.69+delay/2,leave=.87+delay/2;
 const xStart=from==='left'?-370:from==='right'?370:0;
 const yStart=from==='top'?-300:from==='bottom'?300:0;
 const x=useTransform(progress,[start,arrive,depart,leave],[xStart,0,0,-xStart*.28]);
 const y=useTransform(progress,[start,arrive,depart,leave],[yStart,0,0,-yStart*.28]);
 const rotation=useTransform(progress,[start,arrive,depart,leave],[from==='left'?-13:from==='right'?13:from==='top'?8:-8,0,0,0]);
 const opacity=useTransform(progress,[start,arrive,depart,leave],[0,1,1,.45]);
 const blur=useTransform(progress,[start,arrive],[7,0]);
 const filter=useTransform(blur,v=>'blur('+v+'px)');
 return <motion.div className={'dd-cinema-fly '+className} aria-hidden="true" style={moving?{x,y,rotate:rotation,opacity,filter}:undefined}>{children}</motion.div>;
}
function Browser({project=false}:{project?:boolean}){
 return <div className="dd-cinema-browser">
  <div className="dd-cinema-browser-toolbar"><span className="dd-cinema-dots"><i/><i/><i/></span><span>{project?'semesterone.vercel.app':'dynamic / the future, in progress'}</span><ArrowUpRight size={15}/></div>
  {project?<div className="dd-cinema-real-preview"><img src="/physics-portfolio.jpg" alt="" loading="lazy"/><span>REAL WORK · THE LIVING PHYSICS BOOK</span></div>:
  <div className="dd-cinema-site-preview"><div className="dd-cinema-site-header"><Logo size={35}/><span>DYNAMIC <small>DEVELOPMENTS</small></span><i>✳</i></div><strong>Make<br/>something<br/><em>remarkable.</em></strong><div className="dd-cinema-site-line"/><span>DESIGN. DEVELOP. DEPLOY. ↗</span><div className="dd-cinema-site-shapes"><i/><i/><i/></div></div>}
 </div>
}
export default function CinematicScene({index,progress,moving}:{index:number,progress:MotionValue<number>,moving:boolean}){
 const backdropY=useTransform(progress,[.2,.8],[-34,48]);
 return <div className={'dd-cinema dd-cinema-'+index} aria-label={index===0?'Editorial design moodboard assembles from multiple directions':index===1?'Website preview, code and mobile device fly together into a product experience':'Real product preview and original Dynamic identity converge to form a launch scene'}>
  <motion.div className="dd-cinema-backdrop" aria-hidden="true" style={moving?{y:backdropY}:undefined}><i/><i/><i/></motion.div>
  {index===0&&<>
   <Fly moving={moving} progress={progress} from="left" className="dd-cinema-brief"><div className="dd-cinema-brief-top"><span>01 / CREATIVE BRIEF</span><CircleDot size={18}/></div><div className="dd-cinema-brief-focus">A clear<br/><i>vision.</i></div><div className="dd-cinema-brief-tiny">THE FIRST STEP TO SOMETHING DIFFERENT</div><div className="dd-cinema-brief-rules"><i/><i/><i/></div></Fly>
   <Fly moving={moving} progress={progress} from="right" delay={.02} className="dd-cinema-photo"><img src="/vmart-portfolio.jpg" alt=""/><span>VISUAL DIRECTION / 002</span></Fly>
   <Fly moving={moving} progress={progress} from="top" delay={.012} className="dd-cinema-type"><span>FORM & FUNCTION</span><b>Aa</b><small>SPACE GROTESK / EDITORIAL SYSTEM</small></Fly>
   <Fly moving={moving} progress={progress} from="bottom" delay={.028} className="dd-cinema-swatches"><span>COLOR THEORY</span><div><i/><i/><i/><i/></div><small>YOUR IDENTITY, EXPLORED.</small></Fly>
  </>}
  {index===1&&<>
   <Fly moving={moving} progress={progress} from="bottom" className="dd-cinema-main-browser"><Browser/></Fly>
   <Fly moving={moving} progress={progress} from="right" delay={.016} className="dd-cinema-phone"><div className="dd-cinema-phone-camera"/><div className="dd-cinema-phone-inner"><Logo size={35}/><b>GOOD DESIGN<br/>GOES EVERYWHERE.</b><span>MADE FOR MOBILE ↗</span><i/><i/></div></Fly>
   <Fly moving={moving} progress={progress} from="left" delay={.027} className="dd-cinema-code"><div><span>DEVELOPMENT / 01</span><Layers3 size={14}/></div><code><i>const</i> experience =<br/> {'{'} <em>remarkable</em>: true {'}'};</code><span>BUILD WITH INTENTION</span></Fly>
   <Fly moving={moving} progress={progress} from="top" delay={.01} className="dd-cinema-orbit-label"><Sparkles size={14}/> A SINGLE, COHERENT EXPERIENCE</Fly>
  </>}
  {index===2&&<>
   <Fly moving={moving} progress={progress} from="left" className="dd-cinema-live-browser"><Browser project/></Fly>
   <Fly moving={moving} progress={progress} from="right" delay={.014} className="dd-cinema-launch-mark"><div className="dd-cinema-launch-glow"/><Logo size={116} glow/><b>Made<br/><em>real.</em></b><span>DYNAMIC DEVELOPMENTS ©</span></Fly>
   <Fly moving={moving} progress={progress} from="top" delay={.023} className="dd-cinema-live-status"><Globe2 size={19}/><div><span>PROJECT STATUS</span><b>LIVE ON THE WEB</b></div><Check size={18}/></Fly>
   <Fly moving={moving} progress={progress} from="bottom" delay={.025} className="dd-cinema-devices"><Smartphone size={20}/><span>DESKTOP / TABLET / MOBILE</span><ArrowUpRight size={19}/></Fly>
  </>}
  <div className="dd-cinema-caption"><span>{['DISCOVER THE IDEA','ENGINEER THE EXPERIENCE','SHOW IT TO THE WORLD'][index]}</span><span><MousePointer2 size={13}/> KEEP SCROLLING</span></div>
 </div>;
}
