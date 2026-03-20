import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BookingCTAProps {
  onBookClick: () => void;
}

const BookingCTA: React.FC<BookingCTAProps> = ({ onBookClick }) => {
  return (
    <section id="book" className="py-40 md:py-60 bg-brand-black relative overflow-hidden flex items-center justify-center -mt-[1px]">
      
      {/* Subtle Animated Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at center, rgba(201, 169, 97, 0.03) 0%, transparent 70%)",
            "radial-gradient(circle at center, rgba(138, 115, 62, 0.08) 0%, transparent 70%)",
            "radial-gradient(circle at center, rgba(201, 169, 97, 0.03) 0%, transparent 70%)"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          className="text-6xl md:text-9xl font-serif text-brand-cream mb-12 mix-blend-overlay"
          initial={{ opacity: 0, scale: 0.95, y: 60 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Redefine.
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <button 
            onClick={onBookClick}
            className="cta-button inline-flex flex-col items-center group cursor-pointer transition-transform duration-500 hover:-translate-y-2"
          >
             <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-brand-gold mb-6 group-hover:text-brand-cream transition-colors duration-700">
                Book Appointment
             </span>
             
             <div className="w-16 h-[1px] bg-brand-gold group-hover:w-24 transition-all duration-700 ease-out mb-6" />
             
             <div className="relative p-6 rounded-full border border-white/10 group-hover:border-brand-gold overflow-hidden transition-colors duration-700 hover:shadow-[0_0_30px_-5px_rgba(201,169,97,0.4)]">
                {/* Background Fill */}
                <div className="absolute inset-0 bg-brand-gold transform scale-0 group-hover:scale-150 transition-transform duration-700 ease-out rounded-full" />
                
                {/* Icon */}
                <ArrowRight className="w-8 h-8 text-brand-cream relative z-10 group-hover:text-brand-black transition-colors duration-700 group-hover:rotate-[-45deg]" />
             </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingCTA;