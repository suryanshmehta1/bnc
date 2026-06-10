import React from 'react';
import { motion } from 'motion/react';
import { Brand } from '../types';
import { TESTIMONIALS } from '../constants';
import { Quote, Sparkles } from 'lucide-react';

interface TestimonialsProps {
  brand: Brand;
}

export default function Testimonials({ brand }: TestimonialsProps) {
  const filteredTestimonials = TESTIMONIALS.filter(t => t.brand === brand || t.brand === 'both');

  // To make the infinite scroll perfectly seamless and avoid gaps,
  // we ensure we have a sizeable number of base items, and then double the list
  let baseList = [...filteredTestimonials];
  while (baseList.length < 8) {
    baseList = [...baseList, ...filteredTestimonials];
  }
  const marqueeItems = [...baseList, ...baseList];

  return (
    <section id="testimonials-section" className="py-24 bg-brand-grey-dark/10 relative overflow-hidden w-full">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container px-6 relative z-10 mx-auto max-w-7xl mb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full mb-4">
              <Sparkles className="text-brand-yellow" size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow">Voice of the Community</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-brand-white">
              Feedback & <span className="text-brand-yellow">Testimonials</span>
            </h2>
            <p className="text-brand-white/60 mt-4 max-w-xl text-sm md:text-base">
              Listen to the real stories, creative breakthroughs, and feedback from our studio members and production partners.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Infinite Scroll Carousel Outer Viewport */}
      <div className="relative w-full py-6 bg-brand-grey-dark/20 border-y border-brand-white/5">
        {/* Cinematic Fade Gradients at the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 lg:w-48 bg-gradient-to-r from-brand-black via-brand-black/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 lg:w-48 bg-gradient-to-l from-brand-black via-brand-black/60 to-transparent z-20 pointer-events-none" />

        <div className="overflow-hidden w-full">
          <div className="animate-marquee gap-4 md:gap-6 lg:gap-8 py-2 md:py-4 flex">
            {marqueeItems.map((t, index) => (
              <div 
                key={`${t.id}-marquee-${index}`} 
                className="group flex flex-col w-[260px] md:w-[320px] lg:w-[360px] flex-shrink-0 relative overflow-hidden bg-brand-grey-dark rounded-md border border-brand-white/5 hover:border-brand-yellow/35 hover:shadow-[0_0_20px_rgba(255,195,0,0.08)] transition-all duration-500 ease-out p-6 md:p-8 justify-between transform-gpu"
              >
                {/* Aesthetic Camera Crop Corners */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-brand-white/10 group-hover:border-brand-yellow/30 transition-colors duration-500" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-brand-white/10 group-hover:border-brand-yellow/30 transition-colors duration-500" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-brand-white/10 group-hover:border-brand-yellow/30 transition-colors duration-500" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-brand-white/10 group-hover:border-brand-yellow/30 transition-colors duration-500" />

                {/* Testimonial Quote */}
                <div className="flex-1 min-h-[100px] md:min-h-[120px]">
                  <Quote className="text-brand-yellow/20 group-hover:text-brand-yellow/40 transition-colors mb-3 md:mb-4" size={24} />
                  <p className="text-brand-white/80 italic leading-relaxed text-[11px] md:text-xs lg:text-sm">
                    "{t.content}"
                  </p>
                </div>

                {/* Profile Details */}
                <div className="flex items-center gap-3 pt-4 border-t border-brand-white/5 transform-gpu mt-4 md:mt-6">
                  <img 
                    src={t.avatar} 
                    alt={t.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-brand-white/10 group-hover:border-brand-yellow/30 transform-gpu" 
                  />
                  <div>
                    <h4 className="font-bold text-brand-white text-xs md:text-sm leading-tight uppercase tracking-wide">
                      {t.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
