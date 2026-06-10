import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brand } from '../types';
import { BRAND_CONFIG } from '../constants';
import { Send, CheckCircle2, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface ContactProps {
  brand: Brand;
}

import { db, handleFirestoreError, OperationType, serverTimestamp } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Contact({ brand }: ContactProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'General Inquiry',
    message: ''
  });

  const config = BRAND_CONFIG[brand];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      const path = 'inquiries';
      await addDoc(collection(db, path), {
        ...formData,
        brand,
        createdAt: serverTimestamp()
      });
      setFormState('success');
    } catch (error) {
      console.error('Submission error:', error);
      setFormState('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const whatsappLink = `https://wa.me/919460640208?text=${encodeURIComponent(`Hi ${brand === 'candid' ? 'Candid Imagination' : 'Studio Bazm'}, I'm ${formData.name}. I'm interested in: ${formData.type}. Message: ${formData.message}`)}`;
  const emailLink = `mailto:${config.email}?subject=New Inquiry: ${formData.type}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`)}`;

  return (
    <section id="contact" className="py-24 container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-24">
        <div>
          <p className="text-brand-yellow font-bold uppercase tracking-widest text-xs mb-4">Let's Connect</p>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12">
            Get In <span className="text-brand-yellow">Touch</span>
          </h2>

          <div className="space-y-10">
            <a 
              href={`mailto:${config.email}`}
              className="flex gap-6 items-start group hover:translate-x-2 transition-transform"
            >
              <div className="bg-brand-grey-dark p-4 rounded-xl text-brand-yellow border border-brand-white/5 group-hover:bg-brand-yellow group-hover:text-brand-black transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-brand-grey-soft mb-1">Email Us</div>
                <div className="text-xl font-bold group-hover:text-brand-yellow transition-colors">{config.email}</div>
              </div>
            </a>
            <a 
              href="https://wa.me/919460640208"
              className="flex gap-6 items-start group hover:translate-x-2 transition-transform"
            >
              <div className="bg-brand-grey-dark p-4 rounded-xl text-brand-yellow border border-brand-white/5 group-hover:bg-brand-yellow group-hover:text-brand-black transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-brand-grey-soft mb-1">Call / WhatsApp</div>
                <div className="text-xl font-bold group-hover:text-brand-yellow transition-colors">+91 94606 40208</div>
              </div>
            </a>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=4th+Floor,+Sunshine+Building,+Sardarpura,+Jodhpur,+Rajasthan+342001"
              target="_blank"
              rel="noreferrer"
              className="flex gap-6 items-start group hover:translate-x-2 transition-transform"
            >
              <div className="bg-brand-grey-dark p-4 rounded-xl text-brand-yellow border border-brand-white/5 group-hover:bg-brand-yellow group-hover:text-brand-black transition-colors">
                <MapPin size={24} />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-brand-grey-soft mb-1">Location</div>
                <div className="text-sm font-bold leading-relaxed max-w-[250px] group-hover:text-brand-yellow transition-colors">
                  4th Floor, Sunshine Building, Police Station, 315, C Rd, behind Sardarpura, Jodhpur, Rajasthan 342001
                </div>
              </div>
            </a>
          </div>

         </div>
 
          <div className="bg-brand-grey-dark p-8 md:p-12 rounded-3xl border border-brand-white/5 relative overflow-hidden">
          {formState === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-20"
            >
              <div className="text-brand-yellow mb-6">
                <CheckCircle2 size={80} />
              </div>
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Request Submitted!</h3>
              <p className="text-brand-grey-soft max-w-sm mb-8">We've received your inquiry details. We will reach back to you shortly.</p>
              
              <div className="flex flex-col w-full gap-4 max-w-xs">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-brand-yellow text-brand-black font-black uppercase text-xs tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  Chat on WhatsApp
                </a>
                <a 
                  href={emailLink}
                  className="border border-brand-white/10 text-brand-white font-black uppercase text-xs tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-white/5 transition-colors"
                >
                  Send as Email
                </a>
              </div>

              <button
                 onClick={() => setFormState('idle')}
                 className="mt-10 text-brand-yellow/60 font-bold uppercase text-[10px] tracking-widest underline underline-offset-8"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : formState === 'error' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-20"
            >
              <div className="text-red-500 mb-6 col">
                <svg className="w-20 h-20 mx-auto text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter text-brand-yellow">Something went wrong</h3>
              <p className="text-brand-grey-soft max-w-sm mb-8">Please WhatsApp us directly to start your project or book your space!</p>
              
              <div className="flex flex-col w-full gap-4 max-w-xs">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-brand-yellow text-brand-black font-black uppercase text-xs tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  WhatsApp Us Now
                </a>
              </div>

              <button
                 onClick={() => setFormState('idle')}
                 className="mt-10 text-brand-white/50 font-bold uppercase text-[10px] tracking-widest underline underline-offset-8 hover:text-brand-white transition-colors"
              >
                Back to Form
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 font-mono text-xs text-brand-white/80">
              {/* Screenplay Heading Header Metadatas */}
              <div className="border-b border-brand-white/10 pb-6 mb-8 uppercase text-[10px] text-brand-grey-soft flex justify-between">
                <span>INT. WORKSPACE / STUDIO - CONTINUOUS</span>
                <span>TAKE 01 // WORK REQUEST</span>
              </div>

              <div className="text-center font-serif italic text-base text-brand-yellow/80 mb-6 font-light">
                “FADE IN:”
              </div>

              {/* Character Header block */}
              <div className="text-center tracking-widest uppercase font-black text-brand-white mb-2">
                INT. STUDIO BAZM / CANDID OFFICE
              </div>
              <p className="text-brand-grey-soft/80 italic text-center text-[11px] mb-8 leading-relaxed">
                Connect with our team based in Jodhpur, Rajasthan. Enter your details below.
              </p>

              {/* Scene 1: The Character Name */}
              <div className="bg-brand-black/40 border border-brand-white/5 p-6 rounded-lg relative">
                <div className="absolute top-2 right-4 text-[9px] text-brand-yellow/40 uppercase">Identification</div>
                <div className="mx-auto text-center max-w-sm">
                  <span className="block text-brand-yellow uppercase font-black tracking-widest text-center mb-4">YOUR NAME</span>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-brand-black/80 border-b border-brand-white/20 focus:border-brand-yellow text-center px-4 py-2 text-sm focus:outline-none transition-colors uppercase font-medium placeholder-brand-white/10"
                    placeholder="ENTER YOUR FULL NAME"
                  />
                </div>
              </div>

              {/* Scene 2: The Direct Destination coordinates */}
              <div className="bg-brand-black/40 border border-brand-white/5 p-6 rounded-lg relative">
                <div className="absolute top-2 right-4 text-[9px] text-brand-yellow/40 uppercase">Connection</div>
                <div className="grid md:grid-cols-2 gap-6 mt-2">
                  <div className="text-center">
                    <span className="block text-brand-yellow uppercase font-black tracking-widest mb-3">PHONE (MOBILE)</span>
                    <input
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-brand-black/80 border-b border-brand-white/20 focus:border-brand-yellow text-center px-4 py-2 focus:outline-none transition-colors font-medium placeholder-brand-white/10"
                      placeholder="+91..."
                    />
                  </div>
                  <div className="text-center">
                    <span className="block text-brand-yellow uppercase font-black tracking-widest mb-3">EMAIL ADDRESS</span>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-brand-black/80 border-b border-brand-white/20 focus:border-brand-yellow text-center px-4 py-2 focus:outline-none transition-colors font-medium placeholder-brand-white/10"
                      placeholder="NAME@EXAMPLE.COM"
                    />
                  </div>
                </div>
              </div>

              {/* Scene 3: The Project Genre Action */}
              <div className="bg-brand-black/40 border border-brand-white/5 p-6 rounded-lg relative">
                <div className="absolute top-2 right-4 text-[9px] text-brand-yellow/40 uppercase">MEDIUM</div>
                <div className="text-center mt-2">
                  <span className="block text-brand-yellow uppercase font-black tracking-widest mb-3">CHOSEN GENRE</span>
                  <select
                     name="type"
                     value={formData.type}
                     onChange={handleChange}
                     className="bg-brand-black border border-brand-white/20 text-brand-white focus:border-brand-yellow text-center px-6 py-3 focus:outline-none transition-colors rounded-sm uppercase tracking-wider font-bold text-[11px]"
                  >
                    <option>General Inquiry</option>
                    {brand === 'bazm' ? (
                      <>
                        <option>Space Booking</option>
                        <option>Workshop Booking</option>
                        <option>Theatre Training</option>
                      </>
                    ) : (
                      <>
                        <option>Film Production</option>
                        <option>Ad Scripting</option>
                        <option>Music Video</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Scene 4: The Narrative Blueprint Text */}
              <div className="bg-brand-black/40 border border-brand-white/5 p-6 rounded-lg relative">
                <div className="absolute top-2 right-4 text-[9px] text-brand-yellow/40 uppercase">PROJECT BRIEF</div>
                <div className="mt-2 text-center">
                  <span className="block text-brand-yellow uppercase font-black tracking-widest mb-3">THE CORE CONFLICT / IDEA</span>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-brand-black/80 border border-brand-white/20 focus:border-brand-yellow rounded-lg px-6 py-4 focus:outline-none transition-colors resize-none text-left placeholder-brand-white/10"
                    placeholder="We want to create a story about..."
                  />
                </div>
              </div>

              {/* Screenplay Submission Trigger */}
              <div className="text-center italic text-sm text-brand-yellow/80 mt-6 mb-8">
                “FADE OUT.”
              </div>

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full bg-brand-yellow text-brand-black font-heading font-black uppercase text-[11px] tracking-[0.4em] py-5 rounded-sm hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
              >
                {formState === 'submitting' ? 'SENDING...' : (
                  <>SEND INQUIRY <Send size={14} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
