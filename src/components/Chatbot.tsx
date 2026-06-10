import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { CHAT_KNOWLEDGE } from '../constants';
import { Brand } from '../types';

interface ChatbotProps {
  brand: Brand;
}

export default function Chatbot({ brand }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hello! I'm Bazzi, your Creative Assistant. How can I help you with " + (brand === 'candid' ? "Candid Imagination's films" : "Studio Bazm's theatre") + " today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getOfflineResponse = (query: string, currentBrand: Brand): string => {
    const q = query.toLowerCase().trim();
    
    // Greeting Checks
    if (q === 'hi' || q === 'hello' || q === 'hey' || q.includes('greetings') || q.includes('hola') || q.includes('bazzi') || q.includes('bazz')) {
      return `Hello there! I'm Bazzi, your creative workspace companion. I'm operating right here with you in offline mode! Ask me anything about our classes, theatre workshops, movie pricing, or location coordinates.`;
    }
    
    // Pricing checks
    if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('fee') || q.includes('charge') || q.includes('how much') || q.includes('rupee') || q.includes('money') || q.includes('pay') || q.includes('rates') || q.includes('fees')) {
      if (currentBrand === 'candid') {
        return CHAT_KNOWLEDGE.candid.pricing + " For a custom project plan, just drop us an email.";
      } else {
        return CHAT_KNOWLEDGE.bazm.pricing + " Our courses are crafted to be deeply intensive and accessible. Would you like to hear about the schedules?";
      }
    }

    // Workshop and class checks
    if (q.includes('workshop') || q.includes('class') || q.includes('classes') || q.includes('course') || q.includes('drama') || q.includes('learn') || q.includes('training') || q.includes('acting') || q.includes('theatre') || q.includes('theater')) {
      return `🎭 Studio Bazm Courses:\n• ${CHAT_KNOWLEDGE.bazm.workshops}\n• Schedule: ${CHAT_KNOWLEDGE.bazm.schedule}\n• Eligibility: ${CHAT_KNOWLEDGE.bazm.eligibility}`;
    }

    // Location / Area checks
    if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('find') || q.includes('map') || q.includes('office') || q.includes('situated') || q.includes('jodhpur')) {
      return `📍 Address: ${CHAT_KNOWLEDGE.global.location}. Drop by the studio for a hot cup of tea and a live conversation!`;
    }

    // Contact/phone/email checks
    if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('number') || q.includes('call') || q.includes('reach') || q.includes('whatsapp') || q.includes('gmail') || q.includes('write')) {
      return `📞 Contact Coordinates:\n• ${CHAT_KNOWLEDGE.global.contact}`;
    }

    // Process/workflow checks
    if (q.includes('process') || q.includes('step') || q.includes('shoot') || q.includes('film') || q.includes('production') || q.includes('workflow')) {
      if (currentBrand === 'candid') {
        return `🎬 Cinematic Production Phases:\n${CHAT_KNOWLEDGE.candid.process}`;
      } else {
        return `🎭 Dramatic Process: We focus on emotional, body, and vocal performance, moving street play to classical proscenium stages.`;
      }
    }

    // Founder/Manoj checks
    if (q.includes('founder') || q.includes('owner') || q.includes('who is') || q.includes('manoj') || q.includes('panwar')) {
      return `${CHAT_KNOWLEDGE.global.founder} Manoj Panwar oversees the creative trajectory of both Studio Bazm & Candid Imagination Production.`;
    }

    // services / specialize check
    if (q.includes('services') || q.includes('specialise') || q.includes('specialize') || q.includes('do you do') || q.includes('offer')) {
      if (currentBrand === 'candid') {
        return `🎬 Candid Services: ${CHAT_KNOWLEDGE.candid.services}`;
      } else {
        return `🎭 Bazm Actions: Street Play Activism, Acting Workshops, Stand-up Comedy showcases, and Full Theatre Productions.`;
      }
    }

    // team/mentors checks
    if (q.includes('team') || q.includes('crew') || q.includes('member') || q.includes('faculty') || q.includes('mentor') || q.includes('teacher') || q.includes('who are')) {
      if (currentBrand === 'candid') {
        return `${CHAT_KNOWLEDGE.candid.team} Feel free to scroll up and view them in our visual Team dashboard!`;
      } else {
        return `Our faculty includes seasoned acting mentors, RSNK academy winners, and theatre scholars. You can review all Mentors & Guest teachers in the Team section higher up!`;
      }
    }

    // default matching
    return `That's wonderful! Since I am running in fully offline mode to guarantee instant answers, I focus on help matching studio resources. You can query me on:
• 🎭 Acting workshops, batches, or drama schedules
• 🎬 Cine production process, pricing, and services
• 📍 Exact location maps and contact coordinates
• 👥 Mentors, team members, or founders`;
  };

  const handleSend = (textOverride?: string) => {
    const userText = textOverride || input;
    if (!userText.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    if (!textOverride) setInput('');
    setIsLoading(true);

    // Simulate natural thinking/typing
    setTimeout(() => {
      const responseText = getOfflineResponse(userText, brand);
      setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
      setIsLoading(false);
    }, 600);
  };

  const handleSuggestionClick = (query: string) => {
    handleSend(query);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 md:w-96 overflow-hidden rounded-2xl bg-brand-grey-dark border border-brand-white/10 shadow-2xl"
          >
            <div className="bg-brand-yellow p-6 text-brand-black flex justify-between items-center">
              <div>
                <span className="font-black uppercase tracking-widest text-xs">Bazzi</span>
                <div className="text-[10px] opacity-70">Interactive Offline Companion</div>
              </div>
              <button id="close-chat" onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform"><X size={20} /></button>
            </div>
            
            <div ref={scrollRef} className="h-96 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-line ${
                    m.role === 'user' 
                      ? 'bg-brand-yellow text-brand-black font-medium rounded-tr-none' 
                      : 'bg-brand-black text-brand-white/80 border border-brand-white/5 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  <button
                    onClick={() => handleSuggestionClick("Pricing of workshops and films")}
                    className="text-[10px] bg-brand-white/5 hover:bg-brand-yellow/15 hover:text-brand-yellow text-brand-white/60 px-2.5 py-1.5 rounded-full border border-brand-white/10 transition-colors"
                  >
                    💰 Price rates
                  </button>
                  <button
                    onClick={() => handleSuggestionClick("Where is the studio located?")}
                    className="text-[10px] bg-brand-white/5 hover:bg-brand-yellow/15 hover:text-brand-yellow text-brand-white/60 px-2.5 py-1.5 rounded-full border border-brand-white/10 transition-colors"
                  >
                    📍 Studio Location
                  </button>
                  <button
                    onClick={() => handleSuggestionClick(brand === 'candid' ? "What film services do you offer?" : "Tell me about classes and acting batch schedule")}
                    className="text-[10px] bg-brand-white/5 hover:bg-brand-yellow/15 hover:text-brand-yellow text-brand-white/60 px-2.5 py-1.5 rounded-full border border-brand-white/10 transition-colors"
                  >
                    {brand === 'candid' ? "🎬 Cinema Services" : "🎭 Theatre Classes"}
                  </button>
                  <button
                    onClick={() => handleSuggestionClick("Who founded the studio?")}
                    className="text-[10px] bg-brand-white/5 hover:bg-brand-yellow/15 hover:text-brand-yellow text-brand-white/60 px-2.5 py-1.5 rounded-full border border-brand-white/10 transition-colors"
                  >
                    👥 Founder Profile
                  </button>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-brand-black text-brand-white/40 p-4 rounded-2xl rounded-tl-none border border-brand-white/5">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-brand-white/10 bg-brand-black/20 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-brand-black border border-brand-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-yellow transition-colors placeholder:text-brand-white/20"
              />
              <button 
                id="send-message"
                disabled={isLoading}
                onClick={() => handleSend()} 
                className="bg-brand-yellow text-brand-black px-4 rounded-xl disabled:opacity-50 hover:scale-105 transition-transform"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        id="toggle-chat"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-yellow text-brand-black p-4 rounded-full shadow-2xl relative group"
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
        {!isOpen && (
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-4 border-brand-black animate-pulse"></span>
        )}
      </motion.button>
    </div>
  );
}
