import React from 'react';
import { Brand } from '../types';
import { ASSOCIATES } from '../constants';
import { LogoLoop } from './LogoLoop';

interface AssociatesProps {
  brand: Brand;
}

const getAssociateDetails = (id: string) => {
  switch (id) {
    case 'a1':
      return { 
        tag: '01 / IMAGERY', 
        subtitle: 'BTS & Production Stills', 
        desc: 'Capturing the raw, unscripted chemistry behind the master frames.' 
      };
    case 'a2':
      return { 
        tag: '02 / ACOUSTICS', 
        subtitle: 'Soundscapes & Scoring', 
        desc: 'Crafting the deep, immersive auditory worlds that breathe life into silence.' 
      };
    case 'a3':
      return { 
        tag: '03 / INDIE COLLAB', 
        subtitle: 'Creative Distribution', 
        desc: 'Bridging high-art independent cinema with appreciative public audiences.' 
      };
    case 'a4':
      return { 
        tag: '04 / TALENT', 
        subtitle: 'Character & Casting', 
        desc: 'Curating the striking, authentic faces that define the Rajasthani narrative.' 
      };
    case 'a5':
      return { 
        tag: '05 / CHOREO', 
        subtitle: 'Movement & Choreography', 
        desc: 'Developing cinematic rhythms, cultural dances, and staging expressive body movements.' 
      };
    default:
      return { 
        tag: 'PARTNER', 
        subtitle: 'Production Associate', 
        desc: 'Collaborating to elevate independent regional storytelling.' 
      };
  }
};

const renderAssociateLogo = (id: string, image: string, name: string) => {
  // If the image string starts with a slash, it's an uploaded custom transparent logo png in the public folder.
  if (image.startsWith('/')) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-1.5 md:p-2">
        <div className="w-[94%] h-[88%] bg-white rounded-md flex items-center justify-center p-1 md:p-2 shadow-[0_4px_16px_rgba(0,0,0,0.15)] group-hover:scale-[1.03] group-hover:shadow-[0_8px_24px_rgba(255,195,0,0.15)] transition-all duration-500 ease-out border border-brand-white/10 overflow-hidden transform-gpu">
          <img 
            src={image} 
            alt={name} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain filter transition-transform duration-700 ease-out group-hover:scale-[1.04] transform-gpu"
          />
        </div>
      </div>
    );
  }

  // Pure dynamic corporate transparent inline vector logos for premium visual identity
  if (id === 'a1') {
    // Snapshooter
    return (
      <div className="w-full h-full flex items-center justify-center p-6 relative">
        <svg className="w-[85%] h-[75%] transition-transform duration-700 group-hover:scale-105" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(24, 40)">
            <circle cx="0" cy="0" r="16" stroke="#FFC300" strokeWidth="1.5" className="group-hover:stroke-brand-white transition-colors duration-500" />
            <circle cx="0" cy="0" r="12" stroke="#F9F9F9" strokeWidth="1" opacity="0.3" />
            <circle cx="0" cy="0" r="3" fill="#F9F9F9" />
            <path d="M-10 -5 L-5 -10" stroke="#F9F9F9" strokeWidth="1" opacity="0.5"/>
            <path d="M10 5 L5 10" stroke="#F9F9F9" strokeWidth="1" opacity="0.5"/>
            <path d="M-5 10 L-10 5" stroke="#F9F9F9" strokeWidth="1" opacity="0.5"/>
            <path d="M5 -10 L10 -5" stroke="#F9F9F9" strokeWidth="1" opacity="0.5"/>
          </g>
          <text x="58" y="38" fill="#F9F9F9" fontSize="13" fontWeight="900" letterSpacing="0.25em" fontFamily="Space Grotesk, Inter, sans-serif">
            SNAPSHOOTER
          </text>
          <text x="59" y="51" fill="#9E9E9E" fontSize="7" fontWeight="600" letterSpacing="0.08em" fontFamily="Inter, sans-serif" opacity="0.8">
            STILLS &amp; BEHIND THE SCENES
          </text>
        </svg>
      </div>
    );
  }

  return null;
};

