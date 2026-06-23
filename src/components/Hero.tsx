import { motion, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Brand } from '../types';
import { BRAND_CONFIG } from '../constants';
import { MousePointer2 } from 'lucide-react';

interface HeroProps {
  brand: Brand;
}

export default function Hero({ brand }: HeroProps) {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const config = BRAND_CONFIG[brand];

  const handleCTAClick = () => {
    if (brand === 'bazm') {
      navigate('/book-space');
    } else {
      const workSection = document.getElementById('work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        const contactSection = document.getElementById('contact');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background with dynamic effects */}
      <motion.div
        key={`${brand}-bg`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-brand-black/65 z-10" />
        <img
          src={brand === 'candid'
            ? '/candid_home_and_about.jpg'
            : '/bazm_home_and_about.jpeg'
          }
          alt="Hero Background"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover grayscale brightness-40 transform-gpu"
        />
        {brand === 'bazm' && (
          <div className="spotlight animate-spotlight" />
        )}
      </motion.div>

      {/* Hero Content */}
      <div className="container mx-auto relative z-20 px-6 text-center">
        <motion.div style={{ y: y2, opacity }} className="flex flex-col items-center">
          


          <motion.p
            key={`${brand}-sub`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-white/80 font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs mb-8"
          >
            {config.heroSub}
          </motion.p>

          <motion.h1
            key={`${brand}-title`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.95] tracking-tighter mb-10 max-w-5xl mx-auto"
          >
            {brand === 'candid' ? (
              <>WE CAPTURE <span className="text-brand-yellow">STORIES</span></>
            ) : (
              <span className="font-artistic normal-case text-brand-yellow tracking-normal text-6xl md:text-9xl block mb-4">Stories Come Alive</span>
            )}
            {brand === 'candid' ? (
              <div className="text-2xl md:text-4xl lg:text-5xl mt-4 font-heading font-medium tracking-tight text-brand-white/90">NOT JUST FRAMES</div>
            ) : (
              <div className="text-3xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-brand-white/90 mt-2">ON STAGE</div>
            )}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <button 
              onClick={handleCTAClick}
              className="bg-brand-yellow text-brand-black px-10 py-4 font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform cursor-pointer rounded-sm"
            >
              {config.cta}
            </button>
            {brand === 'bazm' && (
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdliD9p6WbTugqftXbkCKv86NYsjFgD1wRMn9NT_XR4rT_RPQ/viewform?usp=header" 
                target="_blank" 
                rel="noreferrer"
                className="border border-brand-white/20 text-brand-white px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-brand-white hover:text-brand-black transition-all text-center rounded-sm"
              >
                Join Classes
              </a>
            )}
          </motion.div>

          {/* Centered Trust Strip with classic separator dots */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="border-t border-brand-white/10 pt-8 w-full max-w-2xl text-center"
          >
            <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] text-brand-white/60 flex flex-wrap justify-center items-center gap-y-3 gap-x-4 md:gap-x-6">
              <span>FILMS</span>
              <span className="text-brand-yellow">•</span>
              <span>THEATRE</span>
              <span className="text-brand-yellow">•</span>
              <span>WORKSHOPS</span>
              <span className="text-brand-yellow">•</span>
              <span>SHORT FILMS</span>
              <span className="text-brand-yellow">•</span>
              <span>LIVE PERFORMANCES</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-50 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-yellow to-transparent" />
      </motion.div>
    </section>
  );
}
