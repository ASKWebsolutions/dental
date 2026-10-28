'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import { NavLink } from '@/types';
import { siteConfig } from '@/data/siteConfig';
import { cn } from '@/lib/utils';
import { ClinicSettings } from '@/types/settings';

import WhatsAppIcon from '../ui/WhatsAppIcon';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  settings?: ClinicSettings | null;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, links, settings }) => {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const panelVariants: Variants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { type: 'spring' as const, damping: 25, stiffness: 200 },
    },
    exit: {
      x: '100%',
      transition: { ease: 'easeInOut' as const, duration: 0.3 },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <span className="font-serif font-extrabold text-dark text-lg leading-tight">
                {siteConfig.shortName}
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-dark transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto py-8 px-6">
              <motion.nav variants={containerVariants} className="flex flex-col gap-4 text-center">
                {links.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  const children = link.children ?? [];
                  const isSubmenuOpen = openSubmenu === link.label;
                  return (
                    <motion.div key={link.href} variants={itemVariants}>
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={`relative flex flex-col items-center justify-center py-2 text-base font-semibold tracking-wide font-sans transition-all duration-200 ${
                            isActive ? 'text-[#003b1b]' : 'text-slate-600 hover:text-[#003b1b]'
                          }`}
                        >
                          <span className="relative z-10">{link.label}</span>
                          {isActive && (
                            <motion.span
                              layoutId="activeMobileDrawerIndicator"
                              className="mt-0.5 text-[#003b1b] flex items-center justify-center shrink-0"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            >
                              <svg
                                width="18"
                                height="8"
                                viewBox="0 0 20 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 h-1.5 fill-current"
                              >
                                <path d="M2 0C2 2 1 4 0 5C3 6 4 10 10 10C16 10 17 6 20 5C19 4 18 2 18 0C14 0 13 2 10 2C7 2 6 0 2 0Z" />
                              </svg>
                            </motion.span>
                          )}
                        </Link>

                        {children.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setOpenSubmenu(isSubmenuOpen ? null : link.label)}
                            aria-expanded={isSubmenuOpen}
                            aria-label={
                              isSubmenuOpen
                                ? `Hide ${link.label} submenu`
                                : `Show ${link.label} submenu`
                            }
                            className="p-2 -my-2 rounded-full text-slate-500 hover:text-[#003b1b] hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            <ChevronDown
                              className={cn(
                                'w-4 h-4 transition-transform duration-200',
                                isSubmenuOpen && 'rotate-180'
                              )}
                            />
                          </button>
                        )}
                      </div>

                      {/* Services submenu */}
                      {children.length > 0 && (
                        <AnimatePresence initial={false}>
                          {isSubmenuOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <ul className="flex flex-col gap-1 pt-3 pb-1">
                                {children.map((child) => {
                                  const isChildActive = pathname === child.href;
                                  return (
                                    <li key={child.href}>
                                      <Link
                                        href={child.href}
                                        onClick={onClose}
                                        className={cn(
                                          'block w-full rounded-xl px-3 py-2.5 text-center text-sm font-medium transition-colors',
                                          isChildActive
                                            ? 'bg-primary/10 text-primary font-bold'
                                            : 'text-slate-500 hover:text-[#003b1b] hover:bg-slate-50'
                                        )}
                                      >
                                        {child.label}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* Contact details */}
              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col gap-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Contact Information
                </h4>

                <div className="flex flex-col gap-4 text-sm text-slate-600 text-left">
                  {/* Landline Phone */}
                  <a
                    href={`tel:${(settings?.phone || siteConfig.contact.phone).replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{settings?.phone || siteConfig.contact.phone}</span>
                  </a>

                  {/* Mobile Phone Call */}
                  <a
                    href={`tel:${(settings?.whatsapp || '03245021261').replace(/\D/g, '')}`}
                    className="flex items-center gap-3 hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{settings?.whatsapp || '03245021261'}</span>
                  </a>

                  {/* WhatsApp Chat Link */}
                  <a
                    href={`https://wa.me/${(settings?.whatsapp || '923245021261').replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-green-600 transition-colors text-green-600 font-bold"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-green-500 text-green-500" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${settings?.email || siteConfig.contact.email}`}
                    className="flex items-center gap-3 hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{settings?.email || siteConfig.contact.email}</span>
                  </a>
                  <a href={settings?.mapDirectionsUrl || siteConfig.contact.addressMapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-primary transition-colors">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{settings?.address || siteConfig.contact.address}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Button Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col">
              <Link
                href="/book-appointment"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 rounded-full text-xs px-6 py-3 bg-[#003b1b] text-white hover:bg-[#002b13] btn-diagonal-stripe shadow-md cursor-pointer text-center"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
