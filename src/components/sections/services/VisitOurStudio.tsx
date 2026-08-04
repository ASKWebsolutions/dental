'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import Container from '@/components/ui/Container';
import { ClinicSettings } from '@/types/settings';
import { siteConfig } from '@/data/siteConfig';

interface VisitOurStudioProps {
  settings: ClinicSettings;
}

export const VisitOurStudio: React.FC<VisitOurStudioProps> = ({ settings }) => {
  const mapSrc = settings.mapImageUrl || '/images/contact/map.png';
  const directionsUrl = settings.mapDirectionsUrl || siteConfig.contact.addressMapUrl;

  return (
    <section className="py-20 md:py-24 bg-bg-alt overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl mx-auto text-center mb-14"
        >
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-primary leading-tight mb-4">
            Visit Our Studio
          </h2>
          <p className="text-sm sm:text-base text-body-text font-sans leading-relaxed font-normal">
            Step inside our calm, modern clinic — a space designed around your comfort, from the
            welcome area to the treatment chair.
          </p>
        </motion.div>

        {/* Full-width styled map */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative rounded-[32px] overflow-hidden bg-slate-100 shadow-card border border-slate-100/50 h-[280px] sm:h-[340px] md:h-[400px] group"
        >
          <Image
            src={mapSrc}
            alt="Map showing directions to our dental studio"
            fill
            sizes="100vw"
            className="object-cover group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/25 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary hover:bg-slate-100 hover:scale-105 font-sans font-bold text-xs shadow-lg transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-primary" /> Get Directions
            </a>
          </div>
        </motion.div>

        {/* Address + Opening Hours cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-stretch">
          {/* Studio address */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="bg-white rounded-[32px] p-8 md:p-10 shadow-card border border-slate-100/50 text-left"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-[#003b1b] p-2.5 rounded-xl flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#b1f2be]" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-primary">Studio Address</h3>
            </div>
            <p className="text-sm text-body-text leading-relaxed font-sans font-normal mb-6">
              {settings.address}
            </p>
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <Phone className="w-4 h-4" />
              {settings.phone}
            </a>
          </motion.div>

          {/* Opening hours badges */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="bg-white rounded-[32px] p-8 md:p-10 shadow-card border border-slate-100/50 text-left"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-[#003b1b] p-2.5 rounded-xl flex-shrink-0">
                <Clock className="w-5 h-5 text-[#b1f2be]" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-primary">Opening Hours</h3>
            </div>
            <div className="flex flex-col gap-2.5">
              {(settings.openingHours || []).map((oh, i) => (
                <div
                  key={oh.id || `oh-${i}`}
                  className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5 ${
                    oh.isEmergencyNote
                      ? 'bg-[#003b1b] text-white'
                      : 'bg-bg-alt/70 border border-slate-100 text-body-text'
                  } ${oh.isDimmed ? 'opacity-50' : ''}`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider">{oh.label}</span>
                  <span className="text-sm font-semibold">{oh.hours}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default VisitOurStudio;
