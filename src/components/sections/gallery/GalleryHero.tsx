'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '@/components/ui/Container';

export const GalleryHero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-16 pb-10 md:pt-24 md:pb-14 overflow-hidden bg-bg flex flex-col justify-center items-center text-center">
      {/* Soft glowing ambient backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none -z-10" />

      <Container className="max-w-3xl flex flex-col items-center px-4">
        {/* Master eyebrow */}
        <motion.span
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-xs font-bold tracking-[0.25em] text-[#003b1b] uppercase block mb-3"
        >
          Transformation Portfolio
        </motion.span>

        {/* Italic serif sub-eyebrow */}
        <motion.span
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
          className="font-serif italic text-lg sm:text-xl text-slate-500 mb-4"
        >
          Artistry In Precision
        </motion.span>

        {/* Master H1 */}
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4"
        >
          Explore our curated collection of smile transformations.
        </motion.h1>

        {/* Master subtitle */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="text-xs sm:text-sm text-gray-500 max-w-2xl font-sans leading-relaxed"
        >
          Explore the clinical transformations achieved by our multidisciplinary specialists.
          Precision implants, bespoke veneers, and biometric alignments designed to restore form
          and confidence.
        </motion.p>
      </Container>
    </section>
  );
};

export default GalleryHero;
