import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, ArrowRight } from 'lucide-react';

const artisans = [
  {
    name: 'Elena',
    role: 'Creative Director',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1976&auto=format&fit=crop',
    bio: 'With over 15 years across London and Paris, Elena specializes in architectural cutting and editorial styling. Her vision for Luxe Lanka is to blend high-fashion technique with effortless, wearable beauty.',
    specialties: ['Precision Cutting', 'Editorial Styling', 'Creative Direction'],
    portfolio: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2070&auto=format&fit=crop',
    ],
    instagram: 'https://instagram.com/elena_luxe',
  },
  {
    name: 'Julian',
    role: 'Master Colorist',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
    bio: 'Julian is a master of light and dimension. Known for his "lived-in" colour techniques, he crafts seamless balayage and rich multi-tonal shades that grow out beautifully and honour hair health.',
    specialties: ['Bespoke Balayage', 'Colour Correction', 'Lived-in Blonde'],
    portfolio: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2070&auto=format&fit=crop',
    ],
    instagram: 'https://instagram.com/julian_color',
  },
  {
    name: 'Sophia',
    role: 'Texture Specialist',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop',
    bio: 'Sophia celebrates natural movement. Whether curly, coily, or wavy, she uses specialist techniques to enhance texture and vitality — every client leaves with hair that feels entirely their own, just elevated.',
    specialties: ['Curly Cut Specialist', 'Texture Enhancement', 'Scalp Therapy'],
    portfolio: [
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop',
    ],
    instagram: 'https://instagram.com/sophia_texture',
  },
];

export function Atelier() {
  const [selected, setSelected] = useState<typeof artisans[0] | null>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) {
      (window as any).lenis?.stop();
    } else {
      (window as any).lenis?.start();
    }
    return () => { (window as any).lenis?.start(); };
  }, [selected]);

  return (
    <section id="stylists" className="py-32 md:py-48 bg-forest text-sand relative overflow-hidden grain">
      <div className="container mx-auto px-6 md:px-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-sand/40 mb-4 font-sans">The Masters</p>
            <h3 className="font-serif text-5xl md:text-7xl text-sand leading-none">Our Stylists</h3>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-sans text-sm text-sand/50 max-w-xs leading-relaxed"
          >
            Each stylist brings years of high-fashion experience, blending technical mastery with an intuitive understanding of your unique hair texture and lifestyle.
          </motion.p>
        </div>

        {/* Portrait grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelected(a)}
              className="group cursor-pointer"
            >
              {/* Portrait card */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 bg-forest ring-1 ring-sand/10">
                <img
                  src={a.img} alt={a.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-1000 ease-[0.16,1,0.3,1]"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                {/* Hover: "View profile" pill */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1]">
                  <div className="glass-gold rounded-full px-5 py-2 flex items-center gap-2 whitespace-nowrap">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans">View Profile</span>
                    <ArrowRight className="w-3 h-3 text-gold" />
                  </div>
                </div>
              </div>

              {/* Name + role */}
              <div className="flex items-end justify-between">
                <div>
                  <h4 className="font-serif text-3xl text-sand group-hover:text-gold transition-colors duration-400">{a.name}</h4>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-sand/40 font-sans mt-1">{a.role}</p>
                </div>
                {/* Gold accent rule */}
                <div className="w-0 group-hover:w-10 h-px bg-gold transition-all duration-500 ease-[0.16,1,0.3,1] mb-2" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ─── Profile Modal (portalled to document.body) ─── */}
      {createPortal(
        <AnimatePresence>
          {selected && (
            <>
              <motion.div
                key="atelier-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(null)}
                className="fixed inset-0 bg-ink/88 cursor-pointer"
                style={{ zIndex: 9000 }}
              />
              <div
                className="fixed inset-0 flex items-center justify-center p-4 md:p-8 pointer-events-none"
                style={{ zIndex: 9001 }}
              >
                <motion.div
                  key="atelier-modal"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-6xl max-h-[90vh] bg-ink text-sand overflow-hidden rounded-2xl flex flex-col md:flex-row pointer-events-auto"
                >
                  <motion.button
                    onClick={() => setSelected(null)}
                    whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}
                    className="absolute top-5 right-5 z-10 p-2 hover:bg-sand/5 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  {/* Portrait */}
                  <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden flex-shrink-0">
                    <img src={selected.img} alt={selected.name}
                      className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-3/5 p-8 md:p-14 overflow-y-auto" data-lenis-prevent>
                    <span className="text-[10px] uppercase tracking-[0.28em] text-sand/35 font-sans mb-4 block">{selected.role}</span>
                    <h3 className="font-serif text-5xl md:text-7xl mb-8 leading-none">{selected.name}</h3>
                    <p className="font-sans text-base text-sand/65 leading-relaxed mb-10">{selected.bio}</p>

                    <div className="grid grid-cols-2 gap-10 mb-10">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-sand/30 font-sans mb-5">Specialties</p>
                        <ul className="space-y-3">
                          {selected.specialties.map(s => (
                            <li key={s} className="flex items-center gap-3 font-sans text-sm text-sand/80">
                              <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-sand/30 font-sans mb-5">Connect</p>
                        <a href={selected.instagram} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 font-sans text-sm hover:text-gold transition-colors">
                          <Instagram className="w-4 h-4" />
                          @luxe_{selected.name.toLowerCase()}
                        </a>
                      </div>
                    </div>

                    {/* Draggable portfolio */}
                    <p className="text-[10px] uppercase tracking-[0.2em] text-sand/50 font-sans mb-5">Portfolio</p>
                    <div ref={portfolioRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
                      <motion.div
                        key={selected.name}
                        className="flex gap-4"
                        drag="x"
                        dragConstraints={portfolioRef}
                        dragElastic={0.08}
                        dragTransition={{ bounceStiffness: 250, bounceDamping: 35 }}
                      >
                        {selected.portfolio.map((img, i) => (
                          <div key={i} className="w-64 h-64 flex-shrink-0 overflow-hidden rounded-xl">
                            <img src={img} alt="Work"
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                              referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </motion.div>
                    </div>

                    <button
                      onClick={() => {
                        setSelected(null);
                        window.dispatchEvent(new CustomEvent('luxe-lanka-book-service', {
                          detail: { therapistName: `${selected.name} - ${selected.role}` }
                        }));
                        const el = document.getElementById('booking');
                        if (el && (window as any).lenis) (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.5 });
                      }}
                      className="mt-10 inline-flex items-center gap-4 px-10 py-5 bg-sand text-ink rounded-full text-[11px] uppercase tracking-[0.22em] font-sans hover:bg-gold hover:text-ink transition-all duration-500 group"
                    >
                      Book with {selected.name}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
