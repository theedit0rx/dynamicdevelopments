import {useRef,useState,type CSSProperties} from 'react';
import {ArrowUpRight,Bot,Boxes,Gauge,MousePointer2,ShoppingBag,Sparkles} from 'lucide-react';

const MODES=[
 {id:'cinematic',label:'Cinematic',eyebrow:'STORY-FIRST EXPERIENCE',title:'Launch with impact.',desc:'Editorial scale, depth and motion for brands that need a memorable first impression.',accent:'#c8ff32',Icon:Sparkles},
 {id:'commerce',label:'Commerce',eyebrow:'CONVERSION-FLOW EXPERIENCE',title:'Make discovery feel effortless.',desc:'Product storytelling, clearer hierarchy and interaction patterns that keep the path to action obvious.',accent:'#50e3e1',Icon:ShoppingBag},
 {id:'ai',label:'AI',eyebrow:'INTELLIGENT INTERFACE',title:'Make the product feel responsive.',desc:'Useful AI surfaces, guided actions and dynamic feedback without turning the interface into a chatbot demo.',accent:'#a991ff',Icon:Bot},
 {id:'depth',label:'3D',eyebrow:'SPATIAL EXPERIENCE',title:'Add dimension with purpose.',desc:'3D, light and perspective used where they improve understanding, attention or product presence.',accent:'#6fb7ff',Icon:Boxes}
];

export default function ExperienceLab(){
 const [mode,setMode]=useState(0);
 const [motion,setMotion]=useState(72);
 const preview=useRef<HTMLDivElement>(null);
 const current=MODES[mode];
 const speed=12-motion*.075,depth=10+motion*.22;
 const style={'--lab-accent':current.accent,'--lab-motion':String(motion/100),'--lab-speed':`${speed.toFixed(2)}s`,'--lab-speed-slow':`${(speed*1.35).toFixed(2)}s`,'--lab-depth':`${depth.toFixed(1)}px`,'--lab-depth-sm':`${(depth*.6).toFixed(1)}px`,'--lab-depth-lg':`${(depth*1.2).toFixed(1)}px`} as CSSProperties;

 const move=(e:React.PointerEvent<HTMLDivElement>)=>{
  const el=preview.current;if(!el)return;
  const r=el.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width;
  const y=(e.clientY-r.top)/r.height;
  el.style.setProperty('--lab-x',`${(x*100).toFixed(1)}%`);
  el.style.setProperty('--lab-y',`${(y*100).toFixed(1)}%`);
  el.style.setProperty('--lab-rx',`${((.5-y)*5).toFixed(2)}deg`);
  el.style.setProperty('--lab-ry',`${((x-.5)*6).toFixed(2)}deg`);
 };
 const reset=()=>{const el=preview.current;if(!el)return;el.style.setProperty('--lab-rx','0deg');el.style.setProperty('--lab-ry','0deg')};

 return <section id="lab" className="experience-lab wrap section" style={style}>
  <div className="eyebrow"><span>04 /</span>LIVE EXPERIENCE LAB</div>
  <div className="lab-heading">
   <div><h2>Don’t just show it.<br/><span>Let people feel it.</span></h2></div>
   <p>Switch directions, change the motion level and move your pointer across the preview. This is the kind of interaction system we can build around a real product or brand.</p>
  </div>

  <div className="lab-shell">
   <aside className="lab-controls">
    <div className="lab-control-title"><MousePointer2 size={17}/><span>Choose a direction</span></div>
    <div className="lab-mode-list" role="tablist" aria-label="Experience direction">
     {MODES.map((item,i)=><button key={item.id} role="tab" aria-selected={mode===i} onClick={()=>setMode(i)}>
      <span className="lab-mode-icon"><item.Icon size={17}/></span>
      <span><small>0{i+1}</small><strong>{item.label}</strong></span>
      <i/>
     </button>)}
    </div>
    <div className="lab-motion-control">
     <label htmlFor="motion-level"><span><Gauge size={16}/>Motion intensity</span><b>{motion}%</b></label>
     <input id="motion-level" type="range" min="20" max="100" value={motion} onChange={e=>setMotion(Number(e.target.value))}/>
     <div><span>Calm</span><span>Expressive</span></div>
    </div>
    <a className="action primary lab-cta" href="#contact">Build this direction <ArrowUpRight size={18}/></a>
   </aside>

   <div className="lab-stage-wrap">
    <div className="lab-stage-meta"><span><i/>LIVE SYSTEM</span><b>{current.label.toUpperCase()} MODE</b></div>
    <div ref={preview} className={`lab-preview lab-${current.id}`} onPointerMove={move} onPointerLeave={reset}>
     <div className="lab-browser">
      <div className="lab-browser-top"><div><i/><i/><i/></div><span>dynamic://experience-lab</span><b>LIVE</b></div>
      <div className="lab-canvas">
       <div className="lab-grid" aria-hidden="true"/>
       <div className="lab-orbit orbit-a" aria-hidden="true"/>
       <div className="lab-orbit orbit-b" aria-hidden="true"/>
       <div className="lab-glow" aria-hidden="true"/>
       <div className="lab-copy" aria-live="polite">
        <small>{current.eyebrow}</small>
        <h3>{current.title}</h3>
        <p>{current.desc}</p>
        <div><button type="button" onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>Start a project <ArrowUpRight size={14}/></button><span>DESIGN / CODE / MOTION</span></div>
       </div>
       <div className="lab-ui-stack" aria-hidden="true">
        <article className="lab-card card-main"><span>01</span><strong>{current.label}</strong><i/></article>
        <article className="lab-card card-side"><span>02</span><strong>Interaction</strong><i/></article>
        <article className="lab-card card-mini"><span>03</span><strong>System</strong><i/></article>
       </div>
       <div className="lab-particles" aria-hidden="true">{Array.from({length:14},(_,i)=><i key={i}/>)}</div>
      </div>
     </div>
    </div>
    <div className="lab-stage-foot"><span>MOVE POINTER TO BEND THE SCENE</span><span>ADAPTIVE MOTION · RESPONSIVE · ACCESSIBLE</span></div>
   </div>
  </div>
 </section>;
}
