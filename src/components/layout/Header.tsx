'use client';

import React, { createElement, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, Calendar, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { navLinks } from '@/data/navLinks';
import Logo from '../ui/Logo';
import Container from '../ui/Container';
import MobileMenu from './MobileMenu';
import { cn } from '@/lib/utils';
import { ClinicSettings } from '@/types/settings';
import { getServiceIcon } from '@/lib/serviceIcons';

export const Header: React.FC<{ settings?: ClinicSettings | null }> = ({ settings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - (rect.left + width / 2);
    const mouseY = e.clientY - (rect.top + height / 2);
    x.set(mouseX * 0.15); // subtle draw
    y.set(mouseY * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 left-0 right-0 z-40 transition-all duration-300 w-full border-b',
          isScrolled
            ? 'bg-[#f8f7f3]/95 backdrop-blur-md shadow-sm border-[#003b1b]/10'
            : 'bg-[#f8f7f3]/90 backdrop-blur-md border-gray-200/50'
        )}
      >
        <Container className={cn(
          "flex items-center justify-between transition-all duration-300",
          isScrolled ? "h-16" : "h-20"
        )}>
          {/* Logo - Client-provided image logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Logo className={cn(
              "group-hover:scale-105 transition-all duration-300",
              isScrolled ? "h-8 sm:h-9 lg:h-10" : "h-9 sm:h-11 lg:h-12"
            )} />
          </Link>

          {/* Navigation Links with Half-Teeth Active Indicator */}
          <nav className="hidden lg:flex items-center gap-8 relative shrink-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              const children = link.children ?? [];

              if (children.length === 0) {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'relative flex flex-col items-center py-2 text-xs sm:text-sm tracking-wide transition-colors font-sans',
                      isActive
                        ? 'text-[#003b1b] font-bold'
                        : 'text-gray-600 hover:text-[#003b1b] font-medium'
                    )}
                  >
                    {/* Nav Link Text */}
                    <span>{link.label}</span>

                    {/* Half-Tooth Icon - Rendered DIRECTLY beneath text label */}
                    {isActive && (
                      <div className="absolute top-full -mt-0.5 flex items-center justify-center pointer-events-none">
                        <svg
                          width="16"
                          height="8"
                          viewBox="0 0 20 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#003b1b]"
                        >
                          {/* Precise Top Half Molar Crest Path */}
                          <path
                            d="M2 10C2 6 3.5 1 6.5 1C8.5 1 9.5 3 10 3C10.5 3 11.5 1 13.5 1C16.5 1 18 6 18 10H2Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    )}
                  </Link>
                );
              }

              /* Parent link with dropdown (e.g. Services) */
              const isDropdownOpen = openDropdown === link.label;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  onFocus={() => setOpenDropdown(link.label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setOpenDropdown(null);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setOpenDropdown(null);
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpenDropdown(null)}
                    className={cn(
                      'relative flex flex-col items-center -mx-2.5 px-2.5 py-2 rounded-full text-xs sm:text-sm tracking-wide transition-colors font-sans',
                      isDropdownOpen && 'bg-primary/10',
                      isActive
                        ? 'text-[#003b1b] font-bold'
                        : 'text-gray-600 hover:text-[#003b1b] font-medium'
                    )}
                  >
                    <span className="flex items-center gap-1">
                      {link.label}
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-200',
                          isDropdownOpen && 'rotate-180'
                        )}
                      />
                    </span>

                    {isActive && (
                      <div className="absolute top-full -mt-0.5 flex items-center justify-center pointer-events-none">
                        <svg
                          width="16"
                          height="8"
                          viewBox="0 0 20 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#003b1b]"
                        >
                          <path
                            d="M2 10C2 6 3.5 1 6.5 1C8.5 1 9.5 3 10 3C10.5 3 11.5 1 13.5 1C16.5 1 18 6 18 10H2Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    )}
                  </Link>

                  {/* Dropdown Panel */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 origin-top"
                      >
                        <div className="w-[560px] rounded-3xl bg-white border border-slate-200/80 shadow-[0_28px_70px_-24px_rgba(0,59,27,0.4)] p-3">
                          {/* Panel header */}
                          <div className="flex items-center justify-between px-3 pt-1 pb-2.5 mb-2 border-b border-slate-100">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                              All Treatments
                            </span>
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
                              {children.length} Services
                            </span>
                          </div>

                          {/* Service items */}
                          <div className="grid grid-cols-2 gap-1">
                            {children.map((child) => {
                              const isChildActive = pathname === child.href;
                              const ChildIcon = getServiceIcon(child.label);
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className={cn(
                                    'group/item flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-xs font-sans leading-snug transition-all duration-200',
                                    isChildActive
                                      ? 'bg-primary/10 text-primary font-bold shadow-[inset_0_0_0_1px_rgba(0,59,27,0.08)]'
                                      : 'text-slate-600 font-medium hover:bg-primary/5 hover:text-primary'
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors',
                                      isChildActive
                                        ? 'bg-primary text-white'
                                        : 'bg-bg-alt text-primary group-hover/item:bg-primary group-hover/item:text-white'
                                    )}
                                  >
                                    {createElement(ChildIcon, { className: 'h-4 w-4' })}
                                  </span>
                                  <span className="min-w-0 flex-1">{child.label}</span>
                                  <ArrowRight
                                    className={cn(
                                      'h-3.5 w-3.5 shrink-0 transition-all duration-200',
                                      isChildActive
                                        ? 'opacity-60'
                                        : 'opacity-0 -translate-x-1 group-hover/item:opacity-60 group-hover/item:translate-x-0'
                                    )}
                                  />
                                </Link>
                              );
                            })}
                          </div>

                          {/* Panel footer */}
                          <Link
                            href="/services"
                            onClick={() => setOpenDropdown(null)}
                            className="mt-2 flex items-center justify-between rounded-2xl bg-bg-alt px-4 py-3 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
                          >
                            <span>View All Services</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-2 lg:border-l lg:border-slate-200/80 lg:pl-5 xl:pl-6">
            {/* Direct Phone Call */}
            <a
              href={`tel:${(settings?.phone || '+923245021261').replace(/\s+/g, '')}`}
              className="hidden sm:inline-flex items-center justify-center p-2 rounded-xl text-[#003b1b] hover:bg-emerald-100/50 transition-colors shrink-0"
              title={`Call us: ${settings?.phone || '+923245021261'}`}
              aria-label="Call Us"
            >
              <Phone className="w-4 h-4 text-[#003b1b] shrink-0" />
            </a>

            {/* WhatsApp Quick Link */}
            <a
              href={settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}` : 'https://wa.me/923245021261'}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center p-2 rounded-xl text-emerald-600 hover:bg-emerald-100/50 transition-colors shrink-0 hover:scale-110"
              title={`WhatsApp us: ${settings?.whatsapp || '923245021261'}`}
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5 fill-current shrink-0 text-emerald-600" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.514 0-9.999 4.486-9.999 10 0 1.763.462 3.487 1.34 5.02L2 22l5.081-1.332c1.488.814 3.164 1.252 4.95 1.252 5.514 0 10-4.486 10-10s-4.486-10-10.000-10zm5.836 14.168c-.244.688-1.22 1.322-1.996 1.487-.532.113-1.228.204-3.565-.764-2.986-1.238-4.908-4.275-5.057-4.474-.149-.2-1.213-1.616-1.213-3.082 0-1.467.768-2.189 1.042-2.485.274-.296.598-.37.797-.37.198 0 .397.002.571.011.185.009.432-.07.676.516.244.587.834 2.036.908 2.185.074.149.123.323.025.517-.099.195-.148.318-.296.492-.148.174-.312.389-.446.523-.148.149-.302.311-.13.608.172.296.764 1.262 1.638 2.042 1.124.999 2.072 1.31 2.37 1.458.297.148.47.123.643-.074.173-.198.742-.865.94-1.163.198-.297.396-.247.668-.148.272.099 1.733.818 2.031.966.297.149.495.223.569.347.074.124.074.718-.17 1.406z" />
              </svg>
            </a>

            {/* Primary Book Appointment CTA Button */}
            <motion.div style={{ x: springX, y: springY }} className="hidden md:inline-flex shrink-0">
              <Link
                href="/book-appointment"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="inline-flex items-center justify-center font-bold text-xs px-5 py-2.5 bg-[#003b1b] text-white hover:bg-[#002b13] transition-colors rounded-full shadow-sm gap-2 whitespace-nowrap cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </Link>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -mr-2 rounded-full lg:hidden text-body-text hover:bg-slate-100 focus:outline-none transition-colors cursor-pointer shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        settings={settings}
      />
    </>
  );
};

export default Header;
