import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brand } from '../types';
import { Play, Pause, Volume2, VolumeX, X, Film, Sparkles } from 'lucide-react';

interface ShowreelProps {
  brand: Brand;
}

export default function Showreel({ brand }: ShowreelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState('12:00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().substring(17, 25));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cinematic mock URLs for Candid vs Bazm
  const videoUrl = brand === 'candid'
    ? 'https://assets.mixkit.co/videos/preview/mixkit-filmmaker-directing-and-shooting-a-scene-on-set-34352-large.mp4'
    : 'https://assets.mixkit.co/videos/preview/mixkit-actor-performing-on-stage-under-spotlights-42289-large.mp4';

  const posterUrl = brand === 'candid'
    ? 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80';

  return (
    <section className="py-24 bg-brand-black/95 relative border-t border-brand-white/5 z-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header summary of Showreel section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
              <p className="text-brand-yellow font-heading font-black uppercase tracking-[0.3em] text-[10px]">
                Active Projection
              </p>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight">
              {brand === 'candid' ? "Candid Showreel" : "Bazm Live Act"} 
              <span className="text-brand-yellow font-serif font-light italic normal-case text-3xl md:text-5xl block mt-2 text-glow">
                {brand === 'candid' ? "Our Cinematic Soul" : "Raw Human Motion"}
              </span>
            </h2>
          </div>

          <div className="max-w-md text-left md:text-right">
            <p className="text-brand-grey-soft text-sm leading-relaxed">
              We capture moments with full analog-grade fidelity. Tap our active playback tape below to preview our latest compiled highlights reel. 
            </p>
          </div>
        </div>

        {/* Cinematic Tape player banner / Trigger element */}
        <motion.div 
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video w-full rounded-sm overflow-hidden border border-brand-white/10 shadow-2xl bg-brand-grey-dark cursor-pointer group"
        >
          {/* Authentic viewfinder markings */}
          <div className="absolute top-6 left-6 font-mono text-xs text-brand-white/40 flex items-center gap-2">
            <Film size={14} className="text-brand-yellow animate-spin" style={{ animationDuration: '6s' }} />
            <span>Tape A // REEL_09.MP4</span>
          </div>

          <div className="absolute top-6 right-6 font-mono text-xs text-brand-white/40 uppercase tracking-widest">
            UTC {currentTime}
          </div>

          {/* Golden Spotlight Overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-brand-yellow/10 to-transparent blur-2xl opacity-40 mix-blend-color-dodge" />

          {/* Film backdrop loop */}
          <img 
            src={posterUrl} 
            alt="Showreel Cover" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-40 group-hover:scale-[1.03] transition-all duration-1000 ease-out transform-gpu"
          />

          {/* Play CTA in absolute center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <motion.div 
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-brand-yellow text-brand-black flex items-center justify-center shadow-2xl relative"
            >
              <div className="absolute -inset-4 rounded-full border border-brand-yellow/20 animate-pulse" />
              <div className="absolute -inset-8 rounded-full border border-brand-yellow/5 animate-ping" />
              <Play size={44} fill="currentColor" className="ml-2" />
            </motion.div>
            
            <p className="font-heading text-[10px] uppercase font-black tracking-[0.4em] text-brand-white/80 mt-8 group-hover:text-brand-yellow transition-colors group-hover:tracking-[0.45em] duration-300">
              INITIATE PLAYBACK
            </p>
          </div>

          {/* Bottom left label */}
          <div className="absolute bottom-6 left-6 font-mono text-[10px] text-brand-white/30 tracking-widest leading-relaxed">
            CODEC: H.264 // PRE MULTI CHANNEL<br />
            RUNTIME: 03:14 MIN
          </div>
        </motion.div>
      </div>

      {/* MODAL FULLSCREEN PLAYER POPUP */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-brand-black/98 flex items-center justify-center p-4 md:p-12"
          >
            {/* Click backdrop to exit */}
            <div className="absolute inset-0 z-0 cursor-pointer" onClick={() => setIsOpen(false)} />

            {/* Cinematic frame line bounds */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-xs text-brand-grey-soft/40 tracking-[0.3em] uppercase hidden md:block select-none z-10">
              PROJECTION SYSTEM ACTIVE
            </div>

            {/* Interactive Player Header Controls */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 z-[1010] flex items-center gap-4">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="w-12 h-12 rounded-full bg-brand-black/80 border border-brand-white/10 hover:border-brand-yellow text-brand-white hover:text-brand-yellow flex items-center justify-center transition-all backdrop-blur-md"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full bg-brand-black/80 border border-brand-white/10 hover:border-brand-yellow text-brand-white hover:text-brand-yellow flex items-center justify-center transition-all backdrop-blur-md"
                title="Close Showcase"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player box */}
            <motion.div 
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
              className="relative w-full max-w-6xl aspect-video bg-brand-grey-dark border border-brand-white/10 rounded-sm overflow-hidden z-10 shadow-2xl"
            >
              <video 
                src={videoUrl}
                poster={posterUrl}
                className="w-full h-full object-cover"
                autoPlay
                controls
                muted={isMuted}
                playsInline
                loop
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
