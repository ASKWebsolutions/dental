import { NavLink } from '@/types';
import { serviceNavLinks } from './serviceNavLinks';

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services', children: serviceNavLinks },
  { label: 'Doctors', href: '/team' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Our Location', href: '/our-location' },
];
