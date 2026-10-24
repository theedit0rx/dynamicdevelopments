import { useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, MoveUpRight, MousePointer2 } from 'lucide-react';
import Logo from './Logo';

/* The original laptop-and-pixels SVG stays untouched;
 * the perspective and reflected light move around it. */
export default function HeroMachine({ playing }: { playing: boolean }) {
  const mx=useMotionValue(0),my=useMotionValue(0);
  const sx=useSpring(mx,{stiffness:90,damping:27,mass:.65});
  const sy=useSpring(my,{stiffness:90,damping:27,mass:.65});
  const rotateY=useTransform(sx,[-1,1],[-13,13]);
  const rotateX=useTransform(sy,[-1,1],[10,-10]);
  const accentX=useTransform(sx,[-1,1],[-35,35]);
  const accentY=useTransform(sy,[-1,1],[-35,35]);
  const onMove=useCallback((e:React.PointerEvent<HTMLDivElement>)=>{
    if(!playing||e.pointerType!=='mouse')return;
    const r=e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX-r.left)/r.width-.5)*2);
    my.set(((e.clientY-r.top)/r.height-.5)*2);
    e.currentTarget.style.setProperty('--light-x',(((e.clientX-r.left)/r.width)*100).toFixed(1)+'%');
    e.currentTarget.style.setProperty('--light-y',(((e.clientY-r.top)/r.height)*100).toFixed(1)+'%');
  },[playing,mx,my]);
  const onLeave=useCallback(()=>{mx.set(0);my.set(0)},[mx,my]);
  return <div className={'dd-art dd-luxe-world'+(playing?' dd-luxe-playing':'')} onPointerMove={onMove} onPointerLeave={onLeave} aria-label="Dynamic Developments original blue pixel-laptop logo inside a three-dimensional, cursor-reactive illuminated studio sculpture">
    <div className="dd-luxe-light" aria-hidden="true"/>
    <div className="dd-luxe-lines" aria-hidden="true"/>
    <div className="dd-luxe-ellipse dd-luxe-ellipse-one" aria-hidden="true"/>
    <div className="dd-luxe-ellipse dd-luxe-ellipse-two" aria-hidden="true"/>
    <motion.div className="dd-luxe-halo" style={playing?{x:accentX,y:accentY}:undefined} aria-hidden="true"/>
    <div className="dd-luxe-index" aria-hidden="true"><span>FIG. 001</span><span>IDENTITY IN MOTION</span></div>
    <motion.div className="dd-luxe-object" style={playing?{rotateX,rotateY}:undefined}>
      <div className="dd-luxe-object-edge"/>
      <div className="dd-luxe-object-face">
        <div className="dd-luxe-object-reflection" aria-hidden="true"/>
        <div className="dd-luxe-object-label">DYNAMIC <span>®</span></div>
        <div className="dd-luxe-original-mark"><Logo size={240} glow/></div>
        <div className="dd-luxe-brand-name"><strong>DYNAMIC</strong><span>DEVELOPMENTS</span></div>
        <div className="dd-luxe-object-foot"><span>IMAGINATION, ENGINEERED.</span><MoveUpRight size={16}/></div>
      </div>
    </motion.div>
    <motion.div className="dd-luxe-plate dd-luxe-plate-a" style={playing?{x:accentX}:undefined} aria-hidden="true">
      <span>CREATIVE CODE / 01</span><div className="dd-luxe-plate-art"><i/><i/><i/><i/></div><strong>WHERE IDEAS<br/>TAKE FORM.</strong>
    </motion.div>
    <motion.div className="dd-luxe-plate dd-luxe-plate-b" style={playing?{y:accentY}:undefined} aria-hidden="true">
      <div className="dd-luxe-signal"><span>LIVE PROCESS</span><b>●</b></div><div className="dd-luxe-chart"><i/><i/><i/><i/><i/><i/><i/></div><span>DESIGN × DEVELOPMENT</span>
    </motion.div>
    <div className="dd-luxe-bottom"><span>ORIGINAL IDENTITY / © DYNAMIC</span><span><MousePointer2 size={13}/> INTERACT WITH THE OBJECT</span><ArrowUpRight size={17}/></div>
  </div>;
}
