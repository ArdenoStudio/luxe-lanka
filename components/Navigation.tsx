import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onBookClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onBookClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Team', href: '#team' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 border-b flex items-center transition-colors duration-500 ${
          scrolled ? 'bg-[rgba(5,5,5,0.85)] backdrop-blur-xl border-brand-gold/10' : 'bg-transparent border-transparent'
        }`}
        style={{
          height: '80px',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-6 md:px-16 flex justify-between items-center w-full">
          {/* Logo Area */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="z-50 group logo relative flex items-center cursor-pointer shrink-0"
          >
            {!logoError ? (
              <motion.img
                src="/brand/luxe-lanka-logo.png"
                alt="Luxe Lanka - Modern Luxury Grooming"
                className="object-contain w-auto block drop-shadow-lg"
                initial={{ height: "54px" }}
                animate={{
                  height: scrolled ? "42px" : "54px",
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex flex-col items-center leading-none group-hover:opacity-80 transition-opacity">
                <span className="font-serif text-3xl md:text-4xl text-white tracking-normal uppercase">
                  Luxe
                </span>
                <span className="font-serif text-3xl md:text-4xl text-white tracking-normal uppercase -mt-2">
                  Lanka
                </span>
                <span className="font-sans text-[0.6rem] tracking-[0.35em] uppercase text-brand-gold mt-2 font-medium">
                  Crafting Your Confidence
                </span>
              </div>
            )}
          </a>

          {/* Desktop Menu - Elevated Design */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-12">
              {links.map((link, i) => (
                <React.Fragment key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="nav-link font-sans text-[11px] tracking-[0.2em] uppercase text-brand-silver/70 hover:text-brand-gold transition-colors duration-300 relative group cursor-pointer"
                  >
                    {link.name}
                    <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-brand-gold transition-all duration-300 ease-out group-hover:w-full group-hover:-translate-x-1/2 opacity-0 group-hover:opacity-100" />
                  </a>
                  {/* Minimal Dot Separator */}
                  {i < links.length && (
                    <span className="text-brand-gold/30 text-[10px] select-none">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={onBookClick}
              className="cta-button ml-12 px-8 py-3 border border-brand-gold/30 text-brand-gold font-sans text-[11px] tracking-[0.25em] uppercase transition-all duration-500 ease-out relative overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-[0_4px_20px_-5px_rgba(201,169,97,0.3)]"
            >
              <span className="relative z-10 group-hover:text-brand-black transition-colors duration-500">Book Now</span>
              <div className="absolute inset-0 bg-brand-gold transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 text-white hover:text-brand-gold transition-colors p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-brand-black/98 backdrop-blur-xl z-40 flex items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center space-y-10">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + (i * 0.1), duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-serif text-5xl text-brand-cream hover:text-brand-gold transition-colors relative overflow-hidden group cursor-pointer"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-2 left-0 w-full h-[1px] bg-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onBookClick();
                  }}
                  className="mt-12 px-10 py-4 border border-brand-gold/30 text-brand-gold font-sans text-xs tracking-widest uppercase inline-block cursor-pointer"
                >
                  Book Appointment
                </button>
              </motion.div>
            </div>

            {/* Ardeno Studio credit in mobile overlay — typographic refinement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute bottom-12 flex flex-col items-center gap-1.5"
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mb-2" />
              <div className="flex flex-col items-center leading-none">
                <span className="text-[8px] font-sans uppercase tracking-[0.4em] text-brand-silver/30 mb-1 font-medium">Crafted by</span>
                <span className="font-serif text-xl tracking-tight text-white/50">
                  Ardeno <span className="text-brand-gold/40 italic">Studio</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;