import { motion, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight, Check, Code2, Globe2, Layers3, MousePointer2, Sparkles, Smartphone, Zap } from 'lucide-react';
import Logo from './Logo';

type Direction='left'|'right'|'top'|'bottom';
function FlyingPiece({children,from,progress,order=0,moving,className=''}:{children:React.ReactNode,from:Direction,progress:MotionValue<number>,order?:number,moving:boolean,className?:string}) {
 const start=.12+order*.021,stop=.35+order*.023,out=.79+order*.009,end=.95+order*.007;
 const dx=from==='left'?-440:from==='right'?440:0;
 const dy=from==='top'?-380:from==='bottom'?390:0;
 const x=useTransform(progress,[start,stop,out,end],[dx,0,0,-dx*.48]);
 const y=useTransform(progress,[start,stop,out,end],[dy,0,0,-dy*.53]);
 const rotate=useTransform(progress,[start,stop,out,end],[from==='left'?-21:from==='right'?18:from==='top'?-12:12,0,0,from==='left'?8:-8]);
 const opacity=useTransform(progress,[start,stop,out,end],[0,1,1,0]);
 return <motion.div className={'dd-magic-piece '+className} style={moving?{x,y,rotate,opacity}:undefined} aria-hidden="true">{children}</motion.div>;
}
function BrowserWindow(){return <div className="dd-magic-browser" aria-hidden="true">
 <div className="dd-magic-browser-bar"><span>● ● ●</span><span>your-future-website.com</span><ArrowUpRight size={13}/></div>
 <div className="dd-magic-browser-inside">
  <div className="dd-magic-app-brand"><Logo size={37}/><span>DYNAMIC<small>DEVELOPMENTS</small></span></div>
  <strong>Ideas into<br/><em>experiences.</em></strong>
  <div className="dd-magic-app-actions"><span>EXPLORE WORK ↗</span><i>✳</i></div>
  <div className="dd-magic-app-grid"><b/><b/><b/></div>
 </div>
 </div>}

export default function MagicScene({index,progress,moving}:{index:number,progress:MotionValue<number>,moving:boolean}){
 const lift=useTransform(progress,[0,.36,.76,1],[55,0,0,-32]);
 const orbit=useTransform(progress,[0,1],[-65,95]);
 if(index===0)return <div className="dd-magic-stage dd-magic-stage-idea" aria-label="Four creative brief cards fly in from different sides and form a project plan">
  <motion.div className="dd-magic-halo" style={moving?{y:orbit}:undefined} aria-hidden="true"/>
  <motion.div className="dd-magic-idea-center" style={moving?{y:lift}:undefined} aria-hidden="true"><div className="dd-magic-center-icon"><Sparkles size={27}/></div><small>EVERYTHING BEGINS WITH</small><b>YOUR IDEA<span>✳</span></b><i>LET'S MAKE IT REAL</i></motion.div>
  <FlyingPiece from="left" order={0} progress={progress} moving={moving} className="dd-fly-idea-a"><div className="dd-brief-icon"><MousePointer2 size={18}/></div><small>01 / YOUR AUDIENCE</small><b>Who is it for?</b><div className="dd-pills"><i/><i/><i/></div></FlyingPiece>
  <FlyingPiece from="top" order={1} progress={progress} moving={moving} className="dd-fly-idea-b"><span className="dd-piece-label"><Sparkles size={14}/> INSPIRATION</span><div className="dd-color-dots"><i/><i/><i/><i/></div><b>Different by design.</b></FlyingPiece>
  <FlyingPiece from="right" order={2} progress={progress} moving={moving} className="dd-fly-idea-c"><span className="dd-piece-label"><Globe2 size={14}/> YOUR GOAL</span><b>Make it matter.</b><div className="dd-signal"><i/><i/><i/><i/><i/></div></FlyingPiece>
  <FlyingPiece from="bottom" order={3} progress={progress} moving={moving} className="dd-fly-idea-d"><span className="dd-piece-label"><Check size={14}/> THE FIRST STEP</span><b>Let's plan it together.</b><div className="dd-progress-mock"><i/></div></FlyingPiece>
 </div>;
 if(index===1)return <div className="dd-magic-stage dd-magic-stage-build" aria-label="A full website interface assembling from floating design and development panels">
  <motion.div className="dd-magic-halo" style={moving?{y:orbit}:undefined} aria-hidden="true"/>
  <motion.div className="dd-magic-build-core" style={moving?{y:lift}:undefined}><BrowserWindow/></motion.div>
  <FlyingPiece from="left" progress={progress} order={0} moving={moving} className="dd-fly-build-a"><span><Layers3 size={14}/> COMPONENTS</span><strong>01 ━ 02 ━ 03</strong><i>Reusable. Beautiful.</i></FlyingPiece>
  <FlyingPiece from="top" progress={progress} order={1} moving={moving} className="dd-fly-build-b"><span><Code2 size={14}/> FRONTEND</span><code>{'<motion.div />'}</code></FlyingPiece>
  <FlyingPiece from="right" progress={progress} order={2} moving={moving} className="dd-fly-build-c"><span>COLOR LAB ✦</span><div className="dd-colors"><i/><i/><i/><i/></div><small>BUILT AROUND YOU</small></FlyingPiece>
  <FlyingPiece from="bottom" progress={progress} order={3} moving={moving} className="dd-fly-build-d"><span><Zap size={14}/> INTERACTIONS</span><b>FEELS AS GOOD AS IT LOOKS</b></FlyingPiece>
 </div>;
 return <div className="dd-magic-stage dd-magic-stage-launch" aria-label="A live digital product surrounded by devices, launch status and quality checks">
  <motion.div className="dd-magic-halo" style={moving?{y:orbit}:undefined} aria-hidden="true"/>
  <motion.div className="dd-magic-launch-core" style={moving?{y:lift}:undefined}><div className="dd-magic-launch-header"><span>WE'RE LIVE <i/></span><ArrowUpRight size={20}/></div><Logo size={108} glow/><b>Built for<br/>real people.</b><small>FROM IDEA → INTERNET</small></motion.div>
  <FlyingPiece from="left" progress={progress} order={0} moving={moving} className="dd-fly-launch-a"><Globe2 size={22}/><div><b>Deployed.</b><small>READY FOR THE WEB</small></div><Check size={18}/></FlyingPiece>
  <FlyingPiece from="top" progress={progress} order={1} moving={moving} className="dd-fly-launch-b"><span>PERFORMANCE CHECK</span><strong>FAST + RESPONSIVE</strong><div className="dd-progress-mock"><i/></div></FlyingPiece>
  <FlyingPiece from="right" progress={progress} order={2} moving={moving} className="dd-fly-launch-c"><Smartphone size={30}/><div><b>Made for every screen.</b><small>DESKTOP / TABLET / MOBILE</small></div></FlyingPiece>
  <FlyingPiece from="bottom" progress={progress} order={3} moving={moving} className="dd-fly-launch-d"><span>IMAGINATION, ENGINEERED.</span><ArrowUpRight size={18}/></FlyingPiece>
 </div>;
}
