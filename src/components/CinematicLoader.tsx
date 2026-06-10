import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinematicLoaderProps {
  onComplete: () => void;
  key?: string;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [count, setCount] = useState(5);
  const [flickerText, setFlickerText] = useState("CANDID IMAGINATION PRESENTS");
  const [dots, setDots] = useState("");

  const texts = [
    "CANDID IMAGINATION PRESENTS",
    "A MANOJ PANWAR PRODUCTION",
    "ARCHIVING EMOTIONS BEFORE THEY VANISH",
    "ESTABLISHED IN JODHPUR, RAJASTHAN",
    "INITIALIZING SOUND & STORIES..."
  ];

  // Tick the countdown
  useEffect(() => {
    if (count > 1) {
      const timer = setTimeout(() => {
        setCount(prev => prev - 1);
        setFlickerText(texts[5 - count + 1] || texts[texts.length - 1]);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  // Animated dots for the initialization text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] bg-brand-black flex flex-col items-center justify-center overflow-hidden font-body select-none">
      
      {/* Cinematic Film Marks / Reel Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {/* Vertical scratch line 1 */}
        <div className="absolute top-0 bottom-0 left-[35%] w-px bg-brand-white/30 animate-pulse" />
        {/* Vertical scratch line 2 */}
        <div className="absolute top-0 bottom-0 left-[68%] w-[2px] bg-brand-white/10 animate-ping" />
        {/* Horizontal dust dots */}
        <div className="absolute top-1/4 left-1/5 w-1 h-3 bg-brand-white/40 rounded-full animate-bounce" />
        <div className="absolute top-2/3 right-1/4 w-2 h-1 bg-brand-yellow/30 rounded-full animate-pulse" />
      </div>

      {/* Retro film flicker overlay */}
      <div className="absolute inset-0 pointer-events-none bg-brand-white/5 mix-blend-overlay animate-film-flicker" />

      {/* Moving circular ring backdrops */}
      <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-brand-white/5 flex items-center justify-center z-0 animate-float" />
      <div className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full border-[2px] border-dashed border-brand-white/5 z-0 animate-spin" style={{ animationDuration: '40s' }} />

      {/* Projector Light Glow */}
      <div className="absolute w-[400px] h-[400px] bg-gradient-radial from-brand-yellow/10 to-transparent blur-3xl rounded-full z-0 opacity-80 pointer-events-none" />

      {/* Film Academy-Style Crosshairs */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-brand-white/10 z-0" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-white/10 z-0" />

      {/* Reel Count Circle */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.div 
          key={count}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6, 1.2, 1], opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-48 h-48 md:w-64 md:h-64 rounded-full border-[3px] border-brand-yellow flex items-center justify-center bg-brand-black/90 backdrop-blur-md shadow-2xl relative"
        >
          {/* Inner ticks */}
          <div className="absolute inset-2 rounded-full border border-brand-white/10" />
          
          {/* Sweeping radar hand mimicking film reel timer */}
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: "linear", repeat: Infinity }}
            className="absolute top-0 left-0 right-0 bottom-0 border-r-[2px] border-brand-yellow/30 origin-center rounded-full pointer-events-none"
          />

          <span className="text-8xl md:text-9xl font-heading font-black text-brand-yellow tracking-tighter">
            {count}
          </span>
        </motion.div>

        {/* Narrative / Branding Text Overlay */}
        <div className="mt-16 text-center max-w-xl px-6 h-20 flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={flickerText}
              initial={{ opacity: 0, y: 15, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.4em" }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-xs md:text-sm font-heading font-black tracking-[0.4em] uppercase text-brand-white text-glow"
            >
              {flickerText}
            </motion.p>
          </AnimatePresence>
          <p className="font-mono text-[9px] text-brand-grey-soft mt-3 uppercase tracking-widest text-center">
            SYSTEM INIT{dots} REGION: [RAJASTHAN-342001]
          </p>
        </div>
      </div>

      {/* Skip button for smooth user friction reduction */}
      <button 
        onClick={onComplete}
        className="absolute bottom-12 right-12 z-20 group flex items-center gap-3 px-6 py-3 border border-brand-white/10 hover:border-brand-yellow/50 backdrop-blur-sm rounded-full transition-all duration-300"
      >
        <span className="font-heading text-[10px] uppercase font-bold tracking-[0.25em] text-brand-grey-soft group-hover:text-brand-yellow transition-colors">
          Skip Prologue
        </span>
        <div className="w-1.5 h-1.5 bg-brand-grey-soft group-hover:bg-brand-yellow rounded-full transition-colors group-hover:animate-ping" />
      </button>

      {/* Frame details box / Authentic metadata label */}
      <div className="absolute bottom-12 left-12 z-20 hidden md:block">
        <p className="font-mono text-[10px] text-brand-grey-soft/80 tracking-widest leading-relaxed">
          SCENE ID: PROLOGUE<br />
          FPS: 24.00 (TRUE MOUNT)<br />
          SOUND: CINEMATIC MULTI-CHANNEL
        </p>
      </div>
    </div>
  );
}
