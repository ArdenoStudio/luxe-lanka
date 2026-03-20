import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, Variants } from 'framer-motion';

// Helper component for staggered letter animation with mask reveal
const SplitText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className, delay = 0 }) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 0.5
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(8px)",
    },
  };

  return (
    <motion.span
      style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {text.split("").map((letter, index) => (
        <motion.span variants={child} key={index} style={{ display: "inline-block" }}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const moveX = useSpring(mouseX, springConfig);
  const moveY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;
      // Subtle movement range (20px)
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Scroll Parallax Effects
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]);
  const textY = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const indicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-brand-black z-0">
      
      {/* 1. BACKGROUND DEPTH LAYERS */}
      <motion.div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{ 
            y: bgY,
            x: moveX, 
            translateY: moveY, 
            scale: 1.1 
        }}
      >
         {/* Base Video Layer */}
        <div className="absolute inset-0">
             <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="https://images.unsplash.com/photo-1503951914290-9b41482d7966?q=80&w=2072&auto=format&fit=crop"
                className="w-full h-full object-cover opacity-30 grayscale contrast-125 brightness-[0.5]"
            >
                <source src="https://videos.pexels.com/video-files/3998415/3998415-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
        </div>

        {/* Award-Winning Atmosphere: Radial Glow Center */}
        <div 
            className="absolute inset-0 pointer-events-none"
            style={{
                background: 'radial-gradient(circle at center, rgba(201, 169, 97, 0.08) 0%, transparent 60%)'
            }}
        />

        {/* Cinematic Vignette */}
        <div 
            className="absolute inset-0 pointer-events-none"
            style={{
                background: 'radial-gradient(circle at center, transparent 40%, #050505 100%)'
            }}
        />
      </motion.div>

      {/* 2. OVERLAY EFFECTS */}
      {/* Film Grain Texture */}
      <div 
        className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
             backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
      
      {/* Ambient Light Source (Top Right) */}
      <motion.div 
        className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] z-[6] pointer-events-none mix-blend-screen"
        style={{
            background: 'radial-gradient(closest-side, rgba(201, 169, 97, 0.12), transparent)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.8, delay: 2.8, ease: "easeOut" }}
      />

      {/* 3. MAIN CONTENT */}
      <motion.div 
        className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center justify-center h-full pt-10"
        style={{ y: textY, opacity }}
      >
         {/* Establishment Date */}
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 font-sans text-brand-gold text-[10px] md:text-xs tracking-[0.35em] uppercase"
         >
            Est. 2024 • Colombo
         </motion.div>

         {/* Headlines */}
         <div className="flex flex-col items-center mb-12">
            {/* Primary Headline */}
            <div className="relative mb-2 md:mb-4">
                <h1 className="sr-only">Crafted Cuts.</h1>
                <SplitText 
                    text="Crafted Cuts." 
                    className="font-serif text-brand-cream text-6xl md:text-9xl lg:text-[11rem] leading-[0.9] tracking-tight drop-shadow-[0_4px_40px_rgba(0,0,0,0.4)]" 
                    delay={0.8}
                />
            </div>

            {/* Secondary Headline with Shimmer */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 1.5, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
                className="relative group cursor-default"
            >
                <h2 className="font-serif text-brand-gold/90 italic text-3xl md:text-6xl lg:text-7xl leading-none tracking-normal relative z-10 transition-colors duration-500 group-hover:text-brand-cream/90">
                    Defined Identity.
                </h2>
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-brand-gold blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
         </div>

         {/* Tagline */}
         <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1.5, delay: 2.3 }}
            className="font-sans text-brand-cream font-light text-sm md:text-lg tracking-[0.05em] max-w-lg mx-auto"
         >
            Where precision meets artistry in modern men's grooming
         </motion.p>

      </motion.div>

      {/* 4. SCROLL INDICATOR */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1.2 }}
        style={{ opacity: indicatorOpacity }}
      >
         <span className="text-[9px] tracking-[0.2em] text-brand-silver/40 uppercase">
             Scroll
         </span>
         <div className="w-[1px] h-16 bg-gradient-to-b from-brand-gold/0 via-brand-gold/30 to-brand-gold/0 relative overflow-hidden">
             <motion.div 
                 className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-brand-gold"
                 animate={{ y: ["-100%", "200%"] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             />
         </div>
      </motion.div>

    </section>
  );
};

export default Hero;