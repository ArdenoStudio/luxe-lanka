import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceItem } from '../types';
import { ChevronDown, Clock, ArrowRight, Check } from 'lucide-react';

export const services: ServiceItem[] = [
  {
    id: '01',
    title: 'Signature Haircut',
    description: 'Precision consultation followed by a tailored cut, wash, and style.',
    details: ['Structural Analysis', 'Precision Scissor Work', 'Hot Towel Finish'],
    price: '4500 LKR',
    duration: '60 Minutes',
    includes: ['30-minute consultation', 'Precision cut by master stylist', 'Wash & conditioning treatment', 'Hot towel & neck massage', 'Styling & product application']
  },
  {
    id: '02',
    title: 'Beard Artistry',
    description: 'Complete reshaping and conditioning for the modern beard.',
    details: ['Shape Design', 'Straight Razor Line-up', 'Beard Oil Treatment'],
    price: '3000 LKR',
    duration: '45 Minutes',
    includes: ['Face shape analysis', 'Hot towel preparation', 'Straight razor line-up', 'Beard conditioning mask', 'Beard oil application']
  },
  {
    id: '03',
    title: 'Executive Shave',
    description: 'The traditional wet shave experience. Impossibly close.',
    details: ['Pre-shave Oil', 'Hot Foam', 'Single Blade', 'Cold Towel'],
    price: '3500 LKR',
    duration: '45 Minutes',
    includes: ['Pre-shave oil massage', 'Hot foam application', 'Single blade traditional shave', 'Cold towel finish', 'Aftershave balm']
  },
  {
    id: '04',
    title: 'The Full Experience',
    description: 'Flagship service. Cut, beard groom, and facial.',
    details: ['Full Consultation', 'Hair & Beard', 'Express Facial', 'Premium Drink'],
    price: '8500 LKR',
    duration: '90 Minutes',
    includes: ['Full signature haircut', 'Complete beard artistry', 'Express facial treatment', 'Head & shoulder massage', 'Complimentary premium beverage']
  },
  {
    id: '05',
    title: 'Grey Blending',
    description: 'Subtle, natural-looking color treatment.',
    details: ['Color Match', '5-Minute Processing', 'Matte Finish'],
    price: '5000 LKR',
    duration: '30 Minutes',
    includes: ['Custom color matching', 'Ammonia-free application', '5-minute processing time', 'Natural matte finish', 'Wash & style']
  }
];

interface ServicesProps {
  onBookClick?: () => void;
}

