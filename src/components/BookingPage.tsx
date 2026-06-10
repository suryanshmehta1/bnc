import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Send, Calendar, Clock, Users, Info } from 'lucide-react';
import { SpaceBookingData } from '../types';

import { db, handleFirestoreError, OperationType, serverTimestamp } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function BookingPage() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<SpaceBookingData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    duration: '',
    purpose: '',
    attendees: '',
    requirements: []
  });

  const requirementsList = [
    'Stage Lighting',
    'Sound System',
    'Projector',
    'Green Room',
    'Seating Arrangement',
    'Technical Support',
    'Refreshments'
  ];

  const handleCheckboxChange = (req: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.includes(req)
        ? prev.requirements.filter(r => r !== req)
        : [...prev.requirements, req]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      // 1. Store in Firestore
      const path = 'bookings';
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp()
      });

      // 2. Trigger silent notification via backend
      await fetch('/api/book-space', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setFormState('success');
    } catch (error) {
      console.error('Error submitting booking:', error);
      setFormState('error'); 
    }
  };

  if (formState === 'success') {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="text-brand-black" size={48} />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Request Submitted</h2>
          <p className="text-brand-white/60 leading-relaxed mb-10">
            Your space booking inquiry for Studio Bazm has been received. Our team will verify the availability and get back to you shortly via phone or email.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="text-brand-yellow font-black uppercase text-xs tracking-widest hover:translate-y-[-2px] transition-transform flex items-center gap-2 mx-auto cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Studio
          </button>
        </motion.div>
      </div>
    );
  }

  if (formState === 'error') {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-brand-yellow text-brand-black rounded-full flex items-center justify-center mx-auto mb-8">
            <Info size={48} />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-brand-yellow">Something went wrong</h2>
          <p className="text-brand-white/60 leading-relaxed mb-10">
            We are unable to submit your space booking inquiry online. Please WhatsApp your request directly to +91 94606 40208 or try again.
          </p>
          <div className="flex flex-col gap-4">
            <a 
              href={`https://wa.me/919460640208?text=${encodeURIComponent(`Hi, I want to book the studio space on ${formData.date} for ${formData.duration}. Name: ${formData.name}`)}`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="bg-brand-yellow text-brand-black px-8 py-3.5 font-bold uppercase rounded-full text-xs tracking-widest hover:scale-[1.02] transition-transform"
            >
              WhatsApp Us Now
            </a>
            <button 
              onClick={() => setFormState('idle')}
              className="text-brand-white/50 font-black uppercase text-xs tracking-widest hover:text-brand-white transition-colors cursor-pointer"
            >
              Back to form
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-brand-white p-6 pt-24 md:p-12 lg:p-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-yellow/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-brand-white/50 hover:text-brand-yellow transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] uppercase font-black tracking-widest">Back</span>
      </button>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="text-brand-yellow font-bold uppercase tracking-widest text-xs mb-4">Studio Bazm</p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            Space <span className="text-brand-yellow">Booking</span>
          </h1>
          <p className="text-brand-white/60 max-w-xl">
            Fill out the details below to request a booking at Studio Bazm. We provide a versatile space for rehearsals, workshops, and intimate performances.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 1: Contact info */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-brand-grey-soft ml-2">Name</label>
              <input 
                required
                type="text"
                placeholder="Full Name"
                className="w-full bg-brand-grey-dark/50 border border-brand-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-yellow transition-colors"
                value={formData.name}
                onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-brand-grey-soft ml-2">Phone</label>
              <input 
                required
                type="tel"
                placeholder="+91 00000 00000"
                className="w-full bg-brand-grey-dark/50 border border-brand-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-yellow transition-colors"
                value={formData.phone}
                onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-brand-grey-soft ml-2">Email</label>
            <input 
              required
              type="email"
              placeholder="email@example.com"
              className="w-full bg-brand-grey-dark/50 border border-brand-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-yellow transition-colors"
              value={formData.email}
              onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
            />
          </div>

          {/* Section 2: Event Details */}
          <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-brand-white/5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-brand-grey-soft ml-2 flex items-center gap-2">
                <Calendar size={12} /> Date
              </label>
              <input 
                required
                type="date"
                className="w-full bg-brand-grey-dark/50 border border-brand-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-yellow transition-colors"
                value={formData.date}
                onChange={e => setFormData(f => ({ ...f, date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-brand-grey-soft ml-2 flex items-center gap-2">
                <Clock size={12} /> Duration
              </label>
              <select 
                required
                className="w-full bg-brand-grey-dark/50 border border-brand-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-yellow transition-colors"
                value={formData.duration}
                onChange={e => setFormData(f => ({ ...f, duration: e.target.value }))}
              >
                <option value="">Select Duration</option>
                <option value="2-hours">2 Hours</option>
                <option value="4-hours">4 Hours</option>
                <option value="half-day">Half Day (6 hours)</option>
                <option value="full-day">Full Day (12 hours)</option>
                <option value="multi-day">Multiple Days</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-brand-grey-soft ml-2 flex items-center gap-2">
                <Users size={12} /> Attendees
              </label>
              <input 
                required
                type="number"
                placeholder="No. of people"
                className="w-full bg-brand-grey-dark/50 border border-brand-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-yellow transition-colors"
                value={formData.attendees}
                onChange={e => setFormData(f => ({ ...f, attendees: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-brand-grey-soft ml-2">Purpose of Booking</label>
            <textarea 
              required
              rows={3}
              placeholder="e.g. Rehearsal for upcoming play, Video shoot, Workshop..."
              className="w-full bg-brand-grey-dark/50 border border-brand-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-brand-yellow transition-colors resize-none"
              value={formData.purpose}
              onChange={e => setFormData(f => ({ ...f, purpose: e.target.value }))}
            />
          </div>

          {/* Section 3: Requirements */}
          <div className="pt-8 border-t border-brand-white/5">
            <label className="text-[10px] uppercase font-black tracking-widest text-brand-grey-soft ml-2 mb-6 block">Additional Requirements</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {requirementsList.map(req => (
                <button
                  key={req}
                  type="button"
                  onClick={() => handleCheckboxChange(req)}
                  className={`px-4 py-3 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${
                    formData.requirements.includes(req)
                      ? 'bg-brand-yellow border-brand-yellow text-brand-black'
                      : 'bg-transparent border-brand-white/10 text-brand-white/60 hover:border-brand-yellow/50'
                  }`}
                >
                  {req}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-12 text-center">
            <button
              disabled={formState === 'submitting'}
              type="submit"
              className="bg-brand-yellow text-brand-black px-16 py-6 font-artistic font-black uppercase text-xl tracking-tight rounded-full hover:scale-105 transition-all flex items-center gap-4 mx-auto disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {formState === 'submitting' ? (
                <>Processing...</>
              ) : (
                <>Submit Request <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
              )}
            </button>
            <p className="mt-6 text-brand-white/30 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2">
              <Info size={12} /> Space availability is subject to confirmation
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
