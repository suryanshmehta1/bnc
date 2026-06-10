import { motion, AnimatePresence } from 'motion/react';
import { Brand } from '../types';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  brand: Brand;
  onToggle: (brand: Brand) => void;
}

export default function Navbar({ brand, onToggle }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] px-6 py-4 md:px-12 md:py-6 flex justify-between items-center transition-all duration-500 ${
        isScrolled || isMobileMenuOpen ? 'bg-brand-black/90 backdrop-blur-xl border-b border-brand-white/5 py-4' : 'bg-transparent py-8'
      }`}>
        <motion.div
          key={brand}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMobileMenuOpen(false);
          }}
          className="text-xl md:text-2xl font-black tracking-tighter cursor-pointer hover:scale-105 transition-transform flex items-center gap-2"
        >
          {brand === 'candid' ? (
            <span className="text-brand-white flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow animate-pulse" />
              CANDID <span className="text-brand-yellow">IMAGINATION</span>
            </span>
          ) : (
            <span className="text-brand-white flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-brand-white border border-brand-yellow rounded-sm rotate-45 animate-pulse" />
              STUDIO <span className="text-brand-yellow">BAZM</span>
            </span>
          )}
        </motion.div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex gap-8 text-xs font-bold uppercase tracking-widest text-brand-white/70">
            <a href="#about" className="hover:text-brand-yellow transition-colors">About</a>
            <a href="#team" className="hover:text-brand-yellow transition-colors">Team</a>
            <a href="#services" className="hover:text-brand-yellow transition-colors">Services</a>
            <a href="#work" className="hover:text-brand-yellow transition-colors">Work</a>
            <a href="#contact" className="hover:text-brand-yellow transition-colors">Contact</a>
          </div>

          {/* Desktop Brand Selection */}
          <div className="hidden md:flex bg-brand-grey-dark/50 backdrop-blur-md p-1 rounded-full border border-brand-white/10">
            <button
              id="desktop-toggle-candid"
              onClick={() => onToggle('candid')}
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all cursor-pointer ${
                brand === 'candid' ? 'bg-brand-yellow text-brand-black shadow-lg shadow-brand-yellow/20' : 'text-brand-white/50 hover:text-brand-white'
              }`}
            >
              CANDID
            </button>
            <button
              id="desktop-toggle-bazm"
              onClick={() => onToggle('bazm')}
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all cursor-pointer ${
                brand === 'bazm' ? 'bg-brand-yellow text-brand-black shadow-lg shadow-brand-yellow/20' : 'text-brand-white/50 hover:text-brand-white'
              }`}
            >
              BAZM
            </button>
          </div>

          {/* Mobile Hamburg Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-brand-white hover:text-brand-yellow transition-colors z-[110]"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-brand-black/98 backdrop-blur-2xl flex flex-col justify-center px-8 pt-24 pb-12 lg:hidden"
          >
            {/* Nav links list */}
            <div className="flex flex-col gap-6 text-center text-xl font-bold uppercase tracking-widest text-brand-white/90">
              <motion.a 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                href="#about" 
                onClick={handleLinkClick}
                className="hover:text-brand-yellow transition-colors py-2 border-b border-brand-white/5"
              >
                About
              </motion.a>
              <motion.a 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                href="#team" 
                onClick={handleLinkClick}
                className="hover:text-brand-yellow transition-colors py-2 border-b border-brand-white/5"
              >
                Team
              </motion.a>
              <motion.a 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                href="#services" 
                onClick={handleLinkClick}
                className="hover:text-brand-yellow transition-colors py-2 border-b border-brand-white/5"
              >
                Services
              </motion.a>
              <motion.a 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                href="#work" 
                onClick={handleLinkClick}
                className="hover:text-brand-yellow transition-colors py-2 border-b border-brand-white/5"
              >
                Work
              </motion.a>
              <motion.a 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                href="#contact" 
                onClick={handleLinkClick}
                className="hover:text-brand-yellow transition-colors py-2 border-b border-brand-white/5"
              >
                Contact
              </motion.a>
            </div>

            {/* Mobile Brand selection container */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <span className="text-[10px] tracking-[0.3em] font-mono text-brand-white/40 uppercase">Select Experience</span>
              <div className="bg-brand-grey-dark/80 p-1 rounded-full border border-brand-white/10 flex">
                <button
                  id="mobile-toggle-candid"
                  onClick={() => {
                    onToggle('candid');
                    handleLinkClick();
                  }}
                  className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                    brand === 'candid' ? 'bg-brand-yellow text-brand-black shadow-lg shadow-brand-yellow/20' : 'text-brand-white/50'
                  }`}
                >
                  CANDID
                </button>
                <button
                  id="mobile-toggle-bazm"
                  onClick={() => {
                    onToggle('bazm');
                    handleLinkClick();
                  }}
                  className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                    brand === 'bazm' ? 'bg-brand-yellow text-brand-black shadow-lg shadow-brand-yellow/20' : 'text-brand-white/50'
                  }`}
                >
                  BAZM
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
