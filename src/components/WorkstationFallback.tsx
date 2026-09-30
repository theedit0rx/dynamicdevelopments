import {useRef,type CSSProperties} from 'react';
export default function WorkstationFallback({exploded=false,color='#c8ff32',moving=true}:{exploded?:boolean;color?:string;moving?:boolean}){
 const scene=useRef<HTMLDivElement>(null);
 return <div className={'workstation-fallback '+(exploded?'is-exploded':'')} ref={scene} style={{'--computer-accent':color} as CSSProperties} onPointerMove={e=>{if(!moving||e.pointerType!=='mouse')return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--computer-rotate',`${-12+(e.clientX-r.left)/r.width*24}deg`)}} onPointerLeave={()=>scene.current?.style.removeProperty('--computer-rotate')} role="img" aria-label={`Dimensional desktop computer displaying the Dynamic Developments logo${exploded?', with separated screen layers':''}`}>
  <div className="css-computer">
   <div className="computer-monitor"><div className="computer-display"><div className="computer-browser"><span>● ● ●</span><small>dynamic studio</small><span>↗</span></div><div className="computer-brand"><img src="/favicon.svg" alt=""/><strong>dynamic<span>developments</span></strong><small>IMAGINATION, ENGINEERED.</small></div><div className="computer-bottom"><span>DESIGN</span><i/><span>DEVELOP</span><i/><span>DEPLOY</span></div></div><div className="computer-chin"><i/></div></div>
   <div className="computer-neck"/><div className="computer-foot"/>
   <div className="computer-keyboard">{Array.from({length:40},(_,i)=><i key={i}/>)}<b/></div><div className="computer-mouse"><i/></div>
  </div>
 </div>
}
