import { motion } from 'motion/react';
import { Brand } from '../types';
import { CANDID_SERVICES, BAZM_SERVICES } from '../constants';
import { ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  brand: Brand;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 75,
      damping: 14,
      mass: 0.8
    }
  }
};

export default function Services({ brand }: ServicesProps) {
  const services = brand === 'candid' ? CANDID_SERVICES : BAZM_SERVICES;

  return (
    <section id="services" className="py-24 bg-brand-grey-dark/30 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          >
            <p className="text-brand-yellow font-bold uppercase tracking-widest text-xs mb-4">Our Expertise</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">What <span className="text-brand-yellow">We Do</span></h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 }}
            className="max-w-md text-brand-grey-soft text-right hidden md:block"
          >
            Specialized solutions tailored to bring your creative vision to life with precision and artistic flair.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group relative h-[450px] overflow-hidden rounded-2xl border border-brand-white/5"
            >
              <div className="absolute inset-0 z-0 scale-110 group-hover:scale-100 transition-transform duration-700 transform-gpu">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover brightness-[0.4] grayscale group-hover:grayscale-0 group-hover:brightness-50 transition-all duration-700 transform-gpu"
                />
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <div className="text-brand-yellow mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <ArrowUpRight size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase mb-3 tracking-tighter">{service.title}</h3>
                <p className="text-brand-white/60 text-sm leading-relaxed h-0 overflow-hidden group-hover:h-12 transition-all duration-500">
                  {service.description}
                </p>
              </div>

              <div className="absolute top-8 left-8 text-6xl font-black text-brand-white/5 pointer-events-none">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
