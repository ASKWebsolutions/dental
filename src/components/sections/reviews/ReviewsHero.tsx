'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import Container from '@/components/ui/Container';

const avatars = [
  { initials: 'EV', bg: 'bg-[#003b1b]' },
  { initials: 'JM', bg: 'bg-accent' },
  { initials: 'SM', bg: 'bg-amber-400' },
];

export const ReviewsHero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-16 pb-6 md:pt-24 md:pb-10 bg-bg overflow-hidden">
      {/* Soft ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none -z-10" />

      <Container className="max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10 justify-between">
          {/* Left: heading copy */}
          <div className="max-w-xl flex flex-col items-start text-left">
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-xs font-bold tracking-[0.25em] text-[#003b1b] uppercase block"
            >
              Patient Perspectives
            </motion.span>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
              className="font-serif text-3xl sm:text-4xl text-gray-900 mt-2 mb-1 leading-tight"
            >
              Real Smiles,
            </motion.h1>
            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: 'easeOut' }}
              className="font-serif text-3xl sm:text-4xl text-gray-900 italic mb-4 leading-tight"
            >
              Lasting Impressions.
            </motion.h2>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="text-xs text-gray-500 max-w-xl font-sans leading-relaxed"
            >
              Our commitment to precision and aesthetics is reflected in the lives we touch.
              Explore the experiences of our dental family, from transformative smile makeovers
              to life-changing dental implants.
            </motion.p>
          </div>

          {/* Right: Google rating badge */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: 'easeOut' }}
            className="flex items-center gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 flex-shrink-0"
          >
            {/* Stacked avatar thumbnails */}
            <div className="flex -space-x-2.5">
              {avatars.map((a) => (
                <div
                  key={a.initials}
                  className={`w-10 h-10 rounded-full ${a.bg} text-white flex items-center justify-center text-xs font-bold ring-2 ring-white flex-shrink-0`}
                >
                  {a.initials}
                </div>
              ))}
            </div>

            {/* Rating text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#FFB020] fill-[#FFB020]" />
                ))}
                <span className="text-sm font-bold text-gray-900 ml-1.5">4.9/5</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                Google Rating
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ReviewsHero;
