import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[500] backdrop-blur-xl bg-brand-black/90 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            className="w-full max-w-2xl bg-brand-grey-dark border border-brand-yellow/20 rounded-3xl p-8 md:p-12 relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-brand-grey-soft hover:text-brand-yellow transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-brand-yellow mb-8">
              {title}
            </h2>
            
            <div className="text-brand-white/80 leading-relaxed text-lg space-y-6">
              {content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            
            <button 
              onClick={onClose}
              className="mt-12 w-full bg-brand-yellow text-brand-black py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Understand & Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
