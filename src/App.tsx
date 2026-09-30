import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import {ArrowUpRight,ArrowRight,Menu,X,Plus,Minus,Check,Code2,Bot,Layers3,Pause,Play,Copy,Mail,RotateCcw} from 'lucide-react';
import {services,work,options,extras,plans,faqs} from './components/StudioData';
import Preview from './components/ProjectPreview';
import './studio.css';
import Logo from './components/Logo';
import ExperienceLab from './components/ExperienceLab';
const Scene=lazy(()=>import('./components/StudioScene'));
const EMAIL='dynamicwebdeveloping@gmail.com';
const nav=[['Work','work'],['Services','services'],['Skills','skills'],['Lab','lab'],['Pricing','pricing']];
const HERO_WORDS=['Built different.','Feels alive.','Moves smarter.','Converts better.'];
const CAPABILITIES=['Strategy','Design','Development','3D Experiences','AI & Automation'];
const RAIL=[['home','00','Intro'],['work','01','Work'],['services','02','Services'],['skills','03','Skills'],['lab','04','Lab'],['pricing','06','Pricing'],['contact','09','Contact']];
const money=(n:number)=>'₹'+n.toLocaleString('en-IN');
function Kicker({n,children}:{n:string;children:React.ReactNode}){return <div className="eyebrow"><span>{n} /</span>{children}</div>}
export default function App(){
 const [menu,setMenu]=useState(false),[mode,setMode]=useState(0),[moving,setMoving]=useState(!window.matchMedia('(prefers-reduced-motion: reduce)').matches),[service,setService]=useState(0),[filter,setFilter]=useState('All'),[project,setProject]=useState<typeof work[number]|null>(null);
 const [type,setType]=useState(0),[pages,setPages]=useState(1),[design,setDesign]=useState(1),[selected,setSelected]=useState<string[]>([]),[calc,setCalc]=useState(false);
 const [form,setForm]=useState({name:'',business:'',email:'',phone:'',type:'Business Website',budget:'₹10,000–₹25,000',description:'',deadline:''}),[prepared,setPrepared]=useState(false),[copyStatus,setCopyStatus]=useState('');
 const [heroWord,setHeroWord]=useState(0),[activeSection,setActiveSection]=useState('home');
 const dialog=useRef<HTMLDialogElement>(null),closeButton=useRef<HTMLButtonElement>(null);
 const colors=['#c8ff32','#50e3e1','#a991ff'];
 const low=Math.round((options[type].base*pages+extras.filter(x=>selected.includes(x.name)).reduce((s,x)=>s+x.price,0))*design/500)*500,high=Math.round(low*1.3/500)*500;
 useEffect(()=>{if(project){dialog.current?.showModal();closeButton.current?.focus()}else dialog.current?.close()},[project]);
 useEffect(()=>{document.body.style.overflow=menu||project?'hidden':'';return()=>{document.body.style.overflow=''}},[menu,project]);
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenu(false)};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[]);
 /* premium interaction layer */
 useEffect(()=>{
  const root=document.querySelector<HTMLElement>('.studio');
  if(!root)return;
  const move=(e:PointerEvent)=>{
   root.style.setProperty('--mx',`${(e.clientX/window.innerWidth)*100}%`);
   root.style.setProperty('--my',`${(e.clientY/window.innerHeight)*100}%`);
  };
  const scroll=()=>{
   const max=document.documentElement.scrollHeight-window.innerHeight;
   root.style.setProperty('--scroll',`${max>0?(window.scrollY/max)*100:0}%`);
  };
  window.addEventListener('pointermove',move,{passive:true});
  window.addEventListener('scroll',scroll,{passive:true});
  scroll();
  return()=>{window.removeEventListener('pointermove',move);window.removeEventListener('scroll',scroll)};
 },[]);
 /* kinetic experience layer */
 useEffect(()=>{
  if(!moving)return;
  const id=window.setInterval(()=>setHeroWord(v=>(v+1)%HERO_WORDS.length),2400);
  return()=>window.clearInterval(id);
 },[moving]);
 useEffect(()=>{
  const root=document.querySelector<HTMLElement>('.studio');
  if(!root)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=window.matchMedia('(pointer: fine)').matches;

  const revealTargets=Array.from(root.querySelectorAll<HTMLElement>('.section,.process-section,.about-band,.faq-section,.contact-section'));
  revealTargets.forEach(el=>el.classList.add('reveal-block'));
  const revealObserver=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{if(entry.isIntersecting)(entry.target as HTMLElement).classList.add('is-visible')});
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  revealTargets.forEach(el=>revealObserver.observe(el));

  const sectionObserver=new IntersectionObserver(entries=>{
   const visible=entries.filter(x=>x.isIntersecting).sort((x,y)=>y.intersectionRatio-x.intersectionRatio)[0];
   if(visible?.target?.id)setActiveSection(visible.target.id);
  },{threshold:[.2,.35,.55],rootMargin:'-18% 0px -48% 0px'});
  RAIL.forEach(([id])=>{const el=document.getElementById(id);if(el)sectionObserver.observe(el)});

  const cleanups:(()=>void)[]=[];
  if(fine&&!reduced){
   const tiltEls=Array.from(root.querySelectorAll<HTMLElement>('.hero-experiment,.work-card,.skills-bento article,.plan,.process-grid article'));
   tiltEls.forEach(el=>{
    el.classList.add('dynamic-tilt');
    const move=(e:PointerEvent)=>{
     const r=el.getBoundingClientRect();
     const px=(e.clientX-r.left)/r.width-.5;
     const py=(e.clientY-r.top)/r.height-.5;
     el.style.setProperty('--tilt-x',`${(-py*7).toFixed(2)}deg`);
     el.style.setProperty('--tilt-y',`${(px*8).toFixed(2)}deg`);
     el.style.setProperty('--shine-x',`${((px+.5)*100).toFixed(1)}%`);
     el.style.setProperty('--shine-y',`${((py+.5)*100).toFixed(1)}%`);
    };
    const leave=()=>{el.style.setProperty('--tilt-x','0deg');el.style.setProperty('--tilt-y','0deg')};
    el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
    cleanups.push(()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave)});
   });

   const magnets=Array.from(root.querySelectorAll<HTMLElement>('.action,.nav-contact,.text-link,.back-top'));
   magnets.forEach(el=>{
    el.classList.add('magnetic');
    const move=(e:PointerEvent)=>{
     const r=el.getBoundingClientRect();
     el.style.setProperty('--mag-x',`${((e.clientX-(r.left+r.width/2))*.12).toFixed(1)}px`);
     el.style.setProperty('--mag-y',`${((e.clientY-(r.top+r.height/2))*.12).toFixed(1)}px`);
    };
    const leave=()=>{el.style.setProperty('--mag-x','0px');el.style.setProperty('--mag-y','0px')};
    el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
    cleanups.push(()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave)});
   });
  }
  return()=>{revealObserver.disconnect();sectionObserver.disconnect();cleanups.forEach(fn=>fn())};
 },[]);
 const field=(key:keyof typeof form,value:string)=>{setForm(f=>({...f,[key]:value}));setPrepared(false)};
 function quote(name?:string){setForm(f=>({...f,type:name||options[type].name,budget:name==='Starter'?'₹10,000–₹25,000':name==='Growth'?'₹25,000–₹50,000':name==='Custom'?'Let’s discuss':`${money(low)}–${money(high)}`,description:name?`I'm interested in the ${name} package.`:`I'd like a ${options[type].name}. Estimated budget: ${money(low)}–${money(high)}. Pages: ${pages===1?'1–5':pages===1.35?'6–10':'10+'}. Features: ${selected.join(', ')||'Standard website features'}. Design: ${design===1?'Standard':design===1.25?'Premium':'Advanced interactive'}.`}));setPrepared(false);document.getElementById('contact')?.scrollIntoView({behavior:moving?'smooth':'auto'})}
 const brief=`Project inquiry — ${form.business||form.name}\n\nName: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\nPhone: ${form.phone}\nProject: ${form.type}\nBudget: ${form.budget}\nTimeline: ${form.deadline||'To discuss'}\n\n${form.description}`;
 const mailto=`mailto:${EMAIL}?subject=${encodeURIComponent('Project inquiry — '+(form.business||form.name))}&body=${encodeURIComponent(brief)}`;
 async function copy(){try{await navigator.clipboard.writeText(brief);setCopyStatus('Brief copied. Paste it into your email.')}catch{setCopyStatus('Select the brief below to copy it manually.')}}
 return <div className={`studio ${moving?'':'motion-paused'}`} style={{'--signal':colors[mode]} as React.CSSProperties}>
 <a className="skip" href="#main">Skip to content</a>
 <nav className="scroll-rail" aria-label="Page progress">{RAIL.map(([id,n,label])=><a key={id} href={'#'+id} aria-current={activeSection===id?'true':undefined}><span>{n}</span><i/><b>{label}</b></a>)}</nav>
 <header className="studio-nav"><a href="#home" className="wordmark" aria-label="Dynamic Developments home"><Logo size={44} className="shrink-0"/><span>dynamic<span>developments</span></span></a><nav aria-label="Main navigation">{nav.map(([label,id])=><a key={id} href={'#'+id}>{label}</a>)}</nav><a className="nav-contact" href="#contact">Let’s talk <ArrowUpRight size={17}/></a><button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu?'Close menu':'Open menu'}>{menu?<X/>:<Menu/>}</button></header>
 {menu&&<nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">{[...nav,['About','about'],['Contact','contact']].map(([label,id],i)=><a key={id} href={'#'+id} onClick={()=>setMenu(false)}><small>0{i+1}</small>{label}<ArrowUpRight/></a>)}</nav>}
 <main id="main"><section id="home" className="hero-studio wrap"><div className="hero-copy"><p className="availability"><i/>INDEPENDENT DIGITAL STUDIO · INDIA</p><h1 aria-label="Your next big thing. Built different.">Your next<br/>big thing.<br/><span className="hero-kinetic" aria-hidden="true"><span key={heroWord}>{HERO_WORDS[heroWord]}</span></span></h1><p className="hero-desc">Websites that turn heads.<br/>Digital products that move businesses forward.</p><div className="hero-actions"><a href="#contact" className="action primary">Build with us <ArrowUpRight size={19}/></a><a href="#work" className="text-link">Explore our work <ArrowRight size={17}/></a></div><p className="hero-footnote">CUSTOM WEBSITES FROM <strong>₹10,000</strong><span>DESIGN + DEVELOPMENT + AI</span></p></div><div className="hero-experiment"><div className="experiment-top"><span>EXPERIMENT_001</span><span><i/>LIVE 3D</span></div><Suspense fallback={<div className="scene-fallback">DD</div>}><Scene color={colors[mode]} moving={moving}/></Suspense><div className="scene-tag tag-a"><Code2 size={16}/>ENGINEERED TO ENGAGE</div><div className="scene-tag tag-b"><span>◈</span>FROM IDEA TO INTERACTIVE</div><div className="experiment-bottom"><span>DRAG TO EXPLORE</span><div className="scene-controls">{['Lime','Cyan','Violet'].map((label,i)=><button key={label} style={{background:colors[i]}} aria-label={label+' scene color'} aria-pressed={mode===i} onClick={()=>setMode(i)}/>)}<button className="motion-toggle" aria-label={moving?'Pause motion':'Play motion'} onClick={()=>setMoving(!moving)}>{moving?<Pause size={14}/>:<Play size={14}/>}</button></div></div></div></section>
 <div className="capability-strip" aria-label="Capabilities"><div className="capability-marquee">{[0,1].map(copy=><div className="capability-track" key={copy} aria-hidden={copy===1?'true':undefined}>{CAPABILITIES.map((item,i)=><span key={item}><b>{item}</b><i>{i%2?'✦':'✳'}</i></span>)}</div>)}</div></div>
 <section id="work" className="wrap section"><Kicker n="01">SELECTED WORK</Kicker><div className="section-heading"><h2>Proof of imagination.<br/><span>Built into reality.</span></h2><p>Real websites we have designed and built.<br/>Explore the live projects below.</p></div><div className="filter-row" aria-label="Filter projects">{['All','Education','E-commerce'].map(x=><button key={x} aria-pressed={filter===x} onClick={()=>setFilter(x)}>{x}</button>)}</div><div className="work-grid">{work.filter(x=>filter==='All'||x.category===filter).map(p=><button className={'work-card '+(p.id==='physics'?'featured-work':'')} key={p.id} onClick={()=>setProject(p)} aria-label={`View ${p.name}`}><div className="work-visual"><Preview kind={p.visual}/><span className="project-open"><ArrowUpRight size={22}/></span></div><div className="work-meta"><div><small>{p.tag} / {p.category.toUpperCase()}</small><h3>{p.name}</h3><p>{p.description}</p></div><span>0{work.indexOf(p)+1}</span></div></button>)}</div></section>
 <section id="services" className="services-surface"><div className="wrap section"><Kicker n="02">WHAT WE DO</Kicker><div className="services-layout"><div className="services-intro"><h2>A small studio.<br/><span>A wide lens.</span></h2><p>From your first website to your next ambitious platform. We connect the design, code and systems that make it work.</p><a href="#contact" className="text-link">Find your starting point <ArrowUpRight size={18}/></a><div className="service-orb" aria-hidden="true"><span>IDEA</span><i/><strong>→</strong><span>IMPACT</span></div></div><div className="service-list">{services.map((s,i)=><article key={s.title} className={service===i?'service-expanded':''}><button onClick={()=>setService(service===i?-1:i)} aria-expanded={service===i} aria-controls={'service-'+i}><span className="service-number">0{i+1}</span><span><small>{s.sub}</small><strong>{s.title}</strong></span>{service===i?<Minus size={20}/>:<Plus size={20}/>}</button>{service===i&&<div id={'service-'+i} className="service-detail"><p>{s.text}</p><ul>{s.items.map(x=><li key={x}>{x}</li>)}</ul></div>}</article>)}</div></div><p className="industry-note">FOR STARTUPS, LOCAL BUSINESSES, CREATORS, INSTITUTES & GROWING BRANDS.</p></div></section>
 <section id="skills" className="wrap section"><Kicker n="03">OUR EDGE</Kicker><div className="section-heading"><h2>Human creativity.<br/><span>Technical depth.</span></h2><p>A thoughtful interface is only the beginning.<br/>Here’s what powers the experience.</p></div><div className="skills-bento"><article className="ai-feature"><span className="mini-label">INTELLIGENCE, APPLIED</span><div className="ai-graphic" aria-hidden="true"><i/><i/><i/><Bot size={54}/></div><h3>AI Expert<span>Built for the useful stuff.</span></h3><p>AI assistants, connected workflows and intelligent interfaces that turn repetitive tasks into time for better work.</p><div className="skill-tags">{['AI integration','AI agents','Prompt engineering','Workflow automation'].map(x=><span key={x}>{x}</span>)}</div><a href="#contact" className="text-link">Let’s build something smarter <ArrowUpRight size={18}/></a></article><article className="engineering-feature"><Code2 size={28}/><h3>Strong foundations.<br/>Room to grow.</h3><p>Responsive interfaces, structured data and thoughtful integrations.</p><div className="tech-grid">{['React','TypeScript','Next.js','Tailwind','Supabase','Firebase','Vercel','APIs'].map(x=><span key={x}>{x}</span>)}</div></article><article className="motion-feature"><Layers3 size={26}/><div><h3>A little more dimension.</h3><p>Three.js · WebGL · Motion design</p></div><span className="wire-cube" aria-hidden="true"/></article></div></section>
 <ExperienceLab/>
 <section id="process" className="wrap process-section"><div><Kicker n="05">HOW WE BUILD</Kicker><h2>Clear steps.<br/><span>No black box.</span></h2></div><div className="process-grid">{[['Discover','We listen, clarify the goal and agree on scope.'],['Design','We shape the story, layout and visual direction.'],['Develop','We build, test and refine across devices.'],['Deliver','We launch, hand over and plan ongoing support.']].map(([title,desc],i)=><article key={title}><span>0{i+1}<ArrowRight size={17}/></span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
 <section id="pricing" className="wrap section"><Kicker n="06">THE INVESTMENT</Kicker><div className="section-heading"><h2>Big ambition.<br/><span>Clear starting points.</span></h2><p>Choose a direction. We’ll shape the right scope.<br/>No one-size-fits-all promises.</p></div><div className="plan-grid">{plans.map((p,i)=><article key={p.name} className={'plan '+(i===1?'plan-highlight':'')}><span className="plan-label">{p.name.toUpperCase()}{i===1&&<small>BUILD MOMENTUM</small>}</span><p>{p.desc}</p><small>{i===2?'BUILT AROUND YOUR BRIEF':'STARTING FROM'}</small><h3>{p.cost}</h3><ul>{p.items.map(x=><li key={x}><Check size={15}/>{x}</li>)}</ul><button className={'action '+(i===1?'primary':'secondary')} onClick={()=>quote(p.name)}>Discuss {p.name.toLowerCase()}<ArrowUpRight size={18}/></button></article>)}</div><p className="pricing-note">Final pricing depends on scope. Domains, hosting and paid third-party services are quoted separately.</p><div className="estimator"><button className="estimator-toggle" aria-expanded={calc} aria-controls="estimate-body" onClick={()=>setCalc(!calc)}><span><small>MAKE IT YOURS</small><strong>Build your project estimate.</strong></span><span>{calc?'Close':'Open calculator'}{calc?<Minus size={20}/>:<Plus size={20}/>}</span></button>{calc&&<div id="estimate-body" className="estimate-body"><div><label htmlFor="project-kind">01 / Project type</label><select id="project-kind" value={type} onChange={e=>setType(Number(e.target.value))}>{options.map((x,i)=><option value={i} key={x.name}>{x.name}</option>)}</select><div className="estimate-selects"><div><label htmlFor="pages">02 / Pages</label><select id="pages" value={pages} onChange={e=>setPages(Number(e.target.value))}><option value={1}>1–5 pages</option><option value={1.35}>6–10 pages</option><option value={1.8}>10+ pages</option></select></div><div><label htmlFor="design">03 / Design</label><select id="design" value={design} onChange={e=>setDesign(Number(e.target.value))}><option value={1}>Standard</option><option value={1.25}>Premium</option><option value={1.6}>Advanced interactive</option></select></div></div><fieldset><legend>04 / Extra capabilities</legend><div className="extra-grid">{extras.map(x=><label key={x.name}><input type="checkbox" checked={selected.includes(x.name)} onChange={()=>setSelected(s=>s.includes(x.name)?s.filter(v=>v!==x.name):[...s,x.name])}/><span>{x.name}<small>+{money(x.price)}</small></span></label>)}</div></fieldset></div><aside><small>YOUR INDICATIVE RANGE</small><strong aria-live="polite">{money(low)}<span>— {money(high)}</span></strong><p>An estimate to start the conversation. We’ll confirm the scope and price together.</p><button className="action primary" onClick={()=>quote()}>Use this estimate<ArrowUpRight size={17}/></button><button className="reset" onClick={()=>{setType(0);setPages(1);setDesign(1);setSelected([])}}><RotateCcw size={14}/>Reset estimate</button></aside></div>}</div></section>
 <section id="about" className="about-band"><div className="wrap"><Kicker n="07">THE STUDIO</Kicker><h2>Good design gets attention.<br/><span>Useful design earns its place.</span></h2><div className="about-bottom"><Logo size={88} className="shrink-0"/><p>Dynamic Developments brings design, development and practical AI together. We work with businesses, creators and institutes to turn an idea into a digital experience that’s clear, distinctive and useful.</p><a href="#contact" className="text-link">Meet your next project<ArrowUpRight size={18}/></a></div></div></section>
 <section className="wrap section faq-section"><div><Kicker n="08">A FEW ANSWERS</Kicker><h2>Before we<br/><span>begin.</span></h2><a href={`mailto:${EMAIL}`} className="text-link">Ask us anything<ArrowUpRight size={18}/></a></div><div>{faqs.map(([q,a])=><details key={q}><summary>{q}<Plus size={18}/></summary><p>{a}</p></details>)}</div></section>
 <section id="contact" className="wrap section contact-section"><div><Kicker n="09">YOUR NEXT CHAPTER</Kicker><h2>Have a spark?<br/><span>Let’s make<br/>something.</span></h2><p>Tell us what you’re imagining.<br/>We’ll help you find the next step.</p><a className="email-link" href={`mailto:${EMAIL}`}>{EMAIL}<ArrowUpRight size={18}/></a><div className="contact-meta"><span>BASED IN INDIA</span><span>BUILDING FOR THE WEB</span></div></div><form onSubmit={e=>{e.preventDefault();setPrepared(true);setCopyStatus('')}}><div className="form-grid"><label>Your name<input required autoComplete="name" value={form.name} onChange={e=>field('name',e.target.value)} placeholder="How should we call you?"/></label><label>Email address<input required type="email" autoComplete="email" value={form.email} onChange={e=>field('email',e.target.value)} placeholder="you@company.com"/></label><label>Business / brand<input value={form.business} onChange={e=>field('business',e.target.value)} placeholder="Your business name"/></label><label>Phone <span>(optional)</span><input type="tel" autoComplete="tel" value={form.phone} onChange={e=>field('phone',e.target.value)} placeholder="+91"/></label><label>What are we building?<select value={form.type} onChange={e=>field('type',e.target.value)}>{[...options.map(x=>x.name),'AI & Automation','Starter','Growth','Custom'].map(x=><option key={x}>{x}</option>)}</select></label><label>Budget<input value={form.budget} onChange={e=>field('budget',e.target.value)} placeholder="Your approximate budget"/></label></div><label>The idea<textarea required rows={4} value={form.description} onChange={e=>field('description',e.target.value)} placeholder="What do you want to build, and who is it for?"/></label><label>Preferred timeline <span>(optional)</span><input value={form.deadline} onChange={e=>field('deadline',e.target.value)} placeholder="e.g. Next month / flexible"/></label><button type="submit" className="action primary">Prepare my inquiry<ArrowUpRight size={19}/></button><p className="form-note">We’ll prepare your brief to send through your email app. Nothing is sent until you send the email.</p>{prepared&&<div className="prepared" role="status"><strong>Your inquiry is ready.</strong><p>Open your email app to review and send it, or copy the brief.</p><div><a href={mailto} className="action secondary"><Mail size={16}/>Open email draft</a><button type="button" className="action secondary" onClick={copy}><Copy size={16}/>Copy brief</button></div><p>{copyStatus}</p><details><summary>Review brief</summary><pre>{brief}</pre></details></div>}</form></section></main>
 <footer className="studio-footer wrap"><div className="footer-top"><a href="#home" className="wordmark"><Logo size={44} className="shrink-0"/><span>dynamic<span>developments</span></span></a><p>FROM IDEA TO INTERACTIVE REALITY.</p><a href="#home" className="back-top">Back to top<ArrowUpRight size={18}/></a></div><div className="footer-word">BE DYNAMIC<span>↗</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Dynamic Developments</span><a href="https://dynamicdevelopments.vercel.app/" target="_blank" rel="noopener noreferrer">Developed by Dynamic Developments</a><a href={`mailto:${EMAIL}`}>Start a conversation<ArrowUpRight size={14}/></a></div></footer>
 <dialog ref={dialog} className="project-dialog" aria-label={project?.name||'Project details'} onCancel={()=>setProject(null)} onClick={e=>{if(e.target===e.currentTarget)setProject(null)}}>{project&&<><button ref={closeButton} className="dialog-close" onClick={()=>setProject(null)} aria-label="Close project"><X/></button><Preview kind={project.visual}/><div className="dialog-content"><small>{project.tag}</small><h2>{project.name}</h2><p>{project.details}</p>{project.url?<a className="action primary" href={project.url} target="_blank" rel="noreferrer">Visit live website<ArrowUpRight size={18}/></a>:<button className="action primary" onClick={()=>{setProject(null);document.getElementById('contact')?.scrollIntoView()}}>Build something like this<ArrowUpRight size={18}/></button>}</div></>}</dialog>
 </div>
}
