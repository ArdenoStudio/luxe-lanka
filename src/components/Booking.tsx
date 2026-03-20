import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ArrowRight } from 'lucide-react';
import { Calendar } from './Calendar';

const services = [
  { id: 'balayage', name: 'Bespoke Balayage' },
  { id: 'cut', name: 'Precision Cut & Style' },
  { id: 'blowout', name: 'Signature Blowout' }
];

const therapists = [
  { id: 'elena', name: 'Elena - Creative Director' },
  { id: 'julian', name: 'Julian - Master Colorist' },
  { id: 'sophia', name: 'Sophia - Texture Specialist' }
];

const times = [
  '09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM'
];

const inputClass = "w-full bg-transparent border-b border-ink/25 py-4 text-ink focus:outline-none focus:border-gold/60 transition-colors duration-300 peer text-sm font-sans";
const labelClass = "absolute left-0 top-4 text-ink/55 text-[10px] uppercase tracking-[0.22em] transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-gold/70 peer-valid:-top-4 peer-valid:text-ink/70 font-sans";

export function Booking() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    therapist: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    const handlePreFill = (event: any) => {
      const { serviceName, therapistName } = event.detail;
      setFormData(prev => ({
        ...prev,
        ...(serviceName && { service: serviceName }),
        ...(therapistName && { therapist: therapistName })
      }));
    };

    window.addEventListener('luxe-lanka-book-service', handlePreFill);
    return () => window.removeEventListener('luxe-lanka-book-service', handlePreFill);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: string) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date) {
      alert("Please select a date.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', service: '', therapist: '', date: '', time: '' });
    setIsSubmitted(false);
  };

  return (
    <section id="booking" className="py-32 md:py-48 bg-sand text-ink relative overflow-hidden grain">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/3 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-gold/4 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-14 max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-[10px] uppercase tracking-[0.28em] text-ink/50 mb-4 font-sans">Begin Your Journey</p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl md:text-7xl text-ink leading-none"
            >
              Reservations
            </motion.h2>
          </div>
          <div className="mt-6 h-px w-16 bg-gold/60" />
        </motion.div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit}
                className="space-y-14"
              >
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative">
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      required className={inputClass} placeholder=" "
                    />
                    <label htmlFor="name" className={labelClass}>Full Name</label>
                  </div>
                  <div className="relative">
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      required className={inputClass} placeholder=" "
                    />
                    <label htmlFor="email" className={labelClass}>Email Address</label>
                  </div>
                </div>

                {/* Row 2: Service + Stylist */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative">
                    <select
                      id="service" name="service"
                      value={formData.service} onChange={handleChange}
                      required className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled hidden></option>
                      {services.map(s => (
                        <option key={s.id} value={s.name} className="text-ink">{s.name}</option>
                      ))}
                    </select>
                    <label htmlFor="service" className={labelClass}>Select Service</label>
                    <div className="absolute right-0 bottom-4 pointer-events-none">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      id="therapist" name="therapist"
                      value={formData.therapist} onChange={handleChange}
                      required className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled hidden></option>
                      {therapists.map(t => (
                        <option key={t.id} value={t.name} className="text-ink">{t.name}</option>
                      ))}
                    </select>
                    <label htmlFor="therapist" className={labelClass}>Select Stylist</label>
                    <div className="absolute right-0 bottom-4 pointer-events-none">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Row 3: Date + Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-5">
                      <label className="text-[10px] uppercase tracking-[0.22em] text-ink/55 font-sans">
                        Preferred Date
                      </label>
                      <div className="relative group/tooltip">
                        <Info className="w-3 h-3 text-ink/45 cursor-help hover:text-gold transition-colors" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 bg-sand text-ink text-[10px] leading-relaxed rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 shadow-xl pointer-events-none">
                          Book at least 2 weeks in advance for weekends. Same-day subject to availability.
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-sand" />
                        </div>
                      </div>
                    </div>
                    <Calendar selectedDate={formData.date} onChange={handleDateChange} />
                  </div>

                  <div className="relative self-end">
                    <select
                      id="time" name="time"
                      value={formData.time} onChange={handleChange}
                      required className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled hidden></option>
                      {times.map(t => (
                        <option key={t} value={t} className="text-ink">{t}</option>
                      ))}
                    </select>
                    <label htmlFor="time" className={labelClass}>Preferred Time</label>
                    <div className="absolute right-0 bottom-4 pointer-events-none">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                    className="relative px-12 py-5 bg-gold/15 text-gold border border-gold/50 text-[11px] uppercase tracking-[0.25em] font-sans rounded-full overflow-hidden group transition-all duration-500 hover:text-forest disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="relative z-10 flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="w-4 h-4 border border-gold/40 border-t-gold rounded-full"
                        />
                        <span>Confirming…</span>
                      </div>
                    ) : (
                      <>
                        <div className="relative z-10 flex flex-col h-4 overflow-hidden pointer-events-none">
                          <span className="transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-y-full">Confirm Reservation</span>
                          <span className="absolute top-full transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-y-full">Confirm Reservation</span>
                        </div>
                        <div className="absolute inset-0 bg-gold origin-bottom-left scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                        <div className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer [transform:skewX(-20deg)]" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start py-16"
              >
                {/* Gold checkmark */}
                <div className="w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center mb-10 text-gold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <p className="text-[10px] uppercase tracking-[0.28em] text-gold/60 mb-4 font-sans">Reservation Confirmed</p>
                <h4 className="font-serif text-4xl md:text-6xl text-ink mb-8 leading-tight">
                  See you soon,<br />
                  <span className="italic text-gold">{formData.name.split(' ')[0]}.</span>
                </h4>
                <div className="h-px w-16 bg-gold/30 mb-8" />
                <p className="font-sans text-sm text-ink/55 leading-[1.85] mb-2 max-w-md">
                  Your appointment for{' '}
                  <span className="text-ink">{formData.service}</span> with{' '}
                  <span className="text-ink">{formData.therapist.split(' - ')[0]}</span> is confirmed for{' '}
                  <span className="text-ink">
                    {new Date(formData.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at {formData.time}
                  </span>.
                </p>
                <p className="font-sans text-[11px] text-ink/35 mb-14 uppercase tracking-[0.18em]">
                  Confirmation sent to {formData.email}
                </p>

                <button
                  onClick={resetForm}
                  className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/40 hover:text-gold font-sans transition-colors duration-300 group"
                >
                  <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Make Another Booking
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
