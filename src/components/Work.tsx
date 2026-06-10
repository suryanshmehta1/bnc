import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brand, PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS } from '../constants';
import { Maximize2, Play, Pause, X, MapPin, Calendar, Award, Music, Film, Layers } from 'lucide-react';

interface WorkProps {
  brand: Brand;
}

export default function Work({ brand }: WorkProps) {
  const filteredItems = PORTFOLIO_ITEMS.filter(item => item.brand === brand);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsPlayingAudio(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  return (
    <section id="work" className="py-32 bg-brand-black relative z-10 border-t border-brand-white/5 overflow-hidden">
      {/* Background visual texture overlays */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-brand-yellow font-heading font-black uppercase tracking-[0.3em] text-xs mb-4">
              35MM NARRATIVE REEL
            </p>
            <h2 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter">
              The <span className="text-brand-yellow">Timeline</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-brand-grey-soft text-sm leading-relaxed">
              Scroll or drag horizontally. Every item represents an individual block on our chronological production strip, complete with full scene archives inside.
            </p>
          </div>
        </div>

        <div className="flex gap-8 text-[10px] uppercase font-bold tracking-[0.3em] text-brand-grey-soft/80 mt-8">
          <span>[ DRAG OR SWIPE TIMELINE ]</span>
          <span className="text-brand-yellow">•</span>
          <span>FPS: 24.00 TRUE SOUND</span>
        </div>
      </div>

      {/* HORIZONTAL FILM ROLL COMPONENT CONTAINER */}
      <div className="relative w-full overflow-x-auto cursor-grab active:cursor-grabbing select-none scrollbar-none py-6 bg-brand-grey-dark/20 border-y border-brand-white/5">
        
        {/* Top sprocket strip for old 35mm filmlook */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-brand-black flex justify-between px-4 border-b border-brand-white/10 overflow-hidden select-none pointer-events-none">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="w-3 h-2.5 bg-brand-grey-dark/80 rounded-sm shrink-0 mx-2" />
          ))}
        </div>

        {/* Scrollable track spacer */}
        <div className="flex gap-8 px-8 md:px-24 py-8 w-max">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelectedItem(item)}
              className="group relative w-[280px] sm:w-[380px] h-[480px] bg-brand-grey-dark overflow-hidden rounded-sm border border-brand-white/10 hover:border-brand-yellow/30 transition-all duration-500 shrink-0 shadow-2xl"
            >
              {/* Image component with continuous scale/frown animations on hover */}
              <div className="absolute inset-0 z-0 overflow-hidden transform-gpu">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-50 group-hover:scale-105 transition-all duration-1000 ease-out transform-gpu"
                />
                
                {/* Embedded subtle video playback overlay simulating active footage loop in development */}
                <div className="absolute inset-0 bg-brand-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-color" />
              </div>

              {/* Grid content footer overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 z-10 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent flex flex-col justify-end h-3/5">
                <span className="text-brand-yellow font-heading text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
                  {item.category} // SCENE {index + 1}
                </span>
                
                <h3 className="text-3xl font-serif font-light text-brand-white group-hover:text-brand-yellow tracking-tight mb-2 transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-brand-grey-soft text-xs font-mono tracking-widest uppercase">
                  Release: {item.year || "2025"}
                </p>

                {/* Simulated playback visualizer / View prompt */}
                <div className="mt-8 flex items-center gap-3 text-brand-yellow opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
                  <span className="text-[10px] font-heading uppercase font-black tracking-widest">
                    Enter Sequence
                  </span>
                  <Maximize2 size={12} />
                </div>
              </div>
              
              {/* Interactive Frame guides */}
              <div className="absolute top-6 left-6 font-mono text-[9px] text-brand-white/30">
                FRAME 0{index + 1}-CANDID
              </div>
              <div className="absolute top-6 right-6 font-mono text-[9px] text-brand-white/30">
                SCENE REF: SLIDE_{item.id.toUpperCase()}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom sprocket strip */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-brand-black flex justify-between px-4 border-t border-brand-white/10 overflow-hidden select-none pointer-events-none">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="w-3 h-2.5 bg-brand-grey-dark/80 rounded-sm shrink-0 mx-2" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl mt-8 flex justify-between text-brand-grey-soft/40 font-mono text-[9px]">
        <span>NARRATIVE FLUID TIMELINE</span>
        <span>INDEX [01 - 0{filteredItems.length}] // STUDIO BROADCAST</span>
      </div>

      {brand === 'candid' && (
        <div id="upcoming-candid-films" className="container mx-auto px-6 max-w-7xl mt-24 border-t border-brand-white/10 pt-16">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-yellow">[ PRE-PRODUCTION // FILM IN incubation ]</span>
            <h3 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mt-2 text-brand-white">
              Upcoming <span className="text-brand-yellow">Productions</span>
            </h3>
            <p className="text-brand-grey-soft text-sm mt-2 max-w-xl">
              A sneak peek into our creative incubation pipeline of raw regional short stories, independent indie scripts, and cinematic pieces.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                id: 'up-1',
                title: "Mritunjay",
                image: "/mirtunyjay.jpeg",
                tagline: "Redemption & Dramatic Depth",
                desc: "A gripping regional drama tracing the lines of moral victory, legacy, and human truth."
              },
              {
                id: 'up-2',
                title: "Hulm",
                image: "/hulm.jpeg",
                tagline: "The Poetry of Dreams",
                desc: "A surreal, atmospheric cinematic poem visualizing sleep, desires, and silent expectations."
              },
              {
                id: 'up-3',
                title: "The Last Episode",
                image: "/the last episode.jpeg",
                tagline: "Final Cinematic Act",
                desc: "The monumental concluding chapter of an independent Rajasthani raw narrative series."
              }
            ].map((film, index) => (
              <motion.div
                key={film.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-md border border-brand-white/5 bg-brand-grey-dark transform-gpu cursor-default"
              >
                {/* Image */}
                <img
                  src={film.image}
                  alt={film.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover filter brightness-[0.6] grayscale transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.35] group-hover:grayscale-0 transform-gpu"
                />

                {/* Cinematic crop notches */}
                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-brand-yellow/30" />
                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-brand-yellow/30" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-brand-yellow/30" />
                <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-brand-yellow/30" />

                {/* Cover text & Upcoming Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                  {/* Top Header */}
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[8px] bg-brand-yellow text-brand-black px-2 py-0.5 rounded-sm uppercase tracking-widest font-black">
                      UPCOMING
                    </span>
                    <span className="font-mono text-[9px] text-brand-white/40">
                      ROLL_0{index + 7}
                    </span>
                  </div>

                  {/* Centered UPCOMING Overlay on Hover */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-brand-yellow font-heading text-lg md:text-2xl font-black tracking-[0.25em] uppercase px-4 py-2 border border-brand-yellow/30 bg-brand-black/80 rounded-sm shadow-xl">
                      upcoming
                    </span>
                  </div>

                  {/* Bottom Text Area */}
                  <div className="transition-transform duration-500 group-hover:translate-y-1">
                    <span className="text-brand-yellow/80 font-mono text-[9px] uppercase tracking-widest">
                      {film.tagline}
                    </span>
                    <h4 className="text-2xl font-black uppercase text-brand-white tracking-tight mt-1 group-hover:text-brand-yellow transition-colors duration-300">
                      {film.title}
                    </h4>
                    <p className="text-[10px] text-brand-white/50 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2 leading-relaxed">
                      {film.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {brand === 'bazm' && (
        <div id="upcoming-bazm-plays" className="container mx-auto px-6 max-w-7xl mt-24 border-t border-brand-white/10 pt-16">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-yellow">[ UPCOMING STAGE RELEASES // THEATRE INCUBATION ]</span>
            <h3 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mt-2 text-brand-white">
              Upcoming <span className="text-brand-yellow">Theatre Plays</span>
            </h3>
            <p className="text-brand-grey-soft text-sm mt-2 max-w-xl">
              An exclusive previews into our upcoming theatrical lineup, from intense solo English plays to classical Punjabi, Urdu, and Hindi adaptations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 'up-b1',
                title: "Women Alone",
                image: "https://images.unsplash.com/photo-1514302240736-b1fee5985889?auto=format&fit=crop&q=80",
                tagline: "English Solo Play",
                desc: "A bold, tragicomic exploration of isolation, freedom, and resilience written by Dario Fo and Franca Rame."
              },
              {
                id: 'up-b2',
                title: "Maut Kyu Raat Bhar Nahi Aati",
                image: "https://images.unsplash.com/photo-1503091315242-cb8bb2321c8e?auto=format&fit=crop&q=80",
                tagline: "Poetic Existential Drama",
                desc: "Drawing from Ghalib's absolute inquiries, this physical theatre piece delves into mortality, time, and human destiny."
              },
              {
                id: 'up-b3',
                title: "Heer Ranjha",
                image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80",
                tagline: "Sufi Musical Legend",
                desc: "A rich, classical musical staging of Waris Shah’s epic romance, interlaced with authentic Punjabi and Rajasthani folk rhythms."
              },
              {
                id: 'up-b4',
                title: "Joun Elia",
                image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80",
                tagline: "Urdu Monologues & Poetry",
                desc: "An intense, dark stage portrayal celebrating the raw genius, angst, and nihilistic philosophy of modern Urdu’s finest poet."
              },
              {
                id: 'up-b5',
                title: "Nirmal Varma ke Teen Ekant",
                image: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&q=80",
                tagline: "Intimate Hindi Theatre",
                desc: "Adapting Nirmal Verma’s legendary companion pieces, focusing on urban solitude, emotional gaps, and silent human relationships."
              }
            ].map((film, index) => (
              <motion.div
                key={film.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-md border border-brand-white/5 bg-brand-grey-dark transform-gpu cursor-default"
              >
                {/* Image */}
                <img
                  src={film.image}
                  alt={film.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover filter brightness-[0.6] grayscale transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.35] group-hover:grayscale-0 transform-gpu"
                />

                {/* Cinematic crop notches */}
                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-brand-yellow/30" />
                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-brand-yellow/30" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-brand-yellow/30" />
                <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-brand-yellow/30" />

                {/* Cover text & Upcoming Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                  {/* Top Header */}
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[8px] bg-brand-yellow text-brand-black px-2 py-0.5 rounded-sm uppercase tracking-widest font-black">
                      UPCOMING
                    </span>
                    <span className="font-mono text-[9px] text-brand-white/40">
                      PLAY_OS{index + 1}
                    </span>
                  </div>

                  {/* Centered UPCOMING Overlay on Hover */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-brand-yellow font-heading text-lg md:text-2xl font-black tracking-[0.25em] uppercase px-4 py-2 border border-brand-yellow/30 bg-brand-black/80 rounded-sm shadow-xl">
                      upcoming
                    </span>
                  </div>

                  {/* Bottom Text Area */}
                  <div className="transition-transform duration-500 group-hover:translate-y-1">
                    <span className="text-brand-yellow/80 font-mono text-[9px] uppercase tracking-widest font-bold">
                      {film.tagline}
                    </span>
                    <h4 className="text-2xl font-black uppercase text-brand-white tracking-tight mt-1 group-hover:text-brand-yellow transition-colors duration-300">
                      {film.title}
                    </h4>
                    <p className="text-[10px] text-brand-white/50 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2 leading-relaxed">
                      {film.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* IMMERSIVE CINEMA-GRADE PRESENTATION MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[1000] bg-brand-black/98 overflow-y-auto overflow-x-hidden p-0"
          >
            {/* Film scratch grain just inside modal */}
            <div className="film-grain opacity-10 pointer-events-none" />

            {/* Sticky close container */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 z-[1100]">
              <button 
                onClick={() => setSelectedItem(null)}
                className="w-12 h-12 rounded-full bg-brand-black/80 border border-brand-white/10 hover:border-brand-yellow text-brand-white hover:text-brand-yellow flex items-center justify-center transition-all duration-300 backdrop-blur-md"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main scrollable body */}
            <div className="min-h-screen flex flex-col items-center">
              
              {/* Part 1: Fullscreen Opening Frame */}
              <div className="relative w-full h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/50 to-brand-black z-10" />
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover scale-100 animate-pulse transform-gpu"
                  style={{ animationDuration: '6s' }}
                />
                
                <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-brand-yellow font-heading font-black uppercase tracking-[0.4em] text-xs md:text-sm mb-6"
                  >
                    {selectedItem.category} // PROD. SELECTION
                  </motion.p>
                  
                  <motion.h4
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-5xl md:text-8xl lg:text-9xl font-serif font-light text-brand-white tracking-tighter mb-8"
                  >
                    {selectedItem.title}
                  </motion.h4>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap justify-center items-center gap-6 text-brand-grey-soft text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-brand-yellow" />
                      <span>{selectedItem.credits?.Location || "Rajasthan, IN"}</span>
                    </div>
                    <span className="text-brand-yellow/30">|</span>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-brand-yellow" />
                      <span>Year: {selectedItem.year || "2025"}</span>
                    </div>
                    <span className="text-brand-yellow/30">|</span>
                    <div className="flex items-center gap-2">
                      <Film size={14} className="text-brand-yellow" />
                      <span>Format: Arri Raw 4.5K</span>
                    </div>
                  </motion.div>
                </div>

                {/* Scroll Down Visual Prompt */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
                  <span className="text-[9px] uppercase tracking-widest font-bold">Scroll Narrative</span>
                  <div className="w-px h-8 bg-brand-yellow animate-bounce" />
                </div>
              </div>


              {/* Part 2: Mood & Editorial Quote */}
              <div className="w-full bg-brand-black py-20 px-6 max-w-6xl mx-auto border-t border-brand-white/5 text-center">
                <div className="max-w-3xl mx-auto">
                  <Film className="mx-auto mb-6 text-brand-yellow/30 animate-pulse" size={32} />
                  <p className="text-3xl md:text-5xl font-serif italic font-light text-brand-white/90 leading-tight tracking-tight mb-6">
                    "{selectedItem.moodStatement || 'A testament to the artistic pursuit of uncompromised storytelling.'}"
                  </p>
                  <div className="h-px w-20 bg-brand-yellow mx-auto mt-8" />
                </div>
              </div>


              {/* Part 3: Classical Movie Credits Grid */}
              <div className="w-full bg-brand-grey-dark/40 py-16 border-y border-brand-white/5 px-6">
                <div className="max-w-5xl mx-auto">
                  <p className="text-center text-brand-yellow text-[10px] uppercase tracking-[0.40em] mb-12 font-heading font-bold">
                    PRODUCTION REGISTER & CREDITS
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6 text-center">
                    {Object.entries(selectedItem.credits || {
                      'Director': 'Manoj Panwar',
                      'Executive Producer': 'Ritu Chauhan',
                      'Cinematography': 'Chandan Sharma',
                      'Technical Designer': 'Ayush Saxena',
                      'Location': 'Rajasthan, India'
                    }).map(([role, name]) => (
                      <div key={role} className="flex flex-col items-center">
                        <span className="text-brand-grey-soft/50 text-[10px] uppercase tracking-widest font-mono font-bold mb-2">
                          {role}
                        </span>
                        <span className="text-brand-white text-sm uppercase tracking-wide font-heading font-medium">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


              {/* Part 4: Behind the Scenes & Process */}
              <div className="w-full py-28 px-6 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <Layers className="text-brand-yellow" size={18} />
                      <span className="text-brand-yellow font-heading text-xs font-black uppercase tracking-widest">
                        Storytelling & Tech Process
                      </span>
                    </div>
                    
                    <h5 className="text-3xl md:text-4xl font-serif font-light text-brand-white mb-6 leading-snug">
                      How we brought the emotional blueprint to life.
                    </h5>
                    
                    <p className="text-brand-grey-soft text-base leading-relaxed mb-6 font-body">
                      {selectedItem.storytellingProcess || "We approach every frame with sensory discipline. Before picking up a camera, we map the psychological and dramatic weight of each scene. The pacing, lighting design, and camera movements are explicitly tailored to emphasize key character conflicts rather than aesthetic showing-off."}
                    </p>
                    
                    <p className="text-brand-grey-soft text-base leading-relaxed font-body">
                      {selectedItem.btsText || "Our process relies on natural textures—direct desert wind loops, ambient sand and fire sound structures, and shadows acting as core scene blocks. We reject flat setups for complex emotional archives."}
                    </p>
                  </div>

                  <div className="relative aspect-video overflow-hidden rounded-sm border border-brand-white/10 shadow-2xl bg-brand-grey-dark transform-gpu">
                    <img
                      src={selectedItem.btsImage || "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80"}
                      alt="Behind the Scenes Capture"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale brightness-90 saturate-50 hover:scale-105 hover:grayscale-0 transition-all duration-700 transform-gpu"
                    />
                    <div className="absolute bottom-4 left-4 font-mono text-[9px] bg-brand-black/80 px-3 py-1 text-brand-yellow border border-brand-white/10 rounded-sm">
                      BTS SHOT CODE // [SEC-019]
                    </div>
                  </div>
                </div>
              </div>


              {/* Part 5: Sound & Music Interactive Visualizer */}
              {selectedItem.audioTrackName && (
                <div className="w-full bg-brand-grey-dark/30 py-16 border-t border-brand-white/5 px-6">
                  <div className="max-w-4xl mx-auto bg-brand-grey-dark border border-brand-white/5 p-8 md:p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-10 relative">
                    {/* Background audio waves ornament */}
                    <div className="absolute inset-0 bg-radial-gradient from-brand-yellow/5 to-transparent blur-xl pointer-events-none" />
                    
                    <div className="flex items-center gap-6 z-10">
                      <div className="w-16 h-16 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow animate-float">
                        <Music size={24} />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-brand-yellow mb-1 font-heading">
                          OFFICIAL SCORE / SOUNDTRACK
                        </span>
                        <h6 className="text-xl font-heading font-black uppercase text-brand-white tracking-tight">
                          {selectedItem.audioTrackName}
                        </h6>
                        <span className="block text-xs text-brand-grey-soft mt-1 font-mono">
                          Composed by: {selectedItem.audioTrackArtist}
                        </span>
                      </div>
                    </div>

                    {/* Simulating Dancing Equalizer wave */}
                    <div className="flex items-center gap-8 z-10 w-full md:w-auto justify-between md:justify-end">
                      <div className="flex items-end gap-[3px] h-10 w-24 overflow-hidden shrink-0">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              height: isPlayingAudio 
                                ? [10, Math.random() * 35 + 5, 10] 
                                : [10, 4, 10]
                            }}
                            transition={{
                              duration: isPlayingAudio ? (Math.random() * 0.4 + 0.4) : 1,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="bg-brand-yellow w-[5px] rounded-t-sm"
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="flex items-center gap-3 px-6 py-4.5 bg-brand-yellow text-brand-black font-heading font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform"
                      >
                        {isPlayingAudio ? (
                          <>
                            <Pause size={14} />
                            <span>Pause Score</span>
                          </>
                        ) : (
                          <>
                            <Play size={14} fill="currentColor" />
                            <span>Play Score</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}


              {/* Part 6: Final Outcome Card & Award Signifiers */}
              <div className="w-full bg-brand-black py-28 px-6 text-center border-t border-brand-white/5">
                <div className="max-w-2xl mx-auto flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border border-brand-yellow/40 flex items-center justify-center text-brand-yellow mb-8 animate-floating">
                    <Award size={32} />
                  </div>
                  
                  <span className="text-brand-yellow font-heading text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
                    ACCREDITATION & IMPACT
                  </span>
                  
                  <h6 className="text-3xl md:text-5xl font-serif text-brand-white leading-tight mb-8 font-light">
                    {selectedItem.finalOutcome || "Featured extensively across Rajasthan networks, setting a benchmark for expressive independent design."}
                  </h6>
                  
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="mt-4 border border-brand-white/10 hover:border-brand-yellow text-brand-white hover:text-brand-yellow px-10 py-5 font-heading font-black uppercase text-[10px] tracking-wider transition-all duration-300 rounded-sm"
                  >
                    Return to Main Archive
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
