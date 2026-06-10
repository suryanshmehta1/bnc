import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { Brand } from '../types';

interface CookieBannerProps {
  brand: Brand;
}

export default function CookieBanner({ brand }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[2000] w-[90%] max-w-2xl"
        >
          <div className="bg-brand-grey-dark border border-brand-white/10 p-6 md:p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden group">
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 transition-colors duration-1000 ${brand === 'candid' ? 'bg-brand-yellow/10' : 'bg-brand-yellow/10'}`} />
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
              <div className="bg-brand-yellow/10 p-4 rounded-2xl text-brand-yellow shrink-0">
                <Cookie size={32} strokeWidth={1.5} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-2">
                  Cookie <span className="text-brand-yellow">Consent</span>
                </h3>
                <p className="text-sm text-brand-white/60 leading-relaxed">
                  We use cookies to enhance your cinematic and theatrical experience. By continuing to explore our studio, you agree to our use of cookies.
                </p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={handleDecline}
                  className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-brand-white/40 hover:text-brand-white transition-colors flex-1 md:flex-none"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="bg-brand-yellow text-brand-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex-1 md:flex-none shadow-lg shadow-brand-yellow/20"
                >
                  Accept All
                </button>
              </div>
            </div>

            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-brand-white/20 hover:text-brand-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
