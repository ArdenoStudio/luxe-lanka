import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Services } from './components/Services';
import { Transformations } from './components/Transformations';
import { Atelier } from './components/Atelier';
import { Booking } from './components/Booking';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { SoundManager } from './services/soundService';
import DemoLoader from './components/DemoLoader';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(() => sessionStorage.getItem('loaderShown_luxelanka') === '1');

  const handleLoaderComplete = () => {
    sessionStorage.setItem('loaderShown_luxelanka', '1');
    setIsLoaded(true);
  };

  useEffect(() => {
    const startAmbient = () => {
      SoundManager.playAmbient();
      window.removeEventListener('click', startAmbient);
      window.removeEventListener('scroll', startAmbient);
    };
    window.addEventListener('click', startAmbient);
    window.addEventListener('scroll', startAmbient);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    (window as any).lenis = lenis;
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener('click', startAmbient);
      window.removeEventListener('scroll', startAmbient);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-sand text-ink min-h-screen selection:bg-gold selection:text-forest">
      <AnimatePresence>
        {!isLoaded && (
          <DemoLoader demoName="Luxe Lanka" demoLogoUrl="/logo.svg" onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {/* Gold scroll progress line */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gold origin-left z-[100]" style={{ scaleX }} />

      <CustomCursor />

      {isLoaded && <Navigation />}

      <motion.div
        animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(10px)' }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
      >
        <main>
          <Hero />
          <Story />
          <Services />
          <Transformations />
          <Atelier />
          <Booking />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}
