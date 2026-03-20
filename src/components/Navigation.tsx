import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { SoundManager } from '../services/soundService';

// ── Colour tokens so Framer Motion can interpolate them ──────────────────────
const ink   = '#1a2e1a';
const sand  = '#f8f1e9';
const gold  = '#c9a84c';
const forest = '#071b11';

// Shared scroll-state transition (no delay — instant response to scroll)
const scrollDur = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

export function Navigation() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Magnetic Reserve button
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bx = useSpring(mouseX, { damping: 15, stiffness: 150 });
  const by = useSpring(mouseY, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const r = buttonRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left - r.width  / 2) * 0.3);
    mouseY.set((e.clientY - r.top  - r.height / 2) * 0.3);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  // rAF scroll tracker — compatible with Lenis
  useEffect(() => {
    let id: number;
    const tick = () => { setScrolled(window.scrollY > 60); id = requestAnimationFrame(tick); };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    SoundManager.playClick();
    const el = document.querySelector(target);
    if (el && (window as any).lenis) {
      (window as any).lenis.scrollTo(el, {
        offset: -80, duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* ── Nav pill ──────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 z-50 flex justify-center top-4 md:top-6 px-4"
        style={{ willChange: 'transform' }}
      >
        {/*
          Fixed height: content never moves, only background layers cross-fade.
          No padding changes, no class-swapping on the container.
        */}
        <div className="w-full max-w-5xl relative h-[64px]">

          {/* BG ① — transparent dark (unscrolled state) */}
          <motion.div
            className="absolute inset-0 rounded-full border"
            style={{
              backgroundColor: 'rgba(10,27,17,0.22)',
              backdropFilter:  'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              borderColor: 'rgba(248,241,233,0.10)',
              willChange: 'opacity',
            }}
            animate={{ opacity: scrolled ? 0 : 1 }}
            transition={scrollDur}
          />

          {/* BG ② — sand/95 blur (scrolled state) */}
          <motion.div
            className="absolute inset-0 rounded-full border"
            style={{
              backgroundColor: 'rgba(248,241,233,0.95)',
              backdropFilter:  'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderColor: 'rgba(26,46,26,0.08)',
              boxShadow: '0 8px 32px -8px rgba(0,0,0,0.18)',
              willChange: 'opacity',
            }}
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={scrollDur}
          />

          {/* ── Content row — h-full so it always stays centred ── */}
          <div className="relative z-10 h-full flex items-center justify-between px-6 md:px-8">

            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => handleNavClick(e, 'body')}
              className="font-serif text-xl md:text-2xl tracking-widest shrink-0"
              animate={{ color: scrolled ? ink : sand }}
              transition={scrollDur}
            >
              LUXE LANKA
            </motion.a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-12">
              {[
                { label: 'Services', id: 'services' },
                { label: 'Gallery',  id: 'gallery'  },
                { label: 'Stylists', id: 'stylists' },
              ].map(({ label, id }, i) => (
                <motion.a
                  key={label}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, `#${id}`)}
                  className="relative text-xs uppercase tracking-[0.2em] group py-2"
                  // Entrance animation — runs once on mount
                  initial={{ opacity: 0, y: -10 }}
                  // Ongoing animate — entrance completes, then color tracks scroll
                  animate={{
                    opacity: 1,
                    y:       0,
                    color:   scrolled
                      ? 'rgba(26,46,26,0.55)'
                      : 'rgba(248,241,233,0.60)',
                  }}
                  whileHover={{
                    color: scrolled ? ink : sand,
                  }}
                  transition={{
                    // entrance props get the delay
                    opacity: { duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
                    y:       { duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
                    // colour responds immediately to scroll, no delay
                    color:   scrollDur,
                  }}
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left" />
                </motion.a>
              ))}

              {/* Reserve button */}
              <motion.a
                ref={buttonRef}
                href="#booking"
                onClick={(e) => handleNavClick(e, '#booking')}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => SoundManager.playHover()}
                className="relative px-10 py-3.5 text-[10px] uppercase tracking-[0.32em] rounded-full overflow-hidden group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity:   1,
                  scale:     1,
                  color:     scrolled ? sand : gold,
                  boxShadow: scrolled
                    ? '0 0 0px rgba(201,168,76,0), inset 0 0 0 1px rgba(26,46,26,0.0)'
                    : '0 0 22px rgba(201,168,76,0.12), inset 0 0 0 1px rgba(201,168,76,0.42)',
                }}
                style={{ x: bx, y: by }}
                whileHover={{ scale: 1.04, color: forest }}
                whileTap={{ scale: 0.96 }}
                transition={{
                  opacity:   { duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
                  scale:     { duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
                  color:     scrollDur,
                  boxShadow: scrollDur,
                }}
              >
                {/* BG ① — gold ghost (unscrolled) */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gold/12"
                  animate={{ opacity: scrolled ? 0 : 1 }}
                  transition={scrollDur}
                  style={{ willChange: 'opacity' }}
                />
                {/* BG ② — ink solid (scrolled) */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-ink"
                  animate={{ opacity: scrolled ? 1 : 0 }}
                  transition={scrollDur}
                  style={{ willChange: 'opacity' }}
                />
                {/* Liquid gold fill — radial expand from centre on hover */}
                <div className="absolute inset-0 z-[1] rounded-full bg-gold scale-0 group-hover:scale-100 transition-transform duration-600 ease-[0.16,1,0.3,1] origin-center" />
                {/* Shimmer sweep */}
                <motion.div
                  className="absolute inset-0 z-[2] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"
                  style={{ skewX: -15 }}
                />
                {/* Text flip */}
                <div className="relative z-[3] flex flex-col h-[11px] overflow-hidden pointer-events-none">
                  <span className="transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-y-full leading-none">Reserve</span>
                  <span className="absolute top-full leading-none transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-y-full">Reserve</span>
                </div>
              </motion.a>
            </div>

            {/* Hamburger — all transforms via Framer Motion, zero class-swaps */}
            <button
              className="md:hidden flex flex-col gap-1.5 z-50 relative"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {[
                { open: { rotate: 45,  y: 7  }, closed: { rotate: 0, y: 0  } },
                { open: { opacity: 0          }, closed: { opacity: 1       } },
                { open: { rotate: -45, y: -7 }, closed: { rotate: 0, y: 0  } },
              ].map((states, i) => (
                <motion.span
                  key={i}
                  className="w-6 h-[1px] block origin-center"
                  animate={{
                    ...(menuOpen ? states.open : states.closed),
                    backgroundColor: (menuOpen || !scrolled) ? sand : ink,
                  }}
                  transition={scrollDur}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile fullscreen menu ────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-forest flex flex-col items-center justify-center grain"
          >
            <div className="flex flex-col items-center gap-8">
              {[
                { label: 'Services', id: 'services' },
                { label: 'Gallery',  id: 'gallery'  },
                { label: 'Stylists', id: 'stylists' },
                { label: 'Reserve',  id: 'booking'  },
              ].map(({ label, id }, i) => (
                <motion.a
                  key={label}
                  href={`#${id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={(e) => handleNavClick(e, `#${id}`)}
                  className="font-serif text-4xl tracking-widest text-sand hover:text-gold transition-colors"
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
