import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { SoundManager } from '../services/soundService';

const services = [
  {
    title: 'Bespoke Balayage',
    desc: 'A personalized hand-painted colour technique designed to enhance your natural features with seamless, sun-kissed dimension.',
    price: 'From $350',
    duration: '180 Min',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2070&auto=format&fit=crop',
    tag: 'Signature',
  },
  {
    title: 'Precision Cut & Style',
    desc: 'An architectural approach to hair cutting — tailored to your bone structure and lifestyle for an effortless, lived-in look.',
    price: 'From $150',
    duration: '60 Min',
    img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2070&auto=format&fit=crop',
    tag: 'Craft',
  },
  {
    title: 'Signature Blowout',
    desc: 'A luxurious wash, scalp massage, and expert styling to deliver voluminous, glass-like shine that lasts for days.',
    price: '$85',
    duration: '45 Min',
    img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2070&auto=format&fit=crop',
    tag: 'Ritual',
  },
];

export function Services() {
  const [selected, setSelected] = useState<typeof services[0] | null>(null);

  useEffect(() => {
    if (selected) {
      (window as any).lenis?.stop();
    } else {
      (window as any).lenis?.start();
    }
    return () => { (window as any).lenis?.start(); };
  }, [selected]);

  const bookService = (title: string) => {
    SoundManager.playClick();
    window.dispatchEvent(new CustomEvent('luxe-lanka-book-service', { detail: { serviceName: title } }));
    setSelected(null);
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-32 md:py-48 bg-forest relative grain">
      <div className="container mx-auto px-6 md:px-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-sand/40 mb-4 font-sans">Curated Experiences</p>
            <h3 className="font-serif text-5xl md:text-7xl text-sand leading-none">Signature Services</h3>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-sans text-sm text-sand/40 max-w-[200px] leading-relaxed hidden md:block"
          >
            Hover to reveal · Click to explore
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => { SoundManager.playClick(); setSelected(service); }}
              className="group relative aspect-[3/4] [clip-path:inset(0_round_16px)] cursor-pointer bg-forest"
            >
              {/* Image */}
              <img
                src={service.img}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.72] saturate-[0.85] transition-all duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-[1.07] group-hover:brightness-[0.65]"
                referrerPolicy="no-referrer"
              />

              {/* Permanent gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/40 to-transparent transition-opacity duration-500 group-hover:opacity-20" />

              {/* Service tag */}
              <div className="absolute top-5 right-5 px-3 py-1 glass rounded-full">
                <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-sans">{service.tag}</span>
              </div>

              {/* Default label — fades out on hover */}
              <div className="absolute bottom-0 left-0 p-8 transition-all duration-400 group-hover:opacity-0 group-hover:translate-y-3">
                <h4 className="font-serif text-2xl text-sand mb-1">{service.title}</h4>
                <p className="text-[11px] uppercase tracking-widest text-gold font-sans">{service.price}</p>
              </div>

              {/* Glassmorphism reveal panel */}
              <div className="absolute inset-x-4 bottom-4 [clip-path:inset(100%_0_0_0_round_12px)] group-hover:[clip-path:inset(0%_0_0_0_round_12px)] transition-[clip-path] duration-500 ease-[0.16,1,0.3,1]">
                <div className="relative rounded-xl overflow-hidden border border-sand/[0.14]">
                  {/* Blurred image layer — fakes frosted glass without backdrop-filter */}
                  <div
                    className="absolute inset-0 scale-125 saturate-75"
                    style={{ backgroundImage: `url(${service.img})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(28px)' }}
                  />
                  {/* Dark tint for readability */}
                  <div className="absolute inset-0 bg-forest/50" />
                  {/* Content */}
                  <div className="relative z-10 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                    <h4 className="font-serif text-xl text-sand mb-3">{service.title}</h4>
                    <p className="font-sans text-[12px] text-sand/65 leading-relaxed mb-5">{service.desc}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gold text-[11px] uppercase tracking-widest font-sans">{service.price}</span>
                      <div className="flex items-center gap-1.5 text-sand/45 text-[11px] font-sans">
                        <Clock className="w-3 h-3" />
                        {service.duration}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-sand/10 flex items-center gap-2 text-sand/50 text-[11px] uppercase tracking-[0.18em] font-sans">
                      <span>Full details</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ─── Detail Modal (portalled to document.body) ─── */}
      {createPortal(
        <AnimatePresence>
          {selected && (
            <>
              <motion.div
                key="services-backdrop"
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
                  key="services-modal"
                  initial={{ opacity: 0, scale: 0.93, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: 24 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-5xl max-h-[90vh] bg-sand text-ink overflow-y-auto rounded-2xl flex flex-col md:flex-row shadow-2xl pointer-events-auto"
                  data-lenis-prevent
                >
                  <motion.button
                    onClick={() => setSelected(null)}
                    whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}
                    className="absolute top-5 right-5 z-10 p-2 hover:bg-ink/5 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative flex-shrink-0">
                    <img src={selected.img} alt={selected.title}
                      className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-sand/20 to-transparent" />
                  </div>

                  <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-ink/35 mb-4 block font-sans">{selected.tag} Service</span>
                    <h3 className="font-serif text-4xl md:text-5xl mb-7 leading-tight">{selected.title}</h3>
                    <p className="font-sans text-base text-ink/60 leading-relaxed mb-10">{selected.desc}</p>

                    <div className="grid grid-cols-2 gap-6 mb-10 border-y border-ink/10 py-7">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-ink/35 font-sans mb-2">Duration</p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gold" />
                          <span className="font-sans text-base font-medium">{selected.duration}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-ink/35 font-sans mb-2">Investment</p>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gold" />
                          <span className="font-sans text-base font-medium">{selected.price}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => bookService(selected.title)}
                      className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-ink text-sand rounded-full text-[11px] uppercase tracking-[0.22em] font-sans hover:bg-gold hover:text-ink transition-all duration-500 group"
                    >
                      Book This Service
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
