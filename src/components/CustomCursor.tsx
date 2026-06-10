import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  // Faster spring configuration for immediate response
  const springConfig = { damping: 25, stiffness: 350, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Initialize the glow springs at the root level to prevent recreation/leaks on render
  const glowX = useSpring(mouseX, { damping: 55, stiffness: 120, mass: 0.8 });
  const glowY = useSpring(mouseY, { damping: 55, stiffness: 120, mass: 0.8 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || !window.matchMedia('(hover: hover)').matches;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.group') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="custom-cursor bg-brand-yellow"
        animate={{
          scale: isClicking ? 0.7 : isHovered ? 2.5 : 1,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Follower glow with slight lag for aesthetic feel but optimized movement */}
      <motion.div
        className="cursor-glow"
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          x: glowX,
          y: glowY,
          translateX: '-45%',
          translateY: '-45%',
        }}
      />
    </>
  );
}

