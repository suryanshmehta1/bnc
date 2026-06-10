import { motion } from 'motion/react';
import { Brand } from '../types';
import { Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  brand: Brand;
  onOpenLegal: (type: 'privacy' | 'terms' | 'cookies') => void;
}

export default function Footer({ brand, onOpenLegal }: FooterProps) {
  return (
    <footer className="py-20 border-t border-brand-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left">
          <div className="text-2xl font-black tracking-tighter mb-4 cursor-pointer hover:text-brand-yellow transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {brand === 'candid' ? (
              <span className="text-brand-white">CANDID <span className="text-brand-yellow">IMAGINATION</span></span>
            ) : (
              <span className="text-brand-white">STUDIO <span className="text-brand-yellow">BAZM</span></span>
            )}
          </div>
          <p className="text-brand-grey-soft text-sm max-w-xs">
            A dual-identity creative studio crafting visual excellence and performing arts experiences.
          </p>
        </div>

        <div className="flex gap-8 md:gap-12 text-[10px] uppercase font-black tracking-widest text-brand-white/40">
           <button onClick={() => onOpenLegal('privacy')} className="hover:text-brand-yellow transition-colors">Privacy Policy</button>
           <button onClick={() => onOpenLegal('terms')} className="hover:text-brand-yellow transition-colors">Terms of Service</button>
           <button onClick={() => onOpenLegal('cookies')} className="hover:text-brand-yellow transition-colors">Cookie Policy</button>
        </div>

        <div className="text-center md:text-right">
          <div className="flex justify-center md:justify-end gap-6 mb-4">
            <a 
              href={brand === 'candid' ? "https://www.instagram.com/candidimaginationproduction" : "https://www.instagram.com/studiobazm_"} 
              target="_blank" 
              rel="noreferrer" 
              className="text-brand-white/50 hover:text-brand-yellow transition-colors"
            >
              <Instagram size={20} />
            </a>
            {brand === 'candid' && (
              <a 
                href="https://www.youtube.com/@candidimaginationproduction" 
                target="_blank" 
                rel="noreferrer" 
                className="text-brand-white/50 hover:text-brand-yellow transition-colors"
              >
                <Youtube size={20} />
              </a>
            )}
          </div>
          <div className="text-[10px] uppercase font-black tracking-[0.3em] text-brand-yellow mb-2">Developed at Peak</div>
          <p className="text-brand-white/40 text-xs mb-1">© 2026 Creative Worlds. All rights reserved.</p>
          <a 
            href="https://www.instagram.com/suryanssshh._/" 
            target="_blank" 
            rel="noreferrer" 
            className="text-brand-yellow/60 hover:text-brand-yellow text-[9px] uppercase font-bold tracking-widest transition-colors duration-300 inline-block hover:underline hover:underline-offset-2"
          >
            Designed and Developed by Suryansh Mehta
          </a>
        </div>
      </div>

      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-black uppercase text-brand-white/[0.02] whitespace-nowrap pointer-events-none tracking-tighter">
        {brand === 'candid' ? 'IMAGINATION' : 'STUDIO BAZM'}
      </div>
    </footer>
  );
}
