import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 280, mass: 0.4 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const draggable = !!(
        target.closest('[style*="cursor: grab"]') ||
        target.closest('.cursor-grab') ||
        target.closest('.active\\:cursor-grabbing')
      );
      const interactive = !!(
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        (target instanceof HTMLElement && window.getComputedStyle(target).cursor === 'pointer')
      );
      setIsDraggable(draggable);
      setIsHovering(interactive && !draggable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Gold dot — instant */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-50 bg-gold"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicked ? 4 : 5,
          height: isClicked ? 4 : 5,
          opacity: isDraggable ? 0.4 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Follower ring — spring lag */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-40"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          borderWidth: 1,
        }}
        animate={{
          width: isClicked ? 28 : isDraggable ? 44 : isHovering ? 52 : 32,
          height: isClicked ? 28 : isDraggable ? 44 : isHovering ? 52 : 32,
          borderColor: isHovering
            ? 'rgba(201, 168, 76, 0.9)'
            : isDraggable
            ? 'rgba(201, 168, 76, 0.5)'
            : 'rgba(201, 168, 76, 0.35)',
          backgroundColor: isHovering
            ? 'rgba(201, 168, 76, 0.08)'
            : 'rgba(201, 168, 76, 0)',
        }}
        transition={{
          width: { type: 'spring', stiffness: 260, damping: 22 },
          height: { type: 'spring', stiffness: 260, damping: 22 },
          borderColor: { duration: 0.25 },
          backgroundColor: { duration: 0.25 },
        }}
      />

      {/* Drag indicator — shown on draggable elements */}
      {isDraggable && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-0 left-0 pointer-events-none z-50 flex items-center gap-1"
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          {/* Left arrow */}
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
            <path d="M5 1L1 5l4 4" stroke="rgba(201,168,76,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {/* Right arrow */}
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
            <path d="M3 1l4 4-4 4" stroke="rgba(201,168,76,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      )}
    </div>
  );
}
