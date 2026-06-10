import React from 'react';
import { motion } from 'motion/react';

interface SectionSeparatorProps {
  delay?: number;
}

export default function SectionSeparator({ delay = 0.1 }: SectionSeparatorProps) {
  return (
    <div className="container mx-auto px-6 max-w-7xl relative py-8 opacity-40">
      <div className="relative flex items-center justify-center h-[1px] w-full">
        {/* Animated line extending from the center out */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay }}
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-white/20 to-transparent origin-center"
        />

        {/* Small center decorative cinematic indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 45 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: delay + 0.3 }}
          className="absolute w-2 h-2 border border-brand-yellow/60 bg-brand-black flex items-center justify-center"
        >
          {/* Inner tiny dot */}
          <div className="w-0.5 h-0.5 bg-brand-white" />
        </motion.div>

        {/* Tiny flanking layout ticks */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: delay + 0.5 }}
          className="absolute left-[calc(50%-2rem)] h-1 w-[1px] bg-brand-white/10"
        />
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: delay + 0.5 }}
          className="absolute right-[calc(50%-2rem)] h-1 w-[1px] bg-brand-white/10"
        />
      </div>
    </div>
  );
}
