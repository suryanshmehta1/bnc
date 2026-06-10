import React from 'react';
import { motion } from 'motion/react';
import { Brand } from '../types';
import { TEAM_MEMBERS } from '../constants';
import { ExternalLink } from 'lucide-react';

interface TeamProps {
  brand: Brand;
}

// Custom visual leveling configuration to make all portrait photos crop and resize perfectly equally.
const getImageClasses = (id: string) => {
  return "w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-all duration-700 ease-out";
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const memberVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.97
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      mass: 0.9
    }
  }
};

export default function Team({ brand }: TeamProps) {
  const filteredMembers = TEAM_MEMBERS.filter(
    person => !person.brand || person.brand === 'both' || person.brand === brand
  );

  // Position all mentors and guest faculty on top, then team
  const sortedMembers = [...filteredMembers];
  if (brand === 'bazm') {
    sortedMembers.sort((a, b) => {
      const isAMentorOrGuest = a.type === 'mentor' || a.type === 'guest';
      const isBMentorOrGuest = b.type === 'mentor' || b.type === 'guest';
      
      if (isAMentorOrGuest && !isBMentorOrGuest) return -1;
      if (!isAMentorOrGuest && isBMentorOrGuest) return 1;
      return 0; // preserve original relative order
    });
  }

  return (
    <section id="team" className="py-24 container mx-auto px-6">
      <div className="mb-24">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
          className="text-brand-yellow font-bold uppercase tracking-widest text-xs mb-4"
        >
          The Visionaries
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16"
        >
          Team & <span className="text-brand-yellow">Mentors</span>
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {sortedMembers.map((person) => (
            <motion.div
              key={person.id}
              variants={memberVariants}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm bg-brand-grey-dark mb-6 relative border border-brand-white/10 group-hover:border-brand-yellow/30 transition-colors duration-500 transform-gpu">
                <img 
                  src={person.image} 
                  alt={person.name} 
                  loading="lazy"
                  decoding="async"
                  className={`${getImageClasses(person.id)} grayscale group-hover:grayscale-0 transform-gpu`}
                />
                {person.type === 'mentor' && (
                  <div className="absolute top-4 left-4 bg-brand-yellow text-brand-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Mentor
                  </div>
                )}
                {person.type === 'guest' && (
                  <div className="absolute top-4 left-4 bg-brand-black/80 text-brand-yellow border border-brand-yellow/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
                    Guest Faculty
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-1 group-hover:text-brand-yellow transition-colors">
                {person.name}
              </h3>
              <p className="text-[10px] uppercase font-bold tracking-widest text-brand-grey-soft mb-4">
                {person.role}
              </p>
              {person.bio && (
                <p className="text-brand-white/60 leading-relaxed text-sm">
                  {person.bio}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
