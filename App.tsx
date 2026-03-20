import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Experience from './components/Experience';
import Team from './components/Team';
import BookingCTA from './components/BookingCTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BookingOverlay from './components/BookingOverlay';
import DemoLoader from './components/DemoLoader';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(() => sessionStorage.getItem('loaderShown_luxelanka') === '1');

  const handleLoaderComplete = () => {
    sessionStorage.setItem('loaderShown_luxelanka', '1');
    setIsLoaded(true);
  };

  const toggleBooking = () => {
    setIsBookingOpen(!isBookingOpen);
  };

  return (
    <div className="antialiased bg-brand-black text-brand-cream selection:bg-brand-gold selection:text-brand-black relative">
      <AnimatePresence>
        {!isLoaded && <DemoLoader demoName="Luxe Lanka" demoLogoUrl="/brand/luxe-lanka-logo.png" onComplete={handleLoaderComplete} />}
      </AnimatePresence>
      <div className="grain-overlay" />
      <CustomCursor />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Navigation onBookClick={() => setIsBookingOpen(true)} />

        <main>
          <Hero />
          <Philosophy />
          <Services onBookClick={() => setIsBookingOpen(true)} />
          <Experience />
          <Team />
          <BookingCTA onBookClick={() => setIsBookingOpen(true)} />
        </main>

        <Footer />
        <BookingOverlay isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      </motion.div>
    </div>
  );
};

export default App;