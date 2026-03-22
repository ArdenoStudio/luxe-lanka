import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const transformations = [
  {
    label: 'Bespoke Balayage',
    stylist: 'Julian — Master Colorist',
    before: '/balayage-before.png',
    after:  '/balayage-after.png',
  },
  {
    label: 'Signature Blowout',
    stylist: 'Elena — Creative Director',
    before: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2070&auto=format&fit=crop',
    after:  'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2070&auto=format&fit=crop',
  },
];

function Slider({ t }: { t: typeof transformations[0] }) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setPos(Math.max(4, Math.min(96, ((clientX - left) / width) * 100)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl select-none cursor-col-resize touch-none"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) move(e.clientX);
      }}
      onPointerUp={(e) => {
        dragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
      }}
      onPointerCancel={(e) => {
        dragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
      }}
    >
      {/* After (base layer) */}
      <img src={t.after} alt="After" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
      <div className="absolute top-4 right-4 z-10">
        <span className="text-[9px] uppercase tracking-[0.22em] text-sand/80 bg-forest/60 backdrop-blur-sm px-3 py-1.5 rounded-full font-sans">After</span>
      </div>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img src={t.before} alt="Before" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
        {/* Slight desaturate to emphasise before state */}
        <div className="absolute inset-0 bg-forest/15" />
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[9px] uppercase tracking-[0.22em] text-sand/70 bg-forest/60 backdrop-blur-sm px-3 py-1.5 rounded-full font-sans">Before</span>
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[1px] bg-gold/70 z-20 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-lg">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path d="M1 5H17M1 5L4 2M1 5L4 8M17 5L14 2M17 5L14 8" stroke="#071B11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-ink/85 to-transparent z-10 pointer-events-none">
        <p className="font-serif text-lg text-sand">{t.label}</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold/70 font-sans mt-1">{t.stylist}</p>
      </div>
    </div>
  );
}

export function Transformations() {
  return (
    <section id="gallery" className="py-32 md:py-48 bg-sand text-ink relative overflow-hidden grain">
      <div className="container mx-auto px-6 md:px-14">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-ink/40 mb-4 font-sans">Real Results</p>
            <h3 className="font-serif text-5xl md:text-7xl text-ink leading-none">Transformations</h3>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-sans text-sm text-ink/45 max-w-xs leading-relaxed"
          >
            Drag the handle to reveal the transformation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transformations.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Slider t={t} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
