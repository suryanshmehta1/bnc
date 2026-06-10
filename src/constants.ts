import { Brand, Service, PortfolioItem } from './types';
import { Film, Video, Tv, Music, Theater, Mic, Users, BookOpen, Star } from 'lucide-react';

export const CANDID_SERVICES: Service[] = [
  {
    id: 'film-1',
    title: 'Film Production',
    description: 'Full-scale feature film production from script to screen.',
    image: '/film production.jpeg',
  },
  {
    id: 'film-2',
    title: 'Short Films',
    description: 'Compact storytelling with high cinematic impact.',
    image: '/short film.png',
  },
  {
    id: 'film-3',
    title: 'Ad Shoots',
    description: 'High-end commercial production for leading brands.',
    image: '/ad video.png',
  },
  {
    id: 'film-4',
    title: 'Music Videos',
    description: 'Visualizing rhythm through stylized cinematography.',
    image: '/music video.png',
  },
];

export const BAZM_SERVICES: Service[] = [
  {
    id: 'theater-2',
    title: 'Acting Classes',
    description: 'Comprehensive vocal, emotional, and physical training designed to prepare modern actors for stage and camera.',
    image: '/acting_classes.heic',
  },
  {
    id: 'theater-1',
    title: 'Street Plays',
    description: 'Socially conscious, interactive physical performances designed for public environments and civic dialogue.',
    image: '/street_play.jpg',
  },
  {
    id: 'theater-3',
    title: 'Drama Workshops',
    description: 'Intensive weekend and short-term courses centering on character discovery, scene-building, and stage performance.',
    image: '/drama_workshop.jpg',
  },
  {
    id: 'theater-4',
    title: 'Performing Art',
    description: 'Merging physical theatre, folk regional traditions, and classical storytelling structures for high artistic expression.',
    image: '/performing_art.png',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p_bullah',
    title: 'Bullah',
    category: 'Sufi Theater Play',
    image: '/bullah.jpeg',
    brand: 'bazm',
    moodStatement: '"Bullah ki jaana main Kaun?" An intense theatrical exploration of peace, unity, and Sufi mysticism.',
    year: '2025',
    credits: {
      'Stage Director': 'Manoj Panwar',
      'Writer': 'Shahid Nadeem',
      'Choreography': 'Ritu Singh Chauhan',
      'Live Vocals': 'Bazm Sufi Ensemble',
      'Location': 'Studio Bazm Main Stage'
    },
    btsText: 'Rehearsed meticulously in Jodhpur over 45 days. We integrated real Sufi dervish whirls, utilizing a raw acoustic atmosphere with live dholak and flute accompaniments.',
    btsImage: '/bullah.jpeg',
    storytellingProcess: 'Blending mystical Punjabi poetry and local Marwari theatrical traditions to offer a highly resonant stage play.',
    audioTrackName: 'Bullah Ki Jaana (Mystic Vocal)',
    audioTrackArtist: 'Bazm Sufi Ensemble',
    finalOutcome: 'Staged across 8 major theatres in Jodhpur and Jaipur to standing ovations, establishing a powerful connection with cultural history.'
  },
  {
    id: 'p_manthan',
    title: 'Man Manthan',
    category: 'Contemporary Drama',
    image: '/man manthan.jpeg',
    brand: 'bazm',
    moodStatement: 'An emotional introspection of the inner self, mapping our unvoiced anxieties and struggles through physical performance.',
    year: '2026',
    credits: {
      'Director': 'Manoj Panwar',
      'Lead Writer': 'Nemmyy',
      'Lead Actor': 'Haider Ali',
      'Choreographer': 'Harsh',
      'Location': 'Studio Bazm Black-Box'
    },
    btsText: 'Formulated in a closed black-box studio around intensive movement exercises. We limited props entirely, relying on shadows and stark yellow spotlight beams.',
    btsImage: '/man manthan.jpeg',
    storytellingProcess: 'The actors utilize non-verbal cues and visceral gestures, letting silent gaps and breathing patterns define the dramatic progression of each psychological act.',
    audioTrackName: 'Whispers of the Soul',
    audioTrackArtist: 'Studio Bazm Experimental Music',
    finalOutcome: 'Deeply moved audience members during its limited Jodhpur black-box run, initiating a widespread discussion on mental resilience.'
  },
  {
    id: 'p_ttb',
    title: 'The Third Bell',
    category: 'Experimental Theatre',
    image: '/ttb.png',
    brand: 'bazm',
    moodStatement: 'When the final bell tolls, the actor is no more; only the character remains, exposed and raw.',
    year: '2026',
    credits: {
      'Showrunner': 'Manoj Panwar',
      'Concept Designer': 'Shourab Devra',
      'Dramaturge': 'Ajay Karan Joshi',
      'Sound Curation': 'Ritu Chauhan',
      'Location': 'Jodhpur Performing Arts Center'
    },
    btsText: 'Explores the intense, high-pressured minutes inside a backstage green room just before curtains rise. We captured real ambient chatter and translated it into theatrical cues.',
    btsImage: '/ttb.png',
    storytellingProcess: 'Features a layered structure where backstage and front-stage worlds collide, blurring the line between the reality of the actor and the illusion of the role.',
    audioTrackName: 'The Green Room Symphony',
    audioTrackArtist: 'Studio Bazm Sound Archives',
    finalOutcome: 'Awarded top honors at regional art festivals for its daring structural experimentation and immersive, meta-theatrical experience.'
  },
  {
    id: 'p7',
    title: "8 o'clock",
    category: 'Short Film',
    image: '/8o\'clock.jpeg',
    brand: 'candid',
    moodStatement: 'Time is a silent witness to the choices we make when the sun goes down.',
    year: '2025',
    credits: {
      'Director': 'Manoj Panwar',
      'Writer': 'Ayush Saxena',
      'Cinematography': 'Chandan Sharma',
      'Editor': 'Deepak Sen',
      'Original Score': 'Ritu Chauhan',
      'Location': 'Sardarpura, Jodhpur'
    },
    btsText: 'Shot over three consecutive nights under the local sodium streetlights of Jodhpur. The deep high-contrast shadows became the central visual motif representing characters under pressure.',
    btsImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80',
    storytellingProcess: 'Developed around the theme of urgency. We custom-recorded natural ticking metallic patterns, mixing them with low-frequency synth textures and outdoor night ambiance.',
    audioTrackName: 'Ticking Clocks (Official Theme)',
    audioTrackArtist: 'Ritu Chauhan',
    finalOutcome: 'Celebrated for its moody atmosphere, receiving critical acclaim at regional cinematic showcases.'
  },
  {
    id: 'p8',
    title: 'Kheer',
    category: 'Narrative Poetry',
    image: '/kheer.jpeg',
    brand: 'candid',
    moodStatement: "Some recipes aren't just for food; they are methods of holding on to those who are gone.",
    year: '2026',
    credits: {
      'Director': 'Vaibhavi Joshi',
      'Writer': 'Ajay Karan Joshi',
      'Producer': 'Ritu Chauhan',
      'Cinematography': 'Chandan Sharma',
      'Sound Design': 'Folk Ensemble'
    },
    btsText: 'Filmed in a 150-year-old traditional desert Haveli in Rajasthan, relying exclusively on daylight bouncing off historic yellow sandstone walls to keep the illumination honest and raw.',
    btsImage: 'https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?auto=format&fit=crop&q=80',
    storytellingProcess: 'A slow-paced, emotional montage focusing on micro-gestures—boiling milk, cardamoms cracking, old dusty window reflections—matching the soulful resonance of live folk sarangi notes.',
    audioTrackName: 'Sweet Sands (Folk Sarangi Theme)',
    audioTrackArtist: 'Bazm Folk Ensemble',
    finalOutcome: 'Selected for theatrical compilation and evaluated as a standout poetic Rajasthani piece.'
  },
  {
    id: 'p9',
    title: 'Photophile',
    category: 'Experimental Short',
    image: '/photophile.jpeg',
    brand: 'candid',
    moodStatement: 'The lens does not capture light; it captures the desperate attempt of a human soul to stay visible.',
    year: '2025',
    credits: {
      'Director': 'Chandan Sharma',
      'Cinematography': 'Chandan Sharma',
      'Grip/Gaffer': 'Harsh Bhati',
      'Sound Design': 'Rahul Verma',
      'Location': 'Blue City Rooftops'
    },
    btsText: 'Shot on location using old manual cameras and prime lenses. The tactile shutter noises and film grain artifacts are fully real, integrated into the visual layout of the scenes.',
    btsImage: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&q=80',
    storytellingProcess: 'A rhythmic portrait of an obsessive street photographer. Shutter-click sound cues triggers each frame-cut directly, creating an engaging sensory rhythm of snapshots.',
    audioTrackName: 'Shutter Clicks & White Noise',
    audioTrackArtist: 'Rahul Verma',
    finalOutcome: 'Celebrated as an avant-garde exploration of visual presence, receiving enthusiastic praise for its tactile editing.'
  }
];

