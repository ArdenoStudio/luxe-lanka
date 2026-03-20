import React, { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  baseOpacity?: number;
  enableBlur?: boolean;
  blurStrength?: number;
  yOffset?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  baseOpacity = 0,
  enableBlur = false,
  blurStrength = 10,
  yOffset = 100,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [baseOpacity, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, 0]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    [`blur(${blurStrength}px)`, 'blur(0px)']
  );

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y,
        ...(enableBlur && { filter }),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
