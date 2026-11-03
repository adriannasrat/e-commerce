import React, { useLayoutEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import './scroll-reveal.css';

// Prepare before paint; focus or completion permanently settles this entrance.
export default function ScrollReveal({ as: Element = 'div', delay = 0, className = '', style,
  children, onFocusCapture, onAnimationEnd, ...props }) {
  const element = useRef(null);
  const [phase, setPhase] = useState('idle');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useLayoutEffect(() => {
    if (reducedMotion || !window.IntersectionObserver) {
      setPhase('settled');
      return;
    }
    setPhase('pending');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPhase(previous => previous === 'settled' ? previous : 'entering');
        observer.disconnect();
      }
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    observer.observe(element.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return <Element {...props} ref={element} className={`scroll-reveal ${className}`}
    data-phase={phase} style={{ ...style, '--reveal-delay': `${delay}ms` }}
    onFocusCapture={event => { setPhase('settled'); onFocusCapture?.(event); }}
    onAnimationEnd={event => {
      if (event.target === event.currentTarget && event.animationName === 'storefront-enter') setPhase('settled');
      onAnimationEnd?.(event);
    }}>
    {children}
  </Element>;
}