const Services: React.FC<ServicesProps> = ({ onBookClick }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="py-32 md:py-48 bg-brand-black text-brand-cream relative z-10 -mt-[1px]">
      <div className="container mx-auto px-6 md:px-16">
        
        {/* Section Header */}
        <div className="mb-32 relative">
          <motion.div
             initial={{ opacity: 0, y: 60 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-10%" }}
             transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-brand-gold font-sans text-[10px] tracking-[0.3em] uppercase mb-8 block">
                Menu
            </span>
            <h2 className="text-6xl md:text-9xl font-serif text-brand-cream leading-[0.9] tracking-tight mb-4">
                Services
            </h2>
          </motion.div>
          <motion.p 
            className="text-brand-silver/40 font-serif italic text-xl md:text-2xl absolute right-0 top-1/2 hidden md:block"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
          >
             Detailed perfection.
          </motion.p>
        </div>

        {/* Services List */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: index * 0.1, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative border-b border-brand-charcoal transition-all duration-700 service-item ${expandedId === service.id ? 'pb-12' : 'pb-0'}`}
              onClick={(e) => toggleExpand(service.id, e)}
            >
              {/* Gold Accent Line */}
              <div className="absolute left-[-2rem] md:left-[-4rem] top-0 h-full w-[2px] bg-brand-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top ease-out hidden md:block" />

              <div className="py-12 md:py-16 relative flex flex-col md:flex-row justify-between items-baseline cursor-pointer">
                
                {/* ID & Title */}
                <div className="md:w-7/12 flex flex-col md:flex-row md:items-baseline gap-6 md:gap-12">
                   <span className="font-serif text-xl md:text-2xl text-brand-silver/30 group-hover:text-brand-gold transition-colors duration-500">
                      {service.id}
                   </span>
                   <div>
                      <h3 className="text-4xl md:text-6xl font-serif text-brand-cream group-hover:text-brand-gold transition-transform duration-500 ease-out group-hover:translate-x-4 mb-4">
                          {service.title}
                      </h3>
                      <p className="font-sans text-brand-silver/60 font-light text-sm md:text-base max-w-md leading-relaxed group-hover:text-brand-cream/80 transition-colors duration-500">
                          {service.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-3 mt-6">
                        {service.details.map((tag, i) => (
                            <span 
                                key={i} 
                                className="px-3 py-1 border border-brand-charcoal bg-brand-charcoal/30 text-[9px] uppercase tracking-widest text-brand-silver/50 group-hover:border-brand-gold/30 group-hover:text-brand-gold/80 transition-all duration-500"
                            >
                                {tag}
                            </span>
                        ))}
                      </div>
                   </div>
                </div>

                {/* Price & Expand */}
                <div className="md:w-5/12 flex flex-col md:items-end mt-8 md:mt-0">
                    <span className="font-serif text-3xl md:text-4xl text-brand-gold/80 group-hover:text-brand-gold group-hover:scale-110 origin-right transition-all duration-500">
                         {service.price}
                    </span>
                    
                    <button 
                        className="mt-8 flex items-center gap-2 text-brand-gold/60 text-[10px] uppercase tracking-widest hover:text-brand-gold transition-colors group/btn"
                    >
                        <span className="group-hover/btn:mr-2 transition-all duration-300">
                            {expandedId === service.id ? 'Close Details' : 'Learn More'}
                        </span>
                        <ChevronDown 
                            size={14} 
                            className={`transition-transform duration-500 ${expandedId === service.id ? 'rotate-180' : 'group-hover/btn:translate-y-1'}`} 
                        />
                    </button>
                </div>

                {/* Individual Book Button - Appears on Hover */}
                <div className="absolute bottom-12 right-0 hidden md:block opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out delay-100">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onBookClick?.();
                        }}
                        className="relative px-6 py-3 border border-brand-gold/30 text-brand-gold text-[10px] uppercase tracking-widest transition-all duration-500 overflow-hidden group/cta hover:-translate-y-1 hover:shadow-[0_4px_20px_-5px_rgba(201,169,97,0.3)]"
                    >
                        <span className="relative z-10 flex items-center gap-3 group-hover/cta:text-brand-black transition-colors duration-500">
                            Book This Service <ArrowRight size={14} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-brand-gold transform scale-x-0 origin-left group-hover/cta:scale-x-100 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                    </button>
                </div>
              </div>

              {/* Expandable Details */}
              <AnimatePresence>
                {expandedId === service.id && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden bg-brand-charcoal/20 border-t border-brand-charcoal"
                    >
                        <div className="py-8 md:py-12 px-4 md:px-0 flex flex-col md:flex-row gap-12">
                            {/* What's Included */}
                            <div className="md:w-2/3 md:pl-20">
                                <h4 className="font-sans text-[10px] uppercase tracking-widest text-brand-gold mb-6">What's Included</h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    {service.includes?.map((item, i) => (
                                        <motion.li 
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-3 text-brand-silver/70 font-sans text-sm font-light"
                                        >
                                            <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {/* Duration & CTA (Mobile) */}
                            <div className="md:w-1/3 border-t md:border-t-0 md:border-l border-brand-charcoal pt-8 md:pt-0 md:pl-12">
                                <h4 className="font-sans text-[10px] uppercase tracking-widest text-brand-gold mb-4">Duration</h4>
                                <div className="flex items-center gap-3 text-brand-cream font-serif text-2xl mb-8">
                                    <Clock size={20} className="text-brand-silver/40" />
                                    {service.duration}
                                </div>

                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onBookClick?.();
                                    }}
                                    className="relative w-full md:w-auto px-8 py-4 border border-brand-gold/50 text-brand-gold font-sans text-xs uppercase tracking-widest transition-all duration-500 overflow-hidden group/cta hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(201,169,97,0.3)]"
                                >
                                    <span className="relative z-10 group-hover/cta:text-brand-black transition-colors duration-500 font-bold">
                                        Book Appointment
                                    </span>
                                    <div className="absolute inset-0 bg-brand-gold transform scale-x-0 origin-left group-hover/cta:scale-x-100 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;