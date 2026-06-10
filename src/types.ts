export type Brand = 'candid' | 'bazm';

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  videoUrl?: string;
  brand: Brand;
  moodStatement?: string;
  year?: string;
  credits?: Record<string, string>;
  btsText?: string;
  btsImage?: string;
  storytellingProcess?: string;
  audioTrackName?: string;
  audioTrackArtist?: string;
  finalOutcome?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  brand: Brand | 'both';
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  type: 'member' | 'mentor' | 'guest';
  brand?: Brand | 'both';
  bio?: string;
}

export interface Associate {
  id: string;
  name: string;
  image: string;
  link?: string;
  brand: Brand | 'both';
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  type: string;
  message: string;
}

export interface SpaceBookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  duration: string;
  purpose: string;
  attendees: string;
  requirements: string[];
}
