import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for the image column
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const numberY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} id="philosophy" className="py-32 md:py-56 bg-brand-charcoal relative overflow-hidden -mt-[1px]">
      <div className="container mx-auto px-6 md:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-40">
          
          {/* Text Content */}
          <div className="lg:w-5/12 order-2 lg:order-1">
            <motion.span 
                className="text-brand-gold font-sans text-[10px] tracking-[0.3em] uppercase mb-8 block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
            >
              The Philosophy
            </motion.span>
            
            <motion.h2 
                className="text-5xl md:text-7xl font-serif text-brand-cream mb-12 leading-[1.1]"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              Restrained <br/> 
              <span className="italic text-brand-silver/60">Power.</span>
            </motion.h2>
            
            <div className="space-y-8 text-brand-silver/70 font-sans font-light text-lg md:text-xl leading-relaxed">
              <motion.p
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-15%" }}
                 transition={{ delay: 0.6, duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
              >
                Grooming is not merely maintenance; it is an act of identity definition. 
                We bridge the gap between traditional barbershop heritage 
                and contemporary wellness culture.
              </motion.p>
              <motion.p
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-15%" }}
                 transition={{ delay: 0.9, duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
              >
                Our atmosphere is designed to evoke a sense of calm confidence. 
                This is where the tactile luxury of a hot towel meets the sharp edge of Japanese steel.
              </motion.p>
            </div>
          </div>

          {/* Visual Content */}
          <motion.div 
            className="lg:w-7/12 order-1 lg:order-2 relative will-change-transform"
            style={{ 
                y: imageY,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
            }}
          >
            <div className="relative overflow-hidden w-full aspect-[4/5] md:aspect-[3/4]">
                {/* Pointer events none added to overlay so cursor hits the image */}
                <motion.div
                  className="absolute inset-0 bg-brand-black/20 z-10 mix-blend-multiply pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 3.0 }}
                />
                <motion.img
                  src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1976&auto=format&fit=crop"
                  alt="Barber hands precision"
                  className="w-full h-full object-cover grayscale contrast-125"
                  initial={{ scale: 1.15, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
            
            <motion.div 
                className="absolute -right-12 -bottom-12 font-serif text-[10rem] text-brand-gold/5 leading-none hidden md:block select-none"
                style={{ y: numberY }}
                initial={{ x: 80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                01
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Philosophy;