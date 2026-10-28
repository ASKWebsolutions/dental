'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { ClinicSettings } from '@/types/settings';
import { siteConfig } from '@/data/siteConfig';
import { ourLocation, LocationCardKey } from '@/data/ourLocation';

interface LocationDetailsProps {
  settings: ClinicSettings;
}

export const LocationDetails: React.FC<LocationDetailsProps> = ({ settings }) => {
  const prefersReducedMotion = useReducedMotion();
  const directionsUrl = settings.mapDirectionsUrl || siteConfig.contact.addressMapUrl;
  const hours = settings.openingHours || [];

  const waDigits = (() => {
    const digits = (settings.whatsapp || '').replace(/\D/g, '');
    if (!digits) return '';
    return digits.startsWith('0') ? `92${digits.slice(1)}` : digits;
  })();

  const icons: Record<LocationCardKey, React.ReactNode> = {
    address: <MapPin className="w-5 h-5 text-primary-light" />,
    phone: <Phone className="w-5 h-5 text-primary-light" />,
    whatsapp: <WhatsAppIcon className="w-5 h-5 fill-primary-light" />,
    email: <Mail className="w-5 h-5 text-primary-light" />,
  };

  const values: Record<LocationCardKey, React.ReactNode | null> = {
    address: (
      <>
        <p className="text-sm text-body-text leading-relaxed font-normal mb-4">
          {settings.address}
        </p>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
        >
          {ourLocation.details.openInMaps}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </>
    ),
    phone: (
      <>
        <a
          href={`tel:${settings.phone.replace(/\s+/g, '')}`}
          className="text-lg font-bold text-dark hover:text-primary hover:underline block mb-1"
        >
          {settings.phone}
        </a>
        {settings.phoneNote && (
          <span className="text-xs text-body-text font-semibold">{settings.phoneNote}</span>
        )}
      </>
    ),
    whatsapp: waDigits
      ? (
          <>
            <a
              href={`https://wa.me/${waDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-dark hover:text-primary hover:underline block mb-1"
            >
              {settings.whatsapp}
            </a>
            <span className="text-xs text-body-text font-semibold">Chat with us on WhatsApp</span>
          </>
        )
      : null,
    email: (
      <a
        href={`mailto:${settings.email}`}
        className="text-sm font-bold text-dark hover:text-primary hover:underline break-all"
      >
        {settings.email}
      </a>
    ),
  };

  const entrance = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section id="hours" className="py-16 md:py-20 bg-bg scroll-mt-24">
      <Container>
        <SectionHeading
          title={ourLocation.details.title}
          highlightedText={ourLocation.details.highlightedText}
          highlightColor="teal-clean"
          subtitle={ourLocation.details.subtitle}
          align="center"
          className="mx-auto mb-10"
        />

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ourLocation.details.cards
            .filter((card) => values[card.key])
            .map((card, i) => (
              <motion.div
                key={card.key}
                {...entrance}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className="bg-white rounded-[28px] p-7 shadow-card border border-slate-100/50 flex flex-col"
              >
                <div className="bg-primary p-2.5 rounded-xl w-fit mb-5">{icons[card.key]}</div>
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-body-text mb-3">
                  {card.label}
                </h3>
                <div className="mt-auto">{values[card.key]}</div>
              </motion.div>
            ))}
        </div>

        {/* Opening hours */}
        <motion.div
          {...entrance}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="bg-white rounded-[28px] p-7 md:p-9 shadow-card border border-slate-100/50 mt-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary p-2.5 rounded-xl">
              <Clock className="w-5 h-5 text-primary-light" />
            </div>
            <h3 className="font-serif font-bold text-xl md:text-2xl text-primary">
              {ourLocation.details.hoursTitle}
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {hours.map((oh, i) => (
              <div
                key={oh.id || `oh-${i}`}
                className={`flex-1 min-w-[150px] flex items-center justify-between gap-4 rounded-2xl px-5 py-4 ${
                  oh.isEmergencyNote
                    ? 'bg-primary text-white'
                    : 'bg-bg-alt/70 border border-slate-100 text-body-text'
                } ${oh.isDimmed ? 'opacity-50' : ''}`}
              >
                <span className="text-xs font-bold uppercase tracking-wider">{oh.label}</span>
                <span className="text-sm font-semibold">{oh.hours}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default LocationDetails;