export const BRAND_CONFIG = {
  candid: {
    name: 'Candid Imagination',
    heroTitle: 'We Capture Stories, Not Just Frames',
    heroSub: 'Film Production House',
    aboutTitle: 'Cinematic Storytelling at its Peak',
    aboutText: 'Candid Imagination is a premium film production house dedicated to the art of visual storytelling. We believe every frame should breathe life and every story should leave an indelible mark.',
    color: '#FFC300',
    cta: 'Explore Work',
    contactTitle: 'Start a Project',
    email: 'candidimaginationproduction@gmail.com'
  },
  bazm: {
    name: 'Studio Bazm',
    heroTitle: 'Where Stories Come Alive On Stage',
    heroSub: 'Performing Arts Theatre Studio',
    aboutTitle: 'The Theatre of Human Expression',
    aboutText: 'Studio Bazm is an energetic space for actors, storytellers, and dreamers. We bring the magic of the stage to life through expressive training, powerful performances, and artistic freedom.',
    color: '#FFC300',
    cta: 'Book the Space',
    contactTitle: 'Book the Space',
    email: 'studiobazm@gmail.com'
  }
};

export const CHAT_KNOWLEDGE = {
  candid: {
    pricing: "Candid Imagination offers premium cinematic services. Ad shoots typically start from ₹50,000, while music videos and short films are quoted based on script complexity.",
    process: "Our process involves: 1. Scripting, 2. Pre-production, 3. The Shoot, and 4. Post-production (editing/grading).",
    services: "We specialize in Feature Films, Short Films, Ad Shoots, and Music Videos.",
    team: "Our crew consists of experienced cinematographers, editors, and production designers."
  },
  bazm: {
    pricing: "Studio Bazm monthly theatre training starts at ₹2,500. Weekend intensive masterclasses range from ₹1,000 to ₹3,000.",
    workshops: "Current batches: Acting Foundations, Street Play Performance, Stand-up Comedy, and Storytelling.",
    schedule: "Workshops run on weekends (Sat-Sun) and evening batches (5 PM - 7 PM) on weekdays.",
    eligibility: "Everyone aged 15+ is welcome! No prior acting experience is required."
  },
  global: {
    location: "4th Floor, Sunshine Building, Police Station, 315, C Rd, behind Sardarpura, Sardarpura, Jodhpur, Rajasthan 342001",
    contact: "Reach Candid at candidimaginationproduction@gmail.com and Bazm at studiobazm@gmail.com. You can also call +91 94606 40208.",
    founder: "The studios are founded by creative visionaries focused on cinematic and theatrical excellence."
  }
};

