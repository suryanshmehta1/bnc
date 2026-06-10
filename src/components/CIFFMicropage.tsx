import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Film, Calendar, Clock, Star, Sparkles, Award, Play, 
  MapPin, HelpCircle, CheckCircle2, Mail, MessageSquare, ArrowRight,
  ShieldAlert, Compass, Music, Flame
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import Counter from './Counter';
import { db, serverTimestamp } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function CIFFMicropage() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'tracks' | 'rules' | 'jury' | 'faq'>('tracks');

  useEffect(() => {
    // New target date requested by user: February 13, 2027
    const targetDate = new Date("2027-02-13T09:00:00Z").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rsvpEmail.trim()) return;

    setIsSubmitting(true);
    setErrorMsg('');
    const formElement = e.currentTarget;

    try {
      const emailVal = rsvpEmail.trim().toLowerCase();
      const path = 'subscribers';
      
      let dbStored = false;
      try {
        await addDoc(collection(db, path), {
          email: emailVal,
          createdAt: serverTimestamp(),
          source: 'ciff_micropage'
        });
        dbStored = true;
      } catch (dbErr) {
        console.warn('Firestore store skipped/failed:', dbErr);
      }

      let serverBroadcastInfo: any = null;
      try {
        const response = await fetch('/api/ciff-subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailVal })
        });
        if (response.ok) {
          serverBroadcastInfo = await response.json();
        }
      } catch (srvErr) {
        console.warn('Backend broadcast skipped/failed:', srvErr);
      }

      // EmailJS compilation with direct form parsing (matching the HTML setup)
      await emailjs.sendForm(
        'contact_service',
        'template_7ntq4x8',
        formElement,
        'mmVyHtFW8z_AsySGH'
      );

      setDeliveryInfo({
        emailDelivery: {
          status: 'success',
          details: 'Direct confirmation sent successfully via EmailJS template.'
        },
        whatsappDelivery: {
          status: 'success',
          details: serverBroadcastInfo?.whatsappDelivery?.details || 'Jodhpur notification node aligned.'
        },
        dbStored
      });
      setRsvpSubmitted(true);
      setRsvpEmail('');
    } catch (err: any) {
      console.error('Subscription error:', err);
      let displayError = err.text || err.message || JSON.stringify(err) || 'Unable to sign up. Please try again.';
      setErrorMsg(displayError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tracks = [
    {
      icon: <Compass className="text-brand-yellow" size={24} />,
      title: "Desert Echoes (Marwar Showcase)",
      desc: "An exclusive competitive section focused entirely on stories set within the Thar desert, celebrating Rajasthani folk cultures, local heritage, and authentic regional identities.",
      length: "Maximum 25 minutes",
      gauge: "Short Fiction & Creative Non-Fiction"
    },
    {
      icon: <Music className="text-brand-yellow" size={24} />,
      title: "Experimental Kinesthetics & Wave",
      desc: "For avant-garde creators and film poets pushing boundaries. We value raw visual experiments, soundscape-driven narratives, non-linear forms, and absolute visual freedom.",
      length: "Maximum 12 minutes",
      gauge: "Cinematic Poetry, Visual Music, Abstract"
    },
    {
      icon: <Award className="text-brand-yellow" size={24} />,
      title: "Compact Narrative Masterworks",
      desc: "Fierce, highly structured independent fiction focusing on human relationships, local socio-realism, drama, and authentic truth with high dramatic density.",
      length: "Maximum 15 minutes",
      gauge: "Short Cinema, High Density Fiction"
    }
  ];

  const rules = [
    "Submissions must be original creations, created after January 1, 2025.",
    "Films can be in any language but MUST carry clean English subtitles.",
    "We accept raw independent drafts and do not require expensive corporate sanitization or post-production formatting.",
    "Multiple entries are permitted per director/producer."
  ];

  const jury = [
    {
      name: "Ajay Karan Joshi",
      role: "Jury Council - Performance Arts",
      bio: "RNSK Academy Award Winner, actor, director, and premier theatre scholar of Rajasthan."
    },
    {
      name: "Shailendra Vyas",
      role: "Evaluation - Broadscale Narrative",
      bio: "Famed anchor, actor, and director behind acclaimed national television and regional cinema productions."
    },
    {
      name: "Nemi Makar",
      role: "Audit - Technical Directing",
      bio: "Pioneering casting director and theatre craft specialist leading raw national talent castings."
    }
  ];

  const faqs = [
    {
      q: "When and where does the festival take place?",
      a: "The festival starts on February 13, 2027 and continues till February 16, 2027. Main gala screenings, director panels, and masterclasses will take place at Studio Bazm's Premium Art facility in Jodhpur, Rajasthan."
    },
    {
      q: "Is there an entry submission fee?",
      a: "CIFF is built to support indie creators. We maintain a zero-fee structure for regional Rajasthani students, and a nominal curation support fee for out-of-province entries."
    },
    {
      q: "Can I participate if I am a student?",
      a: "Yes! We run a dedicated student highlight program to nurture, encourage, and fund young filmmakers and stage actors looking to refine their cinematic crafts."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-black text-brand-white relative overflow-hidden font-sans selection:bg-brand-yellow selection:text-brand-black pt-24 pb-20">
      {/* Golden atmospheric glow flares */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-yellow/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-brand-yellow/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 film-grain opacity-[0.12] pointer-events-none z-10" />

      <div className="container px-6 mx-auto max-w-6xl relative z-20">
        
        {/* Back navigation */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 group text-xs font-mono uppercase tracking-widest text-brand-white/60 hover:text-brand-yellow transition-colors mb-12 cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Studio</span>
        </motion.button>

        {/* Festival Header / Title */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full">
              <Sparkles size={12} className="text-brand-yellow animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-brand-yellow uppercase">CIFF 2027 // Official Micropage</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-brand-white">
              Candid Imagination <br />
              <span className="text-brand-yellow font-serif font-light italic normal-case">Film Festival</span>
            </h1>

            <p className="text-brand-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
              Where raw story architectures bypass artificial corporate filters, celebrating experimental visual poetry, non-sanitized regional histories, and uncompromising dramatic truths in Jodhpur, Rajasthan.
            </p>

            <div className="flex flex-wrap gap-6 text-xs font-mono uppercase tracking-wider pt-2 text-brand-white/60">
              <div className="flex items-center gap-2 text-brand-yellow">
                <MapPin size={14} />
                <span>Jodhpur, Rajasthan</span>
              </div>
              <div className="flex items-center gap-2 text-brand-yellow">
                <Calendar size={14} />
                <span>Feb 13 - 16, 2027</span>
              </div>
              <div className="flex items-center gap-2 text-brand-yellow">
                <Flame size={14} />
                <span>Now Open for RSVPs & Submissions</span>
              </div>
            </div>
          </div>

          {/* Countdown Side Box */}
          <div className="lg:col-span-4 bg-brand-grey-dark/40 border border-brand-white/10 p-8 rounded-3xl relative text-center flex flex-col justify-center">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-brand-white/50 block mb-6">
              Countdown to Opening Scene
            </span>
            
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-6">
              <div className="bg-brand-black/40 border border-brand-white/5 p-4 rounded-xl flex flex-col items-center">
                <div className="h-10 flex items-center justify-center">
                  <Counter value={timeLeft.days} fontSize={28} textColor="#FFC300" fontWeight={900} places={timeLeft.days >= 100 ? [100, 10, 1] : [10, 1]} />
                </div>
                <span className="text-[9px] uppercase tracking-wider text-brand-white/40 mt-1.5 font-mono">Days</span>
              </div>
              
              <div className="bg-brand-black/40 border border-brand-white/5 p-4 rounded-xl flex flex-col items-center">
                <div className="h-10 flex items-center justify-center">
                  <Counter value={timeLeft.hours} fontSize={28} textColor="#FFC300" fontWeight={900} places={[10, 1]} />
                </div>
                <span className="text-[9px] uppercase tracking-wider text-brand-white/40 mt-1.5 font-mono">Hours</span>
              </div>

              <div className="bg-brand-black/40 border border-brand-white/5 p-4 rounded-xl flex flex-col items-center">
                <div className="h-10 flex items-center justify-center">
                  <Counter value={timeLeft.minutes} fontSize={28} textColor="#FFC300" fontWeight={900} places={[10, 1]} />
                </div>
                <span className="text-[9px] uppercase tracking-wider text-brand-white/40 mt-1.5 font-mono">Mins</span>
              </div>

              <div className="bg-brand-black/40 border border-brand-white/5 p-4 rounded-xl flex flex-col items-center">
                <div className="h-10 flex items-center justify-center">
                  <Counter value={timeLeft.seconds} fontSize={28} textColor="#FFC300" fontWeight={900} places={[10, 1]} />
                </div>
                <span className="text-[9px] uppercase tracking-wider text-brand-white/40 mt-1.5 font-mono">Secs</span>
              </div>
            </div>
            
            <span className="text-[9px] uppercase font-mono tracking-widest text-brand-yellow">
              Target Opening: Feb 13, 2027
            </span>
          </div>
        </div>

        {/* Section divider with ticks */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-brand-white/15 to-transparent my-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-yellow rotate-45" />
        </div>

        {/* Core Content Tabs container */}
        <div className="grid lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-3 flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-white/40 mb-3 block px-3">
              FESTIVAL CRITERIA
            </span>
            <button
              onClick={() => setActiveTab('tracks')}
              className={`text-left text-xs uppercase tracking-widest font-mono font-bold py-3.5 px-4 rounded transition-all flex items-center justify-between cursor-pointer ${activeTab === 'tracks' ? 'bg-brand-yellow text-brand-black shadow-lg shadow-brand-yellow/10' : 'text-brand-white/70 hover:bg-brand-white/5 hover:text-brand-white'}`}
            >
              <span>Submission Tracks</span>
              <Film size={12} />
            </button>
            
            <button
              onClick={() => setActiveTab('rules')}
              className={`text-left text-xs uppercase tracking-widest font-mono font-bold py-3.5 px-4 rounded transition-all flex items-center justify-between cursor-pointer ${activeTab === 'rules' ? 'bg-brand-yellow text-brand-black shadow-lg shadow-brand-yellow/10' : 'text-brand-white/70 hover:bg-brand-white/5 hover:text-brand-white'}`}
            >
              <span>Festival Regulations</span>
              <Award size={12} />
            </button>

            <button
              onClick={() => setActiveTab('jury')}
              className={`text-left text-xs uppercase tracking-widest font-mono font-bold py-3.5 px-4 rounded transition-all flex items-center justify-between cursor-pointer ${activeTab === 'jury' ? 'bg-brand-yellow text-brand-black shadow-lg shadow-brand-yellow/10' : 'text-brand-white/70 hover:bg-brand-white/5 hover:text-brand-white'}`}
            >
              <span>Jury Council</span>
              <Star size={12} />
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`text-left text-xs uppercase tracking-widest font-mono font-bold py-3.5 px-4 rounded transition-all flex items-center justify-between cursor-pointer ${activeTab === 'faq' ? 'bg-brand-yellow text-brand-black shadow-lg shadow-brand-yellow/10' : 'text-brand-white/70 hover:bg-brand-white/5 hover:text-brand-white'}`}
            >
              <span>FAQ Portal</span>
              <HelpCircle size={12} />
            </button>
          </div>

          <div className="lg:col-span-9 bg-brand-grey-dark/30 border border-brand-white/5 p-8 md:p-12 rounded-3xl min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'tracks' && (
                <motion.div
                  key="tracks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-black uppercase text-brand-white tracking-tight mb-2">Competitive Film Tracks</h3>
                    <p className="text-brand-white/60 text-xs md:text-sm">We provide an inclusive display environment for films of distinct aesthetic genres. Submit your project raw.</p>
                  </div>

                  <div className="space-y-6">
                    {tracks.map((track, i) => (
                      <div key={i} className="p-6 bg-brand-black/40 border border-brand-white/5 rounded-2xl flex flex-col md:flex-row gap-6 items-start hover:border-brand-yellow/20 transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 border border-brand-yellow/25 shrink-0 flex items-center justify-center text-brand-yellow">
                          {track.icon}
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold text-brand-white uppercase tracking-tight">{track.title}</h4>
                          <p className="text-brand-white/60 text-xs md:text-sm leading-relaxed">{track.desc}</p>
                          <div className="flex flex-wrap gap-4 pt-1 text-[10px] font-mono uppercase text-brand-yellow/70">
                            <span>LIMIT: {track.length}</span>
                            <span className="text-brand-white/20">•</span>
                            <span>GAUGE: {track.gauge}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'rules' && (
                <motion.div
                  key="rules"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-black uppercase text-brand-white tracking-tight mb-2">Rules & Guidelines</h3>
                    <p className="text-brand-white/60 text-xs md:text-sm">Pristine creative autonomy is crucial. Our rules protect raw cinematic integrity above corporate standardization.</p>
                  </div>

                  <div className="space-y-4">
                    {rules.map((rule, idx) => (
                      <div key={idx} className="flex gap-4 items-start p-4 bg-brand-black/30 border border-brand-white/5 rounded-xl">
                        <div className="w-6 h-6 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 shrink-0 flex items-center justify-center text-brand-yellow text-xs font-mono font-bold">
                          {idx + 1}
                        </div>
                        <p className="text-brand-white/80 text-xs md:text-sm leading-relaxed">{rule}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'jury' && (
                <motion.div
                  key="jury"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-black uppercase text-brand-white tracking-tight mb-2">Evaluation Jury & Advisors</h3>
                    <p className="text-brand-white/60 text-xs md:text-sm">Individually assessed by academic theatre masters, experienced film anchors, and casting council specialists.</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {jury.map((member, i) => (
                      <div key={i} className="p-6 bg-brand-black/40 border border-brand-white/5 rounded-2xl flex flex-col justify-between hover:border-brand-yellow/20 transition-all duration-300">
                        <div>
                          <span className="text-[9px] font-mono uppercase text-brand-yellow tracking-widest">{member.role}</span>
                          <h4 className="text-lg font-bold text-brand-white uppercase mt-2 mb-3">{member.name}</h4>
                          <p className="text-brand-white/60 text-xs leading-relaxed">{member.bio}</p>
                        </div>
                        <div className="text-[10px] font-mono text-brand-white/30 uppercase tracking-widest mt-6">
                          CIFF '27 Panel
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'faq' && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-black uppercase text-brand-white tracking-tight mb-2">Frequently Questions</h3>
                    <p className="text-brand-white/60 text-xs md:text-sm">Information regarding venue, accommodation in desert city, curation structures and timelines.</p>
                  </div>

                  <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="p-6 bg-brand-black/40 border border-brand-white/5 rounded-2xl space-y-2">
                        <h4 className="text-sm font-bold text-brand-yellow uppercase tracking-tight flex items-center gap-2">
                          <CheckCircle2 size={13} /> {faq.q}
                        </h4>
                        <p className="text-brand-white/70 text-xs md:text-sm leading-relaxed pl-5">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Ticket RSVP Portal with EmailJS integration */}
        <div className="max-w-4xl mx-auto mt-20 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-grey-dark p-8 md:p-12 border border-brand-white/10 rounded-3xl relative overflow-hidden"
          >
            {/* Ticket border notches */}
            <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 bg-brand-black rounded-full border border-brand-white/10 z-20" />
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 bg-brand-black rounded-full border border-brand-white/10 z-20" />

            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <span className="text-brand-yellow font-mono text-[10px] font-black tracking-[0.25em] uppercase block mb-3">
                  STAY IN THE CIRCLE
                </span>
                <h4 className="text-3xl font-black text-brand-white uppercase tracking-tight mb-4">
                  Become Part Of The First Edition
                </h4>
                <p className="text-brand-white/60 text-xs md:text-sm leading-relaxed mb-6">
                  Secure early bird ticket lists, call for submission prompts, volunteer applications, and schedules directly inside your inbox.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-brand-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                  <span>Limited digital coordinates allowed. No spam, ever.</span>
                </div>
              </div>

              <div>
                {rsvpSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-brand-black/40 border border-brand-yellow/20 p-6 rounded-2xl text-left space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <h5 className="font-bold uppercase tracking-widest text-brand-white text-xs">RSVP Registered</h5>
                        <p className="text-[10px] text-brand-white/40 font-mono">STATUS: ACTIVE SEED</p>
                      </div>
                    </div>
                    
                    <p className="text-brand-white/70 text-xs leading-relaxed">
                      {deliveryInfo?.dbStored
                        ? "Your coordinate has been securely recorded in our Firestore database. Multi-channel broadcast triggers completed:"
                        : "Your coordinate has been registered with our newsletter system. Multi-channel broadcast triggers completed:"}
                    </p>

                    <div className="space-y-2.5 border-t border-brand-white/10 pt-4">
                      <div className={`flex items-start gap-2.5 text-xs p-2.5 rounded transition-colors ${deliveryInfo?.emailDelivery?.status === 'failed' ? 'bg-red-950/20 border border-red-500/20' : ''}`}>
                        <Mail size={14} className={`${deliveryInfo?.emailDelivery?.status === 'failed' ? 'text-red-400' : 'text-brand-yellow'} shrink-0 mt-0.5`} />
                        <div>
                          <p className={`font-bold uppercase text-[10px] tracking-wide ${deliveryInfo?.emailDelivery?.status === 'failed' ? 'text-red-400 font-mono' : 'text-brand-white'}`}>
                            Mailing Dispatch {deliveryInfo?.emailDelivery?.status === 'failed' && '[CREDENTIAL WARNING]'}
                          </p>
                          <p className={`text-[10px] leading-relaxed ${deliveryInfo?.emailDelivery?.status === 'failed' ? 'text-red-200/80 mt-1 font-mono' : 'text-brand-white/50'}`}>
                            {deliveryInfo?.emailDelivery?.details || 'Regular newsletters have been scheduled with our automated sender.'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2.5 text-xs pt-2">
                        <MessageSquare size={14} className="text-brand-yellow shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-brand-white uppercase text-[10px] tracking-wide">WhatsApp Broadcast Team</p>
                          <p className="text-[10px] text-brand-white/50 leading-relaxed">
                            {deliveryInfo?.whatsappDelivery?.details || 'Jodhpur broadcast servers have registered your coordinate for alerts.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <form id="festival-form" onSubmit={handleRsvpSubmit} className="space-y-4">
                    <label htmlFor="user_email" className="text-[10px] font-mono uppercase tracking-widest text-brand-white/40 block">Email Coordinate</label>
                    <div className="flex gap-2">
                      <input
                        required
                        type="email"
                        id="user_email"
                        name="user_email"
                        disabled={isSubmitting}
                        value={rsvpEmail}
                        onChange={(e) => setRsvpEmail(e.target.value)}
                        placeholder="ENTER EMAIL ADDRESS"
                        className="bg-brand-black w-full border border-brand-white/10 focus:border-brand-yellow text-sm font-mono tracking-wider px-4 py-3 focus:outline-none transition-colors uppercase text-brand-white placeholder-brand-white/20 rounded-sm disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-brand-yellow hover:scale-[1.02] text-brand-black p-4 active:scale-[0.98] transition-transform rounded-sm flex items-center justify-center cursor-pointer disabled:opacity-50 shrink-0"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <ArrowRight size={18} />
                        )}
                      </button>
                    </div>
                    {errorMsg && (
                      <p className="text-xs text-red-500 font-mono mt-2">
                        [ERROR]: {errorMsg}
                      </p>
                    )}
                    <p className="text-[9px] text-brand-white/30 italic text-left leading-relaxed">
                      By submitting, you agree to receive official Candid Imagination Film Festival updates.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
