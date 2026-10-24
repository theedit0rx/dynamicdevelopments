import { useEffect } from 'react';
import './scroll-director.css';

/**
 * Whole-page motion direction using transform/opacity only.
 * One IntersectionObserver handles first-entry reveals; one passive,
 * rAF-throttled listener updates the global progress and subtle parallax.
 */
export default function useScrollDirector(moving: boolean) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.studio');
    if (!root) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const enabled = moving && !media.matches;
    root.classList.toggle('cinema-enabled', enabled);

    const selectors = [
      '.portal-heading h2', '.portal-heading p', '.portal-details',
      '.services-intro h2', '.services-intro > p', '.service-list article',
      '.section-heading h2', '.section-heading > p', '.skills-bento article',
      '.lab-heading h2', '.lab-heading p', '.lab-v2-shell',
      '.process-section h2', '.process-grid article',
      '.plan-grid .plan', '.estimator', '.about-band h2', '.about-bottom',
      '.faq-section h2', '.faq-section details', '.contact-section h2',
      '.contact-section > div > p', '.contact-section form',
      '.footer-top', '.footer-word', '.footer-bottom'
    ];
    const targets = Array.from(root.querySelectorAll<HTMLElement>(selectors.join(',')));
    const observer = enabled && 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => {
          for (const entry of entries) if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.classList.add('cine-is-in');
            observer?.unobserve(element);
          }
        }, { threshold: 0.075, rootMargin: '0px 0px -5% 0px' })
      : null;

    targets.forEach((element, index) => {
      if (!enabled) return;
      element.classList.add('cine-enter');
      element.style.setProperty('--cine-delay', String((index % 4) * 70) + 'ms');
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * .92) element.classList.add('cine-is-in');
      else observer?.observe(element);
    });

    const parallax = enabled && window.matchMedia('(min-width: 761px)').matches
      ? [
          ...Array.from(root.querySelectorAll<HTMLElement>('.portal-world')).map(el => ({ el, amount: 24 })),
          ...Array.from(root.querySelectorAll<HTMLElement>('.service-orb')).map(el => ({ el, amount: 30 })),
          ...Array.from(root.querySelectorAll<HTMLElement>('.ai-graphic')).map(el => ({ el, amount: 21 })),
          ...Array.from(root.querySelectorAll<HTMLElement>('.motion-star')).map(el => ({ el, amount: 20 })),
          ...Array.from(root.querySelectorAll<HTMLElement>('.footer-word')).map(el => ({ el, amount: 18 }))
        ]
      : [];

    let raf = 0;
    let lastY = window.scrollY;
    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      root.style.setProperty('--cine-progress', String(Math.max(0, Math.min(1, y / max))));
      root.style.setProperty('--cine-direction', y >= lastY ? '1' : '-1');
      lastY = y;
      if (!enabled) return;
      const h = window.innerHeight;
      for (const { el, amount } of parallax) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > h + 100) continue;
        const center = (rect.top + rect.height / 2 - h / 2) / h;
        const distance = Math.max(-1, Math.min(1, center));
        el.style.setProperty('--cine-y', (-distance * amount).toFixed(2) + 'px');
      }
    };
    const schedule = () => { if (!raf) raf = window.requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    schedule();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) window.cancelAnimationFrame(raf);
      observer?.disconnect();
      targets.forEach(el => {
        el.classList.remove('cine-enter', 'cine-is-in');
        el.style.removeProperty('--cine-delay');
      });
      parallax.forEach(({ el }) => el.style.removeProperty('--cine-y'));
      root.classList.remove('cinema-enabled');
    };
  }, [moving]);
}
