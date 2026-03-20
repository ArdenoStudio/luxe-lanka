import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Calendar, Clock, ChevronLeft, ArrowUpRight } from 'lucide-react';
import { services } from './Services';
import { team } from './Team';

interface BookingState {
  services: string[];
  stylist: string;
  date: string | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
}

const BookingPage: React.FC = () => {
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
    nextStep(); // Go to confirmation
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <section className="pt-32 pb-20 min-h-screen bg-brand-black text-brand-cream relative">
       {/* Background Elements */}
       <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-brand-charcoal/20 to-transparent pointer-events-none" />

       <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          
          {/* Header */}
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center">
             <div>
                <span className="text-brand-gold font-sans text-[10px] tracking-[0.3em] uppercase mb-4 block">
                    Reservations
                </span>
                <h1 className="text-4xl md:text-6xl font-serif text-brand-cream">
                    Book Appointment
                </h1>
             </div>
             
             {/* Progress Steps */}
             <div className="mt-8 md:mt-0 flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                    <div 
                        key={s}
                        className={`h-1 w-8 rounded-full transition-colors duration-500 ${step >= s ? 'bg-brand-gold' : 'bg-brand-charcoal'}`}
                    />
                ))}
             </div>
          </div>

          {/* Main Wizard Area */}
          <div className="bg-brand-charcoal/30 border border-white/5 backdrop-blur-sm p-6 md:p-12 min-h-[500px] relative overflow-hidden rounded-sm">
             <AnimatePresence mode="wait">
                
                {/* STEP 1: SERVICES */}
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <h2 className="text-2xl font-serif mb-8">Select Service(s)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {services.map(service => (
                                <div 
                                    key={service.id}
                                    onClick={() => toggleService(service.title)}
                                    className={`p-6 border cursor-pointer transition-all duration-300 group ${
                                        formData.services.includes(service.title) 
                                        ? 'border-brand-gold bg-brand-gold/5' 
                                        : 'border-white/10 hover:border-brand-gold/30 bg-brand-black/20'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-serif text-xl">{service.title}</h3>
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                            formData.services.includes(service.title) 
                                            ? 'border-brand-gold bg-brand-gold' 
                                            : 'border-white/20'
                                        }`}>
                                            {formData.services.includes(service.title) && <Check size={12} className="text-brand-black" />}
                                        </div>
                                    </div>
                                    <p className="font-sans text-xs text-brand-silver/50 mb-4">{service.description}</p>
                                    <span className="text-brand-gold text-sm font-serif italic">{service.price}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button 
                                onClick={nextStep}
                                disabled={formData.services.length === 0}
                                className={`px-8 py-3 border border-brand-gold/30 text-brand-gold font-sans text-xs tracking-widest uppercase transition-all ${
                                    formData.services.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-gold hover:text-brand-black cursor-pointer'
                                }`}
                            >
                                Continue
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: STYLIST */}
                {step === 2 && (
                    <motion.div 
                        key="step2"
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <h2 className="text-2xl font-serif mb-8">Select Stylist</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div 
                                onClick={() => setFormData({...formData, stylist: 'Any Available'})}
                                className={`p-6 border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-[250px] ${
                                    formData.stylist === 'Any Available'
                                    ? 'border-brand-gold bg-brand-gold/5' 
                                    : 'border-white/10 hover:border-brand-gold/30 bg-brand-black/20'
                                }`}
                            >
                                <div className="w-20 h-20 rounded-full bg-brand-charcoal mb-4 flex items-center justify-center border border-white/5">
                                    <span className="font-serif text-2xl text-brand-silver/50">Any</span>
                                </div>
                                <h3 className="font-serif text-lg mb-1">Any Stylist</h3>
                                <p className="font-sans text-[10px] text-brand-silver/50 uppercase tracking-wider">Earliest Availability</p>
                            </div>
                            
                            {team.map(member => (
                                <div 
                                    key={member.id}
                                    onClick={() => setFormData({...formData, stylist: member.name})}
                                    className={`p-6 border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-[250px] ${
                                        formData.stylist === member.name
                                        ? 'border-brand-gold bg-brand-gold/5' 
                                        : 'border-white/10 hover:border-brand-gold/30 bg-brand-black/20'
                                    }`}
                                >
                                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border border-white/5">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale" />
                                    </div>
                                    <h3 className="font-serif text-lg mb-1">{member.name}</h3>
                                    <p className="font-sans text-[10px] text-brand-silver/50 uppercase tracking-wider">{member.role}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-between">
                            <button onClick={prevStep} className="flex items-center gap-2 text-brand-silver/50 hover:text-brand-gold transition-colors font-sans text-xs tracking-widest uppercase">
                                <ChevronLeft size={16} /> Back
                            </button>
                            <button 
                                onClick={nextStep}
                                disabled={!formData.stylist}
                                className={`px-8 py-3 border border-brand-gold/30 text-brand-gold font-sans text-xs tracking-widest uppercase transition-all ${
                                    !formData.stylist ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-gold hover:text-brand-black cursor-pointer'
                                }`}
                            >
                                Continue
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: DATE & TIME */}
                {step === 3 && (
                    <motion.div 
                        key="step3"
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                         <h2 className="text-2xl font-serif mb-8">Select Date & Time</h2>
                         
                         {/* Date Selection */}
                         <div className="mb-8 overflow-x-auto pb-4">
                            <div className="flex gap-4 min-w-max">
                                {dates.map((d, i) => (
                                    <div 
                                        key={i}
                                        onClick={() => setFormData({...formData, date: d.full})}
                                        className={`w-24 h-28 border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                                            formData.date === d.full
                                            ? 'border-brand-gold bg-brand-gold/10'
                                            : 'border-white/10 hover:border-brand-gold/30 bg-brand-black/20'
                                        }`}
                                    >
                                        <span className="font-sans text-xs text-brand-silver/60 uppercase mb-1">{d.day}</span>
                                        <span className="font-serif text-3xl mb-1">{d.date}</span>
                                    </div>
                                ))}
                            </div>
                         </div>

                         {/* Time Selection */}
                         {formData.date && (
                             <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                             >
                                 <h3 className="font-sans text-xs tracking-widest uppercase text-brand-gold mb-4">Available Slots</h3>
                                 <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                                     {timeSlots.map(time => (
                                         <div 
                                            key={time}
                                            onClick={() => setFormData({...formData, time})}
                                            className={`py-2 text-center text-sm border cursor-pointer transition-all duration-300 ${
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

                        <div className="mt-12 flex justify-between">
                            <button onClick={prevStep} className="flex items-center gap-2 text-brand-silver/50 hover:text-brand-gold transition-colors font-sans text-xs tracking-widest uppercase">
                                <ChevronLeft size={16} /> Back
                            </button>
                            <button 
                                onClick={nextStep}
                                disabled={!formData.date || !formData.time}
                                className={`px-8 py-3 border border-brand-gold/30 text-brand-gold font-sans text-xs tracking-widest uppercase transition-all ${
                                    !formData.date || !formData.time ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-gold hover:text-brand-black cursor-pointer'
                                }`}
                            >
                                Continue
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 4: DETAILS */}
                {step === 4 && (
                    <motion.div 
                        key="step4"
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <h2 className="text-2xl font-serif mb-8">Your Details</h2>
                        <form onSubmit={handleSubmit} className="max-w-xl">
                            <div className="space-y-6">
                                <div>
                                    <label className="block font-sans text-xs tracking-widest uppercase text-brand-gold/70 mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-transparent border-b border-white/20 py-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block font-sans text-xs tracking-widest uppercase text-brand-gold/70 mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-transparent border-b border-white/20 py-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block font-sans text-xs tracking-widest uppercase text-brand-gold/70 mb-2">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="w-full bg-transparent border-b border-white/20 py-3 text-brand-cream focus:border-brand-gold outline-none transition-colors"
                                        placeholder="+94 77 123 4567"
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-8 p-4 bg-brand-black/40 border border-white/5 rounded-sm">
                                <h4 className="font-serif text-brand-cream mb-2">Policy Note</h4>
                                <p className="font-sans text-xs text-brand-silver/50 leading-relaxed">
                                    Cancellations must be made 24 hours in advance. Please arrive 10 minutes prior to your scheduled time. Late arrivals beyond 15 minutes may require rescheduling.
                                </p>
                            </div>

                            <div className="mt-12 flex justify-between items-center">
                                <button type="button" onClick={prevStep} className="flex items-center gap-2 text-brand-silver/50 hover:text-brand-gold transition-colors font-sans text-xs tracking-widest uppercase">
                                    <ChevronLeft size={16} /> Back
                                </button>
                                <button 
                                    type="submit"
                                    className="px-8 py-3 bg-brand-gold text-brand-black font-sans text-xs tracking-widest uppercase hover:bg-white transition-colors cursor-pointer"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                 {/* STEP 5: SUCCESS */}
                 {step === 5 && (
                    <motion.div 
                        key="step5"
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center justify-center py-12 text-center"
                    >
                        <div className="w-20 h-20 rounded-full border border-brand-gold/30 flex items-center justify-center mb-6">
                            <Check size={40} className="text-brand-gold" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-brand-cream mb-4">Confirmed.</h2>
                        <p className="font-sans text-brand-silver/60 max-w-md mx-auto mb-8">
                            Thank you, {formData.name}. Your appointment for <span className="text-brand-gold">{formData.services.join(', ')}</span> with <span className="text-brand-gold">{formData.stylist}</span> has been scheduled for <span className="text-brand-gold">{formData.date} at {formData.time}</span>.
                        </p>
                        <p className="font-sans text-xs text-brand-silver/40 uppercase tracking-widest mb-12">
                            A confirmation email has been sent to {formData.email}.
                        </p>
                        
                        <a href="/" className="group flex items-center gap-2 cursor-pointer">
                            <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-gold group-hover:text-white transition-colors duration-300">
                                Return Home
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-brand-gold group-hover:text-white transition-colors duration-300" />
                        </a>
                    </motion.div>
                )}

             </AnimatePresence>
          </div>
       </div>
    </section>
  );
};

export default BookingPage;