export default function Associates({ brand }: AssociatesProps) {
  const associates = React.useMemo(() => {
    return ASSOCIATES.filter(a => a.brand === brand || a.brand === 'both');
  }, [brand]);

  return (
    <section className="py-12 md:py-20 lg:py-24 overflow-hidden w-full">
      <div className="container mx-auto px-6 mb-8 md:mb-12">
        <div className="pt-12 md:pt-20 border-t border-brand-white/5 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase text-brand-yellow tracking-widest block mb-2 md:mb-3 animate-pulse">
              COLLABORATORS  ✦  INFINITE STREAM
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium tracking-tight text-brand-white">
              Associates &amp; Productions
            </h3>
          </div>
          <div className="h-px flex-1 hidden md:block bg-brand-white/10 mx-8 mb-4" />
          <p className="text-xs md:text-sm text-brand-grey-soft max-w-xs font-body mb-1">
            Strong creative alliances driving absolute fidelity from prepress to distribution.
          </p>
        </div>
      </div>

      {/* Infinite Scroll Carousel Outer Viewport */}
      <div className="relative w-full py-4 bg-brand-grey-dark/40 border-y border-brand-white/5">
        {/* Cinematic Fade Gradients at the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 lg:w-48 bg-gradient-to-r from-brand-black via-brand-black/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 lg:w-48 bg-gradient-to-l from-brand-black via-brand-black/60 to-transparent z-20 pointer-events-none" />

        <div className="overflow-hidden w-full">
          <LogoLoop
            logos={associates}
            speed={50}
            direction="left"
            logoHeight={240}
            gap={24}
            pauseOnHover={true}
            renderItem={(associate: any, key: React.Key) => {
              const details = getAssociateDetails(associate.id);
              return (
                <a 
                  key={key} 
                  href={associate.link || '#'} 
                  target={associate.link ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="group flex flex-col w-[230px] md:w-[270px] lg:w-[310px] flex-shrink-0 relative overflow-hidden bg-brand-grey-dark rounded-md border border-brand-white/5 hover:border-brand-yellow/35 hover:shadow-[0_0_20px_rgba(255,195,0,0.08)] transition-all duration-500 ease-out"
                >
                  {/* Aspect Ratio tailored for cinematic widescreen format to save vertical height */}
                  <div className="w-full aspect-[16/10] relative overflow-hidden bg-brand-black/45 border-b border-brand-white/5">
                    
                    {/* Render transparent stylized clean/vector logo */}
                    {renderAssociateLogo(associate.id, associate.image, associate.name)}
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 via-transparent to-transparent opacity-90 pointer-events-none" />
                    
                    {/* Viewport UI lines */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center opacity-65 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-brand-yellow">
                        {details.tag}
                      </span>
                      <span className="font-mono text-[8px] text-brand-white/40 tracking-widest uppercase">
                        REC // 24FPS
                      </span>
                    </div>

                    {/* Aesthetic Camera Crop Corners */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-brand-white/25 group-hover:border-brand-yellow/40 transition-colors duration-500" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-brand-white/25 group-hover:border-brand-yellow/40 transition-colors duration-500" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-brand-white/25 group-hover:border-brand-yellow/40 transition-colors duration-500" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-brand-white/25 group-hover:border-brand-yellow/40 transition-colors duration-500" />
                  </div>

                  {/* Text details in a concise format */}
                  <div className="p-4 md:p-5 flex flex-col justify-between flex-1 bg-brand-grey-dark/95">
                    <div>
                      <h4 className="font-heading text-sm md:text-base font-medium tracking-wide text-brand-white uppercase group-hover:text-brand-yellow transition-colors duration-300">
                        {associate.name}
                      </h4>
                      <p className="font-mono text-[8px] md:text-[9px] text-brand-white/50 tracking-wider uppercase mt-1">
                        {details.subtitle}
                      </p>
                    </div>
                    <p className="text-[11px] md:text-xs text-brand-grey-soft mt-3 line-clamp-2 leading-relaxed font-body">
                      {details.desc}
                    </p>
                  </div>
                </a>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}
