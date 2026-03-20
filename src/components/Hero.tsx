import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imgY      = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const titleY    = useTransform(scrollYProgress, [0, 1], [0,  70]);
  const overlayOp = useTransform(scrollYProgress, [0, 0.6], [0.52, 0.82]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el && (window as any).lenis) {
      (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.5 });
    }
  };

  return (
    <section
      ref={ref}
      className="relative w-full h-screen flex flex-col justify-end overflow-hidden bg-forest grain"
    >
      {/* ─── Background ─── */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 z-0 w-full h-[calc(100%+200px)] -top-[100px]"
      >
        <video
          autoPlay loop muted playsInline preload="auto"
          poster="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop"
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.coverr.co/videos/coverr-hairdresser-styling-hair-5345/1080p.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark fog */}
      <motion.div style={{ opacity: overlayOp }}
        className="absolute inset-0 z-[1] bg-forest pointer-events-none" />
      {/* Radial vignette */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 25%, rgba(7,27,17,0.65) 100%)' }} />
      {/* Bottom lift */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-forest/90 via-forest/25 to-transparent pointer-events-none" />
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-40 z-[3] bg-gradient-to-b from-forest/70 to-transparent pointer-events-none" />

      {/* ─── Content ─── */}
      <motion.div
        style={{ y: titleY }}
        className="relative z-10 container mx-auto px-6 md:px-14 pb-14 md:pb-20"
      >
        {/* Location tag */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans">Galle, Sri Lanka</span>
          <span className="w-10 h-px bg-gold/35" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-sand/30 font-sans">Est. 2018</span>
        </motion.div>

        {/* Main title — clipped reveal */}
        <div className="clip-text mb-4">
          <motion.h1
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif leading-[0.87] tracking-tight text-sand"
            style={{ fontSize: 'clamp(68px, 11.5vw, 176px)' }}
          >
            Luxe Lanka
          </motion.h1>
        </div>

        {/* Subtitle + reserve row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-6"
        >
          <p className="font-sans font-light text-sand/45 tracking-wide max-w-xs leading-relaxed text-sm">
            The Art of Bespoke Hair &amp; Beauty
          </p>

          <div className="flex items-center gap-8">
            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 2.2, ease: 'easeOut' }}
              className="hidden md:flex flex-col items-center gap-3"
            >
              {/* Pulsing label */}
              <motion.span
                animate={{ opacity: [0.28, 0.55, 0.28] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="vertical-text text-[9px] text-sand font-sans"
              >
                scroll
              </motion.span>

              {/* Line with traveling highlight */}
              <div className="relative w-px h-14 overflow-hidden">
                {/* Faint static base */}
                <div className="absolute inset-0 bg-sand/12" />
                {/* Traveling glow */}
                <motion.div
                  className="absolute w-full h-7"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(248,241,233,0.65), transparent)' }}
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1], repeatDelay: 0.6 }}
                />
              </div>
            </motion.div>

            {/* CTA */}
            <motion.button
              onClick={() => scrollTo('booking')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 bg-gold/15 text-gold border border-gold/40 text-[11px] uppercase tracking-[0.25em] font-sans rounded-full overflow-hidden group transition-all duration-500 hover:text-forest"
            >
              <div className="relative z-10 flex flex-col h-4 overflow-hidden pointer-events-none">
                <span className="transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-y-full">Reserve Now</span>
                <span className="absolute top-full transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-y-full">Reserve Now</span>
              </div>
              <div className="absolute inset-0 bg-gold origin-bottom-left scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <div className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer [transform:skewX(-20deg)]" />
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom metadata bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 pt-5 border-t border-sand/10 origin-left"
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-sand/22 font-sans">
              Precision · Colour · Transformation
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-sand/22 font-sans">
              123 Ocean Drive
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
