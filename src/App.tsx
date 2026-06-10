/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showreel from './components/Showreel';
import Manifesto from './components/Manifesto';
import About from './components/About';
import Services from './components/Services';
import Work from './components/Work';
import Team from './components/Team';
import Associates from './components/Associates';
import Testimonials from './components/Testimonials';
import CIFF from './components/CIFF';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CookieBanner from './components/CookieBanner';
import CinematicLoader from './components/CinematicLoader';
import BackToTop from './components/BackToTop';
import SectionSeparator from './components/SectionSeparator';
import ClickSpark from './components/ClickSpark';
import ScreenWipe from './components/ScreenWipe';
import { Brand } from './types';
import { LEGAL_CONTENT } from './constants';

const Chatbot = lazy(() => import('./components/Chatbot'));
const LegalModal = lazy(() => import('./components/LegalModal'));
const BookingPage = lazy(() => import('./components/BookingPage'));

function MainSite({ brand, onToggle, onOpenLegal }: { 
  brand: Brand; 
  onToggle: (b: Brand) => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'cookies') => void;
}) {
  return (
    <>
      <Navbar brand={brand} onToggle={onToggle} />
      <AnimatePresence mode="wait">
        <motion.div
          key={brand}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Hero brand={brand} />
          <SectionSeparator />
          <Showreel brand={brand} />
          <SectionSeparator />
          <Manifesto brand={brand} />
          <SectionSeparator />
          <About brand={brand} />
          <SectionSeparator />
          <Team brand={brand} />
          <SectionSeparator />
          <Services brand={brand} />
          <SectionSeparator />
          <Work brand={brand} />
          <SectionSeparator />
          <Testimonials brand={brand} />
          {brand === 'candid' && (
            <>
              <SectionSeparator />
              <CIFF />
            </>
          )}
          <SectionSeparator />
          <Associates brand={brand} />
          <SectionSeparator />
          <Contact brand={brand} />
          <Footer 
            brand={brand} 
            onOpenLegal={onOpenLegal} 
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const [brand, setBrand] = useState<Brand>('candid');
  const [nextBrand, setNextBrand] = useState<Brand | null>(null);
  const [isWiping, setIsWiping] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' | 'cookies' | null }>({
    isOpen: false,
    type: null
  });

  const handleBrandChange = (targetBrand: Brand) => {
    if (targetBrand === brand || isWiping) return;
    setNextBrand(targetBrand);
    setIsWiping(true);
  };

  // Dynamic favicon and SEO title update
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      if (brand === 'bazm') {
        document.title = 'Studio Bazm | Performing Arts & Theatre Jodhpur Rajasthan';
        favicon.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%230F0F0F"/><path d="M25 35 Q50 20 75 35 Q85 65 50 85 Q15 65 25 35 Z" fill="%231E1E1E" stroke="%23FFC300" stroke-width="4"/><circle cx="38" cy="45" r="5" fill="%23FFC300"/><circle cx="62" cy="45" r="5" fill="%23FFC300"/><path d="M42 63 Q50 55 58 63" stroke="%23FFC300" stroke-width="3.5" stroke-linecap="round" fill="none"/></svg>`;
      } else {
        document.title = 'Candid Imagination | Film Production House & Cinematic Wedding Studio India';
        favicon.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%230F0F0F"/><circle cx="50" cy="50" r="32" stroke="%23FFC300" stroke-width="4.5" fill="none"/><path d="M50 18 L68 36 M68 36 L68 64 M68 64 L50 82 M50 82 L32 64 M32 64 L32 36 M32 36 L50 18" stroke="%23FFC300" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="50" cy="50" r="10" fill="%23FFC300"/></svg>`;
      }
    }
  }, [brand]);

  // Read loading from sessionStorage to simplify live reloading
  useEffect(() => {
    const isShown = sessionStorage.getItem('cinematic_loader_shown');
    if (isShown === 'true') {
      setLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('cinematic_loader_shown', 'true');
    setLoading(false);
  };

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [location.pathname, loading]);

  // Smooth scroll implementation for hash links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href) return;
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, [location.pathname, loading]);

  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-brand-black font-body transition-colors duration-1000 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <CinematicLoader onComplete={handleLoadingComplete} key="loader" />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ClickSpark 
              sparkColor="#FFC300"
              sparkSize={12}
              sparkRadius={20}
              sparkCount={8}
              duration={400}
              easing="ease-out"
            >
              <div className="film-grain" />
              <CustomCursor />
              <Suspense fallback={null}>
                <Chatbot brand={brand} />
              </Suspense>
              
              <CookieBanner brand={brand} />
              <BackToTop />

              <AnimatePresence>
                {isWiping && nextBrand && (
                  <ScreenWipe
                    nextBrand={nextBrand}
                    onMidpoint={() => setBrand(nextBrand)}
                    onComplete={() => {
                      setIsWiping(false);
                      setNextBrand(null);
                    }}
                  />
                )}
              </AnimatePresence>
              
              <Suspense fallback={null}>
                <LegalModal 
                  isOpen={legalModal.isOpen} 
                  onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))}
                  title={legalModal.type ? LEGAL_CONTENT[legalModal.type].title : ''}
                  content={legalModal.type ? LEGAL_CONTENT[legalModal.type].content : ''}
                />
              </Suspense>

              <main>
                <Suspense fallback={
                  <div className="min-h-screen bg-brand-black flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-brand-white/10 border-t-brand-yellow animate-spin" />
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={
                      <MainSite 
                        brand={brand} 
                        onToggle={handleBrandChange} 
                        onOpenLegal={(type) => setLegalModal({ isOpen: true, type })} 
                      />
                    } />
                    <Route path="/book-space" element={<BookingPage />} />
                  </Routes>
                </Suspense>
              </main>

              {/* Vintage Frame borders */}
              <div className="hidden md:block fixed top-0 left-0 w-full h-full pointer-events-none z-[1000] border-[20px] border-brand-black/20" />
            </ClickSpark>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
