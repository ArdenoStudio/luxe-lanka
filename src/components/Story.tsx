import { motion } from 'framer-motion';

export function Story() {
  return (
    <section id="philosophy" className="py-32 md:py-48 bg-sand relative overflow-hidden grain">
      <div className="container mx-auto px-6 md:px-14">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] uppercase tracking-[0.28em] text-ink/40 mb-12 font-sans"
        >
          Our Philosophy
        </motion.p>

        {/* Big headline row */}
        <div className="mb-20 md:mb-28">
          <div className="clip-text">
            <motion.h3
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif leading-[0.87] tracking-tight text-ink"
              style={{ fontSize: 'clamp(52px, 8.5vw, 130px)' }}
            >
              Where Precision
            </motion.h3>
          </div>
          <div className="clip-text" style={{ paddingBottom: 'clamp(12px, 2vw, 34px)' }}>
            <motion.h3
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif italic leading-[0.87] tracking-tight text-gold"
              style={{ fontSize: 'clamp(52px, 8.5vw, 130px)' }}
            >
              Meets Beauty
            </motion.h3>
          </div>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">

          {/* Left: copy + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 md:col-start-2"
          >
            <p className="font-sans text-sm md:text-base text-ink/60 leading-[1.85] mb-10 max-w-md">
              Located at 123 Ocean Drive, Galle, Luxe Lanka is a sanctuary dedicated to
              the artistry of hair. We fuse advanced colour science with visionary
              architecture in every cut — creating an environment where your personal
              aesthetic is elevated, never imitated.
            </p>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('services');
                if (el && (window as any).lenis)
                  (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.5 });
              }}
              className="inline-flex items-center gap-5 group"
            >
              <span className="text-[11px] uppercase tracking-[0.22em] text-ink font-sans">
                Explore Services
              </span>
              <span className="w-10 h-px bg-ink/30 group-hover:w-16 group-hover:bg-gold transition-all duration-500" />
            </a>

            {/* Pull stat */}
            <div className="mt-16 pt-8 border-t border-ink/10">
              <p className="font-serif text-5xl text-ink mb-1">15+</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-ink/40 font-sans">Years of editorial expertise</p>
            </div>
          </motion.div>

          {/* Right: image composition */}
          <div className="md:col-span-5 md:col-start-8 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 arch-mask overflow-hidden aspect-[3/4] w-full max-w-md mx-auto"
            >
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2070&auto=format&fit=crop"
                alt="Salon Interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              {/* Subtle warm tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
            </motion.div>

            {/* Decorative oval */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-10 -left-10 md:-left-20 z-20 w-44 aspect-square oval-mask overflow-hidden border-4 border-sand hidden md:block"
            >
              <img
                src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2070&auto=format&fit=crop"
                alt="Bespoke styling"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Gold accent line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-8 -right-4 w-px h-32 bg-gradient-to-b from-gold/60 to-transparent origin-top hidden md:block"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
