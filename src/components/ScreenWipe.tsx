import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Brand } from '../types';

interface ScreenWipeProps {
  nextBrand: Brand;
  onMidpoint: () => void;
  onComplete: () => void;
}

export default function ScreenWipe({ nextBrand, onMidpoint, onComplete }: ScreenWipeProps) {
  const [phase, setPhase] = useState<'entering' | 'holding' | 'exiting'>('entering');

  useEffect(() => {
    // Stage 1: Entrance sequence
    // The panel slides from left (-100%) to fully covering (0%)
    const midpointTimer = setTimeout(() => {
      setPhase('holding');
      onMidpoint();
    }, 700); // 700ms slider transition to center

    // Stage 2: Exit sequence initiation
    const startExitTimer = setTimeout(() => {
      setPhase('exiting');
    }, 1400); // Hold for 700ms to appreciate the cinematic titles, then start exit

    // Stage 3: Complete transition
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2100); // Exit takes 700ms

    return () => {
      clearTimeout(midpointTimer);
      clearTimeout(startExitTimer);
      clearTimeout(completeTimer);
    };
  }, [onMidpoint, onComplete]);

  // Framer Motion easing: pristine bezier curve for buttery cinematic movement
  const transitionEase = [0.76, 0, 0.24, 1];

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-auto overflow-hidden">
      {/* 1. Leading Golden/Yellow Accent Curtain */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{
          x: phase === 'entering' ? '0%' : phase === 'holding' ? '0%' : '100%',
        }}
        transition={{
          duration: 0.7,
          ease: transitionEase,
          delay: phase === 'entering' ? 0 : 0.08, // Staggered offset
        }}
        className="absolute inset-0 bg-brand-yellow w-full h-full z-10 opacity-90"
      />

      {/* 2. Main Matte Black Curtain */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{
          x: phase === 'entering' ? '0%' : phase === 'holding' ? '0%' : '100%',
        }}
        transition={{
          duration: 0.7,
          ease: transitionEase,
          delay: phase === 'entering' ? 0.08 : 0, // Inversed delay on exit for clean layering
        }}
        className="absolute inset-0 bg-brand-black w-full h-full z-20 flex flex-col items-center justify-center"
      >
        {/* Cinematic Film-Grain Overlays on Curtain */}
        <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />

        {/* Dynamic Transition Graphic / Focus Mark */}
        <div className="relative flex flex-col items-center justify-center p-8 text-center max-w-md">
          {/* Stylized camera lens boundary marks */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: phase === 'holding' ? [0.4, 1, 0.8] : 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute -inset-4 border border-brand-white/10 rounded-lg pointer-events-none"
          >
            {/* Corner crops */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-yellow/80" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-yellow/80" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-yellow/80" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-yellow/80" />
          </motion.div>

          {/* Minimal aesthetic icon or silhouette */}
          <div className="mb-6 flex justify-center items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-12 h-12 rounded-full border border-brand-white/20 flex items-center justify-center"
            >
              {nextBrand === 'candid' ? (
                <div className="w-4 h-4 rounded-full bg-brand-yellow animate-pulse" />
              ) : (
                <div className="w-3 h-3 bg-brand-white border border-brand-yellow rounded-sm rotate-45 animate-pulse" />
              )}
            </motion.div>
          </div>

          {/* Typography Accents */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="space-y-2"
          >
            <span className="text-[10px] tracking-[0.4em] font-mono text-brand-white/40 uppercase block">
              Initializing Experience
            </span>
            
            <h2 className="text-xl md:text-2xl font-black tracking-tighter text-brand-white uppercase">
              {nextBrand === 'candid' ? (
                <>
                  CANDID <span className="text-brand-yellow">IMAGINATION</span>
                </>
              ) : (
                <>
                  STUDIO <span className="text-brand-yellow">BAZM</span>
                </>
              )}
            </h2>

            <span className="text-[9px] tracking-widest font-mono text-brand-yellow/60 uppercase block pt-1">
              {nextBrand === 'candid' ? 'Cinematography & Films' : 'Performing Arts & Theatre'}
            </span>
          </motion.div>
        </div>

        {/* Technical decorative progress bar at the bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-white/5 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="h-full bg-brand-yellow origin-left w-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
