import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ArrowRight, Code2, Sparkles, MousePointer2 } from 'lucide-react';
import './scroll-film.css';

/**
 * A real, scroll-scrubbed three-act story: nothing autoplays through the story.
 * Each crossfade and move is tied to the user's physical scroll position.
 */
export default function ScrollFilm({ moving }: { moving: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const enabled = moving && !prefersReduced;
  const [chapter, setChapter] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 145, damping: 35, mass: 0.32, restDelta: 0.001 });
  useMotionValueEvent(progress, 'change', value => {
    const next = value < 0.32 ? 0 : value < 0.67 ? 1 : 2;
    setChapter(previous => previous === next ? previous : next);
  });

  const one = useTransform(progress, [0, 0.17, 0.28, 0.35], [1, 1, 1, 0]);
  const two = useTransform(progress, [0.28, 0.37, 0.57, 0.71], [0, 1, 1, 0]);
  const three = useTransform(progress, [0.65, 0.76, 0.99, 1], [0, 1, 1, 1]);
  const oneScale = useTransform(progress, [0, 0.3, 0.41], [1, 1.11, 1.2]);
  const oneY = useTransform(progress, [0, 0.35], [0, -135]);
  const spin = useTransform(progress, [0, 1], [-40, 390]);
  const headlineX = useTransform(progress, [0.31, 0.65], ['18%', '-14%']);
  const headlineXReverse = useTransform(progress, [0.31, 0.65], ['-20%', '14%']);
  const twoY = useTransform(progress, [0.32, 0.65], [95, -95]);
  const threeScale = useTransform(progress, [0.67, 0.82, 1], [0.72, 1, 1.08]);
  const threeY = useTransform(progress, [0.67, 1], [130, -40]);
  const trackScale = enabled ? progress : 0;

  return (
    <section id="cinema" className={'cinema-film' + (enabled ? '' : ' is-static')} ref={ref} aria-label="A scroll-driven story about Dynamic Developments">
      <div className="cinema-sticky">
        <div className="cinema-chrome" aria-hidden="true">
          <span><i/> DYNAMIC DEVELOPMENTS / SCROLL STORY</span>
          <span>DESIGN × CODE × DIMENSION</span>
        </div>
        <div className="cinema-vertical-label" aria-hidden="true">SCROLL TO MAKE IT HAPPEN</div>
        <motion.div className="cinema-act cinema-act-one" style={enabled ? { opacity: one, scale: oneScale, y: oneY } : undefined} aria-hidden={enabled && chapter !== 0}>
          <div className="cinema-ambient ambient-a" />
          <motion.div className="cinema-form" style={enabled ? { rotate: spin } : undefined} aria-hidden="true">
            <div className="cinema-form-ring cinema-form-ring-a"/><div className="cinema-form-ring cinema-form-ring-b"/><div className="cinema-form-core"><span>D</span><span>↗</span></div>
          </motion.div>
          <div className="cinema-act-body">
            <span className="cinema-index">ACT 01 / THE IDEA</span>
            <h2>Not just<br/>a <em>website.</em></h2>
            <p>Anyone can put pixels on a page. We turn them into an experience worth exploring.</p>
          </div>
          <span className="cinema-side-note">01—03 / THE SPARK</span>
        </motion.div>
        <motion.div className="cinema-act cinema-act-two" style={enabled ? { opacity: two, y: twoY } : undefined} aria-hidden={enabled && chapter !== 1}>
          <div className="cinema-act-two-grain" aria-hidden="true" />
          <div className="cinema-type-lines" aria-hidden="true">
            <motion.div style={enabled ? { x: headlineX } : undefined}>CREATE <span>THE</span> UNEXPECTED.</motion.div>
            <motion.div className="cinema-type-outline" style={enabled ? { x: headlineXReverse } : undefined}>MAKE IT <span>MOVE.</span></motion.div>
          </div>
          <div className="cinema-act-two-body">
            <span className="cinema-index">ACT 02 / THE CRAFT</span>
            <h2>Built with<br/><em>intention.</em></h2>
            <p>Typography that responds. Layers with depth. Every scroll revealing something new.</p>
            <div className="cinema-craft-pills"><span><Code2 size={15}/> Creative engineering</span><span><Sparkles size={15}/> Scroll choreography</span></div>
          </div>
          <div className="cinema-act-two-cross" aria-hidden="true">✳</div>
        </motion.div>
        <motion.div className="cinema-act cinema-act-three" style={enabled ? { opacity: three } : undefined} aria-hidden={enabled && chapter !== 2}>
          <div className="cinema-act-three-halo" aria-hidden="true"/>
          <motion.div className="cinema-float-device" style={enabled ? { scale: threeScale, y: threeY } : undefined} aria-hidden="true">
            <div className="cinema-device-top"><div><i/><i/><i/></div><span>dynamicdevelopments.vercel.app</span><ArrowUpRight size={15}/></div>
            <div className="cinema-device-inside"><div className="cinema-device-mark">D<span>↗</span></div><span>DYNAMIC / AN EXPERIENCE STUDIO</span><strong>BEYOND<br/><em>EXPECTED.</em></strong><div className="cinema-device-orb"/></div>
          </motion.div>
          <div className="cinema-act-three-body">
            <span className="cinema-index">ACT 03 / THE IMPACT</span>
            <h2>Made to<br/><em>be felt.</em></h2>
            <p>Your story deserves more than a template. Let’s make your next big thing impossible to ignore.</p>
            <a href="#contact" tabIndex={!enabled || chapter === 2 ? 0 : -1} className="cinema-final-cta">Build something unforgettable <ArrowUpRight size={19}/></a>
          </div>
        </motion.div>
        <div className="cinema-bottom" aria-hidden="true">
          <span className="cinema-current">0{enabled ? chapter + 1 : 3} <i/> 03</span>
          <div className="cinema-bottom-track"><motion.div className="cinema-bottom-fill" style={{ scaleX: trackScale }}/></div>
          <span className="cinema-down-label"><MousePointer2 size={13}/> CONTROLLED BY YOUR SCROLL <ArrowDown size={14}/></span>
        </div>
      </div>
    </section>
  );
}