export const CHAT_RESPONSES: Record<string, string> = {
  'pricing': 'Our pricing varies based on the project scope. For Candid projects, we provide custom quotes. For Bazm workshops, prices start at ₹2500 per month.',
  'location': 'We are located at 4th Floor, Sunshine Building, Police Station, 315, C Rd, behind Sardarpura, Jodhpur, Rajasthan.',
  'workshop': 'Bazm offers Drama, Storytelling, and Stand-up workshops. Check our services section for more details!',
  'contact': 'For Candid: candidimaginationproduction@gmail.com. For Studio Bazm: studiobazm@gmail.com. Phone: +91 94606 40208.',
  'default': 'Hello! How can I help you today? You can ask about pricing, workshops, location, or contact info.'
};

export const LEGAL_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    content: `At Candid Imagination and Studio Bazm, we value your privacy. We collect minimal personal data including your name, email, and phone number solely for the purpose of responding to your inquiries and service requests. We do not sell your information to third parties. Your data is stored securely and used only for internal business communications.`
  },
  terms: {
    title: "Terms of Service",
    content: `By using our website, you agree to these terms. Content on this site, including cinematic works and theatrical materials, are the intellectual property of Candid Imagination and Studio Bazm. Workshop bookings are subject to availability and specific studio policies provided upon registration. We reserve the right to modify services and pricing with prior notice.`
  },
  cookies: {
    title: "Cookie Policy",
    content: `We use essential cookies to ensure the smooth functioning of this website. These cookies help us remember your brand preference (Candid vs. Bazm) and improve your browsing experience. By continuing to use our site, you consent to our use of these non-intrusive technical cookies.`
  }
};

