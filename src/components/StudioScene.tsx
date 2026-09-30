import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import { AdditiveBlending, TextureLoader, SRGBColorSpace, type Group } from 'three';

// Explicit intrinsic dimensions keep the SVG usable as a WebGL texture across browsers.
const SCREEN_LOGO = "data:image/svg+xml;charset=utf-8," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 128 128\">\n  <defs>\n    <linearGradient id=\"b\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#0c1430\"/>\n      <stop offset=\"1\" stop-color=\"#060a18\"/>\n    </linearGradient>\n    <linearGradient id=\"base\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0\" stop-color=\"#5eb4ff\"/>\n      <stop offset=\"1\" stop-color=\"#2f7fe8\"/>\n    </linearGradient>\n  </defs>\n  <rect width=\"128\" height=\"128\" rx=\"26\" fill=\"url(#b)\"/>\n  <g transform=\"translate(8,8) scale(0.875)\">\n    <path d=\"M30 32 H70 M88 46 V70 A6 6 0 0 1 82 76 H30 A6 6 0 0 1 24 70 V38 A6 6 0 0 1 30 32\"\n      fill=\"none\" stroke=\"#5eb4ff\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M20 80 H92 L101 94 Q102.5 98.5 97.5 98.5 H14.5 Q9.5 98.5 11 94 Z\" fill=\"url(#base)\"/>\n    <path d=\"M50 86 H70 L67 90.5 H53 Z\" fill=\"#060a18\" opacity=\"0.85\"/>\n    <rect x=\"52\" y=\"93.5\" width=\"16\" height=\"2.4\" rx=\"1.2\" fill=\"#060a18\" opacity=\"0.7\"/>\n    <rect x=\"86\" y=\"6\" width=\"22\" height=\"22\" rx=\"1.5\" fill=\"#f4f8ff\"/>\n    <rect x=\"60\" y=\"11\" width=\"14\" height=\"14\" rx=\"1.5\" fill=\"#2f5cff\"/>\n    <rect x=\"75\" y=\"31\" width=\"18\" height=\"18\" rx=\"1.5\" fill=\"#3d8bff\"/>\n    <rect x=\"55\" y=\"30\" width=\"12\" height=\"12\" rx=\"1.5\" fill=\"#6fbeff\"/>\n    <rect x=\"87\" y=\"49\" width=\"16\" height=\"16\" rx=\"1.5\" fill=\"#6fbeff\"/>\n    <rect x=\"58\" y=\"49\" width=\"11\" height=\"11\" rx=\"1.5\" fill=\"#17265e\"/>\n    <rect x=\"70\" y=\"57\" width=\"11\" height=\"11\" rx=\"1.5\" fill=\"#17265e\"/>\n    <rect x=\"41\" y=\"46\" width=\"9\" height=\"9\" rx=\"1.5\" fill=\"#f4f8ff\"/>\n    <rect x=\"33\" y=\"61\" width=\"11\" height=\"11\" rx=\"1.5\" fill=\"#17265e\"/>\n    <rect x=\"46\" y=\"62\" width=\"10\" height=\"10\" rx=\"1.5\" fill=\"#2f5cff\"/>\n    <rect x=\"59\" y=\"68\" width=\"10\" height=\"10\" rx=\"1.5\" fill=\"#f4f8ff\"/>\n  </g>\n</svg>\n");

