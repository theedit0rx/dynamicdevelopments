import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowUpRight, ArrowDown, Check, ChevronDown, Code2, Menu, X, Pause, Play, MousePointer2, Mail, Copy, MoveUpRight, Palette, Rocket, ExternalLink } from 'lucide-react';
import Logo from './components/Logo';
import HeroMachine from './components/HeroMachine';
import MagicScene from './components/MagicScene';
import { services, work, plans, faqs, options } from './components/StudioData';
import './relaunch.css';
import './magic.css';

const EMAIL = 'dynamicwebdeveloping@gmail.com';
const LINKS = [['Work','work'],['Services','services'],['Approach','approach'],['Pricing','pricing']] as const;
const THUMBNAILS: Record<string,string> = { physics:'/physics-portfolio.jpg', vmart:'/vmart-portfolio.jpg', bit:'/bit-portfolio.jpg' };
const COLORS: Record<string,string> = { physics:'#c8ff32', vmart:'#b2a7ff', bit:'#72cafa' };
const SMOOTH = [0.22,1,0.36,1] as const;

function Reveal({ children, className = '', delay = 0 }: {children:ReactNode,className?:string,delay?:number}) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : {opacity:0,y:44,filter:'blur(7px)'}} whileInView={{opacity:1,y:0,filter:'blur(0px)'}} viewport={{once:true,amount:.13,margin:'0px 0px -5% 0px'}} transition={{duration:.82,delay,ease:SMOOTH}}>{children}</motion.div>;
}
function Eyebrow({number,children}:{number:string,children:ReactNode}) {
  return <span className="dd-eyebrow"><i>{number}</i><span>{children}</span></span>;
}
function TopBar({moving,onMotion}:{moving:boolean,onMotion:()=>void}) {
  const [menu,setMenu]=useState(false);
  useEffect(()=>{document.body.style.overflow=menu?'hidden':'';return()=>{document.body.style.overflow=''}},[menu]);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenu(false)};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[]);
  return <>
    <header className="dd-header">
      <a href="#home" className="dd-wordmark" aria-label="Dynamic Developments — home" onClick={()=>setMenu(false)}><Logo size={39}/><span>DYNAMIC<small>DEVELOPMENTS</small></span></a>
      <nav className="dd-nav-links" aria-label="Main navigation">{LINKS.map(([title,id])=><a key={id} href={'#'+id}>{title}</a>)}</nav>
      <div className="dd-nav-actions"><button className="dd-pause" onClick={onMotion} aria-label={moving?'Pause animations':'Play animations'} title={moving?'Pause animations':'Play animations'}>{moving?<Pause size={16}/>:<Play size={16}/>}</button><a href="#contact" className="dd-nav-cta">Start a project <ArrowUpRight size={17}/></a><button className="dd-burger" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} aria-controls="dd-mobile-navigation" onClick={()=>setMenu(v=>!v)}>{menu?<X/>:<Menu/>}</button></div>
    </header>
    <AnimatePresence>{menu && <motion.nav id="dd-mobile-navigation" className="dd-mobile-menu" aria-label="Mobile navigation" initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:.22}}>{[...LINKS,['Contact','contact'] as const].map(([title,id],i)=><a key={id} href={'#'+id} onClick={()=>setMenu(false)}><small>0{i+1}</small>{title}<ArrowUpRight size={22}/></a>)}</motion.nav>}</AnimatePresence>
  </>;
}
function Hero({moving}:{moving:boolean}) {
  const ref=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
  const headY=useTransform(scrollYProgress,[0,1],[0,-90]);
  const sceneY=useTransform(scrollYProgress,[0,1],[0,110]);
  const sceneRotate=useTransform(scrollYProgress,[0,1],[0,8]);
  const fade=useTransform(scrollYProgress,[0,.8,1],[1,1,.25]);
  return <section className="dd-hero" id="home" ref={ref}>
    <div className="dd-hero-decoration" aria-hidden="true">01 / CREATIVE ENGINEERING STUDIO</div>
    <motion.div className="dd-hero-copy" style={moving?{y:headY,opacity:fade}:undefined}>
      <Reveal><div className="dd-status"><span className="dd-status-dot"/>INDEPENDENT DIGITAL STUDIO · INDIA</div></Reveal>
      <motion.h1 initial={moving?{opacity:0,y:65}:false} animate={{opacity:1,y:0}} transition={{duration:1.05,ease:SMOOTH}}><span className="dd-hero-line">We make</span><span className="dd-hero-line">digital</span><span className="dd-hero-line dd-hero-accent">feel alive<span className="dd-hero-period">.</span></span></motion.h1>
      <Reveal delay={.1}><p className="dd-hero-lead">Beautiful websites. Useful digital products. Thoughtful AI. <strong>Built to work brilliantly — and feel different.</strong></p><div className="dd-hero-ctas"><a className="dd-button dd-button-lime" href="#work">Explore our work <ArrowUpRight size={19}/></a><a className="dd-text-link" href="#services">What we can build <ArrowDown size={18}/></a></div></Reveal>
    </motion.div>
    <motion.div className="dd-hero-stage" style={moving?{y:sceneY,rotate:sceneRotate}:undefined}>
      <div className="dd-stage-border" aria-hidden="true"><span>DD / EXPERIMENT 001</span><span>INTERACTIVE OBJECT ↗</span></div>
      <HeroMachine playing={moving}/>
    </motion.div>
    <div className="dd-hero-bottom"><span>DESIGN · CODE · 3D · AI</span><span>SCROLL TO EXPLORE <ArrowDown size={15}/></span><span>EST. IN INDIA / WORLDWIDE WEB</span></div>
  </section>;
}
const TICKER=['WEB DESIGN','CREATIVE DEVELOPMENT','INTERACTIVE 3D','AI & AUTOMATION','EXPERIENCES THAT MOVE'];
function Ticker() { return <div className="dd-ticker" aria-label="Web design, creative development, interactive 3D, AI and automation"><div className="dd-ticker-track">{[0,1,2].map(i=><div className="dd-ticker-set" aria-hidden={i>0} key={i}>{TICKER.map((x,j)=><span key={x}>{x}<b>{j%2?'✦':'✳'}</b></span>)}</div>)}</div></div>; }
const ACTS=[
  {id:'01',label:'START WITH THE IDEA',title:'Tell us what you imagine.',desc:'A business website, an online store, a learning platform, or a completely new product. We start by understanding what you actually need.',detail:'We listen. We plan. We make the complicated feel simple.',color:'#c8ff32'},
  {id:'02',label:'TURN IT INTO SOMETHING REAL',title:'Watch your idea come alive.',desc:'We connect clear design with real engineering: layouts, interactions, content, responsive code, and practical integrations.',detail:'Design and development happen together — not in silos.',color:'#b9afff'},
  {id:'03',label:'LAUNCH WITH PURPOSE',title:'Make your mark online.',desc:'A finished digital experience you can show the world, use on your phone, and grow with. No mystery — just purposeful work.',detail:'Tested, refined and ready for real people.',color:'#80dbeb'}
];
function JourneyChapter({act,index,moving}:{act:typeof ACTS[number],index:number,moving:boolean}) {
  const chapter=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({target:chapter,offset:['start end','end start']});
  return <section ref={chapter} className={'dd-journey-chapter dd-journey-chapter-'+index} aria-labelledby={'journey-title-'+index}>
    <div className="dd-journey-panel">
      <div className="dd-journey-meta"><span>THE PROCESS / CHAPTER {act.id}</span><span>THE SCENE MOVES AS YOU SCROLL <ArrowDown size={13}/></span></div>
      <div className="dd-journey-inner">
        <div className="dd-journey-copy">
          <div className="dd-journey-label">0{index+1} / 03 — {act.label}</div>
          <h2 id={'journey-title-'+index}>{act.title}</h2>
          <p>{act.desc}</p>
          <div className="dd-journey-detail"><i>↗</i> {act.detail}</div>
        </div>
        <MagicScene index={index} progress={scrollYProgress} moving={moving}/>
      </div>
      <div className="dd-journey-floor"><span>IDEA → DESIGN → BUILD → LAUNCH</span><span>{act.id} / 03</span></div>
    </div>
  </section>;
}
function Story({moving}:{moving:boolean}) {
  return <section id="story" className="dd-journey" aria-label="How your idea becomes a finished experience">
    <div className="dd-journey-intro"><span>WHAT HAPPENS WHEN YOU WORK WITH US?</span><strong>From your first idea<br/>to the finished thing. ↓</strong></div>
    {ACTS.map((act,i)=><JourneyChapter act={act} index={i} moving={moving} key={act.id}/>)}
  </section>;
}
function ProjectCard({project,index,moving}:{project:typeof work[number],index:number,moving:boolean}) {
  const ref=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const y=useTransform(scrollYProgress,[0,1],[-32,45]);
  const tint=COLORS[project.id]||'#c8ff32';
  return <article ref={ref} className="dd-project-card" style={{'--project-color':tint,'--project-index':index} as React.CSSProperties}>
    <div className="dd-project-copy">
      <div className="dd-project-number"><span>0{index+1}</span><span>{project.category.toUpperCase()} / {project.tag}</span></div>
      <Reveal><h3>{project.name}</h3><p>{project.description}</p><div className="dd-project-chips">{project.highlights.map(x=><span key={x}>{x}</span>)}</div></Reveal>
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="dd-project-link">Explore live project <ArrowUpRight size={22}/></a>
      {project.id==='vmart'&&<small className="dd-project-disclaimer">Independent design demo; not an official V-Mart commission. Orders and payments aren't live.</small>}
    </div>
    <div className="dd-project-visual" aria-label={'Preview of '+project.name}>
      <div className="dd-window-top"><span><i/><i/><i/></span><span>{new URL(project.url).hostname}</span><ExternalLink size={14}/></div>
      <motion.img src={THUMBNAILS[project.id]} style={moving?{y}:undefined} alt={project.name+' website preview'} loading="lazy" decoding="async"/>
      <div className="dd-project-visual-bottom"><span>REAL BUILD / 0{index+1}</span><MoveUpRight size={23}/></div>
    </div>
  </article>;
}
function Work({moving}:{moving:boolean}) { return <section id="work" className="dd-work dd-container dd-section">
  <Reveal className="dd-section-intro"><Eyebrow number="01">SELECTED PROJECTS</Eyebrow><h2>Not just promises.<br/><em>Real things we've built.</em></h2><p>Explore actual websites. Tap a project to see it working.</p></Reveal>
  <div className="dd-project-stack">{work.map((item,i)=><ProjectCard key={item.id} project={item} index={i} moving={moving}/>)}</div>
</section>; }
function Services() {
 const [active,setActive]=useState<number|null>(0);
 return <section id="services" className="dd-services dd-section">
   <div className="dd-container dd-services-wrap"><div className="dd-services-heading"><Reveal><Eyebrow number="02">WHAT WE DO</Eyebrow><h2>One idea.<br/><em>Many ways to build.</em></h2><p>No complicated jargon. Choose what you need — we'll figure out how to make it exceptional.</p><a className="dd-text-link" href="#contact">Tell us your idea <ArrowUpRight size={17}/></a></Reveal><div className="dd-services-asterisk" aria-hidden="true">✳</div></div>
   <div className="dd-services-list">{services.map((s,i)=>{const Icon=s.icon;const expanded=active===i;return <article className={'dd-service-row'+(expanded?' dd-service-open':'')} key={s.title}><button aria-expanded={expanded} aria-controls={'dd-service-'+i} onClick={()=>setActive(expanded?null:i)}><span className="dd-service-num">0{i+1}</span><span className="dd-service-icon"><Icon size={20} strokeWidth={1.7}/></span><span className="dd-service-title"><strong>{s.title}</strong><small>{s.sub}</small></span><span className="dd-service-plus">{expanded?'−':'+'}</span></button><AnimatePresence initial={false}>{expanded&&<motion.div id={'dd-service-'+i} key="content" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.3}} style={{overflow:'hidden'}}><div className="dd-service-body"><p>{s.text}</p><ul>{s.items.map(item=><li key={item}><Check size={14}/>{item}</li>)}</ul></div></motion.div>}</AnimatePresence></article>})}</div>
   </div>
 </section>;
}
const PROCESS=[{num:'01',name:'Listen & plan',desc:'You tell us your goals. We define a clear scope and direction.',icon:MousePointer2},{num:'02',name:'Design the experience',desc:'We shape the visual story, content, and interactions.',icon:Palette},{num:'03',name:'Build & refine',desc:'Real code, responsive layouts, and testing on devices.',icon:Code2},{num:'04',name:'Launch & support',desc:'We deploy, hand over, and agree on any further updates.',icon:Rocket}];
function Approach() {return <section id="approach" className="dd-approach dd-section"><div className="dd-container">
  <Reveal><Eyebrow number="03">OUR APPROACH</Eyebrow><h2>Beautiful is good.<br/><em>Useful is better.</em></h2><p className="dd-approach-lead">Great design should make people stop. Great usability should help them move forward.</p></Reveal>
  <div className="dd-process-grid">{PROCESS.map((step,i)=>{const Icon=step.icon;return <Reveal key={step.name} delay={i*.08} className="dd-process"><div className="dd-process-top"><span>{step.num} / 04</span><Icon size={25} strokeWidth={1.5}/></div><h3>{step.name}</h3><p>{step.desc}</p><span className="dd-process-arrow"><ArrowUpRight size={19}/></span></Reveal>})}</div>
  <Reveal className="dd-approach-outro"><span>THOUGHTFUL, NOT TEMPLATE-DRIVEN.</span><span>EVERY SCREEN HAS A JOB TO DO.</span></Reveal>
</div></section>}
function Manifesto() {
 const ref=useRef<HTMLElement>(null);
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const x=useTransform(scrollYProgress,[0,1],['5%','-21%']);
 const x2=useTransform(scrollYProgress,[0,1],['-15%','10%']);
 return <section className="dd-manifesto" ref={ref} aria-label="Dynamic Developments — built different">
   <motion.div style={{x}} className="dd-manifesto-line">DESIGN IT <span>BETTER.</span> BUILD IT <span>BOLDER.</span></motion.div>
   <motion.div style={{x:x2}} className="dd-manifesto-line dd-manifesto-outline">DESIGN IT BETTER. BUILD IT BOLDER.</motion.div>
   <div className="dd-manifesto-foot"><span>DESIGN × DEVELOPMENT × INTELLIGENCE</span><span>WITH PURPOSE, ALWAYS ↗</span></div>
 </section>;
}
function Pricing() {return <section id="pricing" className="dd-pricing dd-container dd-section">
  <Reveal className="dd-section-intro"><Eyebrow number="04">TRANSPARENT STARTING POINTS</Eyebrow><h2>Big ideas.<br/><em>Clear beginnings.</em></h2><p>Pick a starting point. Your final quote depends on the work involved.</p></Reveal>
  <div className="dd-pricing-grid">{plans.map((plan,i)=><Reveal delay={i*.11} className={'dd-price-card'+(i===1?' dd-price-featured':'')} key={plan.name}><div className="dd-price-top"><span>0{i+1} / {plan.name.toUpperCase()}</span>{i===1&&<span className="dd-price-tag">MOST FLEXIBLE</span>}</div><h3>{plan.name}</h3><p>{plan.desc}</p><small>{i===2?'SCOPED TO YOUR IDEA':'STARTING FROM'}</small><div className="dd-price">{plan.cost}</div><ul>{plan.items.map(it=><li key={it}><Check size={15}/>{it}</li>)}</ul><a href="#contact" className="dd-price-link">Discuss {plan.name.toLowerCase()} <ArrowUpRight size={18}/></a></Reveal>)}</div>
  <p className="dd-price-note">Website pricing starts at ₹10,000. Domains, hosting and paid third-party services are quoted separately. No payment is collected here.</p>
</section>}
function FAQ(){return <section className="dd-faq dd-container dd-section"><Reveal><Eyebrow number="05">A FEW GOOD QUESTIONS</Eyebrow><h2>Let's make it <em>simple.</em></h2></Reveal><div className="dd-faq-wrap">{faqs.map(([q,a],i)=><Reveal key={q} delay={(i%3)*.06}><details><summary><span>0{i+1}</span><strong>{q}</strong><ChevronDown size={19}/></summary><p>{a}</p></details></Reveal>)}</div></section>}
type ContactInfo={name:string,email:string,business:string,type:string,budget:string,message:string};
function Contact(){
 const [info,setInfo]=useState<ContactInfo>({name:'',email:'',business:'',type:'Business Website',budget:'₹10,000–₹25,000',message:''});
 const [prepared,setPrepared]=useState(false);
 const [copyMessage,setCopyMessage]=useState('');
 const change=(key:keyof ContactInfo,value:string)=>{setInfo(v=>({...v,[key]:value}));setPrepared(false)};
 const brief='New project inquiry — Dynamic Developments\n\nName: '+info.name+'\nEmail: '+info.email+'\nBusiness: '+(info.business||'Not specified')+'\nType: '+info.type+'\nBudget: '+info.budget+'\n\nProject details:\n'+info.message;
 const mailto='mailto:'+EMAIL+'?subject='+encodeURIComponent('Project inquiry — '+(info.business||info.name))+'&body='+encodeURIComponent(brief);
 const copy=async()=>{try{await navigator.clipboard.writeText(brief);setCopyMessage('Brief copied to clipboard.')}catch{setCopyMessage('Copy unavailable here. Open the email draft instead.')}};
 return <section id="contact" className="dd-contact dd-section"><div className="dd-container dd-contact-grid">
  <Reveal className="dd-contact-left"><Eyebrow number="06">LET'S MAKE SOMETHING</Eyebrow><h2>Have an idea?<br/><em>Let's build it.</em></h2><p>No pressure and no unnecessary complexity. Tell us what you're imagining and we'll discuss what's possible.</p><a href={'mailto:'+EMAIL} className="dd-contact-email">{EMAIL}<ArrowUpRight size={21}/></a><div className="dd-contact-meta"><span><i/> BASED IN INDIA</span><span>BUILDING FOR THE WEB</span></div></Reveal>
  <Reveal className="dd-contact-form-wrap"><form onSubmit={e=>{e.preventDefault();setPrepared(true);setCopyMessage('')}}><div className="dd-form-label">YOUR PROJECT BRIEF <span>01 / 01</span></div><div className="dd-field-grid"><label>Your name *<input autoComplete="name" required placeholder="Your name" value={info.name} onChange={e=>change('name',e.target.value)}/></label><label>Your email *<input type="email" autoComplete="email" required placeholder="you@example.com" value={info.email} onChange={e=>change('email',e.target.value)}/></label><label>Business / brand<input placeholder="Optional" value={info.business} onChange={e=>change('business',e.target.value)}/></label><label>What are we building?<select value={info.type} onChange={e=>change('type',e.target.value)}>{[...options.map(o=>o.name),'AI & Automation'].map(o=><option key={o}>{o}</option>)}</select></label></div><label>Rough budget<select value={info.budget} onChange={e=>change('budget',e.target.value)}>{['₹10,000–₹25,000','₹25,000–₹50,000','₹50,000+','Let’s discuss'].map(o=><option key={o}>{o}</option>)}</select></label><label>Tell us about your idea *<textarea required rows={4} placeholder="What do you need, and who is it for?" value={info.message} onChange={e=>change('message',e.target.value)}/></label><button type="submit" className="dd-button dd-button-lime dd-form-submit">Prepare my inquiry <ArrowUpRight size={19}/></button><p className="dd-form-hint">This creates an email draft. Nothing is sent until you send it.</p>{prepared&&<div className="dd-form-prepared" role="status"><b>Your brief is ready.</b><p>Review and send it through your email app, or copy it.</p><div><a href={mailto} className="dd-button dd-button-lime"><Mail size={17}/> Open email draft</a><button type="button" onClick={copy} className="dd-button dd-button-outline"><Copy size={17}/> Copy brief</button></div><small>{copyMessage}</small></div>}</form></Reveal>
 </div></section>;
}
function Footer(){return <footer className="dd-footer"><div className="dd-container"><div className="dd-footer-top"><a href="#home" className="dd-wordmark"><Logo size={44}/><span>DYNAMIC<small>DEVELOPMENTS</small></span></a><a href="#home" className="dd-backtop">Back to top ↑</a></div><div className="dd-footer-giant">BE <span>DYNAMIC</span><sup>↗</sup></div><div className="dd-footer-bottom"><span>© {new Date().getFullYear()} Dynamic Developments. Made in India.</span><span>FROM IDEA TO INTERACTIVE REALITY.</span><a href={'mailto:'+EMAIL}>LET'S TALK <ArrowUpRight size={15}/></a></div></div></footer>}
export default function App(){
 const prefersReduced=useReducedMotion();
 const [moving,setMoving]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const {scrollYProgress}=useScroll();
 const smoothProgress=useSpring(scrollYProgress,{stiffness:200,damping:32,restDelta:.001});
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setMoving(!media.matches);media.addEventListener('change',sync);return()=>media.removeEventListener('change',sync)},[]);
 useEffect(()=>{if(!moving||prefersReduced||!window.matchMedia('(pointer: fine)').matches)return;const lenis=new Lenis({duration:1.05,smoothWheel:true,wheelMultiplier:.9,autoRaf:true});return()=>lenis.destroy()},[moving,prefersReduced]);
 return <div className={'dd'+(moving&&!prefersReduced?'':' dd-paused')}>
  <a className="dd-skip" href="#main">Skip to content</a>
  <motion.div className="dd-progress" style={{scaleX:smoothProgress}} aria-hidden="true"/>
  <TopBar moving={moving&&!prefersReduced} onMotion={()=>setMoving(v=>!v)}/>
  <main id="main"><Hero moving={moving&&!prefersReduced}/><Ticker/><Story moving={moving&&!prefersReduced}/><Work moving={moving&&!prefersReduced}/><Services/><Approach/><Manifesto/><Pricing/><FAQ/><Contact/></main>
  <Footer/>
 </div>;
}
