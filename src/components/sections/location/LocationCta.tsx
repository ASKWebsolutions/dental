'use client';

import React from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { ClinicSettings } from '@/types/settings';
import { ourLocation } from '@/data/ourLocation';

interface LocationCtaProps {
  settings: ClinicSettings;
}

export const LocationCta: React.FC<LocationCtaProps> = ({ settings }) => {
  const prefersReducedMotion = useReducedMotion();
  const entrance = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section className="bg-bg py-12 md:py-16">
      <Container>
        <div className="w-full rounded-[2.5rem] bg-primary p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Decorative ambient blobs */}
          <div className="absolute top-[-60px] right-[-40px] w-56 h-56 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-60px] left-[-40px] w-48 h-48 rounded-full bg-primary-light/10 blur-3xl pointer-events-none" />

          <motion.span
            {...entrance}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-primary-light text-xs font-semibold mb-6"
          >
            {ourLocation.cta.eyebrow}
          </motion.span>

          <motion.h2
            {...entrance}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold max-w-3xl mx-auto mb-5 text-white leading-snug"
          >
            {ourLocation.cta.title}
          </motion.h2>

          <motion.p
            {...entrance}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto mb-8 font-sans font-normal leading-relaxed"
          >
            {ourLocation.cta.subtitle}
          </motion.p>

          <motion.div
            {...entrance}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-wrap items-center justify-center gap-4 font-sans"
          >
            <Link
              href={ourLocation.cta.primaryHref}
              className="px-8 py-3.5 rounded-full bg-primary-soft hover:bg-primary-light text-primary font-bold text-sm transition-all shadow-md"
            >
              {ourLocation.cta.primaryLabel}
            </Link>
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 bg-black/10 hover:bg-black/20 text-white font-bold text-sm transition-all"
            >
              <Phone className="w-4 h-4" />
              {ourLocation.cta.secondaryLabel}
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default LocationCta;
