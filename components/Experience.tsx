import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subtle parallax: 
  // yTop increases (moves down relative to container) to create "slower scroll" effect
  const yTop = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  
  // yBottom decreases (moves up relative to container) for slight floating contrast
  const yBottom = useTransform(scrollYProgress, [0, 1], [40, -40]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const features = [
    { title: "Japanese Steel", desc: "Precision tools." },
    { title: "Organic Chemistry", desc: "Small-batch products." },
    { title: "Curated Audio", desc: "Sonic relaxation." },
    { title: "Single Malt", desc: "Complimentary beverage." }
  ];

  return (
    <section ref={containerRef} id="experience" className="py-32 md:py-48 bg-brand-charcoal text-brand-cream overflow-hidden -mt-[1px]">
      <div className="container mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-center">
          
          <div className="md:w-1/2 mb-24 md:mb-0 pr-0 md:pr-24 z-10">
            <div>
              <motion.h2 
                className="text-5xl md:text-8xl font-serif leading-none mb-16"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
              >
                Elevated <br />
                <span className="text-brand-gold/60 italic">Standards.</span>
              </motion.h2>
              
              <div className="grid grid-cols-2 gap-x-12 gap-y-16">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: 0.3 + (i * 0.2), duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="w-8 h-[1px] bg-brand-gold/30 mb-6" />
                    <h3 className="text-xl font-serif text-brand-cream mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs font-sans text-brand-silver/50 tracking-widest uppercase">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-1/2 relative h-[800px] w-full">
             <div className="absolute top-0 right-0 w-3/4 h-3/4 overflow-hidden">
                <motion.div 
                    style={{ 
                        y: yTop,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'translateZ(0)'
                    }} 
                    className="w-full h-full will-change-transform"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop" 
                        className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 transition-opacity duration-1000" 
                        alt="Chair" 
                    />
                </motion.div>
             </div>
             <div className="absolute bottom-0 left-0 w-2/3 h-1/2 overflow-hidden border-4 border-brand-charcoal">
                 <motion.div 
                    style={{ 
                        y: yBottom,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'translateZ(0)'
                    }} 
                    className="w-full h-full will-change-transform"
                 >
                    <img 
                        src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop" 
                        className="w-full h-full object-cover grayscale contrast-125" 
                        alt="Tools" 
                    />
                 </motion.div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;