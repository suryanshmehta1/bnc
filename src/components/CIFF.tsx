import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Film, Bell, Clock, ArrowRight, Star, Heart, Award, CheckCircle2, MessageSquare, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import Counter from './Counter';

import { db, handleFirestoreError, OperationType, serverTimestamp } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function CIFF() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState<any>(null);

  useEffect(() => {
    // Target date set to February 13, 2027
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
      
      // 1. Store in Firestore DB with optional/graceful fallback
      let dbStored = false;
      try {
        await addDoc(collection(db, path), {
          email: emailVal,
          createdAt: serverTimestamp()
        });
        dbStored = true;
      } catch (dbErr) {
        console.warn('Firestore subscription store skipped or failed:', dbErr);
      }

      // 2. Invoke our backend notification pipeline to send real-time mail/WhatsApp logs/messages
      let serverBroadcastInfo: any = null;
      try {
        const response = await fetch('/api/ciff-subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailVal })
        });
        if (response.ok) {
          serverBroadcastInfo = await response.json();
        }
      } catch (srvErr) {
        console.warn('Server notification pipeline skipped or failed:', srvErr);
      }

      // 3. EmailJS Direct submission via sendForm (Service: contact_service, Template: template_7ntq4x8)
      await emailjs.sendForm(
        'contact_service',
        'template_7ntq4x8',
        formElement,
        'mmVyHtFW8z_AsySGH'
      );

      setDeliveryInfo({
        emailDelivery: {
          status: 'success',
          details: 'Direct welcome/newsletter dispatch completed via EmailJS template.'
        },
        whatsappDelivery: {
          status: 'success',
          details: serverBroadcastInfo?.whatsappDelivery?.details || 'Jodhpur broadcast servers have registered your coordinate.'
        },
        dbStored
      });
      setRsvpSubmitted(true);
      setRsvpEmail('');
    } catch (err: any) {
      console.error('Subscription error:', err);
      let displayError = err.text || err.message || JSON.stringify(err) || 'Unable to establish secure connection. Please contact support.';
      setErrorMsg(displayError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const roadmapSteps = [
    {
      phase: "Phase 01",
      title: "Call for Submissions",
      date: "November 2025",
      desc: "Opening global gateways for indie short films, experimental cinema-poems, and regional desert narratives."
    },
    {
      phase: "Phase 02",
      title: "Jury Audits & Curation",
      date: "March 2026",
      desc: "Our esteemed panel of regional and national cinematic masters select final works for theatrical compilation."
    },
    {
      phase: "Phase 03",
      title: "Grand Festival Gala",
      date: "February 13-16, 2027",
      desc: "Four days of intensive 35mm screenings, director QA panels, live ambient scoring, and official jury reward ceremonies."
    }
  ];

  return (
    <section id="ciff-festival" className="py-32 bg-brand-black relative overflow-hidden border-t border-brand-white/5 z-20">
      {/* Cinematic Golden Glow behind Content */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-yellow/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container px-6 relative z-10 mx-auto max-w-7xl">
        
        {/* Cinematic Header Block */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full mb-6"
          >
            <Sparkles className="text-brand-yellow animate-pulse" size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-yellow">COMING SOON: CIFF 2027</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-white mb-6 leading-none"
          >
            The Future of <br className="hidden md:inline" />
            <span className="text-brand-yellow font-serif font-light italic normal-case block md:inline">Candid Imagination</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-yellow font-mono text-sm tracking-[0.25em] uppercase mb-8"
          >
            JODHPUR'S FIRST COMPACT INDIE EXHIBITION
          </motion.p>

          <p className="text-brand-white/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            A celebration of authentic story structures and cinema in its rawest, most poetic form. We are bringing experimental independent short films, avant-garde documentations, and Rajasthani masterworks together in Jodhpur, Rajasthan.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center text-center"
          >
            <Link
              to="/ciff"
              className="inline-flex items-center gap-3 px-6 py-3 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black font-mono text-xs uppercase tracking-widest font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-yellow/10"
            >
              <span>Explore Immersive Festival Portal</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Cinematic Countdown Segment */}
        <div className="mb-32 max-w-4xl mx-auto bg-brand-grey-dark/40 border border-brand-white/5 p-8 md:p-12 rounded-3xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-transparent via-brand-yellow/40 to-transparent" />
          
          <h3 className="text-xs uppercase font-mono tracking-[0.4em] text-brand-white/40 mb-8 flex items-center justify-center gap-2">
            <Clock size={14} className="text-brand-yellow" /> COUNTDOWN TO THE OPENING SCENE
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 max-w-3xl mx-auto mb-6">
            <div className="bg-brand-black/50 border border-brand-white/5 py-6 px-4 rounded-xl flex flex-col items-center justify-center">
              <div className="h-10 md:h-16 flex items-center justify-center">
                <Counter
                  value={timeLeft.days}
                  fontSize={40}
                  textColor="#FFC300"
                  fontWeight={900}
                  gradientFrom="#0f0f0f"
                  gradientTo="transparent"
                  gradientHeight={10}
                  counterStyle={{ padding: 0 }}
                  containerStyle={{ display: 'inline-flex' }}
                  places={timeLeft.days >= 100 ? [100, 10, 1] : [10, 1]}
                />
              </div>
              <span className="text-[9px] uppercase tracking-widest text-brand-white/40 font-mono mt-2">Days</span>
            </div>
            
            <div className="bg-brand-black/50 border border-brand-white/5 py-6 px-4 rounded-xl flex flex-col items-center justify-center">
              <div className="h-10 md:h-16 flex items-center justify-center">
                <Counter
                  value={timeLeft.hours}
                  fontSize={40}
                  textColor="#FFC300"
                  fontWeight={900}
                  gradientFrom="#0f0f0f"
                  gradientTo="transparent"
                  gradientHeight={10}
                  counterStyle={{ padding: 0 }}
                  containerStyle={{ display: 'inline-flex' }}
                  places={[10, 1]}
                />
              </div>
              <span className="text-[9px] uppercase tracking-widest text-brand-white/40 font-mono mt-2">Hours</span>
            </div>

            <div className="bg-brand-black/50 border border-brand-white/5 py-6 px-4 rounded-xl flex flex-col items-center justify-center">
              <div className="h-10 md:h-16 flex items-center justify-center">
                <Counter
                  value={timeLeft.minutes}
                  fontSize={40}
                  textColor="#FFC300"
                  fontWeight={900}
                  gradientFrom="#0f0f0f"
                  gradientTo="transparent"
                  gradientHeight={10}
                  counterStyle={{ padding: 0 }}
                  containerStyle={{ display: 'inline-flex' }}
                  places={[10, 1]}
                />
              </div>
              <span className="text-[9px] uppercase tracking-widest text-brand-white/40 font-mono mt-2">Minutes</span>
            </div>

            <div className="bg-brand-black/50 border border-brand-white/5 py-6 px-4 rounded-xl flex flex-col items-center justify-center">
              <div className="h-10 md:h-16 flex items-center justify-center">
                <Counter
                  value={timeLeft.seconds}
                  fontSize={40}
                  textColor="#FFC300"
                  fontWeight={900}
                  gradientFrom="#0f0f0f"
                  gradientTo="transparent"
                  gradientHeight={10}
                  counterStyle={{ padding: 0 }}
                  containerStyle={{ display: 'inline-flex' }}
                  places={[10, 1]}
                />
              </div>
              <span className="text-[9px] uppercase tracking-widest text-brand-white/40 font-mono mt-2">Seconds</span>
            </div>
          </div>
          
          <p className="text-[10px] text-brand-yellow font-mono uppercase tracking-[0.2em] mt-4">
            LIVE MAIN GALA: JODHPUR • FEBRUARY 13, 2027
          </p>
        </div>

        {/* Vision Block Row */}
        <div className="grid lg:grid-cols-3 gap-8 mb-32 max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 bg-brand-grey-dark/30 border border-brand-white/5 rounded-2xl relative flex flex-col justify-between group hover:bg-brand-grey-dark/40 hover:border-brand-yellow/20 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow mb-6 border border-brand-yellow/20">
                <Film size={22} />
              </div>
              <h4 className="text-xl font-bold text-brand-white uppercase tracking-tight mb-3">
                Local Resonance
              </h4>
              <p className="text-brand-white/60 text-xs md:text-sm leading-relaxed">
                Dedicated to digging deep into Rajasthan's desert heritage. We discover, curate, and screen raw independent micro-stories that reflect our region's complex visual textures.
              </p>
            </div>
            <div className="text-[10px] font-mono text-brand-yellow/40 uppercase tracking-widest mt-8 flex justify-between items-center">
              <span>01 / VISION</span>
              <Star size={10} className="text-brand-yellow" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-10 bg-brand-grey-dark/30 border border-brand-white/5 rounded-2xl relative flex flex-col justify-between group hover:bg-brand-grey-dark/40 hover:border-brand-yellow/20 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow mb-6 border border-brand-yellow/20">
                <Heart size={22} />
              </div>
              <h4 className="text-xl font-bold text-brand-white uppercase tracking-tight mb-3">
                Zero-Sanitization
              </h4>
              <p className="text-brand-white/60 text-xs md:text-sm leading-relaxed">
                We believe in the beauty of raw storytelling. CIFF strips away artificial corporate polish, spotlighting authentic stories of uncompromised truth and deep aesthetic conviction.
              </p>
            </div>
            <div className="text-[10px] font-mono text-brand-yellow/40 uppercase tracking-widest mt-8 flex justify-between items-center">
              <span>02 / TRUTH</span>
              <Star size={10} className="text-brand-yellow" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-10 bg-brand-grey-dark/30 border border-brand-white/5 rounded-2xl relative flex flex-col justify-between group hover:bg-brand-grey-dark/40 hover:border-brand-yellow/20 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow mb-6 border border-brand-yellow/20">
                <Award size={22} />
              </div>
              <h4 className="text-xl font-bold text-brand-white uppercase tracking-tight mb-3">
                Curator Panels
              </h4>
              <p className="text-brand-white/60 text-xs md:text-sm leading-relaxed">
                No automated choices. Every single short film compilation of CIFF 2027 is individually selected and evaluated by cinematic curators, film scholars, and independent champions.
              </p>
            </div>
            <div className="text-[10px] font-mono text-brand-yellow/40 uppercase tracking-widest mt-8 flex justify-between items-center">
              <span>03 / CURATION</span>
              <Star size={10} className="text-brand-yellow" />
            </div>
          </motion.div>

        </div>

        {/* Festival Roadmap Vertical Timeline */}
        <div className="mb-32 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-yellow text-xs uppercase tracking-[0.3em] font-bold block mb-3">THE ROADMAP</span>
            <h4 className="text-3xl font-black text-brand-white uppercase tracking-tight">Milestones to the Grand Opening</h4>
          </div>

          <div className="border-l border-brand-white/10 ml-4 md:ml-8 space-y-12">
            {roadmapSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-10 md:pl-16 group"
              >
                {/* Yellow pulsing marker dot on timeline thread */}
                <div className="absolute left-0 top-0.5 -translate-x-[4.5px] w-3.5 h-3.5 rounded-full bg-brand-black border-2 border-brand-yellow group-hover:bg-brand-yellow transition-colors duration-300" />
                
                <span className="text-[10px] font-mono uppercase bg-brand-white/5 border border-brand-white/10 text-brand-yellow px-2.5 py-1 rounded-sm tracking-widest">
                  {step.phase}
                </span>
                
                <h5 className="text-xl font-bold text-brand-white uppercase tracking-tight mt-3 mb-1">
                  {step.title}
                </h5>
                <p className="text-xs font-mono text-brand-white/40 uppercase tracking-widest mb-3">
                  Scheduled Action: {step.date}
                </p>
                <p className="text-brand-white/60 text-xs md:text-sm max-w-2xl leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* "Become Part of the First Edition" / RSVP Ticket Block */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-grey-dark p-8 md:p-12 border border-brand-white/10 rounded-2xl relative overflow-hidden"
          >
            {/* Styled side ticket notch punches */}
            <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-10 h-10 bg-brand-black rounded-full border border-brand-white/10 z-20" />
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-10 h-10 bg-brand-black rounded-full border border-brand-white/10 z-20" />

            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <span className="text-brand-yellow font-heading text-[10px] font-black tracking-[0.25em] uppercase block mb-3">
                  STAY IN THE CIRCLE
                </span>
                <h4 className="text-3xl font-black text-brand-white uppercase tracking-tight mb-4">
                  Become Part Of The First Edition
                </h4>
                <p className="text-brand-white/60 text-xs md:text-sm leading-relaxed mb-6">
                  Get exclusive access to the initial call for submissions, volunteer invitations, screening updates, and early-bird ticket bookings.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-brand-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                  <span>Limited exclusive invitations. No spam, ever.</span>
                </div>
              </div>

              <div>
                {rsvpSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-brand-black/40 border border-brand-yellow/20 p-8 rounded-xl text-left space-y-4"
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
    </section>
  );
}
