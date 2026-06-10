import { motion } from 'motion/react';
import { Brand } from '../types';
import { BRAND_CONFIG } from '../constants';
import { Heart, Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface ManifestoProps {
  brand: Brand;
}

export default function Manifesto({ brand }: ManifestoProps) {
  const config = BRAND_CONFIG[brand];

  return (
    <section className="py-28 md:py-44 bg-brand-black relative overflow-hidden border-t border-brand-white/5">
      {/* Background ambient lighting overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-center">
          
          {/* Column 1: Philosophy / Text */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-10 bg-brand-yellow/60 block" />
                <span className="text-brand-yellow font-heading text-xs font-bold uppercase tracking-[0.4em]">Our Manifesto</span>
              </div>

              {brand === 'candid' ? (
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.1] tracking-tight mb-10 text-brand-white">
                  We don't just <span className="italic text-brand-yellow">make films</span>.<br className="hidden md:block"/>
                  We hold onto the <span className="italic">moments</span> that define us.
                </h3>
              ) : (
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.1] tracking-tight mb-10 text-brand-white">
                  We don’t perform <span className="italic text-brand-yellow">lies</span>.<br className="hidden md:block"/>
                  We strip away <span className="italic">masks</span> to reveal the truth.
                </h3>
              )}

              {brand === 'candid' ? (
                <div className="space-y-6 text-brand-grey-soft text-base md:text-lg leading-relaxed max-w-2xl font-body">
                  <p>
                    In a world filled with endless, fleeting digital noise, we choose to focus on what lasts. At Candid Imagination, we don’t believe the cinematic frame is just a collection of pixels, it is a living, breathing archive of the human experience.
                  </p>
                  <p className="font-serif italic text-xl text-brand-white/90">
                    "Every flicker of light, every heavy breath in the dark, and every quiet, meaningful space between words is a story waiting to outlive us all."
                  </p>
                  <p>
                    Born from the soulful, expansive landscapes of Rajasthan, we specialize in crafting indie short films, feature projects, and stylized music videos that carry the weight of real emotion. We bridge the gap between people and art by creating authentic, raw, and unmanufactured stories that feel like home.
                  </p>
                </div>
              ) : (
                <div className="space-y-6 text-brand-grey-soft text-base md:text-lg leading-relaxed max-w-2xl font-body">
                  <p>
                    The stage is two planks and a passion. We do not chase the momentary applause of distracted crowds. We seek the resonant, thumping human truths that vibrate in the chest long after the last curtain falls.
                  </p>
                  <p className="font-serif italic text-xl text-brand-white/90">
                    "We train actors to stop acting, and start living. True theater is raw, direct, and completely uncompromised."
                  </p>
                  <p>
                    Through intensive black-box sessions, street play campaigns, and traditional masterclasses, Studio Bazm builds a home where classical theater meets modern confrontational storytelling. Let us witness human expression in its purest state.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Column 2: Creative Statistics / Proof Signals */}
          <div className="lg:col-span-4 lg:pl-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-brand-grey-dark border border-brand-white/5 p-8 md:p-12 relative rounded-sm"
            >
              {/* Outer corner notches for old camera finder look */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-[2px] border-l-[2px] border-brand-yellow/30" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-[2px] border-r-[2px] border-brand-yellow/30" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[2px] border-l-[2px] border-brand-yellow/30" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[2px] border-r-[2px] border-brand-yellow/30" />

              <h4 className="font-heading text-xs font-black uppercase tracking-[0.3em] text-brand-yellow mb-12">
                STUDIO CREDIBILITY
              </h4>

              <div className="space-y-12">
                {brand === 'candid' ? (
                  <>
                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center shrink-0 border border-brand-yellow/20 text-brand-yellow">
                        <Compass size={20} />
                      </div>
                      <div>
                        <span className="block text-4xl font-heading font-black text-brand-white tracking-tighter">04+</span>
                        <span className="block text-xs uppercase font-bold tracking-widest text-brand-grey-soft mt-1">Indie Film Awards</span>
                        <span className="block text-[11px] text-brand-grey-soft/60 mt-1 leading-relaxed">Recognized nationally for Jodhpur cinematography.</span>
                      </div>
                    </div>

                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center shrink-0 border border-brand-yellow/20 text-brand-yellow">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <span className="block text-4xl font-heading font-black text-brand-white tracking-tighter">100+</span>
                        <span className="block text-xs uppercase font-bold tracking-widest text-brand-grey-soft mt-1">Campaigns Completed</span>
                        <span className="block text-[11px] text-brand-grey-soft/60 mt-1 leading-relaxed">Stunning visual delivery for prestige national brands.</span>
                      </div>
                    </div>

                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center shrink-0 border border-brand-yellow/20 text-brand-yellow">
                        <Heart size={20} />
                      </div>
                      <div>
                        <span className="block text-4xl font-heading font-black text-brand-white tracking-tighter">2M+</span>
                        <span className="block text-xs uppercase font-bold tracking-widest text-brand-grey-soft mt-1">Digital Audience Reach</span>
                        <span className="block text-[11px] text-brand-grey-soft/60 mt-1 leading-relaxed">Engaged listeners across YouTube and short-film feeds.</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center shrink-0 border border-brand-yellow/20 text-brand-yellow">
                        <Compass size={20} />
                      </div>
                      <div>
                        <span className="block text-4xl font-heading font-black text-brand-white tracking-tighter">12+</span>
                        <span className="block text-xs uppercase font-bold tracking-widest text-brand-grey-soft mt-1">Classical Plays Done</span>
                        <span className="block text-[11px] text-brand-grey-soft/60 mt-1 leading-relaxed">Immersive black-box and open-air classical runs.</span>
                      </div>
                    </div>

                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center shrink-0 border border-brand-yellow/20 text-brand-yellow">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <span className="block text-4xl font-heading font-black text-brand-white tracking-tighter">450+</span>
                        <span className="block text-xs uppercase font-bold tracking-widest text-brand-grey-soft mt-1">Actors Trained</span>
                        <span className="block text-[11px] text-brand-grey-soft/60 mt-1 leading-relaxed">Building active dramatic careers and expressive lives.</span>
                      </div>
                    </div>

                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center shrink-0 border border-brand-yellow/20 text-brand-yellow">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <span className="block text-4xl font-heading font-black text-brand-white tracking-tighter">100%</span>
                        <span className="block text-xs uppercase font-bold tracking-widest text-brand-grey-soft mt-1">Emotional Devotion</span>
                        <span className="block text-[11px] text-brand-grey-soft/60 mt-1 leading-relaxed">No scripts memorized flat; we study genuine human heartbeats.</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