import { TeamMember, Associate, Testimonial } from './types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-prerana',
    name: "Prerana Rathi",
    role: "Actor & Choreographer",
    content: "Working with Candid Imagination as an actor and choreographer has been a deeply enriching experience. Rooted in culture and authenticity, their productions honour the true essence of storytelling while genuinely valuing artists and their craft.\n\nThis artistic vision finds its soul in Studio Bazm — a sacred space where art, theatre, and artists evolve together. More than a studio, Bazm is a journey of self-discovery for every performer seeking a deeper connection with their art.",
    avatar: "/prerana_rathi.jpeg",
    brand: 'candid'
  },
  {
    id: 't-kartik',
    name: "Kartik Bhojwani",
    role: "Artist",
    content: "A truly inspiring space for anyone who loves art and creativity. The music, theatre, and workshops create a positive environment where people can learn, explore, and express themselves freely.",
    avatar: "/kartik_bhojwani.jpeg",
    brand: 'candid'
  },
  {
    id: 't-nemmyy',
    name: "Nemmy Chand Jangid",
    role: "Theatre Artist",
    content: "As a theatre artist, I have always believed that creative spaces are built not merely with buildings and resources, but with passion, sensitivity, and people deeply devoted to the arts. Studio Bazm and Candid Imagination Production have played a significant role in enriching Jodhpur’s creative and cultural landscape. Through theatre, films, workshops, and various artistic initiatives, they have provided numerous emerging artists with opportunities to learn, grow, and establish their own identity. What particularly stands out is the dedication, creative vision, and unwavering support that Manoj Panwar extends to fellow artists. The meaningful stories produced by Candid Imagination Production and the warm, inspiring atmosphere of Studio Bazm make it more than just an institution, it feels like a family for artists. If you possess a genuine passion for art and storytelling, becoming a part of Studio Bazm can truly be a memorable and enriching experience.",
    avatar: "/nemmy .jpeg",
    brand: 'candid'
  },
  {
    id: 't-harsh',
    name: "Harsh",
    role: "Creative Artist",
    content: "Bazm Studio stands as a remarkable creative platform that truly values art, storytelling, and artistic excellence. Its commitment to nurturing talent and creating meaningful work has made a positive impact on many artists and creators. Special appreciation to Manoj Sir for his vision, leadership, and unwavering support for the creative community. I highly recommend Bazm Studio to anyone seeking an inspiring and professional environment for artistic growth and collaboration.",
    avatar: "/harsh.jpeg",
    brand: 'candid'
  },
  {
    id: 't-shourab',
    name: "Shourab Devra",
    role: "Theatre & Film Maker",
    content: "The collaboration between Studio Bazm and Candid Imagination has breathed new life into Jodhpur’s performing arts community. Through their short film initiatives, theater productions, and beautifully curated workshops, they are successfully reviving an interest in stage art among the youth. Their rehearsal and performance space at Bazm Studio serves as a vibrant hub where creativity is free to experiment, grow, and shine. They are truly championing the cause of meaningful, awareness-driven theater.",
    avatar: "/shourab devra.jpeg",
    brand: 'candid'
  },
  {
    id: 't-haider',
    name: "Haider Ali",
    role: "Performing Artist",
    content: "Bazm Studio and Candid Imagination Production have played a significant role in nurturing and promoting artistic talent in Jodhpur. Through workshops, theatre, films, and creative events, they have created opportunities for emerging artists to learn, perform, and grow. Their commitment to meaningful storytelling and artistic excellence has made a lasting impact on both the local creative community and audiences beyond. Special appreciation to Manoj, whose mentorship, support, and dedication have helped countless artists find their voice. I highly recommend every passionate artist to experience the creative journey that Bazm Studio offers.",
    avatar: "/haider ali .jpeg",
    brand: 'candid'
  },
  {
    id: 't-b1',
    name: "Vishal Bohra",
    role: "Theatre Artist",
    content: "The only place where The studio's versatility allows it to transform into various settings, from a grand stage to an intimate rehearsal room. Inside a theatre studio, you'll find a world of possibilities... very beautiful memories with my people.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80",
    brand: 'bazm'
  },
  {
    id: 't-b2',
    name: "Aayushi Vyas",
    role: "Workshop Participant",
    content: "These 15 days felt like a beautiful journey… We didn’t just learn skills — we discovered emotions, found comfort in strangers, and built bonds that now feel like family. Thank you Bazm studio for this beautiful workshop ✨❤️",
    avatar: "/Aayushi%20vyas.png",
    brand: 'bazm'
  },
  {
    id: 't-b3',
    name: "Jatin Vaid",
    role: "Performing Artist",
    content: "A place filled with positivity and warm energy for performing artist , a space in Jodhpur for artists to perform their art like, theater acts , storytelling ,singing ,jamming, and every type of performing arts. I would suggest every artist to perform in this beautiful and positive space.",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80",
    brand: 'bazm'
  },
  {
    id: 't-b4',
    name: "Aastha Kaushik",
    role: "Acting Student",
    content: "It’s been 15 days since I started my acting journey with Bazm Studio — and honestly, it feels like home now. A whole new family here, every moment has been full of growth, laughter, and learning. So grateful for the amazing people and the most inspiring teacher - Ajay karan joshi sir 🙏♥️",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    brand: 'bazm'
  },
  {
    id: 't-b5',
    name: "Ritik Gehlot",
    role: "Art Enthusiast",
    content: "A great platform for art enthusiasts who aspire to dream big. Manoj panwar the founder of Bazm is the most easy work with and an expectional talent..is least to say",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    brand: 'bazm'
  },
  {
    id: 't-b6',
    name: "Dravit Singh",
    role: "Studio Member",
    content: "I just can’t express my feeling my emotions , the love , support, careness everyone has given was just a wow moment for me enjoyed a lot",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80",
    brand: 'bazm'
  },
  {
    id: 't-b7',
    name: "Aakash Aswani",
    role: "Creator",
    content: "Professional setup, creative vibe, and smooth experience — perfect for any shoot!",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80",
    brand: 'bazm'
  },
  {
    id: 't-b8',
    name: "Anmol Vyas",
    role: "Visitor",
    content: "Very nice place & good atmosphere 🤩🤩",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80",
    brand: 'bazm'
  },
  {
    id: 't-b9',
    name: "Ishaan Chhangani",
    role: "Workshop Student",
    content: "Awesome experience, learned a lot. A family bond was formed. ❤️🫶🏻",
    avatar: "https://images.unsplash.com/photo-1506794778242-92524d5d3921?auto=format&fit=crop&q=80",
    brand: 'bazm'
  },
  {
    id: 't2',
    name: "Sarah Khan",
    role: "Commercial Client",
    content: "Candid Imagination delivered a visually stunning ad film that exceeded our expectations. Truly professional cinematic layout and pacing.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    brand: 'candid',
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-video-camera-filming-a-filmmaker-on-set-34351-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
    duration: "0:45"
  },
  {
    id: 't5',
    name: "Elena Rostova",
    role: "Marketing Director",
    content: "Our corporate storytelling video captures everything we represent. Exceptional detail in lighting, camera angles, and transitions.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
    brand: 'candid',
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-director-looking-at-a-monitor-on-a-film-set-34444-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&q=80",
    duration: "2:02"
  },
  {
    id: 't6',
    name: "Ayush Saxena",
    role: "Indie Filmmaker",
    content: "From co-producing to arranging editing setups, the team at Candid has been a rock-solid support for our independent debut.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    brand: 'candid'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm1',
    name: "Manoj Panwar",
    role: "Founder",
    image: "/manoj%20panwar.png",
    type: 'member',
    bio: "The architect of our creative vision, setting the strategic course for the stories we choose to preserve."
  },
  {
    id: 'tm2',
    name: "Ritu Singh Chauhan",
    role: "Co-Founder",
    image: "/Ritu%20singh%20chauhan.png",
    type: 'member',
    bio: "The hands-on bridge between artistic narrative and audience impact, ensuring every project is both deeply felt and strategically positioned."
  },
  {
    id: 'tm3',
    name: "Chandan Sharma",
    role: "Production & Creative Head",
    image: "/Chandan%20sharma.png",
    type: 'member',
    brand: 'candid',
    bio: "The technical backbone, overseeing the rigor of our process to turn every frame into a polished piece of art."
  },
  {
    id: 'tm4',
    name: "Ayushi Vyas",
    role: "Production Manager",
    image: "/Aayushi%20vyas.png",
    type: 'member',
    brand: 'candid',
    bio: "The heartbeat of our operations, managing the delicate intersection of resources, schedules, and creativity to ensure no story is left untold."
  },
  {
    id: 'tm5',
    name: "Vaibhavi Joshi",
    role: "Production Manager",
    image: "/Vaibhavi%20joshi.png",
    type: 'member',
    brand: 'candid',
    bio: "The steward of growth and identity, balancing the raw, unmanufactured spirit of our work with the logistics of lasting success."
  },
  {
    id: 'tm6',
    name: "Ajay Karan Joshi",
    role: "Acting Mentor & Theatre Scholar",
    image: "/ajay karan joshi.png",
    type: 'mentor',
    brand: 'bazm',
    bio: "Esteemed Theatre Actor, Director & Acting Mentor, theatre scholar, and RSNK academy award winner."
  },
  {
    id: 'tm_g3',
    name: "Shailendra Vyas",
    role: "TV & Film Actor / Anchor",
    image: "/shailendra vyas.png",
    type: 'guest',
    brand: 'bazm',
    bio: "TV & Film Actor / Anchor, owner of Shailendra Productions, and famed for Paramavatar Shri Krishna (& TV)."
  },
  {
    id: 'tm_g2',
    name: "Nemi Makar",
    role: "Theatre & Film Craft Mentor",
    image: "/nemi makad.png",
    type: 'guest',
    brand: 'bazm',
    bio: "Young actor from Rajasthan, theatre and film craft mentor, and the founder of Craftsman's Casting."
  },
  {
    id: 'tm_g1',
    name: "Brijesh Ambar",
    role: "Poet, Critic & Editor",
    image: "/brijesh ambar.png",
    type: 'guest',
    brand: 'bazm',
    bio: "Poet, critic, editor, and translator. Honoured with the Rajasthan Patrika Creative Literature award for poetry."
  }
];

export const ASSOCIATES: Associate[] = [
  {
    id: 'a1',
    name: "Snapshooter",
    image: "/snapshooter.png",
    brand: 'both'
  },
  {
    id: 'a2',
    name: "Hatdi Studio",
    image: "/hatdi.png",
    brand: 'both'
  },
  {
    id: 'a3',
    name: "Lali Entertainment",
    image: "/lali%20entertainment.png",
    brand: 'both'
  },
  {
    id: 'a4',
    name: "Craftsman Casting",
    image: "/craftsman%20casting.png",
    brand: 'both'
  },
  {
    id: 'a5',
    name: "Rhythm Dance Institute",
    image: "/rhythm%20dance%20institute.png",
    brand: 'both'
  },
  {
    id: 'a6',
    name: "Antraman Yatri",
    image: "/antraman_yatri.png",
    brand: 'both'
  }
];