function Fallback() {
 return <div className="scene-fallback" role="img" aria-label="Desktop computer displaying the Dynamic Developments logo"><svg viewBox="0 0 440 360" width="90%" height="90%" aria-hidden="true"><rect x="50" y="45" width="340" height="220" rx="16" fill="#222b35" stroke="#899aa7" strokeWidth="5"/><rect x="64" y="60" width="312" height="180" rx="7" fill="#0a131b"/><image href={SCREEN_LOGO} x="161" y="77" width="118" height="118"/><text x="220" y="222" textAnchor="middle" fill="#edf5ff" fontFamily="Arial, sans-serif" fontSize="14" letterSpacing="1.5">DYNAMIC DEVELOPMENTS</text><path d="M198 266v35h-48v10h140v-10h-48v-35" fill="#899aa7"/><rect x="110" y="329" width="220" height="14" rx="6" fill="#647585"/></svg></div>;
}
class Boundary extends Component<{children:ReactNode},{failed:boolean}> {
 state={failed:false}; static getDerivedStateFromError(){return {failed:true}}
 render(){return this.state.failed?<Fallback/>:this.props.children}
}
function Box({position,size,color,metal=false}:{position:[number,number,number];size:[number,number,number];color:string;metal?:boolean}){
 return <RoundedBox position={position} args={size} radius={Math.min(.055,...size.map(x=>x/3))} smoothness={3}>{metal?<meshStandardMaterial color={color} metalness={.75} roughness={.28}/>:<meshBasicMaterial color={color}/>}</RoundedBox>;
}
function ScreenLogo(){
 const texture=useLoader(TextureLoader,SCREEN_LOGO);
 texture.colorSpace=SRGBColorSpace;
 return <mesh position={[0,.43,.19]}><planeGeometry args={[1.28,1.28]}/><meshBasicMaterial map={texture} transparent toneMapped={false}/></mesh>;
}
function Atmosphere({color,moving}:{color:string;moving:boolean}){
 const group=useRef<Group>(null);
 const points=useMemo(()=>{
  const count=92,arr=new Float32Array(count*3);
  for(let i=0;i<count;i++){
   const angle=i*2.399963229728653;
   const radius=2.55+(i%13)*.16;
   arr[i*3]=Math.cos(angle)*radius;
   arr[i*3+1]=Math.sin(i*1.71)*1.72;
   arr[i*3+2]=Math.sin(angle)*radius*.58-.55;
  }
  return arr;
 },[]);
 useFrame((state,dt)=>{
  if(!moving||!group.current)return;
  group.current.rotation.y+=dt*.035;
  group.current.rotation.z=Math.sin(state.clock.elapsedTime*.18)*.035;
  group.current.position.x+=(state.pointer.x*.22-group.current.position.x)*.025;
  group.current.position.y+=(state.pointer.y*.12-group.current.position.y)*.025;
 });
 return <group ref={group} position={[0,.05,-.5]}>
  <points>
   <bufferGeometry><bufferAttribute attach="attributes-position" args={[points,3]}/></bufferGeometry>
   <pointsMaterial color={color} size={.035} transparent opacity={.58} depthWrite={false} blending={AdditiveBlending}/>
  </points>
  <mesh rotation={[Math.PI/2.5,.15,.15]}><torusGeometry args={[2.55,.012,8,128]}/><meshBasicMaterial color={color} transparent opacity={.15} depthWrite={false}/></mesh>
  <mesh rotation={[Math.PI/2.15,-.45,.7]}><torusGeometry args={[3.05,.008,8,128]}/><meshBasicMaterial color="#7f9fff" transparent opacity={.1} depthWrite={false}/></mesh>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.7,-.2]}>
   <planeGeometry args={[7.5,5,20,14]}/>
   <meshBasicMaterial color={color} wireframe transparent opacity={.045} depthWrite={false}/>
  </mesh>
 </group>;
}
function Computer({color,moving}:{color:string;moving:boolean}) {
 const group=useRef<Group>(null),time=useRef(0);
 useFrame((_,dt)=>{if(moving&&group.current){time.current+=dt;group.current.position.y=Math.sin(time.current*.8)*.09;group.current.rotation.y=-.25+Math.sin(time.current*.4)*.2}});
 return <group ref={group} rotation={[.08,-.25,0]}>
  <Box position={[0,.4,0]} size={[3.45,2.2,.19]} color="#8997a7" metal/>
  <Box position={[0,.43,.108]} size={[3.29,2.02,.045]} color="#121924"/>
  <Box position={[0,.46,.137]} size={[3.12,1.8,.015]} color="#09131d"/>
  <Box position={[0,1.23,.153]} size={[3.05,.18,.012]} color="#202e3c"/>
  {['#ff847c','#f5c66a',color].map((c,i)=><mesh key={c+i} position={[-1.4+i*.12,1.23,.17]}><circleGeometry args={[.028,12]}/><meshBasicMaterial color={c}/></mesh>)}
  <ScreenLogo/>
  <Box position={[0,-.52,.167]} size={[.24,.022,.012]} color={color}/>
  <Box position={[0,-1.02,-.04]} size={[.32,.68,.23]} color="#8b9cac" metal/>
  <Box position={[0,-1.35,.05]} size={[1.28,.10,.75]} color="#8293a4" metal/>
  <group position={[-.18,-1.48,1.02]} rotation={[.12,0,0]}>
   <Box position={[0,0,0]} size={[2.5,.11,.78]} color="#778797" metal/>
   {[0,1,2,3].map(row=>Array.from({length:12},(_,col)=><Box key={`${row}-${col}`} position={[-1.1+col*.2,.07,-.27+row*.17]} size={[.15,.025,.12]} color={row===0? '#3d5365':'#172534'}/>))}
  </group>
  <Box position={[1.49,-1.42,1.04]} size={[.35,.16,.59]} color="#b2bdc7" metal/>
  <Box position={[1.49,-1.325,1]} size={[.022,.009,.17]} color={color}/>
 </group>;
}
export default function StudioScene({color,moving}:{color:string;moving:boolean}){
 const wrap=useRef<HTMLDivElement>(null),[visible,setVisible]=useState(true);
 const [supported]=useState(()=>{try{const canvas=document.createElement('canvas');const gl=canvas.getContext('webgl2');if(!gl)return false;gl.getExtension('WEBGL_lose_context')?.loseContext();return true}catch{return false}});
 useEffect(()=>{const el=wrap.current;if(!el)return;let intersecting=true;const update=()=>setVisible(intersecting&&!document.hidden);const io=new IntersectionObserver(([e])=>{intersecting=e.isIntersecting;update()});io.observe(el);document.addEventListener('visibilitychange',update);return()=>{io.disconnect();document.removeEventListener('visibilitychange',update)}},[]);
 if(!supported)return <Fallback/>;
 return <div ref={wrap} className="scene-canvas" role="img" aria-label="Floating 3D desktop computer displaying the Dynamic Developments logo, with metal stand, keyboard and mouse. Drag to explore. Color and motion controls are below."><Boundary><Canvas camera={{position:[0,1.1,7.8],fov:42}} dpr={[1,1.5]} frameloop={visible&&moving?'always':'demand'} gl={{alpha:true,antialias:true}} fallback={<Fallback/>}><ambientLight intensity={1.5}/><directionalLight position={[3,4,5]} intensity={4} color="#ebfaff"/><pointLight position={[-3,1,2]} intensity={25} color={color}/><pointLight position={[3,-2,1]} intensity={20} color="#638bff"/><Atmosphere color={color} moving={visible&&moving}/><Computer color={color} moving={visible&&moving}/><OrbitControls enableZoom={false} enablePan={false} enableDamping minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/1.8}/></Canvas></Boundary></div>;
}
