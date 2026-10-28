import { NavLink } from '@/types';

/**
 * Service links for the navbar dropdown / mobile accordion.
 * Client-safe (no Prisma import) so layout components can consume it directly.
 */
export const serviceNavLinks: NavLink[] = [
  { label: 'Teeth Whitening', href: '/services/teeth-whitening' },
  { label: 'Scaling', href: '/services/scaling' },
  { label: 'Polishing', href: '/services/polishing' },
  { label: 'Teeth Whitening (Bleaching Light)', href: '/services/teeth-whitening-bleaching-light' },
  { label: 'Filling', href: '/services/filling' },
  { label: 'Root Canal Treatment', href: '/services/root-canal-treatment' },
  { label: 'Simple Extraction', href: '/services/simple-extraction' },
  { label: 'Surgical Extraction', href: '/services/surgical-extraction' },
  { label: 'Wisdom Tooth Extraction', href: '/services/wisdom-tooth-extraction' },
  { label: 'Dental Implants', href: '/services/dental-implants' },
  { label: 'Removable Denture', href: '/services/removable-denture' },
  { label: 'Braces', href: '/services/braces' },
  { label: 'Bridges / Crown', href: '/services/bridges-crown' },
  { label: 'Gum Disease Treatment', href: '/services/gum-disease-treatment' },
  { label: 'Clear Aligners', href: '/services/clear-aligners' },
  { label: 'Veneers', href: '/services/veneers' },
];
