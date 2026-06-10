import { motion } from 'motion/react';
import { Brand } from '../types';
import { BRAND_CONFIG } from '../constants';
import Counter from './Counter';

interface AboutProps {
  brand: Brand;
}

export default function About({ brand }: AboutProps) {
  const config = BRAND_CONFIG[brand];

  return (
    <section id="about" className="py-24 md:py-40 px-6 container mx-auto">
      <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-brand-grey-dark transform-gpu">
            <motion.img
              key={`${brand}-about-img`}
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={brand === 'candid'
                ? '/candid_home_and_about.jpg'
                : '/bazm_home_and_about.jpeg'
              }
              alt="About Brand"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale transform-gpu"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-yellow rounded-2xl -z-10 opacity-20 blur-2xl" />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <p className="text-brand-yellow font-bold uppercase tracking-widest text-xs mb-4">Establishing a Legacy</p>
          <h2 className={`text-4xl md:text-6xl font-black uppercase mb-8 leading-tight ${brand === 'bazm' ? 'lg:text-7xl italic-bazm' : ''}`}>
            {config.aboutTitle}
          </h2>
          <div className="w-20 h-1 bg-brand-yellow mb-8" />
          <p className="text-brand-grey-soft text-lg md:text-xl leading-relaxed mb-10">
            {config.aboutText}
          </p>
          <p className="text-brand-white/80 text-base leading-relaxed mb-12">
            Our mission is simple: to transform raw ideas into extraordinary experiences. Whether it's through the lens of a camera or the boards of a stage, we are here to craft moments that matter.
          </p>

          <div className="flex gap-12 font-mono">
            <div>
              <div className="text-4xl font-extrabold text-brand-yellow flex items-center">
                <Counter
                  value={100}
                  fontSize={36}
                  textColor="#FFC300"
                  fontWeight={900}
                  gradientFrom="#0B0B0B"
                  gradientTo="transparent"
                  gradientHeight={12}
                  counterStyle={{ padding: 0 }}
                  containerStyle={{ display: 'inline-flex' }}
                  places={[100, 10, 1]}
                />
                <span className="ml-1">+</span>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-brand-grey-soft mt-2">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-brand-yellow flex items-center">
                <Counter
                  value={10}
                  fontSize={36}
                  textColor="#FFC300"
                  fontWeight={900}
                  gradientFrom="#0B0B0B"
                  gradientTo="transparent"
                  gradientHeight={12}
                  counterStyle={{ padding: 0 }}
                  containerStyle={{ display: 'inline-flex' }}
                  places={[10, 1]}
                />
                <span className="ml-1">k+</span>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-brand-grey-soft mt-2">Creative Hours</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
