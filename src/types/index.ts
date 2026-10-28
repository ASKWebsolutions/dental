export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
  viewAll?: { label: string; href: string };
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface WorkingHours {
  days: string;
  hours: string;
}

export interface ClinicConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  contact: {
    phone: string;
    phoneFormatted: string;
    email: string;
    address: string;
    addressMapUrl: string;
    workingHours: WorkingHours[];
  };
  socialLinks: SocialLinks;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  slug: string;
  iconName: string;
  imagePath?: string;
  variant?: 'large-image-card' | 'dark-teal-card' | 'white-card' | 'accent-pink-card';
  ctaLabel?: string;
  bullets?: string[];
  featured?: boolean;
}

export interface HomeService {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  order?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  imagePath: string;
  education?: string[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  bio: string;
  imagePath: string;
  quote?: string;
  experience?: string;
  specialties?: string[];
  education?: string[];
  displayOrder?: number;
  featured?: boolean;
  isFounder?: boolean;
  isAvailable?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role?: string;
  rating: number;
  text: string;
  date?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StatItem {
  id: string;
  value: string; // e.g. "15+" or "99%"
  numericValue: number; // for animations
  label: string;
  description: string;
}

export type HeroTrustIcon = 'ShieldCheck' | 'Award';

export interface HeroConfig {
  eyebrow: string;
  headline: {
    line1: string;
    highlight: string;
    line2: string;
  };
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustBar: { icon: HeroTrustIcon; label: string }[];
  images: {
    base: string; // After / Clinic visual (bottom layer)
    overlay: string; // Before / Lab visual (wipe top layer)
  };
  liveBadge: {
    label: string; // e.g. "LIVE UPDATES"
    status: string; // e.g. "Accepting New Patients"
    nextAvailable: string; // e.g. "Next available: Dec 14"
  };
}
