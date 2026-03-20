import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SoundManager } from '../services/soundService';

const questions = [
  {
    id: 'goal',
    question: 'What is your primary hair goal?',
    options: ['Refresh my current look', 'A complete transformation', 'Better hair health', 'Styling for an event'],
  },
  {
    id: 'texture',
    question: 'How would you describe your hair texture?',
    options: ['Fine & Straight', 'Wavy', 'Curly', 'Coily'],
  },
];

const therapistMap: Record<string, string> = {
  Elena: 'Elena - Creative Director',
  Julian: 'Julian - Master Colorist',
  Sophia: 'Sophia - Texture Specialist',
};

export function Consultation() {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [match, setMatch]     = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    SoundManager.playClick();
    const next = { ...answers, [questions[step].id]: answer };
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setMatch(next.texture === 'Curly' ? 'Sophia' : next.goal === 'A complete transformation' ? 'Elena' : 'Julian');
    }
  };

  const handleBookMatch = () => {
    SoundManager.playClick();
    window.dispatchEvent(new CustomEvent('luxe-lanka-book-service', { detail: { therapistName: therapistMap[match!] } }));
    const el = document.getElementById('booking');
    if (el && (window as any).lenis) (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.5 });
  };

  const progress = ((step + (match ? 1 : 0)) / questions.length) * 100;

  return (
    <section id="consultation" className="py-32 md:py-48 bg-ink text-sand relative overflow-hidden grain">
      {/* Ambient background blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold/4 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gold/3 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-14">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-sand/30 mb-4 font-sans">Virtual Consultation</p>
            <h3 className="font-serif text-4xl md:text-6xl text-sand leading-tight">
              Find Your<br /><span className="italic text-gold">Perfect Match</span>
            </h3>
          </motion.div>

          {/* Progress bar */}
          {!match && (
            <div className="mb-14">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-sand/25 font-sans">
                  Question {step + 1} of {questions.length}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold/50 font-sans">{Math.round(progress)}%</span>
              </div>
              <div className="h-px bg-sand/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          )}

          {/* Question / result */}
          <AnimatePresence mode="wait">
            {!match ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="clip-text mb-10">
                  <motion.h4
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-2xl md:text-4xl text-sand"
                  >
                    {questions[step].question}
                  </motion.h4>
                </div>

                <div className="flex flex-col divide-y divide-sand/8">
                  {questions[step].options.map((option, i) => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.07 }}
                      onClick={() => handleAnswer(option)}
                      className="group flex items-center gap-6 py-5 text-left hover:text-gold transition-colors duration-300"
                    >
                      <span className="text-[10px] text-sand/25 group-hover:text-gold/50 transition-colors w-5 shrink-0 font-sans tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-serif text-xl md:text-2xl text-sand/90 group-hover:text-gold transition-colors duration-300 tracking-tight">
                        {option}
                      </span>
                      <ArrowRight className="ml-auto w-4 h-4 text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 shrink-0" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-2xl p-10 md:p-14 text-center"
              >
                {/* Gold accent */}
                <div className="w-12 h-px bg-gold mx-auto mb-8" />
                <p className="text-[10px] uppercase tracking-[0.28em] text-sand/35 font-sans mb-4">Your curator</p>
                <h3 className="font-serif text-5xl md:text-7xl text-gold mb-6 italic">{match}</h3>
                <p className="font-sans text-base text-sand/60 leading-relaxed mb-10 max-w-sm mx-auto">
                  Based on your preferences, <strong className="text-sand font-normal">{match}</strong> is your ideal stylist.
                  They will craft a personalised experience around your unique hair goals.
                </p>

                <div className="flex flex-col items-center gap-4">
                  <button
                    onClick={handleBookMatch}
                    className="inline-flex items-center gap-4 px-10 py-5 bg-gold text-forest rounded-full text-[11px] uppercase tracking-[0.22em] font-sans hover:bg-sand transition-all duration-500 group"
                  >
                    Book with {match}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => { setMatch(null); setStep(0); setAnswers({}); }}
                    className="text-sand/35 hover:text-sand text-[11px] uppercase tracking-[0.2em] font-sans underline underline-offset-4 transition-colors"
                  >
                    Start over
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
