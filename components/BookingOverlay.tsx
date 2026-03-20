import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronLeft, ArrowUpRight, Calendar, ArrowRight } from 'lucide-react';
import { services } from './Services';
import { team } from './Team';

interface BookingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookingState {
  services: string[];
  stylist: string;
  date: string | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
}

const BookingOverlay: React.FC<BookingOverlayProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingState>({
    services: [],
    stylist: '',
    date: null,
    time: null,
    name: '',
    email: '',
    phone: ''
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const toggleService = (id: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(id) 
        ? prev.services.filter(s => s !== id)
        : [...prev.services, id]
    }));
  };

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
        full: d.toISOString().split('T')[0]
    };
  });

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00', 
    '15:00', '15:30', '16:00', '16:30', '17:00', '18:00', '18:30', '19:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const stepTitles = ["Select Service", "Choose Stylist", "Date & Time", "Your Details", "Confirmed"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 md:top-10 md:right-10 z-50 text-brand-cream hover:text-brand-gold transition-colors p-2"
            >
                <X size={32} strokeWidth={1} />
            </button>

            <div className="w-full max-w-6xl px-6 md:px-12 h-[90vh] flex flex-col relative">
                
                {/* Header / Progress */}
                <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/10 pb-6 mb-8 md:mb-12">
                     <div>
                        <span className="text-brand-gold font-sans text-[10px] tracking-[0.3em] uppercase mb-2 block">
                            Step {step} of 4
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif text-brand-cream">
                            {stepTitles[step - 1]}
                        </h2>
                     </div>
                     
                     <div className="mt-4 md:mt-0 flex items-center gap-1">
                        {[1, 2, 3, 4].map((s) => (
                            <div 
                                key={s} 
                                className={`h-[2px] w-8 md:w-12 transition-colors duration-500 ${step >= s ? 'bg-brand-gold' : 'bg-brand-charcoal'}`} 
                            />
                        ))}
                     </div>
                </div>

                {/* Content Area */}
                <div className="flex-grow overflow-y-auto no-scrollbar relative">
                    <AnimatePresence mode="wait">
                        
                        {/* STEP 1: SERVICES */}
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20"
                            >
                                {services.map(service => (
                                    <div 
                                        key={service.id}
                                        onClick={() => toggleService(service.title)}
                                        className={`p-6 md:p-8 border cursor-pointer transition-all duration-300 group ${
                                            formData.services.includes(service.title) 
                                            ? 'border-brand-gold bg-brand-gold/5' 
                                            : 'border-white/10 hover:border-brand-gold/30 bg-brand-black/20'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-serif text-2xl group-hover:text-brand-gold transition-colors">{service.title}</h3>
                                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                                                formData.services.includes(service.title) 
                                                ? 'border-brand-gold bg-brand-gold' 
                                                : 'border-white/20'
                                            }`}>
                                                {formData.services.includes(service.title) && <Check size={14} className="text-brand-black" />}
                                            </div>
                                        </div>
                                        <p className="font-sans text-sm text-brand-silver/50 mb-6 font-light">{service.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {service.details.map((d, i) => (
                                                <span key={i} className="text-[10px] uppercase tracking-wider text-brand-silver/40 border border-white/10 px-2 py-1 rounded-sm">
                                                    {d}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-brand-gold text-lg font-serif italic">{service.price}</span>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* STEP 2: STYLIST */}
                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-20"
                            >
                                <div 
                                    onClick={() => setFormData({...formData, stylist: 'Any Available'})}
                                    className={`p-8 border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 aspect-[3/4] ${
                                        formData.stylist === 'Any Available'
                                        ? 'border-brand-gold bg-brand-gold/5' 
                                        : 'border-white/10 hover:border-brand-gold/30 bg-brand-black/20'
                                    }`}
                                >
                                    <div className="w-24 h-24 rounded-full bg-brand-charcoal mb-6 flex items-center justify-center border border-white/5">
                                        <span className="font-serif text-3xl text-brand-silver/50 italic">Any</span>
                                    </div>
                                    <h3 className="font-serif text-xl mb-2">First Available</h3>
                                    <p className="font-sans text-[10px] text-brand-silver/50 uppercase tracking-wider">For the flexible</p>
                                </div>
                                
                                {team.map(member => (
                                    <div 
                                        key={member.id}
                                        onClick={() => setFormData({...formData, stylist: member.name})}
                                        className={`p-8 border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 aspect-[3/4] group ${
                                            formData.stylist === member.name
                                            ? 'border-brand-gold bg-brand-gold/5' 
                                            : 'border-white/10 hover:border-brand-gold/30 bg-brand-black/20'
                                        }`}
                                    >
                                        <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border border-white/5 group-hover:border-brand-gold/30 transition-colors">
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                        <h3 className="font-serif text-xl mb-2">{member.name}</h3>
                                        <p className="font-sans text-[10px] text-brand-silver/50 uppercase tracking-wider">{member.role}</p>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* STEP 3: DATE & TIME */}
                        {step === 3 && (
                            <motion.div 
                                key="step3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="pb-20"
                            >
                                <div className="mb-12">
                                    <h4 className="font-sans text-xs tracking-widest uppercase text-brand-gold mb-6">Select Date</h4>
                                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                        {dates.map((d, i) => (
                                            <div 
                                                key={i}
                                                onClick={() => setFormData({...formData, date: d.full})}
                                                className={`min-w-[100px] h-32 border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                                                    formData.date === d.full
                                                    ? 'border-brand-gold bg-brand-gold/10'
                                                    : 'border-white/10 hover:border-brand-gold/30 bg-brand-black/20'
                                                }`}
                                            >
                                                <span className="font-sans text-xs text-brand-silver/60 uppercase mb-2">{d.day}</span>
                                                <span className="font-serif text-4xl mb-2">{d.date}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {formData.date && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <h4 className="font-sans text-xs tracking-widest uppercase text-brand-gold mb-6">Select Time</h4>
                                        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                                            {timeSlots.map(time => (
                                                <div 
                                                    key={time}
                                                    onClick={() => setFormData({...formData, time})}
                                                    className={`py-3 text-center text-sm border cursor-pointer transition-all duration-300 ${
                                                        formData.time === time
                                                        ? 'border-brand-gold bg-brand-gold text-brand-black'
                                                        : 'border-white/10 text-brand-silver/70 hover:border-brand-gold/30 hover:text-brand-gold'
                                                    }`}
                                                >
                                                    {time}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* STEP 4: DETAILS */}
                        {step === 4 && (
                            <motion.div 
                                key="step4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="pb-20 max-w-2xl mx-auto"
                            >
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 gap-8">
                                        <div className="group">
                                            <label className="block font-sans text-xs tracking-widest uppercase text-brand-gold/70 mb-3 group-focus-within:text-brand-gold transition-colors">Full Name</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full bg-transparent border-b border-white/20 py-4 text-2xl font-serif text-brand-cream focus:border-brand-gold outline-none transition-colors placeholder:text-white/10"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block font-sans text-xs tracking-widest uppercase text-brand-gold/70 mb-3 group-focus-within:text-brand-gold transition-colors">Email Address</label>
                                            <input 
                                                type="email" 
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                className="w-full bg-transparent border-b border-white/20 py-4 text-2xl font-serif text-brand-cream focus:border-brand-gold outline-none transition-colors placeholder:text-white/10"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block font-sans text-xs tracking-widest uppercase text-brand-gold/70 mb-3 group-focus-within:text-brand-gold transition-colors">Phone Number</label>
                                            <input 
                                                type="tel" 
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                className="w-full bg-transparent border-b border-white/20 py-4 text-2xl font-serif text-brand-cream focus:border-brand-gold outline-none transition-colors placeholder:text-white/10"
                                                placeholder="Enter your phone"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="mt-12 p-6 bg-brand-charcoal/30 border border-white/5">
                                        <h4 className="font-serif text-brand-cream mb-2 text-lg">Booking Policy</h4>
                                        <p className="font-sans text-xs text-brand-silver/50 leading-relaxed">
                                            We require 24 hours notice for cancellations. Please arrive 10 minutes early to enjoy a complimentary beverage.
                                        </p>
                                    </div>
                                    
                                    <button 
                                        type="submit"
                                        className="relative w-full mt-8 py-5 border border-brand-gold/30 text-brand-gold font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 ease-out overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(201,169,97,0.3)]"
                                    >
                                         <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-brand-black transition-colors duration-500">
                                            Confirm Reservation <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                         </span>
                                         <div className="absolute inset-0 bg-brand-gold transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {/* STEP 5: SUCCESS */}
                        {step === 5 && (
                            <motion.div 
                                key="step5"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center justify-center h-full pb-20 text-center"
                            >
                                <div className="w-24 h-24 rounded-full border border-brand-gold/30 flex items-center justify-center mb-8">
                                    <Check size={48} className="text-brand-gold" strokeWidth={1} />
                                </div>
                                <h2 className="text-5xl md:text-7xl font-serif text-brand-cream mb-6">Confirmed.</h2>
                                <div className="space-y-2 mb-12">
                                    <p className="font-serif text-2xl text-brand-silver/80">
                                        {formData.date} at {formData.time}
                                    </p>
                                    <p className="font-sans text-sm text-brand-silver/50 uppercase tracking-widest">
                                        {formData.stylist} &bull; {formData.services.join(', ')}
                                    </p>
                                </div>
                                
                                <button 
                                    onClick={onClose}
                                    className="group flex items-center gap-3 px-8 py-4 border border-white/10 hover:border-brand-gold/50 transition-colors"
                                >
                                    <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-silver group-hover:text-brand-gold transition-colors">
                                        Return to Experience
                                    </span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Controls */}
                {step < 5 && (
                    <div className="absolute bottom-6 left-0 w-full px-6 md:px-12 flex justify-between items-center pointer-events-none">
                        <div className="pointer-events-auto">
                            {step > 1 && (
                                <button 
                                    onClick={prevStep} 
                                    className="flex items-center gap-2 text-brand-silver/50 hover:text-brand-gold transition-colors font-sans text-xs tracking-widest uppercase"
                                >
                                    <ChevronLeft size={16} /> Back
                                </button>
                            )}
                        </div>
                        <div className="pointer-events-auto">
                             {step < 4 && (
                                <button 
                                    onClick={nextStep}
                                    disabled={(step === 1 && formData.services.length === 0) || (step === 2 && !formData.stylist) || (step === 3 && (!formData.date || !formData.time))}
                                    className={`relative px-8 py-3 border border-white/10 text-brand-gold font-sans text-xs tracking-widest uppercase backdrop-blur-sm transition-all overflow-hidden group hover:-translate-y-1 hover:shadow-lg ${
                                        (step === 1 && formData.services.length === 0) || (step === 2 && !formData.stylist) || (step === 3 && (!formData.date || !formData.time))
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:border-brand-gold/30 cursor-pointer'
                                    }`}
                                >
                                    <span className={`relative z-10 transition-colors duration-500 ${(step === 1 && formData.services.length === 0) || (step === 2 && !formData.stylist) || (step === 3 && (!formData.date || !formData.time)) ? '' : 'group-hover:text-brand-black'}`}>Continue</span>
                                    {/* Only show fill if enabled */}
                                    {!((step === 1 && formData.services.length === 0) || (step === 2 && !formData.stylist) || (step === 3 && (!formData.date || !formData.time))) && (
                                        <div className="absolute inset-0 bg-brand-gold transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                                    )}
                                </button>
                             )}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingOverlay;