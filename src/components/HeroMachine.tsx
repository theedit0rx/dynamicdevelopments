import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, RoundedBox } from '@react-three/drei';
import { type Group } from 'three';

function Sculpture({ playing }: { playing: boolean }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current || !playing) return;
    group.current.rotation.y += Math.min(delta, .04) * .13;
    group.current.rotation.x += (state.pointer.y * .13 - group.current.rotation.x) * .025;
  });
  return (
    <Float speed={playing ? 1.3 : 0} rotationIntensity={playing ? .15 : 0} floatIntensity={playing ? .32 : 0}>
      <group ref={group} rotation={[.09, -.4, -.08]}>
        <mesh rotation={[.42, .25, -.2]}>
          <torusKnotGeometry args={[1.14, .31, 180, 18, 2, 3]} />
          <meshStandardMaterial color="#9fce48" metalness={.83} roughness={.18} />
        </mesh>
        <mesh rotation={[1.05, .2, .3]}>
          <torusGeometry args={[2.2, .013, 8, 128]} />
          <meshBasicMaterial color="#c7fd89" transparent opacity={.52} />
        </mesh>
        <mesh rotation={[.13, 1.2, -.38]}>
          <torusGeometry args={[2.36, .009, 8, 128]} />
          <meshBasicMaterial color="#8ec3f4" transparent opacity={.36} />
        </mesh>
        <mesh rotation={[.82, -.6, .6]}>
          <torusGeometry args={[1.78, .012, 8, 128]} />
          <meshBasicMaterial color="#c8ff32" transparent opacity={.4} />
        </mesh>
        <RoundedBox args={[.53, .53, .53]} radius={.12} smoothness={3} position={[2.05, 1.1, .44]}>
          <meshStandardMaterial color="#8caeff" metalness={.65} roughness={.23} />
        </RoundedBox>
        <RoundedBox args={[.3, .3, .3]} radius={.05} smoothness={3} position={[-2.0, -.75, 0]}>
          <meshStandardMaterial color="#f8f7f2" metalness={.45} roughness={.28} />
        </RoundedBox>
      </group>
    </Float>
  );
}
function WebGLStage({ playing }: { playing: boolean }) {
  return <Canvas dpr={[1, 1.5]} camera={{ fov: 38, position: [0, 0, 7.5] }} gl={{ antialias: true, alpha: true }} frameloop={playing ? 'always' : 'demand'}>
    <ambientLight intensity={1.4} />
    <directionalLight intensity={3.5} position={[5, 6, 4]} color="#f6ffe7" />
    <pointLight intensity={16} position={[-4, 0, 3]} color="#9d7eff" />
    <pointLight intensity={12} position={[3, -3, 2]} color="#c8ff32" />
    <Sculpture playing={playing}/>
    <OrbitControls enablePan={false} enableZoom={false} enableDamping minPolarAngle={.8} maxPolarAngle={2.2} />
  </Canvas>;
}
export default function HeroMachine({ playing }: { playing: boolean }) {
  const [supported, setSupported] = useState(false);
  const [visible, setVisible] = useState(true);
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try { const canvas = document.createElement('canvas'); setSupported(!!canvas.getContext('webgl2')); }
    catch { setSupported(false); }
  }, []);
  useEffect(() => {
    const el = frame.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {rootMargin: '160px'});
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div className="dd-art" ref={frame} role="img" aria-label="A floating luminous three-dimensional sculptural symbol for Dynamic Developments. Drag to rotate on supported devices.">
    <div className="dd-art-grid" aria-hidden="true"/>
    <div className="dd-art-aura" aria-hidden="true"/>
    {supported ? <Suspense fallback={<div className="dd-art-fallback" aria-hidden="true"><i/><b>D↗</b></div>}><WebGLStage playing={playing && visible}/></Suspense> : <div className="dd-art-fallback" aria-hidden="true"><i/><b>D↗</b></div>}
    <div className="dd-art-corner dd-art-corner-a">DESIGN / ENGINEERING</div>
    <div className="dd-art-corner dd-art-corner-b">EVERY DETAIL MATTERS_</div>
    <span className="dd-art-tag">THE DYNAMIC OBJECT <i>↗</i></span>
  </div>;
}
