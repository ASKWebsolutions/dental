'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Navigation, Phone } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { ClinicSettings } from '@/types/settings';
import { siteConfig } from '@/data/siteConfig';
import { ourLocation } from '@/data/ourLocation';

interface LocationMapProps {
  settings: ClinicSettings;
}

export const LocationMap: React.FC<LocationMapProps> = ({ settings }) => {
  const prefersReducedMotion = useReducedMotion();
  const directionsUrl = settings.mapDirectionsUrl || siteConfig.contact.addressMapUrl;
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    ourLocation.map.mapQuery
  )}&z=16&output=embed`;
  const entrance = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section id="map" className="relative py-16 md:py-20 bg-white overflow-hidden scroll-mt-24">
      {/* Decorative ambient blobs */}
      <div className="absolute top-[8%] right-[4%] w-40 h-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[12%] left-[2%] w-32 h-32 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <Container className="relative">
        <SectionHeading
          eyebrow={ourLocation.map.eyebrow}
          title={ourLocation.map.title}
          highlightedText={ourLocation.map.highlightedText}
          highlightColor="teal-clean"
          subtitle={ourLocation.map.subtitle}
          align="left"
          className="mb-10 md:mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Directions panel */}
          <motion.div
            {...entrance}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative lg:col-span-4 rounded-[32px] bg-primary text-white p-7 md:p-8 overflow-hidden shadow-card flex flex-col"
          >
            {/* Decorative accent circle */}
            <div className="absolute top-[-60px] right-[-50px] w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />

            <div className="relative">
              <div className="bg-white/10 p-3 rounded-2xl w-fit mb-5">
                <MapPin className="w-6 h-6 text-primary-light" />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[1.6px] text-primary-light mb-2">
                {ourLocation.map.addressLabel}
              </p>
              <p className="text-base md:text-lg font-semibold leading-relaxed text-white mb-5">
                {settings.address}
              </p>

              <div className="flex flex-wrap gap-2">
                {ourLocation.map.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="h-px bg-white/10 my-6" />

              <div className="flex flex-col gap-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary-soft hover:bg-primary-light text-primary font-sans font-bold text-sm transition-all shadow-md"
                >
                  <Navigation className="w-4 h-4" />
                  {ourLocation.map.directionsLabel}
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    settings.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-sans font-bold text-sm transition-all"
                >
                  {ourLocation.map.openMapsLabel}
                </a>
              </div>

              <div className="h-px bg-white/10 my-6" />

              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-3 text-sm font-bold text-white hover:text-primary-light transition-colors"
              >
                <span className="bg-white/10 p-2.5 rounded-xl">
                  <Phone className="w-4 h-4 text-primary-light" />
                </span>
                {settings.phone}
              </a>
            </div>
          </motion.div>

          {/* Interactive map */}
          <motion.div
            {...entrance}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="relative lg:col-span-8 rounded-[32px] overflow-hidden bg-slate-100 shadow-card border border-slate-100/50 h-[380px] sm:h-[460px] lg:h-auto lg:min-h-[540px]"
          >
            <iframe
              src={embedSrc}
              title={ourLocation.map.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-0"
            />

            {/* Floating pin pill */}
            <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2.5 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-lg z-10">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-primary-light opacity-75 animate-ping" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-bold text-dark">{ourLocation.map.pinLabel}</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default LocationMap;
