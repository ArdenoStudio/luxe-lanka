import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text' | 'image' | 'hidden' | 'card' | 'read'>('default');
  const [cursorText, setCursorText] = useState("");
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for the main cursor
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Mobile check
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return; // Don't run on mobile
    }

    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // HIERARCHY OF DETECTION

      // 0. Explicit Text Cursor (Highest Priority)
      const textTrigger = target.closest('[data-cursor-text]');
      if (textTrigger) {
          setCursorText(textTrigger.getAttribute('data-cursor-text') || '');
          setCursorVariant('read');
          return;
      } else {
          setCursorText('');
      }
      
      // 1. Buttons & CTAs -> HIDE cursor (let native pointer show)
      const isButton = target.closest('button') || 
                       target.closest('.cta-button') || 
                       target.closest('.book-button') ||
                       target.closest('input[type="submit"]');

      if (isButton) {
        setCursorVariant('hidden');
        return;
      }

      // 2. Text, Logo & Nav -> TEXT variant (Small solid gold dot, Normal blend)
      const isLogo = target.closest('.logo');
      const isNav = target.closest('.nav-link');
      const isText = target.closest('h1') || 
                     target.closest('h2') || 
                     target.closest('h3') || 
                     target.closest('h4') || 
                     target.closest('p') || 
                     target.closest('span') || 
                     target.closest('.hero-title') ||
                     target.closest('.section-title');

      if (isLogo || isNav || isText) {
        setCursorVariant('text');
        return;
      }

      // 3. Images -> IMAGE variant (Glow ring, Normal blend)
      const isImage = target.tagName === 'IMG' || 
                      target.closest('.no-blend') || 
                      target.closest('[role="img"]');

      if (isImage) {
        setCursorVariant('image');
        return;
      }

      // 4. Interactive Cards -> CARD variant (Expand, Normal blend)
      const isCard = target.closest('.service-card') || 
                     target.closest('.stylist-card') || 
                     target.closest('.cursor-hover');
      
      // General links that aren't nav or buttons also get card/hover treatment
      const isLink = target.closest('a');

      if (isCard || isLink) {
        setCursorVariant('card');
        return;
      }

      // 5. Default -> Ring, Difference blend
      setCursorVariant('default');
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      opacity: 1,
      height: 32,
      width: 32,
      x: -16,
      y: -16,
      backgroundColor: "transparent",
      borderWidth: "1px",
      borderColor: "rgba(201, 169, 97, 0.4)",
      mixBlendMode: "difference" as any,
      boxShadow: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    text: {
      opacity: 1,
      height: 8,
      width: 8,
      x: -4,
      y: -4,
      backgroundColor: "rgba(201, 169, 97, 1)",
      borderWidth: "0px",
      borderColor: "transparent",
      mixBlendMode: "normal" as any,
      boxShadow: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    hidden: {
      opacity: 0,
      height: 32,
      width: 32,
      x: -16,
      y: -16,
      backgroundColor: "transparent",
      borderWidth: "0px",
      borderColor: "transparent",
      mixBlendMode: "normal" as any,
      boxShadow: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    image: {
      opacity: 1,
      height: 64,
      width: 64,
      x: -32,
      y: -32,
      backgroundColor: "rgba(201, 169, 97, 0.1)",
      borderWidth: "2px",
      borderColor: "rgba(201, 169, 97, 0.8)",
      mixBlendMode: "normal" as any,
      boxShadow: "0 0 20px rgba(201, 169, 97, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    card: {
      opacity: 1,
      height: 60,
      width: 60,
      x: -30,
      y: -30,
      backgroundColor: "rgba(201, 169, 97, 0.1)",
      borderWidth: "1px",
      borderColor: "rgba(201, 169, 97, 0.5)",
      mixBlendMode: "normal" as any,
      boxShadow: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    read: {
      opacity: 1,
      height: 80,
      width: 80,
      x: -40,
      y: -40,
      backgroundColor: "rgba(201, 169, 97, 0.2)",
      borderWidth: "1px",
      borderColor: "rgba(201, 169, 97, 1)",
      mixBlendMode: "normal" as any,
      boxShadow: "0 0 30px rgba(201, 169, 97, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  };

  return (
    <>
      {/* Main Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] hidden md:flex items-center justify-center overflow-hidden"
        style={{ left: x, top: y }}
        variants={variants}
        animate={cursorVariant}
        transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 28,
            mass: 0.5,
            opacity: { duration: 0.2 }
        }}
      >
        <AnimatePresence>
            {cursorText && (
                <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-[10px] tracking-widest text-brand-gold font-sans uppercase font-bold text-center leading-none"
                >
                    {cursorText}
                </motion.span>
            )}
        </AnimatePresence>
      </motion.div>
      
      {/* Inner Dot - Hides when main cursor becomes the dot (text) or hides completely or is in read mode */}
      <motion.div 
         className="fixed top-0 left-0 w-1 h-1 bg-brand-gold rounded-full pointer-events-none z-[10001] hidden md:block"
         style={{ left: mouseX, top: mouseY, mixBlendMode: 'normal' }}
         animate={{ 
            x: -0.5, 
            y: -0.5,
            opacity: (cursorVariant === 'hidden' || cursorVariant === 'text' || cursorVariant === 'read') ? 0 : 1
         }}
         transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;