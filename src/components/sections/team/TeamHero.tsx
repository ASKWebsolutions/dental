'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '@/components/ui/Container';

export const TeamHero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-16 pb-6 md:pt-24 md:pb-8 overflow-hidden bg-bg flex flex-col justify-center items-center text-center">
      {/* Top-right availability blob */}
      <motion.span
        initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute top-6 right-6 sm:top-10 sm:right-10 text-xs font-medium text-emerald-800 bg-emerald-100/60 px-4 py-2 rounded-full shadow-sm"
      >
        ● Available for Consultations
      </motion.span>

      <Container className="max-w-3xl flex flex-col items-center px-4">
        {/* Master eyebrow */}
        <motion.span
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-xs font-bold tracking-[0.25em] text-[#003b1b] uppercase block mb-3"
        >
          The Art of Precision
        </motion.span>

        {/* Master H1 */}
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
        >
          Meet Our Masters of Dental Artistry
        </motion.h1>

        {/* Master subtitle */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="text-xs sm:text-sm text-gray-500 max-w-2xl font-sans leading-relaxed"
        >
          A collective of internationally trained specialists dedicated to the intersection of
          clinical excellence and aesthetic perfection.
        </motion.p>
      </Container>
    </section>
  );
};

export default TeamHero;
